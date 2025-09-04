import { IncomingRequestCfProperties } from '@cloudflare/workers-types';

declare global {
	interface Document {
		startViewTransition?: any;
	}

	/** {@link https://svelte.dev/docs/kit/types#app.d.ts} */
	namespace App {
		interface PageData {
			article?: Article;
			articlesList: ArticlesList;
			images: Images;
			seoData: SEOData;
		}

		interface Platform {
			caches: CacheStorage & { default: Cache };
			cf: IncomingRequestCfProperties;
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			env: {
				WORKERS_CI_BUILD_UUID: string;
			};
		}
	}
}

export {};
