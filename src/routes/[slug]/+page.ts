import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const article = await import(`../../../src/articles/${params.slug}.md`);
	if (!article || !article.metadata.published) error(404, `${params.slug} not found`);
	return {
		content: article.default,
		metadata: article.metadata
	};
};
