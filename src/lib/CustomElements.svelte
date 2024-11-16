<script lang="ts" module>
	import img from '$lib/img.svelte';
	export { img };
</script>

<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
