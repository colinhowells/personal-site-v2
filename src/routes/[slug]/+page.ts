import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params
}): Promise<Omit<App.PageData, 'articlesList' | 'images'>> => {
	const article = await import(`$lib/articles/${params?.slug}.md`);

	if (article && article?.metadata?.published) {
		article.metadata.slug = params.slug;
		const { datePublished, dateModified, title, description } = article.metadata;

		return {
			article,
			seoData: {
				datePublished,
				dateModified,
				title,
				description
			}
		};
	}

	error(404, `Sorry, that isn't here; /${params.slug} may have been deleted or moved.`);
};
