---
title: Some longer article title about something really interesting
description: Lorem ipsum
datePublished: 2024-09-07
dateModified: 2024-09-07
type: article
published: false
---

“Lorem ipsum, dolor sit amet consectetur adipisicing elit.” A iste totam sapiente accusantium
iusto, dolorem Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Facilisis leo vel fringilla est ullamcorper eget
nulla facilisi. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius. Aenean
euismod elementum nisi quis eleifend quam adipiscing vitae proin. Quis vel eros donec ac odio
tempor. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Euismod lacinia at quis
risus. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Gravida in fermentum et
sollicitudin. Ut placerat orci nulla pellentesque. Aliquet porttitor lacus luctus accumsan tortor
posuere. Non pulvinar neque laoreet suspendisse interdum consectetur. Tellus in metus vulputate eu
scelerisque felis imperdiet proin. At volutpat diam ut venenatis. Faucibus pulvinar elementum
integer enim neque volutpat ac tincidunt vitae. Donec ultrices tincidunt arcu non sodales neque
sodales. Tristique et egestas quis ipsum suspendisse ultrices gravida. Leo a diam sollicitudin
tempor id eu nisl nunc. Eu ultrices vitae auctor eu augue ut. Et tortor consequat id porta.

```ts
/**
 * toot response Link header example:
 * <https://toot.cafe/api/v1/accounts/2999/statuses?exclude_replies=true&limit=10&max_id=111524783353936829>; rel="next",
 * <https://toot.cafe/api/v1/accounts/2999/statuses?exclude_replies=true&limit=10&min_id=111603319771604334>; rel="prev"
 */

import { MASTODON_STATUSES_ENDPOINT } from '$env/static/private';

import type { RequestHandler } from './$types';
import { error, json, type NumericRange } from '@sveltejs/kit';
import type { Status } from 'tsl-mastodon-api/lib/JSON/Status';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const { next } = await request.json();

	let tootsUrl;
	if (next) {
		tootsUrl = next;
	} else {
		tootsUrl = new URL(MASTODON_STATUSES_ENDPOINT);
		tootsUrl.searchParams.set('limit', '20');
		tootsUrl.searchParams.set('exclude_replies', 'true');
		tootsUrl = tootsUrl.toString();
	}

	const res = await fetch(tootsUrl);
	if (!res.ok) error(res.status as NumericRange<400, 599>, res?.statusText);
	const toots = (await res.json()) as Array<Status>;

	if (toots.length === 0) error(404, 'No toots found');
	if (!toots) error(500, 'Could not fetch toots');

	return json(toots);
};
```

Malesuada bibendum arcu vitae elementum curabitur. Nisl nisi scelerisque eu ultrices vitae auctor
eu. Cras sed felis eget velit aliquet sagittis id consectetur purus. Neque ornare aenean euismod
elementum nisi quis eleifend quam adipiscing. Quis eleifend quam adipiscing vitae proin sagittis.
Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Ullamcorper morbi tincidunt ornare
massa eget. Feugiat sed lectus vestibulum mattis. Nec sagittis aliquam malesuada bibendum arcu.
Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Quam nulla porttitor massa id neque
aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Maecenas ultricies
mi eget mauris. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Amet nulla
facilisi morbi tempus iaculis urna. Sit amet mauris commodo quis imperdiet massa tincidunt. At
consectetur lorem donec massa sapien faucibus et. Facilisis sed odio morbi quis commodo odio
aenean sed adipiscing.

Venenatis urna cursus eget nunc scelerisque viverra mauris. Gravida arcu ac tortor dignissim. Amet
mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Senectus et netus et malesuada fames
ac. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Molestie ac feugiat sed
lectus vestibulum. Urna duis convallis convallis tellus id interdum. Pellentesque eu tincidunt
tortor aliquam nulla facilisi. Dignissim cras tincidunt lobortis feugiat vivamus at augue.
Faucibus scelerisque eleifend donec pretium vulputate. Enim nunc faucibus a pellentesque sit amet
porttitor eget. Auctor eu augue ut lectus arcu bibendum at.

Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Nunc sed id semper risus in. Diam
in arcu cursus euismod quis viverra nibh. Enim nec dui nunc mattis enim ut tellus elementum
sagittis. Nisl suscipit adipiscing bibendum est. Senectus et netus et malesuada fames ac turpis.
Eget egestas purus viverra accumsan in. Consectetur adipiscing elit duis tristique sollicitudin.
Senectus et netus et malesuada fames ac. Tellus at urna condimentum mattis pellentesque id nibh
tortor id. Facilisis volutpat est velit egestas dui id ornare arcu. Consequat semper viverra nam
libero justo laoreet. Tortor posuere ac ut consequat semper viverra nam. Pellentesque habitant
morbi tristique senectus et netus et malesuada. Integer enim neque volutpat ac tincidunt vitae.
Vel pharetra vel turpis nunc eget. Id neque aliquam vestibulum morbi blandit cursus risus. Tempor
commodo ullamcorper a lacus vestibulum sed arcu. Tortor at risus viverra adipiscing at in tellus
integer.

Nulla aliquet porttitor lacus luctus accumsan tortor. Lorem mollis aliquam ut porttitor leo a diam
sollicitudin tempor. Eget lorem dolor sed viverra ipsum nunc aliquet. Non nisi est sit amet
facilisis magna. Fames ac turpis egestas sed tempus urna. Enim ut tellus elementum sagittis vitae
et leo duis ut. Enim blandit volutpat maecenas volutpat blandit aliquam. Arcu non sodales neque
sodales ut etiam sit. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Lacus
luctus accumsan tortor posuere ac ut consequat. Nunc sed velit dignissim sodales ut eu sem integer
vitae. Vel orci porta non pulvinar neque. Ac ut consequat semper viverra nam libero justo. Eget
gravida cum sociis natoque. Et ligula ullamcorper malesuada proin libero. Sed odio morbi quis
commodo odio aenean sed adipiscing. Magna fermentum iaculis eu non diam. Erat imperdiet sed
euismod nisi porta lorem mollis aliquam ut. Egestas purus viverra accumsan in nisl nisi
scelerisque eu. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.
