import { query } from '$app/server';
import { getImages, getSlug, getTemporalPlainDate } from '$lib/helpers';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import { Temporal } from 'temporal-polyfill';
import * as v from 'valibot';

/** Narrows a glob import entry to one containing published article metadata */
function isPublishedArticle(
	entry: [string, unknown],
): entry is [string, { metadata: PageMetadata }] {
	const [, file] = entry;
	return Boolean(
		file &&
		typeof file === 'object' &&
		'metadata' in file &&
		(file as { metadata: PageMetadata }).metadata.published,
	);
}

export const getArticlesList = query(async (): Promise<ArticlesList> => {
	const filePaths = import.meta.glob('$lib/articles/*.md', { eager: true });
	const images = getImages();

	return Object.entries(filePaths)
		.filter(isPublishedArticle)
		.map(([path, { metadata }]) => ({
			...metadata,
			// if article has a featured image (filename as 'image'), find the src for it and attach
			imgSrc: metadata.image ? images[metadata.image] : undefined,
			// YAML parses date literals as JS Date objects; normalize to YYYY-MM-DD
			datePublished: metadata.datePublished?.slice(0, 10),
			dateModified: metadata.dateModified?.slice(0, 10),
			slug: getSlug(path),
		}))
		.sort((a, b) =>
			Temporal.PlainDate.compare(
				getTemporalPlainDate(b.datePublished!),
				getTemporalPlainDate(a.datePublished!),
			),
		);
});

export const getArticle = query(v.string(), async (slug): Promise<Article> => {
	let article;

	try {
		article = await import(`$lib/articles/${slug}.md`);
		if (!article?.metadata?.published) throw new Error('Unpublished!');
	} catch {
		error(404, `Sorry, that isn't here; /${slug} may have been deleted or moved.`);
	}

	// article.default is a SvelteComponent (eg a function) which a remote function can’t return
	return {
		content: render(article.default).body,
		metadata: { ...article.metadata, slug },
	};
});
