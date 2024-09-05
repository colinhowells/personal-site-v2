<article>
	<slot />
</article>

<style>
	article {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: fullwidth;
		padding: var(--gap) 0;
		hanging-punctuation: first;
		font-family: var(--font-body);
		text-wrap: pretty;
		align-content: flex-start;
		text-align: left;
		& > * {
			grid-column: content;
			margin: 0;
			width: 100%;
		}
		& > * + * {
			margin: calc(var(--padding) * 2) auto 0 auto;
		}
		& h2 {
			color: var(--color-cool-700);
			line-height: 1.2;
			font-family: var(--font-hed);
		}
		& p,
		address {
			color: #222;
			line-height: 1.5;
		}
		& ul {
			padding-left: var(--padding);
		}
		& li {
			margin-bottom: var(--padding);
			line-height: 1.5;
			&::marker {
				color: var(--color-links);
			}
		}
		& p code {
			border-radius: var(--border-radius);
			padding: calc(var(--padding) / 6) calc(var(--padding) / 3);
			word-wrap: break-word;
			color: var(--color-cool-700);
		}
		& > code,
		& > pre[class*='language-'] {
			grid-column: fullwidth;
			box-sizing: border-box;
			margin: calc(var(--padding) * 2) auto 0 auto;
			max-width: fit-content;
			font-size: smaller;
		}
		& img {
			width: var(--size);
			max-width: 100%;
			height: auto;
		}
		& figure {
			margin: 0;
		}
		& figcaption {
			color: var(--color-cool-500);
			font-weight: bold;
			font-size: small;
			font-family: var(--font-sans);
			letter-spacing: 1px;
			text-align: right;
			text-transform: uppercase;
		}
	}
</style>
