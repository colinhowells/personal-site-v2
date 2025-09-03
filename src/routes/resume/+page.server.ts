import { getISODate } from '$lib/helpers';
import type { PageLoad } from './$types';

const dateModified = getISODate('2025-08-19');

export const load: PageLoad = async (): Promise<{
	seoData: Omit<SEOData, 'datePublished'>;
}> => {
	return {
		seoData: {
			title: 'Resume',
			description: 'Resume for Colin Howells',
			dateModified
		}
	};
};
