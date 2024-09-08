import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		metadata: {
			title: 'Resume',
			date: '2024-09-05',
			description: 'Resume for Colin Howells'
		}
	};
};
