# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Svelte MCP Server

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### Available MCP Tools:

#### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

#### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

#### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

#### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Project Overview

This is a personal website/blog built with SvelteKit 2 and Svelte 5, deployed to Cloudflare Workers. It uses mdsvex to render Markdown articles as Svelte components with frontmatter metadata.

**Tech Stack:**

- SvelteKit 2 with Svelte 5 (using runes)
- TypeScript
- mdsvex for Markdown processing
- Vite as the build tool
- Cloudflare Workers adapter for deployment
- Node 22.x, npm 10.x

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Type checking with watch mode
npm run check:watch

# Generate Cloudflare Workers types
npm run cf-typegen
```

## Architecture

### Content System

**Articles are Markdown files in `src/lib/articles/`** with frontmatter metadata:

- Each `.md` file has frontmatter with: `title`, `description`, `datePublished`, `dateModified`, `type` (review|article|list|work), `published` (boolean), and optional `image`
- Articles are dynamically imported using Vite's `import.meta.glob()` in `getArticlesList()` helper
- Only articles with `published: true` are displayed
- The slug is derived from the filename

### Routing Structure

- **`/`** - Homepage ([+page.svelte](src/routes/+page.svelte))
- **`/[slug]`** - Dynamic article pages ([+page.ts](src/routes/[slug]/+page.ts), [+page.svelte](src/routes/[slug]/+page.svelte))
  - Dynamically imports articles from `$lib/articles/${slug}.md`
  - Returns 404 if article not found or `published: false`
- **`/portfolio`** - Portfolio page
- **`/resume`** - Resume page
- **`/contact`** - Contact page
- **`/rss.xml`** - RSS feed ([+server.ts](src/routes/rss.xml/+server.ts))
- **`/resume.json`** - Resume JSON API
- **`/.well-known/webfinger`** - Webfinger endpoint
- **`/.well-known/atproto-did`** - AT Protocol DID endpoint

### Key Files

- **[src/lib/helpers.ts](src/lib/helpers.ts)** - Core utility functions:
  - `getArticlesList()`: Loads all articles from `$lib/articles/*.md` using `import.meta.glob()`
  - `getImages()`: Loads all images from `$lib/images/*` using `import.meta.glob()`
  - Date utilities, slugification, schema serialization
- **[src/ambient.d.ts](src/ambient.d.ts)** - Global TypeScript types for articles, SEO data, images
- **[src/app.d.ts](src/app.d.ts)** - SvelteKit App namespace types, Cloudflare Platform types
- **[src/routes/+layout.server.ts](src/routes/+layout.server.ts)** - Root layout load function that provides `articlesList`, `images`, and `seoData` to all pages
- **[svelte.config.js](svelte.config.js)** - SvelteKit configuration:
  - Uses `@sveltejs/adapter-cloudflare`
  - Configures mdsvex to process `.md` files
  - Sets up path alias `$css` → `src/app.css`
  - Configures version polling for updates (30s interval)
  - Enables Svelte inspector (alt-x to toggle)

### Component Library

Reusable components in `src/lib/`:

- `SEO.svelte` - SEO metadata component
- `Header.svelte` - Site header
- `Footer.svelte` - Site footer
- `Nav.svelte` - Navigation component
- `Figure.svelte` - Image figure component with caption support

### Images

Images are stored in `src/lib/images/` and loaded via `getImages()` helper which uses `import.meta.glob()` to eagerly import all images. They're made available globally through the root layout's `PageData.images` object, keyed by filename.

### Deployment

Deployed to Cloudflare Workers using `@sveltejs/adapter-cloudflare`. The build UUID comes from Cloudflare's `WORKERS_CI_BUILD_UUID` environment variable, with fallback to `Date.now()`.

## Working with Articles

To add a new article:

1. Create a new `.md` file in `src/lib/articles/`
2. Add frontmatter with all required fields (see existing articles for examples)
3. Set `published: true` when ready to publish
4. The filename becomes the URL slug automatically

To reference images in articles:

1. Add image to `src/lib/images/`
2. Import in article's `<script>` section: `import imageName from '$lib/images/filename.png';`
3. Use with `<Figure>` component or standard `<img>` tag
