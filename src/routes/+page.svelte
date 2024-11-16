<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#each data.articles as article}
	<h2><a href="/{article.slug}">{article.title}</a> <span>{article.type}</span></h2>
{/each}

<style>
	h2 span {
		margin-left: 0.25rem;
		color: var(--color-cool-600);
		font-weight: 500;
		font-size: 0.75rem;
		font-family: var(--font-sans);
		letter-spacing: 1px;
		text-transform: uppercase;
	}
</style>
