<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import { getArticlesList } from '$lib/api/articles.remote';

	const articlesList = await getArticlesList();
</script>

<SEO />

<nav aria-label="Recent Writing">
	<ul>
		{#each articlesList.filter((a) => 'work' !== a.type) as article}
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
