import { query } from '$app/server';
import { Temporal } from 'temporal-polyfill';
import { getImages, getSlug, getTemporalPlainDate } from '$lib/helpers';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import * as v from 'valibot';

export const getArticlesList = query(async (): Promise<ArticlesList> => {
	const filePaths = import.meta.glob('$lib/articles/*.md', { eager: true });
	const images = getImages();

	let articlesList: ArticlesList = [];

	for (const [path, file] of Object.entries(filePaths)) {
		if (file && typeof file === 'object' && 'metadata' in file) {
			let metadata = file.metadata as PageMetadata;

			// only return 'published' articles
			if (!metadata.published) continue;

			// if article has a featured image (filename as 'image'), find the src for it and attach
			if (metadata?.image) metadata.imgSrc = images[metadata.image];

			// normalize dates to YYYY-MM-DD (YAML parses date literals as JS Date objects)
			articlesList.push({
				...metadata,
				datePublished: metadata.datePublished?.slice(0, 10),
				dateModified: metadata.dateModified?.slice(0, 10),
				slug: getSlug(path),
			});
		}
	}

	return articlesList.sort((first, second) =>
		Temporal.PlainDate.compare(
			getTemporalPlainDate(second.datePublished!),
			getTemporalPlainDate(first.datePublished!),
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
