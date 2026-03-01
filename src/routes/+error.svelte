<script lang="ts">
	import { page } from '$app/state';

	let { error } = $props();
</script>

<article>
	<h2 class="title">Whoops! {page.status}</h2>
	<p>{error instanceof Error ? error?.message : String(error)}</p>
</article>
