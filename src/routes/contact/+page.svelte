<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData & { name: string; email: string; message: string };

	let { name, email, error, message } = form ?? {};
	$: ({ name, email, error, message } = form ?? {
		name: '',
		email: '',
		error: { field: '', message: '' },
		message: ''
	});
</script>

<form method="POST" use:enhance>
	<label for="name">
		Name
		<input
			value={name}
			type="text"
			name="name"
			id="name"
			required
			autocomplete="name"
			aria-invalid={error?.field === 'name'}
			aria-describedby={error?.field === 'name' ? 'name-error' : undefined}
		/>
	</label>
	{#if error?.field === 'name'}
		<small id="name-error" aria-live="polite">{error?.message}</small>
	{/if}

	<label for="email">
		Email
		<input
			value={email}
			type="email"
			name="email"
			id="email"
			required
			autocomplete="email"
			aria-invalid={error?.field === 'email'}
			aria-describedby={error?.field === 'email' ? 'email-error' : undefined}
		/>
	</label>
	{#if error?.field === 'email'}
		<small id="email-error" aria-live="polite">{error?.message}</small>
	{/if}

	<label for="message">
		Your message
		<textarea
			name="message"
			id="message"
			cols="30"
			rows="10"
			required
			aria-invalid={error?.field === 'message'}
			aria-describedby={error?.field === 'message' ? 'message-error' : undefined}
			>{message}</textarea
		>
	</label>
	{#if error?.field === 'message'}
		<small id="message-error" aria-live="polite">{error?.message}</small>
	{/if}

	{#if error?.field === 'submit'}
		<small id="submit-error" aria-live="polite">{error?.message}</small>
	{/if}

	{#if form?.success}
		<p>Thanks for your message!</p>
	{:else}
		<button>Submit</button>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: calc(var(--padding) * 2);
	}
	label {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--padding);
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
</style>
