import { PUBLIC_SITE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
import { getArticles } from '$lib/helpers.ts';

export const GET: RequestHandler = () => {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	const articles = getArticles();
	const xml = `
		<?xml version="1.0" encoding="UTF-8"?>	
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Colin Howells</title>
				<description>RSS feed</description>
				<link>${PUBLIC_SITE_URL}</link>
				<atom:link href="${PUBLIC_SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
				<lastBuildDate>${new Date(articles[0].datePublished).toUTCString()}</lastBuildDate>
				${articles
					.map(
						(article) => `
						<item>
							<![CDATA[<title>${article.title}</title>]]>
							<![CDATA[<description>${article.description}</description>]]>
							<link>${PUBLIC_SITE_URL}/${article.slug}</link>
							<guid isPermaLink="true">${PUBLIC_SITE_URL}/${article.slug}</guid>
							<pubDate>${new Date(article.datePublished).toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
};
