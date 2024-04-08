<script>
	import { page } from '$app/stores';
</script>

<nav>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">Writing</a>
		</li>
		<li aria-current={$page.url.pathname === '/resume' ? 'page' : undefined}>
			<a href="/resume">Resume</a>
		</li>
		<li aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}>
			<a href="/contact">Contact</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / 4;
	}
	ul {
		display: flex;
		grid-column: 2;
		flex-flow: row wrap;
		justify-content: space-between;
		gap: var(--padding);
		margin: 0;
		padding: 0;
		width: 100%;
		list-style: none;
		text-align: center;
	}
	li {
		flex: 1;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		background-color: var(--color-links);
		color: var(--color-warm-100);
		font-weight: 800;
		font-size: clamp(0.75rem, 1.5vmin, 1rem);
		font-family: var(--font-sans);
		letter-spacing: 0.2vmin;
		text-transform: uppercase;
	}
	li[aria-current='page'] {
		background-color: var(--color-cool-50);
		color: black;
	}
	li:not([aria-current]):hover {
		background-color: var(--color-links-hover);
	}
	li a {
		display: block;
		padding: var(--padding) calc(var(--padding) / 2);
		color: inherit;
		text-decoration: none;
	}
</style>
