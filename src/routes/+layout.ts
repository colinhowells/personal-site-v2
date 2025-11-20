import { getArticlesList } from '$lib/helpers';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	const articlesList = getArticlesList();
	return { articlesList };
};
