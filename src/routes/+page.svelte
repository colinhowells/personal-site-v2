<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import type { PageProps } from './$types';

	// import { getArticlesList } from '$lib/api/articles.remote';
	// const articlesList = await getArticlesList();

	let { data }: PageProps = $props();
	const { articlesList } = data;
	const playArticles = articlesList.filter((metadata) => 'work' !== metadata.type);
</script>

<SEO />

<nav aria-label="Recent Writing">
	<ul>
		{#each playArticles as article}
			<li>
				<a class="title" style:--transition-name="title-{article.slug}" href="/{article.slug}"
					>{article.title}</a
				>
				<span>{article.type}</span>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		padding: var(--gap) 0;
	}
	ul {
		padding: 0;
		list-style: none;
	}
	li {
		margin: 0 0 var(--padding) 0;
		color: var(--color-cool-700);
		font-size: 1.5rem;
		line-height: 1.2;
		font-family: var(--font-hed);
		span {
			margin-left: 0.25rem;
			color: var(--color-cool-600);
			font-weight: 500;
			font-size: 0.75rem;
			font-family: var(--font-sans);
			letter-spacing: 1px;
			text-transform: uppercase;
		}
	}
</style>
