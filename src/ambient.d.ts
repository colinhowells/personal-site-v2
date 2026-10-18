declare module '*.md' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

type Article = {
	content: string;
	metadata: PageMetadata;
};

type ArticlesList = Array<PageMetadata>;

type ArticleTypes = 'review' | 'article' | 'list' | 'work';

type FigureProps = {
	alt?: string;
	caption?: string;
	height?: string;
	/** Both stay within the content column. `half`: on wide viewports, consecutive half figures sit in side-by-side pairs, each half the content width. `contained`: just kept to the content column. */
	size?: 'half' | 'contained';
	src: string;
	width?: string;
};

type Images = Record<string, string>;

type PageMetadata = {
	/** ISO 8601 datetime string (e.g. `2026-03-28T00:00:00.000Z`). Use `getDateString(date, 'iso8601')` to format. */
	dateModified?: string;
	/** ISO 8601 datetime string (e.g. `2026-03-28T00:00:00.000Z`). Use `getDateString(date, 'iso8601')` to format. */
	datePublished?: string;
	description: string;
	image?: string;
	imgSrc?: string;
	/** Manual sort for `work` pages on the portfolio: higher numbers appear first. Unset sorts last. */
	order?: number;
	published?: boolean;
	slug?: string;
	title: string;
	type?: ArticleTypes;
};

type SchemaGraphObjects = Array<Record<string, any>>;
