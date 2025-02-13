export const getSlugFromPath = (path: string): string | null =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

// check that date is in YYYY-MM-DD format
export const isValidDate = (date: string): boolean => {
	return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

export const getYear = (date: string): number => {
	if (!isValidDate(date)) {
		console.error('Invalid date format: ', date);
		return 0;
	}
	return parseInt(date.split('-')[0]);
};

export const getISODate = (date: string): string => {
	if (!isValidDate(date)) {
		console.error('Invalid date format: ', date);
		return '';
	}
	return new Date(date).toISOString();
};

export const serializeSchema = (schemaGraphObjects: Array<Record<string, any>>): string => {
	let schema = {
		'@context': 'https://schema.org',
		'@graph': [...schemaGraphObjects]
	};
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

export const slugify = (str: string): string => {
	return str
		.toLowerCase()
		.split(' ')
		.join('-')
		.replace('&', 'and')
		.replace(/[^a-z0-9-]/g, ''); // rm special characters except hyphens
};

export const getImageFilename = (url: string): string => {
	return url.split('/').pop() ?? '';
};

// function to get image filename without extension
export const getImageSlug = (url: string): string => {
	return getImageFilename(url).split('.')[0];
};
