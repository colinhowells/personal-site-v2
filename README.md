# personal-site-v2

## Stack

- [SvelteKit 3](https://svelte.dev/docs/kit/introduction) with Svelte 5 (runes, remote functions, async compiler)
- [TypeScript](https://www.typescriptlang.org)
- Articles are Markdown files with Svelte components, using [mdsvex](https://mdsvex.pngwn.io)
- [Prism themes](https://github.com/prismjs/prism-themes#readme) for syntax highlighting
- [Valibot](https://valibot.dev) for schema validation
- [Vite](https://vite.dev) as the build tool
- Cloudflare Workers adapter for deployment
- [v3 of Cloudflare's build system](https://developers.cloudflare.com/pages/configuration/build-image/#tools): Node 24.18.0, pnpm 10.11.1

## Commands

- `pnpm dev` / `pnpm build` / `pnpm preview`
- `pnpm check` runs `svelte-kit sync` then `svelte-check`; run it after changes
- `pnpm cf-preview-prod` / `pnpm cf-preview-staging` build and run the Worker locally via `wrangler dev`
- There is no test suite

## Conventions

- Config lives in `vite.config.ts` (passed to the `sveltekit(...)` plugin); there is no `svelte.config.js`
- `$lib` no longer exists. Use the `#lib` / `#lib/*` aliases from the `imports` field in `package.json`, with file extensions (`#lib/helpers.js`)
- Env vars are declared in `src/env.ts` with `defineEnvVars` and read from `$app/env` / `$app/env/private`
- Articles live in `src/lib/articles/*.md`; only those with `published: true` frontmatter are listed. Data access is in `src/lib/api/*.remote.ts`
- `src/routes/+error.svelte` is both SvelteKit's error page and the root layout's `<svelte:boundary>` `failed` fallback
- Fonts are referenced from `src/app.css` by relative `url()`, so Vite hashes and bundles them

## Gotchas

- `src/ambient.d.ts`: never add shorthand `declare module 'pkg';` for a package that ships types, since it turns every import from it into `any`
- TypeScript's `include` globs skip dot-directories. `src/routes/.well-known` is listed explicitly in `tsconfig.json`; do the same for any new dot-directory containing TS
- Deployment config is still `wrangler.jsonc` (`staging` and `production` envs). `adapter-cloudflare` reads it, so don't migrate to `cloudflare.config.ts` or run `cf dev/build/deploy` yet
- pnpm settings (release-age delay, build-script allowlist, overrides) are in `pnpm-workspace.yaml`. The `sharp` override exists because `miniflare` pins a vulnerable version; remove it once `miniflare` ships a patched pin
