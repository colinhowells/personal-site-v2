import { IncomingRequestCfProperties } from '@cloudflare/workers-types';

declare global {
	interface Document {
		startViewTransition?: any;
	}

	/** {@link https://svelte.dev/docs/kit/types#app.d.ts} */
	namespace App {
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
