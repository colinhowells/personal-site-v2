---
title: Trivia to Give game
description: Interactive, API-driven game
datePublished: 2024-12-09
dateModified: 2024-12-09
type: work
published: true
image: trivia-tablet-playing-pets-cropped.png
---

<script>
import Figure from '$lib/Figure.svelte';

import mobile from '$lib/images/trivia-mobile-cropped.png';
import playing from '$lib/images/trivia-mobile-playing-people-cropped.png';
import tablet from '$lib/images/trivia-tablet-playing-pets-cropped.png';
</script>

Some time had elapsed since using WordPress to build games, and when the time came for another game project I was anxious to use a stack I’d been coveting for a while, [Svelte](https://svelte.dev) on [Cloudflare Workers](https://workers.cloudflare.com) (specifically its Pages incarnation, which is a package of Workers with bound [KV storage](https://developers.cloudflare.com/kv/) wrapped in a [delightful GitHub-sourced CI/CD pipeline](https://developers.cloudflare.com/pages/get-started/git-integration/)). My experience with both had been fantastic; there are some rough edges to Cloudflare products, which are understandable functions of constant feature iteration, but I’d prefer those to the sometimes Byzantine world of AWS.

There had to be another piece, however – the headless CMS. The company had needs beyond this particular project, so some time was spent shopping for one, but eventually this project was able to use the first choice, [DatoCMS](https://www.datocms.com) – which started as an in-house CMS used by an Italian agency and became a customer-facing product itself. While the content was authored there, there was some pre-processing necessary to construct a tidy JSON blob of fresh questions for a given 24-hour period for the game engine to have immediately to hand, and KV was perfect as a cache.

This project looks fairly simple but there are complexities not shown here – the site needed to be embeddable elsewhere, and the game state needed to be assignable: a certain date for a game, a certain cause preselected, a certain question. The cache for a game needed to be overwritten by editors in cases when a question needed correction after publishing. In addition, given that every day brought a new collection of questions, the site needed to know the request's timezone, to serve the appropriate date’s questions (solved thanks to [Cloudflare providing this information](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties)).

<Figure src={mobile} alt="Site viewed on mobile" width="414" height="800" />

<Figure src={playing} alt="Site viewed on mobile, during-play state shown" width="414" height="653" />

The game-playing UX travels through a number of states, and presenting this in a way that made the best use of what could be on mobile very small real estate was challenging but rewarding to get right. Something that still seems magical was using a background as a progress bar:

<Figure src={tablet} alt="Site viewed on tablet, focusing on the aforementioned progress bar in action" width="1024" height="626" />
