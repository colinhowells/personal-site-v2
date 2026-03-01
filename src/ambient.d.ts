declare module 'mdsvex';

type Article = {
	content: string;
	metadata: PageSEOData;
};

type ArticlesList = Array<PageSEOData>;

type ArticleTypes = 'review' | 'article' | 'list' | 'work';

type FigureProps = {
	alt?: string;
	caption?: string;
	height?: string;
	src: string;
	width?: string;
};

type Images = Record<string, string>;

type PageSEOData = {
	dateModified?: string;
	datePublished?: string;
	description: string;
	image?: string;
	imgSrc?: string;
	published?: boolean;
	slug?: string;
	title: string;
	type?: ArticleTypes;
};

type SchemaGraphObjects = Array<Record<string, any>>;
