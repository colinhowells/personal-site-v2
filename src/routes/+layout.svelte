<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import '$css';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import SEO from '$lib/SEO.svelte';
	import type { LayoutProps } from './$types';

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
</script>

<svelte:head>
	{#if 404 === page?.status}<title>Not Found | Colin Howells</title>{/if}
</svelte:head>

{#if !page?.error}
	<SEO />
{/if}

<svelte:boundary>
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</svelte:boundary>
