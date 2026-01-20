import { PUBLIC_SITE_URL } from '$env/static/public';

/** check that date is, or can have, a YYYY-MM-DD format */
export const isValidDate = (date: string): boolean => {
	// check for datetimes: '2025-02-18T00:00:00.000Z'
	if (date.includes('T')) date = date.split('T')[0];
	// test for 'YYYY-MM-DD'
	return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

/** get a date as YYYY-MM-DD, or ISO, or a year as a number */
export const getDateString = (
	date: string,
	as: 'simple' | 'iso' | 'utc' | 'year'
): string | number => {
	if (!isValidDate(date)) {
		console.error('Invalid date format: ', date);
		return 0;
	}
	switch (as) {
		case 'simple':
			return date.split('T')[0]; // '2026-01-01'
		case 'iso':
			return new Date(date).toISOString(); // '2026-01-01T00:00:00.000Z'
		case 'utc':
			return new Date(date).toUTCString(); // 'Thurs, 1 Jan 2026 00:00:00 GMT'
		case 'year':
			return parseInt(date.split('-')[0]); // 2026
		default:
			return date;
	}
};

export const getHash = (str: string): string => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
	}
	// convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7
	return (hash >>> 0).toString(36).padStart(7, '0');
};

/** @see https://developer.yoast.com/features/schema/technology-approach/ */
export const getSchemaNodeId = (type: string, id: string | number = 1): string => {
	return `${PUBLIC_SITE_URL}/#/schema/${type.toLowerCase()}/${id}`;
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

/** get filename with extension eg 'whatever-file.md' */
export const getFilename = (path: string): string => {
	return path.split('/').pop() ?? '';
};

/** get filename without extension eg 'whatever-file' */
export const getSlug = (path: string): string => {
	return getFilename(path).split('.')[0];
};

export const getImages = (): Images => {
	let images: Images = {};

	/**
	 * @example
	 * [ [ '/src/lib/images/filename.jpg', [Object: null prototype] [Module] { default: [Getter] } ], [...], [...] ]
	 */
	const imageModules = import.meta.glob('$lib/images/*', { eager: true });

	for (const [path, module] of Object.entries(imageModules)) {
		const filename = path.split('/').pop() as string;
		images[filename] = (module as { default: string }).default;
	}

	return images;
};

/** only returns published articles */
export const getArticlesList = (): ArticlesList => {
	let articlesList: ArticlesList = [];
	const filePaths = import.meta.glob('$lib/articles/*.md', { eager: true });
	const images = getImages();

	for (const path in filePaths) {
		const file = filePaths[path];
		const slug = getSlug(path);

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			let metadata = file.metadata as Omit<ArticleMetadata, 'slug'>;
			const articleMetadata = { ...metadata, slug } satisfies ArticleMetadata;

			// if article has a featured image (filename as 'image'), find the src for it and attach
			if (articleMetadata?.image) {
				articleMetadata.imgSrc = images[articleMetadata.image];
			}

			articleMetadata.published && articlesList.push({ ...articleMetadata, slug });
		}
	}

	return articlesList.sort(
		(first, second) =>
			new Date(second.datePublished).getTime() - new Date(first.datePublished).getTime()
	);
};
