declare module 'mdsvex';

type SchemaGraphObjects = Array<Record<string, any>>;

type Images = Record<string, string>;

type FigureProps = {
	src: string;
	alt?: string;
	caption?: string;
	width?: string;
	height?: string;
};

type ArticleTypes = 'review' | 'article' | 'list' | 'work';

type SEOData = {
	dateModified: string;
	datePublished: string;
	description: string;
	title: string;
};

type ArticleMetadata = SEOData & {
	published: boolean;
	slug: string;
	type: ArticleTypes;
	image?: string;
};

/** {@link https://github.com/pngwn/MDsveX/blob/main/packages/mdsvex/globals.d.ts} */
type Article = {
	default: import('svelte/internal').SvelteComponent;
	metadata: ArticleMetadata;
};

type ArticlesList = Array<ArticleMetadata>;
