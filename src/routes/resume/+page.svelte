<script lang="ts">
	import { getDateString } from '$lib/helpers';
	import SEOWebPage from '$lib/SEOWebPage.svelte';
	import Content from './content.md';

	const metadata: PageMetadata = {
		title: 'Resume',
		description: 'Resume for Colin Howells',
		dateModified: getDateString('2026-03-28', 'iso8601'),
	};
</script>

<SEOWebPage {metadata} />

<article>
	<h1 class="sr-only">Resume</h1>
	<Content />
</article>
