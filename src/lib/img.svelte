<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
</script>

<figure>
	<img {src} loading="lazy" {alt} {title} />
	{#if title}
		<figcaption>{title}</figcaption>
	{/if}
</figure>
