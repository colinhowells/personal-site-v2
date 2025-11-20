<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import { sendContact } from '$lib/api/form.remote';

	const { name, email, message } = sendContact.fields;
</script>

<SEO title="Contact" description="Contact form for Colin Howells" />

<form {...sendContact} aria-label="Contact form">
	<label for="name">
		Name
		<input {...name.as('text')} required autocomplete="name" />
	</label>

	<label for="email">
		Email
		<input {...email.as('email')} required autocomplete="email" />
	</label>

	<label for="message">
		Your message
		<textarea {...message.as('text')} rows="5" required></textarea>
	</label>

	{#if sendContact.result?.success}
		<p>Thanks for your message!</p>
	{:else if sendContact.result?.error}
		<p>There's an issue with our form but we'll fix it!</p>
	{:else}
		<button disabled={Boolean(sendContact.pending)}
			>{sendContact.pending ? 'Sending…' : 'Submit'}</button
		>
	{/if}

	{#each sendContact.fields.allIssues() as issue}
		<p>{issue.message}</p>
	{/each}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--padding);
		padding: var(--gap) 0;
	}
	label {
		display: flex;
		flex-flow: column nowrap;
		gap: calc(var(--padding) / 4);
		color: var(--color-links);
		font-family: var(--font-sans);
		&:focus-within {
			color: var(--color-links-hover);
			font-weight: bold;
		}
	}
	input,
	textarea {
		margin: 0;
		border: 1px solid var(--color-links);
		border-radius: var(--border-radius);
		background: white;
		padding: var(--padding);
		font-size: larger;
		font-family: var(--font-serif);
		&:focus {
			outline: 2px solid var(--color-links-hover);
		}
	}
	p {
		margin: auto;
		padding: var(--padding) calc(var(--padding) * 2);
		font-family: var(--font-sans);
	}
</style>
