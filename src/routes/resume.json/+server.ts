import resume from '$lib/resume.json' with { type: 'json' };
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return json(resume);
};
