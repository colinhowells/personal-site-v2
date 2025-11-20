<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { article } = data;

	console.log(article);
</script>

<SEO
	title={article?.metadata.title}
	description={article?.metadata.description}
	datePublished={article?.metadata.datePublished}
	dateModified={article?.metadata.dateModified}
/>

<article>
	<h2 class="title" style:--transition-name="title-{article?.metadata.slug}">
		{article?.metadata.title}
	</h2>
	<article.default />
</article>
