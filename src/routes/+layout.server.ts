import { getArticlesMetadata, getImages } from '$lib/helpers.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// articles
	const articles: Array<ArticleMetadata> = getArticlesMetadata();

	// images
	const images: Record<string, string> = getImages();

	// metadata
	const metadata = {
		title: 'Welcome',
		description: 'Welcome to my personal website'
	};

	return { articles, images, metadata };
};
