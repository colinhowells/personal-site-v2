<script lang="ts">
	import { getArticle } from '$lib/api/articles.remote';
	import SEO from '$lib/SEO.svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	// derived, because the props rune is involved
	const article = $derived(await getArticle(params.slug));
</script>

<SEO
	title={article?.metadata.title}
	description={article?.metadata.description}
	datePublished={article?.metadata.datePublished}
	dateModified={article?.metadata.dateModified}
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
