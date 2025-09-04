import { getArticlesList, getImages, getISODate } from '$lib/helpers.ts';
import type { LayoutServerLoad } from './$types';

const defaultDate = getISODate('2024-09-05');

export const load: LayoutServerLoad = async () => {
	const articlesList = getArticlesList();
	const images = getImages();
	const seoData: SEOData = {
		title: 'Welcome',
		description:
			'Personal website of Colin Howells, a web developer and designer living in Seattle',
		datePublished: defaultDate,
		dateModified: defaultDate
	};

	return { articlesList, images, seoData };
};
