/** check that date is in YYYY-MM-DD format */
export const isValidDate = (date: string): boolean => {
	// check for datetimes: '2025-02-18T00:00:00.000Z'
	if (date.includes('T')) date = date.split('T')[0];

	// now test for 'YYYY-MM-DD'
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
