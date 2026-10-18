<script lang="ts">
	import { getSlug } from '#lib/helpers.js';

	let { src, alt = '', caption, width, height, size }: FigureProps = $props();
</script>

<figure class={size}>
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
