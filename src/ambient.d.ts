declare module 'mdsvex';
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
	src: string;
	width?: string;
};

type Images = Record<string, string>;

type PageMetadata = {
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
