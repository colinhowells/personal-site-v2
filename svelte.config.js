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
			// https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#default-variables
			name: process?.env?.WORKERS_CI_BUILD_UUID ?? Date.now().toString(),
			pollInterval: 30000 // 30s as ms
		}
	},
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'alt-x',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	}
};

export default config;
