import type { PageLoad } from './$types';

export const load: PageLoad = async (): Promise<{
	seoData: Omit<SEOData, 'datePublished' | 'dateModified'>;
}> => {
	return {
		seoData: {
			title: 'Portfolio',
			description: 'Website work by Colin Howells'
		}
	};
};
