export const getSlugFromPath = (path: string): string | null =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export const getYear = (date: string): number => new Date(date).getFullYear();

export const serializeSchema = (schema: object): string => {
	return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
};

export const stripTags = (str: string): string => {
	// Remove script tags and the content within them
	str = str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
	// Remove HTML tags
	str = str.replace(/<\/?[^>]+(>|$)/g, '');
	return str;
};

export const getNextTootsUrl = (headers: Headers): string => {
	return headers.get('Link')?.split(',')[0].slice(1, -13) ?? '';
};
