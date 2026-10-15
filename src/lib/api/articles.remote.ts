import { getImgSrc, getSlug, getTemporalPlainDate } from '#lib/helpers.js';
import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { render } from 'svelte/server';
import { Temporal } from 'temporal-polyfill';
import * as v from 'valibot';

type ArticleModule = { default: Component; metadata: PageMetadata };

/**
 * Lazy so the same glob serves both the list and single-article lookups. Mixing an eager glob
 * with a dynamic `import()` of the same files triggers Vite's INEFFECTIVE_DYNAMIC_IMPORT warning.
 */
const articleModules = import.meta.glob<ArticleModule>('#lib/articles/*.md');

export const getArticlesList = query(async (): Promise<ArticlesList> => {
	const entries = await Promise.all(
		Object.entries(articleModules).map(async ([path, load]) => ({
			path,
			metadata: (await load()).metadata,
		})),
	);

	return entries
		.filter(({ metadata }) => metadata.published)
		.map(({ path, metadata }) => ({
			...metadata,
			// if article has a featured image (filename as 'image'), find the src for it and attach
			imgSrc: getImgSrc(metadata.image),
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
	const article = await articleModules[`/src/lib/articles/${slug}.md`]?.();

	if (!article?.metadata.published) {
		error(404, `Sorry, that isn't here; /${slug} may have been deleted or moved.`);
	}

	// article.default is a SvelteComponent (eg a function) which a remote function can’t return
	return {
		content: render(article.default).body,
		metadata: {
			...article.metadata,
			imgSrc: getImgSrc(article.metadata.image),
			slug,
		},
	};
});
