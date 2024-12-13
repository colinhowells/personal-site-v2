---
title: GreaterGood Guardians loyalty program
description: Onboarding/marketing site for a paid program
datePublished: 2024-12-10
dateModified: 2024-12-10
type: work
published: true
image: account-desktop.png
---

<script>
import Figure from '$lib/Figure.svelte';

import desktop from '$lib/images/account-desktop.png';
import mobile from '$lib/images/account-mobile-cropped.png';
</script>

Devising a paid loyalty program that could be leveraged across sites on varying platforms was challenging. Luckily Stytch helped with what would have been a very difficult piece, authentication of its abstracted users. The databases and APIs as such weren’t as much of a problem as managing the metadata associated with user action - which action? Which membership tier? Which chronological ruleset (actions only being allowed within temporal windows) applied?

Walking the prospective customer through all this was the function of the onboarding site, which had to communicate quite a bit of information while being usable and not overwhelming. By this time [Svelte](https://svelte.dev) had been accepted as the UI framework of choice, which was an excellent decision (especially for me, the Svelte fanboy). TypeScript was used extensively, which I still have mixed feelings about and am not sure is necessary for every project, even though I can perfectly understand why it’s popular to the point of being ubiquitous.

<Figure src={desktop} alt="Site viewed with a largeish viewport" width="1024" height="2225" />

<Figure src={mobile} alt="Site viewed with a mobile device" width="414" height="1661" />
