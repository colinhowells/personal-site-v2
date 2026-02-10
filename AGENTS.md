# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

- SvelteKit 2 with Svelte 5 (runes, remote functions, async compiler)
- TypeScript
- Articles are Markdown files with Svelte components, which mdsvex 
- Valibot for schema validation
- Vite as the build tool
- Cloudflare Workers adapter for deployment
- Node 22.x, npm 10.x

**When creating, editing, and reviewing Svelte:**
- Invoke the `svelte-file-editor` subagent and call the Svelte MCP server using it
- Reference the `svelte-code-writer` and `svelte-core-bestpractices` skills
