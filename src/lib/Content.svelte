<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<article>
	{@render children?.()}
</article>

<!-- styles are global (app.css), as anything nested gets stripped -->
