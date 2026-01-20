import { PUBLIC_SITE_URL } from '$env/static/public';
import { getArticlesList } from '$lib/api/articles.remote';
import { getDateString } from '$lib/helpers';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const articlesList = await getArticlesList();
	const articles = articlesList
		.map(
			(article) => `
			  <url>
			    <loc>${PUBLIC_SITE_URL}/${article.slug}</loc>
			    <lastmod>${getDateString(article.dateModified, 'simple')}</lastmod>
			  </url>
			 `
		)
		.join('');

	return new Response(
		`
			<?xml version="1.0" encoding="UTF-8" ?>
			<urlset
				xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
				xmlns:xhtml="http://www.w3.org/1999/xhtml"
				xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
				xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
				xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
			>
				${articles}
			</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
};
