import type { LayoutServerLoad } from './$types';
import { getSlugFromPath } from '$lib/helpers.ts';

export const load: LayoutServerLoad = async () => {
	// articles
	let articles: Array<Article> = [];
	const articlePaths = import.meta.glob('$lib/articles/*.md', { eager: true });
	for (const path in articlePaths) {
		const file = articlePaths[path];
		const slug = getSlugFromPath(path);
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Article, 'slug'>;
			const article = { ...metadata, slug } satisfies Article;
			article.published && articles.push(article);
		}
	}
	articles = articles.sort(
		(first, second) =>
			new Date(second.datePublished).getTime() - new Date(first.datePublished).getTime()
	);

	// images
	let images: Record<string, string> = {};
	const imageModules = import.meta.glob('$lib/images/*', { eager: true });
	for (const [path, module] of Object.entries(imageModules)) {
		const filename = path.split('/').pop() as string;
		images[filename] = (module as { default: string }).default;
	}

	// metadata
	const metadata = {
		title: 'Welcome',
		description: 'Welcome to my personal website'
	};

	return { articles, images, metadata };
};
