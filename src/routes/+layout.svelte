<script lang="ts">
	import type { LayoutProps } from './$types';
	import { onNavigate } from '$app/navigation';
	// import { dev } from '$app/environment';
	import { page } from '$app/state';
	import SEO from '$lib/SEO.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import '$css';

	let { children }: LayoutProps = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition?.(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// $: if (dev) console.log(page);
</script>

<svelte:head>
	{#if 404 === page?.status}<title>Not Found | Colin Howells</title>{/if}
</svelte:head>

{#if !page?.error}
	<SEO data={page.data} />
{/if}

<Header />
<main role="main">
	{@render children?.()}
</main>
<Footer />
