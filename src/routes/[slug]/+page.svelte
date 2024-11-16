<script lang="ts">
	import type { PageData } from './$types';
	import CustomElements from '$lib/CustomElements.svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h2>{data.metadata.title}</h2>

<CustomElements>
	<data.content />
</CustomElements>
