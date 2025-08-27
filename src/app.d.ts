import { IncomingRequestCfProperties } from '@cloudflare/workers-types';

// https://svelte.dev/docs/kit/types#app.d.ts

declare global {
	interface Document {
		startViewTransition?: any;
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			articles?: Array<ArticleMetadata>;
			content?: any;
			metadata?: {
				title: string;
				description: string;
				datePublished?: string;
				dateModified?: string;
				type?: 'article' | 'diary' | 'list' | 'work';
				published?: boolean;
				image?: string;
			};
		}
		// interface PageState {}
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
