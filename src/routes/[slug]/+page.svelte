<script lang="ts">
	import type { PageData } from './$types';
	import 'prism-themes/themes/prism-material-oceanic.css';

	export let data: PageData;
</script>

<h2>{data.metadata.title}</h2>

<svelte:component this={data.content} />
