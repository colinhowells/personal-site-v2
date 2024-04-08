<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.articles as article}
	<h2><a href="/{article.slug}">{article.title}</a></h2>
{/each}
