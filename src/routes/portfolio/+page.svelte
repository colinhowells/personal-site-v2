<script lang="ts">
	import { getArticlesList } from '$lib/api/articles.remote';
	import { getSlug } from '$lib/helpers';
	import SEOWebPage from '$lib/SEOWebPage.svelte';

	const articlesList = await getArticlesList();
	const workArticles = articlesList.filter((metadata) => 'work' === metadata.type);

	const metadata: PageMetadata = {
		title: 'Portfolio',
		description: 'Website work by Colin Howells',
	};
</script>

<SEOWebPage {metadata} />

<h1 class="sr-only">Portfolio</h1>
<nav aria-label="Work projects">
	{#each workArticles as article}
		<a href="/{article.slug}">
			<div class="text-container">
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
		padding-top: 0;
		line-height: 1.2;
		font-family: var(--font-sans);
	}
	a {
		display: flex;
		flex-flow: column wrap;
		justify-content: space-between;
		gap: calc(var(--padding) * 2.5);
		transition: background-color var(--transition-time);
		padding: clamp(1rem, 2dvw, 1.5rem);
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
	.text-container {
		display: flex;
		flex-direction: column;
		gap: var(--padding);
	}
	h3 {
		view-transition-name: var(--transition-name);
		margin: 0;
		font-weight: 900;
		font-size: 1.25rem;
		line-height: 1.1;
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
		margin: 0;
		color: initial;
	}
</style>
