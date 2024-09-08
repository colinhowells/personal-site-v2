import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import resume from '$lib/resume.json';

export const GET: RequestHandler = () => {
	return json(resume);
};
