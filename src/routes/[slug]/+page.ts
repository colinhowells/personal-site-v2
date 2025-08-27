import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }): Promise<MdsvexFile> => {
	let markdown = null;
	const errorMessage = `Sorry, that isn’t here – /${params.slug} may have been deleted or moved.`;

	try {
		markdown = await import(`$lib/articles/${params?.slug}.md`);
	} catch (e) {
		error(404, errorMessage);
	}

	if (!markdown || !markdown?.metadata?.published) {
		error(404, errorMessage);
	}

	markdown.metadata.slug = params.slug;

	return { ...markdown };
};
