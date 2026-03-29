<script lang="ts">
	import { getArticle } from '$lib/api/articles.remote';
	import SEOWebPage from '$lib/SEOWebPage.svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	const { content, metadata } = $derived(await getArticle(params.slug));
</script>

<SEOWebPage {metadata} />

<article>
	<h1 class="title" style:--transition-name="title-{metadata.slug}">
		{metadata.title}
	</h1>
	{@html content}
</article>
