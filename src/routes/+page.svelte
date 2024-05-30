<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.articles as article}
	<h2><span>{article.type}</span> <a href="/{article.slug}">{article.title}</a></h2>
{/each}

<style>
	h2 span {
		display: inline-flex;
		flex: 0 1 auto;
		vertical-align: middle;
		margin: -3px 0.5rem 0 0;
		border-radius: 0.15rem;
		background: var(--color-cool-400);
		padding: 0.25rem 0.3rem 0.25rem 0.5rem;
		color: white;
		font-weight: 800;
		font-size: 0.5rem;
		font-family: var(--font-sans);
		letter-spacing: 2px;
		text-transform: uppercase;
	}
</style>
