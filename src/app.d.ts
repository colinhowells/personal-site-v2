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
				datePublished: string;
				dateModified: string;
				type?: 'article' | 'diary' | 'list';
				published?: boolean;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
