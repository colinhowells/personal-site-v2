<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	interface Props {
		form: ActionData & {
			name: string;
			email: string;
			error?: { field: string; message: string };
			message: string;
		};
	}

	let { form }: Props = $props();

	let { name, email, error, message } = $state(
		form ?? {
			name: '',
			email: '',
			error: { field: '', message: '' },
			message: ''
		}
	);
	let error_field = $derived(error && error['field']);
	let error_message = $derived(error && error['message']);
</script>

<form method="POST" aria-label="Contact form" use:enhance>
	<label for="name">
		Name
		<input
			value={name}
			type="text"
			name="name"
			id="name"
			required
			autocomplete="name"
			aria-invalid={error_field === 'name'}
			aria-describedby={error_field === 'name' ? 'name-error' : undefined}
		/>
	</label>
	{#if error_field === 'name'}
		<small id="name-error" aria-live="polite">{error_message}</small>
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
			aria-invalid={error_field === 'email'}
			aria-describedby={error_field === 'email' ? 'email-error' : undefined}
		/>
	</label>
	{#if error_field === 'email'}
		<small id="email-error" aria-live="polite">{error_message}</small>
	{/if}

	<label for="message">
		Your message
		<textarea
			name="message"
			id="message"
			cols="30"
			rows="10"
			required
			aria-invalid={error_field === 'message'}
			aria-describedby={error_field === 'message' ? 'message-error' : undefined}>{message}</textarea
		>
	</label>
	{#if error_field === 'message'}
		<small id="message-error" aria-live="polite">{error_message}</small>
	{/if}

	{#if error_field === 'submit'}
		<small id="submit-error" aria-live="polite">{error_message}</small>
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
	p {
		margin: auto;
	}
</style>
