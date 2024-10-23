import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	let article = null;
	try {
		article = await import(`../../../src/articles/${params?.slug}.md`);
	} catch (e) {
		error(404, `${params.slug} not found`);
	}

	if (article && article?.metadata?.published) {
		return {
			content: article.default,
			metadata: article.metadata
		};
	}

	error(404, `${params.slug} not found`);
};
