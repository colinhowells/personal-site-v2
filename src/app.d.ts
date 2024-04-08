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
			metadata?: any;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
