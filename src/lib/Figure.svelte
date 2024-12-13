<script lang="ts">
	interface Props {
		src: string;
		alt?: string;
		caption?: string;
		width?: string;
		height?: string;
	}

	let { src, alt = '', caption, width, height }: Props = $props();
</script>

<figure>
	<img {src} {alt} title={caption} {width} {height} loading="lazy" />
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>
