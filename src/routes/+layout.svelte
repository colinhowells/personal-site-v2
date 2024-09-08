<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import SEO from '$lib/SEO.svelte';
	import Header from '$lib/Header.svelte';
	import Content from '$lib/Content.svelte';
	import Footer from '$lib/Footer.svelte';
	import '$css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	$: if (dev) console.log($page);
</script>

<SEO data={$page.data} />

<Header />
<main>
	<Content>
		<slot />
	</Content>
</main>
<Footer />
