<script lang="ts">
	import { page } from '$app/state';
	import { isError } from '$lib/helpers';

	let { error } = $props();
</script>

<article>
	<h2 class="title">Whoops! {page.status}</h2>
	<p>{isError(error) ? error.message : String(error)}</p>
</article>
