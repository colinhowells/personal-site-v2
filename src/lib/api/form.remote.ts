import { form } from '$app/server';
import { AIRTABLE_BASE_ID, AIRTABLE_PERSONAL_ACCESS_TOKEN } from '$env/static/private';
import { stripTags } from '$lib/helpers';
import * as v from 'valibot';

const ContactSchema = v.object({
	name: v.pipe(v.string(), v.nonEmpty()),
	email: v.pipe(v.string(), v.email(), v.nonEmpty()),
	message: v.pipe(v.string(), v.nonEmpty())
});

export const sendContact = form(ContactSchema, async ({ name, email, message }) => {
	const sending = {
		records: [
			{
				fields: {
					Name: stripTags(name), // Airtable fieldnames are case-sensitive
					Email: stripTags(email),
					Message: stripTags(message)
				}
			}
		]
	};

	const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/submissions`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(sending)
	});

	if (!res.ok) {
		console.error(res.statusText);
		return { error: true };
	}

	return { success: true };
});
