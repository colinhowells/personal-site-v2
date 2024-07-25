<script lang="ts">
	import type { PageData } from './$types';
	import CustomElements from '$lib/CustomElements.svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';

	export let data: PageData;
</script>

<h2>{data.metadata.title}</h2>

<CustomElements>
	<svelte:component this={data.content} />
</CustomElements>
