<script lang="ts">
	let { error } = $props();
</script>

<article>
	<h2 class="title">Whoops! {error.status}</h2>
	<p>{error.message}</p>
</article>
