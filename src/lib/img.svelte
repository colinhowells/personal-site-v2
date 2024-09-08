<script lang="ts">
	import { dev } from '$app/environment';

	export let src: string;
	export let alt: string;
	export let title: string;

	/** @see https://vercel.com/docs/frameworks/sveltekit#image-optimization */
	function optimize(src: string, widths = [330, 430, 600], quality = 90) {
		if (dev) return src;

		return widths
			.slice()
			.sort((a, b) => a - b)
			.map((width, i) => {
				const url = `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
				const descriptor = i < widths.length - 1 ? ` ${width}w` : '';
				return url + descriptor;
			})
			.join(', ');
	}
</script>

<figure>
	<img srcset={optimize(src)} loading="lazy" {alt} {title} />
	{#if title}
		<figcaption>{title}</figcaption>
	{/if}
</figure>
