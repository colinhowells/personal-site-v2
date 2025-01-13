---
title: Freekibble game
description: A game with tens of thousands of users … on WordPress
datePublished: 2024-12-06
dateModified: 2025-01-11
type: work
published: true
image: freekibble-desktop-cropped.png
---

<script>
import Figure from '$lib/Figure.svelte';

import desktop from '$lib/images/freekibble-desktop-cropped.png';
import mobile from '$lib/images/freekibble-mobile-cropped.png';
import totals from '$lib/images/freekibble-desktop-totals-cropped.png';
</script>

<a href="https://www.freekibble.com" rel="noreferrer" aria-label="Freekibble game">https://www.freekibble.com &rarr;</a>

Our company had incorporated/acquihired the client for this trivia-game project which donated money to charities depending on traffic, who’d been running the site for years and wanted to expand it to include paid memberships (which would allow increased donations). Given that it used an insecure passwordless login system, it needed a complete rebuild. My first thought was to do it as a SPA or even an iOS app – but advertising was being sold by the page url, and being an app would have meant reduced charitable donations thanks to the App Store’s cut of revenue. Therefore WordPress was chosen, and [Virtual Native](https://www.virtualnative.com) was brought in to devise the initial back-end functionality.

WordPress wasn’t a bad decision in some ways, because the questions could be [custom post types](https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/) and the membership and payment infrastructure could be dealt with using [Restrict Content Pro](https://restrictcontentpro.com) and WP’s own user system, but there were challenges – a game needs to be real-time, which made the site no longer an extremely-cacheable blog. The mechanism that drove the game finally was a peculiar melange of jQuery and form requests (the project predated React, and Backbone would have been overkill) and there was some work with our host to make sure some routes were exempt from caching rules, but it was reliable, responsive (as in quick), and most importantly real-time.

<Figure src={desktop} alt="Site viewed with a largeish viewport" width="1024" height="540" />

<Figure src={mobile} alt="Site viewed with a mobile device" width="414" height="1546" />

Because every user interaction had some sort of attributable point-scoring, there was also a lot of data being compiled on user activities, which meant some problems had to be solved around logging, aggregating, and caching.

<Figure src={totals} alt="Table featuring aggregated points, accumulated by site users" width="414" height="1546" />
