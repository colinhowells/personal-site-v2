<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '$css';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
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

<Header />
<main>
	<svelte:boundary>
		{@render children?.()}
		{#snippet failed(error)}
			<article>
				<h2 class="title">Whoops</h2>
				<p>{(error?.message && error.message) || 'Something went wrong'}</p>
			</article>
		{/snippet}
	</svelte:boundary>
</main>
<Footer />
