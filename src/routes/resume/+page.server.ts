import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		metadata: {
			title: 'Resume',
			description: 'Resume for Colin Howells'
		}
	};
};
