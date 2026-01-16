<script lang="ts">
	import { getArticle } from '$lib/api/articles.remote';
	import SEOWebPage from '$lib/SEOWebPage.svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	// derived, because the props rune is involved
	const article = $derived(await getArticle(params.slug));
</script>

<SEOWebPage
	title={article?.metadata.title}
	description={article?.metadata.description}
	datePublished={article?.metadata.datePublished}
	dateModified={article?.metadata.dateModified}
	articleSection={article?.metadata.type}
/>

<article>
	{#if article}
		<h2 class="title" style:--transition-name="title-{article.metadata.slug}">
			{article.metadata.title}
		</h2>
		{@html article.content}
		<!-- <article.default /> -->
	{/if}
</article>
