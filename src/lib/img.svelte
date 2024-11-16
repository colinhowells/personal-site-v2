<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		title: string;
	}

	let { src, alt, title }: Props = $props();
</script>

<figure>
	<img {src} loading="lazy" {alt} {title} />
	{#if title}
		<figcaption>{title}</figcaption>
	{/if}
</figure>
