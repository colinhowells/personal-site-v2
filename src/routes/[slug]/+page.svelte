<script lang="ts">
	import type { PageProps } from './$types';
	import 'prism-themes/themes/prism-material-oceanic.css';

	let { data }: PageProps = $props();
</script>

<article>
	<h2 class="title" style:--transition-name="title-{data.metadata.slug}">{data.metadata.title}</h2>
	<data.content />
</article>
