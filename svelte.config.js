import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	smartypants: true
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		alias: {
			$css: 'src/app.css'
		},
		version: {
			name: process?.env?.CF_PAGES_COMMIT_SHA ?? Date.now().toString(),
			pollInterval: 30000 // 30s as ms
		}
	},
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)]
};

export default config;
