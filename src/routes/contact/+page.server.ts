import { AIRTABLE_PERSONAL_ACCESS_TOKEN, AIRTABLE_BASE_ID } from '$env/static/private';

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { stripTags } from '$lib/helpers.ts';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		let name = data.get('name')?.toString();
		let email = data.get('email')?.toString();
		let message = data.get('message')?.toString();

		if (name && email && message) {
			name = stripTags(name);
			email = stripTags(email);
			message = stripTags(message);
		}

		if (!name) {
			return fail(400, { name, error: { field: 'name', message: 'Add your name.' } });
		}
		if (!email) {
			return fail(400, { email, error: { field: 'email', message: 'Check your email address.' } });
		}
		if (!message) {
			return fail(400, {
				message,
				error: { field: 'message', message: 'Don’t forget to leave a message.' }
			});
		}

		const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/submissions`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				records: [
					{
						fields: {
							name,
							email,
							message
						}
					}
				]
			})
		});

		if (!res.ok) {
			return fail(500, {
				error: { field: 'submit', message: 'Form’s broken but will get fixed!' }
			});
		}

		return { success: true };
	}
} satisfies Actions;
