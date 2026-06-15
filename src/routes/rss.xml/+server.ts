import { PUBLIC_SITE_URL } from '$env/static/public';
import { getArticlesList } from '$lib/api/articles.remote';
import { getDateString, xmlEscape } from '$lib/helpers';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// articlesList[0].datePublished
	const defaultBuildDate = '2026-02-07';

	const articlesList = await getArticlesList();

	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml',
	};

	const xml = `
		<?xml version="1.0" encoding="UTF-8"?>
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Colin Howells</title>
				<description>RSS feed</description>
				<link>${PUBLIC_SITE_URL}</link>
				<atom:link href="${PUBLIC_SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
				<lastBuildDate>${getDateString(defaultBuildDate, 'rfc822')}</lastBuildDate>
				${articlesList
					.map(
						(article) => `
						<item>
							<title>${xmlEscape(article.title)}</title>
							<description>${xmlEscape(article.description)}</description>
							<link>${PUBLIC_SITE_URL}/${article.slug}</link>
							<guid isPermaLink="true">${PUBLIC_SITE_URL}/${article.slug}</guid>
							<pubDate>${getDateString(article.datePublished, 'rfc822')}</pubDate>
						</item>
					`,
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
};
