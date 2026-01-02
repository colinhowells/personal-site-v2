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

This is a personal website/blog built with SvelteKit 2 and Svelte 5, deployed to Cloudflare Workers. It uses mdsvex to render Markdown articles and leverages Svelte 5's experimental **remote functions** feature for simplified data fetching.

**Key Architecture Patterns:**

- **Remote Functions**: Instead of traditional `+page.ts` or `+layout.server.ts` load functions, components directly call server-side functions (e.g., `getArticlesList()`, `getArticle()`) marked with `prerender` or `query` from `$app/server`
- **Form Actions**: Contact form uses remote `form()` function with Valibot schema validation
- **Server-Side Rendering**: Articles are rendered server-side using `render()` from `svelte/server`
- **Security Headers**: Set globally in [src/hooks.server.ts](src/hooks.server.ts) including CSP, X-Frame-Options, etc.

**Tech Stack:**

- SvelteKit 2 with Svelte 5 (runes, remote functions, async compiler)
- TypeScript
- mdsvex for Markdown processing
- Valibot for schema validation
- Vite as the build tool
- Cloudflare Workers adapter for deployment
- Airtable API for contact form submissions
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

### Remote Functions

Remote functions are defined in `src/lib/api/*.remote.ts` files and called directly from components:

- **[src/lib/api/articles.remote.ts](src/lib/api/articles.remote.ts)**:
  - `getArticlesList()`: Prerendered function that loads all published articles with metadata
  - `getArticle(slug)`: Query function that loads a specific article and renders it to HTML
- **[src/lib/api/contact.remote.ts](src/lib/api/contact.remote.ts)**:
  - `sendContact`: Form action with Valibot validation that sends data to Airtable

Components use these functions with `await` directly in their `<script>` sections. No `+page.ts` or `+layout.server.ts` files needed.

### Content System

**Articles are Markdown files in [src/lib/articles/](src/lib/articles/)** with frontmatter metadata:

- Each `.md` file has frontmatter with: `title`, `description`, `datePublished`, `dateModified`, `type` (review|article|list|work), `published` (boolean), and optional `image`
- Articles are dynamically imported using Vite's `import.meta.glob()` in the `getArticlesList()` remote function
- Only articles with `published: true` are displayed
- The slug is derived from the filename
- Article content is server-rendered to HTML using `render()` from `svelte/server`

### Routing Structure

- **`/`** - Homepage ([+page.svelte](src/routes/+page.svelte)) - calls `getArticlesList()` remote function
- **`/[slug]`** - Dynamic article pages ([+page.svelte](src/routes/[slug]/+page.svelte)) - calls `getArticle(slug)` remote function
- **`/contact`** - Contact form ([+page.svelte](src/routes/contact/+page.svelte)) - uses `sendContact` remote form action
- **`/portfolio`** - Portfolio page ([+page.svelte](src/routes/portfolio/+page.svelte))
- **`/resume`** - Resume page ([+page.svelte](src/routes/resume/+page.svelte))
- **`/rss.xml`** - RSS feed ([+server.ts](src/routes/rss.xml/+server.ts))
- **`/resume.json`** - Resume JSON API ([+server.ts](src/routes/resume.json/+server.ts))
- **`/.well-known/webfinger`** - Webfinger endpoint ([+server.ts](src/routes/.well-known/webfinger/+server.ts))
- **`/.well-known/atproto-did`** - AT Protocol DID endpoint ([+server.ts](src/routes/.well-known/atproto-did/+server.ts))

### Key Files

- **[src/lib/api/*.remote.ts](src/lib/api/)** - Remote function definitions using `prerender`, `query`, and `form` from `$app/server`
- **[src/lib/helpers.ts](src/lib/helpers.ts)** - Core utility functions:
  - Date utilities, slugification, schema serialization
  - `getSlugFromPath()`: Extracts slug from file path
  - `stripTags()`: Sanitizes user input
  - `getImages()`: Loads all images from `$lib/images/*` using `import.meta.glob()`
- **[src/hooks.server.ts](src/hooks.server.ts)** - Global server hooks that set security headers
- **[src/ambient.d.ts](src/ambient.d.ts)** - Global TypeScript types for articles, SEO data, images
- **[src/app.d.ts](src/app.d.ts)** - SvelteKit App namespace types, Cloudflare Platform types
- **[svelte.config.js](svelte.config.js)** - SvelteKit configuration:
  - Uses `@sveltejs/adapter-cloudflare`
  - Configures mdsvex to process `.md` files
  - Sets up path alias `$css` → `src/app.css`
  - Configures version polling for updates (30s interval)
  - **Enables experimental `remoteFunctions` and async compiler**

### Component Library

Reusable components in `src/lib/`:

- `SEO.svelte` - SEO metadata component
- `Header.svelte` - Site header
- `Footer.svelte` - Site footer
- `Nav.svelte` - Navigation component
- `Figure.svelte` - Image figure component with caption support

### Images

Images are stored in [src/lib/images/](src/lib/images/) and loaded via `getImages()` helper which uses `import.meta.glob()` to eagerly import all images. They're keyed by filename and attached to article metadata when referenced.

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
