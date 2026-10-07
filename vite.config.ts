import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, type MdsvexOptions } from 'mdsvex';
import { defineConfig } from 'vite';

const mdsvexOptions: MdsvexOptions = {
	extensions: ['.md'],
	smartypants: true,
};

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md'],
			compilerOptions: { experimental: { async: true } },
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
			adapter: adapter(),
			version: {
				// https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#default-variables
				name: process?.env?.WORKERS_CI_BUILD_UUID ?? Date.now().toString(),
			},
			experimental: { remoteFunctions: true },
		}),
	],
});
