---
title: oEmbeds, Facebook, and WordPress
description: How to get Facebook to let you cache oEmbeds from Instagram or Facebook on your WordPress site
datePublished: '2021-10-24'
dateModified: '2021-10-24'
type: 'article'
published: true
---

We want to take some url on somebody else's service and embed it on our page. We could create an iframe ourselves, but then we're fiddling with a sometimes very large chunk of html stuck in our page and we're maintaining that forever. What if the embed needs to change somehow in future (becoming fluid and not fixed-width, maybe)? Also we're asking for that embed every time our page loads, that's a lot of requests our page has to make.

What if the service (a 'provider') could send us prerendered html for that url we want, so instead of an iframe or chunk of html in our content, we have a reference to a cache of that html in our site and the service can send us what that embed html should be? That's the idea behind [oEmbeds](https://oembed.com/).

[WP registers a bunch of oEmbed providers](https://wordpress.org/support/article/embeds/#okay-so-what-sites-can-i-embed-from) – as it renders content, it checks for urls (regex patterns) in certain formats and if it finds one, that triggers a request to that provider to see if it can get some html it can cache (you can change those providers, or even add your own).

FB doesn't mind you doing this, but it wants us to get permission for it beforehand so it can connect you with what you're doing with their API, unlike other providers. So we need an FB app, with a domain set to our site's domain, which has 'advanced' permission to 'read' oEmbeds (I'm still unclear on what exactly 'standard' permission allows, if anything). We're going to need credentials to send along when we ask for an oEmbed response: the FB app's ID, and its secret which are found in 'basic' settings for that app.

So who do we now ask for that html? In IG's case we make a GET to:
`https://graph.facebook.com/v8.0/instagram_oembed?access_token=$_FBAPPID|$_FBAPPSECRET&url=$_SOME_IG_URL`

(If you have an http client like [Postman](https://www.postman.com/product/api-client/), [Insomnia](https://insomnia.rest/), or my favorite [Paw](https://paw.cloud/) you can more easily look at what you're sending and what FB is responding with.)

What we expect FB to pass back to us in the response body is json containing a heap of info about the embed, like its author, dimensions, thumbnail images – and most importantly for us, a big wad of html. (If you do not get a 200 response with that stuff included, you'll instead get a 400 with an error message telling you the embed isn't allowed – either because the post has been marked private, or that your app doesn't have permission to do this at all yet.)

That html is going to get saved to post meta by WP with a key of `_oembed_$_HASH_OF_THE_EMBED_URL`. There'll be an additional meta with a timestamp as well. This does a couple of things: caches that html for I think 24 hours, and also makes it accessible to other article pages which might end up embedding the same url – no sense fetching and caching it again; if we're going to embed the same thing on a number of pages, let's use the same cache for it. (I think in Gutenberg's case it saves a post, not post meta, with a `post_type` of `oembed_cache`. I've been avoiding Gutes so I haven't looked into this in detail.)

If instead you got back a 400 with no html you can cache, you're going to end up with the dreaded `{{unknown}}` value for that post meta, and your embed url is just going to sit there inert on your page looking sad. Every so often it's going to try to fetch that embed url again, as the article page is visited, so don't panic if you have a lot of these; they should get refreshed with the actual html once you have access to it. (If you want to get rid of all those at once in your DB because you hate clutter, that's fine too.)

Ok, so how do we get FB to let us do this? You'll need to open an app review in your FB app, asking for advanced access to oEmbed Read. In the first section ('Provide detailed step-by-step instructions on how a reviewer can test your integration') say you're trying to use oEmbeds, and provide a _specific url of a page on your site_ you want to put an embed on. Then in the next section, which isn't very clear about what it really wants ('Please provide a URL where we can test Oembed Read') give them _the FB/IG url of what you're trying to embed._

If they reject you, it's most likely that the mods are confused by how you worded things, not that they consider you hostile or anything – you can always ask again. Also, requests are handled by different people on different days, and they look at other data relating to your site which informs their decision, so in some cases you may have to ask a couple of different times in slightly different ways, or correct some other problem they have with you. But for this particular thing – caching oEmbeds – you're not asking for much, there's not a big reason for them to contest it.

Beyond review, all this stuff – checking for FB and IG urls in your content, making requests for oEmbed html with your credentials, caching them – is handled by the [oEmbed Plus plugin](https://github.com/Ayesh/WordPress-oEmbed-Plus) among others. There are a [number of different endpoints to hit](https://developers.facebook.com/docs/features-reference/oembed_read) and regexes for urls for FB and IG, and that's all kept track of (they might change once again!).

As of this writing the plugin's using v8.0 of the FB graph api; ideally, your FB app should be at the same version or above, so check that.
