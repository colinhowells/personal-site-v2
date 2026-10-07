<script lang="ts">
	import '../app.css';
	import Footer from '#lib/Footer.svelte';
	import Header from '#lib/Header.svelte';
	import SEO from '#lib/SEO.svelte';
	import { onNavigate } from '$app/navigation';
	import type { LayoutProps } from './$types';
	import ErrorPage from './+error.svelte';

	let { children }: LayoutProps = $props();

	onNavigate((navigation) => {
		if (navigation.shallow && navigation.type === 'goto') return;
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition?.(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<SEO />

<Header />
<main>
	<svelte:boundary>
		{@render children?.()}
		{#snippet failed(error)}
			<ErrorPage error={error as App.Error} />
		{/snippet}
	</svelte:boundary>
</main>
<Footer />
