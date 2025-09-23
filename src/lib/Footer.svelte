<footer>
	<p>
		Fonts by <a href="https://www.futurefonts.xyz/very-cool-studio/gosh">Very Cool Studio</a>,
		<a href="https://connary.com/manifold.html">Connary Fagen</a>, and
		<a href="https://djr.com/gimlet">David Jonathan Ross</a>
	</p>
	<p>
		<a href="https://cloudflare.com"
			><img
				src="https://workers.cloudflare.com/built-with-cloudflare.svg"
				alt="Built with Cloudflare"
			/></a
		>
	</p>
</footer>

<style>
	footer {
		display: grid;
		grid-template-columns: subgrid;
		grid-row: footer;
		grid-column: fullwidth;
		gap: var(--padding) 0;
		background-color: var(--color-cool-600);
		padding: var(--gap) 0;
		font-family: var(--font-sans);
	}
	p {
		grid-column: 2;
		margin: 0;
		color: var(--color-cool-100);
		font-weight: medium;
		line-height: 1.2;
		font-family: var(--font-sans);
		text-align: center;
	}
	a {
		color: var(--color-cool-50);
		font-weight: bold;
		text-decoration: none;
	}
	a:hover,
	a:focus-within {
		color: var(--color-cool-50);
		text-decoration: underline;
	}
</style>
