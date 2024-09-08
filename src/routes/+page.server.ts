import type { PageServerLoad } from './$types';
import { getSlugFromPath } from '$lib/helpers.ts';

export const load: PageServerLoad = async ({ params }) => {
	let articles: Array<Article> = [];

	const paths = import.meta.glob('/src/articles/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = getSlugFromPath(path);
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Article, 'slug'>;
			const article = { ...metadata, slug } satisfies Article;
			article.published && articles.push(article);
		}
	}

	articles = articles.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	const metadata = {
		title: 'Welcome',
		date: '2024-09-05',
		description: 'Welcome to my personal website'
	};

	return { articles, metadata };
};
