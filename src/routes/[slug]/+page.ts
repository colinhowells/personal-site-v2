import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	let article = null;
	const errorMessage = `Sorry, that isn’t here – /${params.slug} may have been deleted or moved.`;

	try {
		article = await import(`$lib/articles/${params?.slug}.md`);
	} catch (e) {
		error(404, errorMessage);
	}

	if (article && article?.metadata?.published) {
		article.metadata.slug = params.slug;
		return {
			content: article.default,
			metadata: article.metadata
		};
	}

	error(404, errorMessage);
};
