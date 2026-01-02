<script lang="ts">
	import { getSlug } from '$lib/helpers';

	let { src, alt = '', caption, width, height }: FigureProps = $props();
</script>

<figure aria-label={caption}>
	<img
		{src}
		{alt}
		title={caption}
		{width}
		{height}
		loading="lazy"
		style:--transition-name="hero-{getSlug(src)}"
	/>
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>
