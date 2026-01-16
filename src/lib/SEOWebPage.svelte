<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { serializeSchema } from '$lib/helpers';

	let props = $props();

	const articleNodeId = `${page.url.toString()}/#article`;
	const isArticle = '/[slug]' === page.route.id;
	const personNodeId = `${PUBLIC_SITE_URL}/#person`;
	const siteNodeId = `${PUBLIC_SITE_URL}/#website`;
	const webPageNodeId = page.url.toString();

	let schemaGraphObjects: SchemaGraphObjects = [];

	const WebPage = {
		'@type': 'WebPage',
		'@id': webPageNodeId,
		isPartOf: { '@id': siteNodeId },
		url: page.url.toString(),
		name: props.title,
		datePublished: props.datePublished,
		dateModified: props.dateModified,
		author: { '@id': personNodeId },
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: [page.url.toString()]
			}
		]
	};
	schemaGraphObjects.push(WebPage);

	if (isArticle) {
		const Article = {
			'@type': 'Article',
			'@id': articleNodeId,
			isPartOf: { '@id': webPageNodeId },
			mainEntityOfPage: { '@id': webPageNodeId },
			url: page.url.toString(),
			headline: props.title,
			description: props.description,
			inLanguage: 'en-US',
			datePublished: props.datePublished,
			dateModified: props.dateModified,
			author: { '@id': personNodeId }
		};
		schemaGraphObjects.push(Article);
	}
</script>

<svelte:head>
	<title>{props.title} | Colin Howells</title>
	<meta name="description" content={props.description} />
	<link rel="canonical" href={page.url.toString()} />
	<meta property="og:title" content={props.title} />
	<meta property="og:description" content={props.description} />
	<meta property="og:type" content={isArticle ? 'article' : 'website'} />
	<meta property="og:url" content={page.url.toString()} />
	<meta property="og:updated_time" content={props.dateModified} />
	{#if isArticle}
		<meta property="article:author" content="https://www.facebook.com/cghowells" />
		<meta property="article:published_time" content={props.datePublished} />
		<meta property="article:modified_time" content={props.dateModified} />
	{/if}
	{@html serializeSchema(schemaGraphObjects)}
</svelte:head>
