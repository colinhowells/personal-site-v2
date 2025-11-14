<script lang="ts">
	import { sendContact } from '$lib/api/contact.remote';
	import SEO from '$lib/SEO.svelte';

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

<!-- <form method="POST" aria-label="Contact form" use:enhance>
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
</form> -->

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
