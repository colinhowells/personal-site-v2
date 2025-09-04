<script lang="ts">
	import 'prism-themes/themes/prism-material-oceanic.css';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { article } = data;
</script>

<article>
	<h2 class="title" style:--transition-name="title-{article.metadata.slug}">
		{article.metadata.title}
	</h2>
	<article.default />
</article>
