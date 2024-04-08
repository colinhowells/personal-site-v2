<script lang="ts">
	import { onNavigate } from '$app/navigation';
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
</script>

<Header />
<main>
	<Content>
		<slot />
	</Content>
</main>
<Footer />
