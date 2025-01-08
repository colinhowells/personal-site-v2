<script lang="ts">
	import type { PageData } from './$types';
	import 'prism-themes/themes/prism-material-oceanic.css';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<article>
	<h2 class="title" style:--title="title-{data.metadata.slug}">{data.metadata.title}</h2>
	<data.content />
</article>
