import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }): Promise<Omit<App.PageData, 'articlesList'>> => {
	const article = await import(`$lib/articles/${params?.slug}.md`);

	if (article && article?.metadata?.published) {
		article.metadata.slug = params.slug;

		return { article };
	}

	error(404, `Sorry, that isn't here; /${params.slug} may have been deleted or moved.`);
};
