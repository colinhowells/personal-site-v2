declare module 'mdsvex';
declare module 'svelte-infinite-scroll';
declare module 'tsl-mastodon-api';

interface MdsvexFile {
	default: import('svelte/internal').SvelteComponent;
	metadata: Record<string, string>;
}

type MdsvexResolver = () => Promise<MdsvexFile>;

type Article = {
	dateModified: string;
	datePublished: string;
	description: string;
	published: boolean;
	slug: string;
	title: string;
	type: 'review' | 'article' | 'list' | 'work';
	image?: string;
};
