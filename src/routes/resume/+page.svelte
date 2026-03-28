<script lang="ts">
	import SEOWebPage from '$lib/SEOWebPage.svelte';
	import Content from './content.md';
	import { getDateString } from '$lib/helpers';

	const metadata: PageMetadata = {
		title: 'Resume',
		description: 'Resume for Colin Howells',
		dateModified: getDateString('2026-03-28', 'iso8601'),
	};
</script>

<SEOWebPage {metadata} />

<article>
	<Content />
</article>
