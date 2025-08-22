import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => {
			return type === 'font' || type === 'js' || type === 'css';
		}
	});

	response.headers.set('Content-Security-Policy', "frame-ancestors 'none'; form-action 'self';");
	response.headers.set('Permissions-Policy', 'interest-cohort=()');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');

	if (PUBLIC_ENVIRONMENT !== 'production') {
		response.headers.set('X-Robots-Tag', 'noindex');
	}

	return response;
};
