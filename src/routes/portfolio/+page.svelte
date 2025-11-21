<script lang="ts">
	import { getArticlesList } from '$lib/api/articles.remote';
	import { getSlug } from '$lib/helpers';
	import SEO from '$lib/SEO.svelte';

	const articlesList = await getArticlesList();
	const workArticles = articlesList.filter((metadata) => 'work' === metadata.type);
</script>

<SEO title="Portfolio" description="Website work by Colin Howells" />

<nav aria-label="Work Projects">
	{#each workArticles as article}
		<a href="/{article.slug}">
			<div>
				<h3 style:--transition-name="title-{article.slug}">{article.title}</h3>
				<p>{article.description}</p>
			</div>
			{#if article.imgSrc}
				<img
					data-src={article.imgSrc}
					alt={article.description}
					src={article.imgSrc}
					loading="lazy"
					style:--transition-name="hero-{getSlug(article.imgSrc)}"
				/>
			{/if}
		</a>
	{/each}
</nav>

<style>
	nav {
		display: grid;
		grid-template-columns: repeat(
			auto-fit,
			/* fluid columns, but max out at n */ minmax(min(100%, max(12rem, 100%/4)), 1fr)
		);
		grid-column: fullwidth;
		line-height: 1.2;
		font-family: var(--font-sans);
	}
	a {
		display: flex;
		flex-flow: column wrap;
		justify-content: space-between;
		gap: var(--padding);
		transition: background-color var(--transition-time);
		padding: clamp(1.5rem, 3dvw, 3rem);
		font-weight: normal;
		& * {
			margin: 0;
		}
		&:hover,
		&:focus,
		&:active {
			background-color: white;
			text-decoration: none;
			img {
				opacity: 1;
			}
		}
	}
	div {
		display: flex;
		flex-direction: column;
		gap: var(--padding);
		& > * {
			margin: 0;
		}
	}
	h3 {
		view-transition-name: var(--transition-name);
		font-weight: 900;
		font-size: 1.25rem;
	}
	img {
		opacity: 0.8;
		view-transition-name: var(--transition-name);
		transition: opacity var(--transition-time);
		border: 1px solid var(--color-cool-200);
		background: white;
		aspect-ratio: 16 / 9;
		width: 100%;
		height: auto;
		object-fit: cover;
	}
	p {
		color: initial;
	}
</style>
