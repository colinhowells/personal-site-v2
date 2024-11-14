import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return text('did:plc:5rcvs5qzp6fhigken546ymtl');
};
