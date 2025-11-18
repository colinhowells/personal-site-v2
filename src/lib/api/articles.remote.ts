import { query } from '$app/server';
import { getImages, getSlugFromPath } from '$lib/helpers';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import * as v from 'valibot';

export const getArticlesList = query(async (): Promise<Array<ArticleMetadata>> => {
	let articlesList: Array<ArticleMetadata> = [];
	const filePaths = import.meta.glob('$lib/articles/*.md', { eager: true });
	const images = getImages();

	for (const path in filePaths) {
		const file = filePaths[path];
		const slug = getSlugFromPath(path);

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			let metadata = file.metadata as Omit<ArticleMetadata, 'slug'>;
			const articleMetadata = { ...metadata, slug } satisfies ArticleMetadata;

			// if article has a featured image (filename as 'image'), find the src for it and attach
			if (articleMetadata?.image) {
				articleMetadata.imgSrc = images[articleMetadata.image];
			}

			articleMetadata.published && articlesList.push({ ...articleMetadata, slug });
		}
	}

	return articlesList.sort(
		(first, second) =>
			new Date(second.datePublished).getTime() - new Date(first.datePublished).getTime()
	);
});

export const getArticle = query(v.string(), async (slug): Promise<Article> => {
	const notFoundMessage = `Sorry, that isn't here; /${slug} may have been deleted or moved.`;
	let article;
	try {
		article = await import(`$lib/articles/${slug}.md`);
	} catch (e) {
		error(404, notFoundMessage);
	}

	if (!article?.metadata?.published) error(404, notFoundMessage);

	// article.default is a SvelteComponent (eg a function) which a remote function can’t return
	const html = render(article.default);

	return {
		content: html.body,
		metadata: { ...article.metadata, slug }
	};
});
