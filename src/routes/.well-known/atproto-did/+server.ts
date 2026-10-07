import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response('did:plc:5rcvs5qzp6fhigken546ymtl', {
		headers: { 'Content-Type': 'text/plain' },
	});
};
