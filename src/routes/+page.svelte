<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.articles as article}
	<h2><a href="/{article.slug}">{article.title}</a> <span>{article.type}</span></h2>
{/each}

<style>
	h2 span {
		margin-left: 0.25rem;
		/* display: inline-flex;
		flex: 0 1 auto; */
		/* vertical-align: middle;
		margin: -3px 0.5rem 0 0; */
		/* border-radius: 0.15rem; */
		/* background: var(--color-cool-400); */
		/* padding: 0.25rem 0.3rem 0.25rem 0.5rem; */
		/* color: white; */
		color: var(--color-cool-600);
		font-weight: 500;
		font-size: 0.75rem;
		font-family: var(--font-sans);
		letter-spacing: 1px;
		text-transform: uppercase;
	}
</style>
