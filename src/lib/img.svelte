<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
</script>

<img {src} loading="lazy" {alt} {title} />
