<script lang="ts">
	import { getImageSlug } from '$lib/helpers';

	interface Props {
		src: string;
		alt?: string;
		caption?: string;
		width?: string;
		height?: string;
	}

	let { src, alt = '', caption, width, height }: Props = $props();
</script>

<figure role="figure" aria-label={caption}>
	<img
		{src}
		{alt}
		title={caption}
		{width}
		{height}
		loading="lazy"
		style:--transition-name="hero-{getImageSlug(src)}"
	/>
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>
