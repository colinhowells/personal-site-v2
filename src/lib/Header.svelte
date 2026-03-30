<script>
	import { updated } from '$app/state';

	import bluesky from '$lib/images/icon-bluesky.svg?raw';
	import email from '$lib/images/icon-email.svg?raw';
	import github from '$lib/images/icon-github.svg?raw';
	import linkedin from '$lib/images/icon-linkedin.svg?raw';
	import mastodon from '$lib/images/icon-mastodon.svg?raw';
	import rss from '$lib/images/icon-rss.svg?raw';
	import logo from '$lib/images/logo.svg?raw';

	import Nav from '$lib/Nav.svelte';
</script>

<header data-sveltekit-reload={updated.current ? '' : 'off'}>
	<a id="logo" href="/" aria-label="Colin Howells">
		{@html logo}
	</a>
	<div id="tagline-icons">
		<p id="tagline">Web developer living in Seattle</p>
		<nav id="icons">
			<a
				rel="me"
				href="https://github.com/colinhowells"
				title="Colin on GitHub"
				aria-label="Colin on GitHub">{@html github}</a
			>
			<a
				rel="me"
				href="https://www.linkedin.com/in/colinhowells"
				title="Colin on LinkedIn"
				aria-label="Colin on LinkedIn">{@html linkedin}</a
			>
			<a
				rel="me"
				href="https://toot.cafe/@colin_howells"
				title="Colin on Mastodon"
				aria-label="Colin on Mastodon">{@html mastodon}</a
			>
			<a
				rel="me"
				href="https://bsky.app/profile/colinhowells.com"
				title="Colin on Bluesky"
				aria-label="Colin on Bluesky">{@html bluesky}</a
			>
			<a rel="external" href="/rss.xml" title="RSS feed" aria-label="RSS feed">{@html rss}</a>
			<a href="mailto:colin+contact@colinhowells.com" title="Email Colin" aria-label="Email Colin"
				>{@html email}</a
			>
		</nav>
	</div>
	<Nav />
</header>

<style>
	header {
		display: grid;
		grid-template-columns: subgrid;
		grid-row: header;
		grid-column: fullwidth;
		padding: var(--gap) 0 0 0;
	}
	#logo :global {
		grid-column: 2;
		margin: 0 0 1vmin 0;
		color: var(--color-cool-50);
		svg {
			display: block;
			transition: color var(--transition-time);
			width: 100%;
			height: auto;
		}
		&:hover,
		&:focus-within {
			color: var(--color-links-hover);
		}
	}
	#tagline-icons {
		display: flex;
		grid-column: 2;
		flex-flow: column wrap;
		align-items: center;
		margin: 0 0 var(--gap) 0;
		font-size: 1.25rem;
		font-family: var(--font-sans);
	}
	#tagline {
		margin: 0;
		color: white;
		text-align: center;
	}
	#icons {
		display: flex;
		flex: 1;
		justify-content: space-around;
		width: 100%;
		a :global {
			outline: none;
			border-radius: 2px;
			color: var(--color-cool-50);
			&:focus-visible {
				outline: 2px solid var(--color-cool-50);
				outline-offset: 3px;
			}
			svg {
				display: inline-block;
				transition: color var(--transition-time);
				margin-top: 0.2lh;
				width: auto;
				height: 0.6lh;
			}
			&:hover,
			&:focus-within {
				color: var(--color-links-hover);
			}
		}
	}

	@media (width > 768px) {
		#tagline-icons {
			flex-flow: row nowrap;
		}
		#icons {
			justify-content: flex-end;
			width: auto;
			a {
				padding: 0 0 0 1rem;
			}
		}
	}
</style>
