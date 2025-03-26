import type { LayoutServerLoad } from './$types';
import { getArticles, getImages } from '$lib/helpers.ts';

export const load: LayoutServerLoad = async () => {
	// articles
	const articles: Array<Article> = getArticles();

	// images
	const images: Record<string, string> = getImages();

	// metadata
	const metadata = {
		title: 'Welcome',
		description: 'Welcome to my personal website'
	};

	return { articles, images, metadata };
};
