<script lang="ts">
	import 'prism-themes/themes/prism-material-oceanic.css';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<article>
	<h2 class="title" style:--transition-name="title-{data.metadata.slug}">
		{data.metadata.title}
	</h2>
	<data.default />
</article>
