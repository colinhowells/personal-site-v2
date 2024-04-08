import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const webfinger = {
	subject: 'acct:colin_howells@toot.cafe',
	aliases: ['https://toot.cafe/@colin_howells', 'https://toot.cafe/users/colin_howells'],
	links: [
		{
			rel: 'http://webfinger.net/rel/profile-page',
			type: 'text/html',
			href: 'https://toot.cafe/@colin_howells'
		},
		{
			rel: 'self',
			type: 'application/activity+json',
			href: 'https://toot.cafe/users/colin_howells'
		},
		{
			rel: 'http://ostatus.org/schema/1.0/subscribe',
			template: 'https://toot.cafe/authorize_interaction?uri={uri}'
		}
	]
};

export const GET: RequestHandler = () => {
	return json(webfinger);
};
