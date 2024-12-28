---
title: Watch to Give product landing pages
description: Game-like donation funnels
datePublished: 2024-12-08
dateModified: 2024-12-08
type: work
published: true
image: watch-desktop-index-cropped.png
---

<script>
import Figure from '$lib/Figure.svelte';

import desktop from '$lib/images/watch-desktop-index-cropped.png';
import initial from '$lib/images/watch-desktop-page.png';
import quiz from '$lib/images/watch-desktop-page-quiz.png';
import more from '$lib/images/watch-desktop-page-more.png';
</script>

<a href="https://watch.greatergood.com" rel="noreferrer" aria-label="Watch to Give product landing pages">https://watch.greatergood.com &rarr;</a>

We gave a unique spin on soliciting donations by presenting them as a kind of mini-game funnel; the user travelled through three stages, emerging from the last into a [Shopify checkout](https://www.shopify.com/checkout) (donations for the company needing to be purchases).

These pages had gone through a number of rewrites; before this version, each page was its own React application, with its own verbose Webpack configuration, and there was no CMS or templating. This was extremely inefficient, even maddening if there was ever a need to edit older pages, so I was desperate to change this situation – especially because it was a situation I was responsible for! Nothing motivates quite like one’s perceived failures.

<Figure src={desktop} alt="Site viewed on desktop" width="1024" height="849" />

Something more like a blog was called for, but given that the UX was extremely specific – these weren’t articles so much as interactive product landing pages – it was simpler to build a [Svelte](https://svelte.dev) application, hosted on [Cloudflare](https://workers.cloudflare.com), using [DatoCMS](https://www.datocms.com) for the content. The most complicated piece was creating the checkouts, which had additional requirements involving branding and recurring payments.

<Figure src={initial} alt="Initial state of landing page" width="1024" height="865" />

<Figure src={quiz} alt="Advancing through the funnel – a short quiz" width="1024" height="870" />

<Figure src={more} alt="Final stage, a purchase CTA" width="1024" height="870" />
