<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import {
		capitalize,
		getDateString,
		getHash,
		getSchemaNodeId,
		serializeSchema,
	} from '$lib/helpers';

	const isArticle = '/[slug]' === page.route.id;
	const isIndex = '/' === page.route.id;
	const personNodeId = getSchemaNodeId('Person');
	const siteNodeId = getSchemaNodeId('WebSite');
	/** The page url, sourced from the page store */
	const webPageNodeId = page.url.toString();
	const defaultDatePublished = getDateString('2024-09-05', 'iso');
	const defaultDateModified = getDateString('2026-02-07', 'iso');

	let { metadata }: { metadata: PageMetadata } = $props();
	let schemaGraphObjects = $derived.by(generateSchema);

	function generateSchema() {
		let schemaGraphObjects: SchemaGraphObjects = [];
		let {
			title,
			description,
			slug,
			datePublished = defaultDatePublished,
			dateModified = defaultDateModified,
			type,
		} = metadata;

		// page --------------------------------------------------------------------------------------

		const WebPage = {
			'@type': 'WebPage',
			'@id': webPageNodeId,
			isPartOf: { '@id': siteNodeId },
			url: webPageNodeId,
			name: title,
			description,
			datePublished,
			dateModified,
			potentialAction: [
				{
					'@type': 'ReadAction',
					target: [webPageNodeId],
				},
			],
		};
		schemaGraphObjects.push(WebPage);

		// article --------------------------------------------------------------------------------------

		if (isArticle && slug && type) {
			const Article = {
				'@type': 'Article',
				'@id': getSchemaNodeId('Article', getHash(slug)),
				isPartOf: { '@id': webPageNodeId },
				mainEntityOfPage: { '@id': webPageNodeId },
				url: page.url.toString(),
				headline: title,
				description,
				articleSection: [`${capitalize(type)}`],
				inLanguage: 'en-US',
				datePublished,
				dateModified,
				author: { '@id': personNodeId },
			};
			schemaGraphObjects.push(Article);
		}

		return schemaGraphObjects;
	}
</script>

<svelte:head>
	<title>{metadata.title} | Colin Howells</title>
	<meta name="description" content={metadata.description} />
	<link rel="canonical" href={webPageNodeId} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:type" content={isIndex ? 'website' : 'article'} />
	<meta property="og:url" content={webPageNodeId} />
	{#if isArticle}
		<meta property="article:author" content={PUBLIC_SITE_URL} />
		<meta
			property="article:published_time"
			content={metadata.datePublished ?? defaultDatePublished}
		/>
		<meta property="article:modified_time" content={metadata.dateModified ?? defaultDateModified} />
	{/if}
	{@html serializeSchema(schemaGraphObjects)}
</svelte:head>
