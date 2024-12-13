// https://kit.svelte.dev/docs/types#app

declare global {
	interface Document {
		startViewTransition?: any;
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			articles?: Article[];
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
				CF_PAGES_COMMIT_SHA: string;
			};
		}
	}
}

export {};
