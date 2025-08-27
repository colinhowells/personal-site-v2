declare module 'mdsvex';

interface MdsvexFile {
	default: import('svelte/internal').SvelteComponent;
	metadata: Record<string, string>;
}

type MdsvexResolver = () => Promise<MdsvexFile>;

type ArticleMetadata = {
	dateModified: string;
	datePublished: string;
	description: string;
	published: boolean;
	slug: string;
	title: string;
	type: 'review' | 'article' | 'list' | 'work';
	image?: string;
};
