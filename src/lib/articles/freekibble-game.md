---
title: Freekibble game
description: A game with tens of thousands of users … on WordPress
datePublished: 2024-12-06
dateModified: 2024-12-06
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

Our company had incorporated/acquihired the client for this trivia-playing project, who’d been running the site for years and wanted to expand it to include paid memberships. Given that it used a passwordless login system (the user had a query parameter which designated them, which was about as secure as you’d imagine) it needed a complete rebuild. My first thought was to do it as a SPA or even an iOS app, but advertising was being sold by the page url, so because of that as well as JS-driven sites being somewhat novel at the time, WordPress was chosen.

This wasn’t a terrible decision in some ways, because the questions could be [custom post types](https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/) and the membership and payment infrastructure could be dealt with using [Restrict Content Pro](https://restrictcontentpro.com) and WP’s own users, but there were challenges – a game needs to be real-time, which made the site no longer an extremely-cacheable blog. The mechanism that drove the game finally was a peculiar melange of jQuery and form requests and there was some work with our host to make sure some routes were exempt from caching policies, but it was reliable, responsive (as in quick), and most importantly real-time.

<Figure src={desktop} alt="Site viewed with a largeish viewport" width="1024" height="540" />

<Figure src={mobile} alt="Site viewed with a mobile device" width="414" height="1546" />

Because every user interaction had some sort of attributable point-scoring, there was also a lot of data being compiled on user activities. (For a while every database transaction was logged, but of course over time that became untenable. We have better solutions for that problem now, but at the time preserving them wasn’t worth the candle.)

<Figure src={totals} alt="Table featuring aggregated points, accumulated by site users" width="414" height="1546" />
