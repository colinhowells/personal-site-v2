import { PUBLIC_SITE_URL } from '$env/static/public';
import { Temporal } from 'temporal-polyfill';

export const isError = (err: unknown): boolean =>
	typeof Error.isError === 'function' ? Error.isError(err) : err instanceof Error;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1) || '';

export const xmlEscape = (str: string): string =>
	str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
		.replaceAll('…', '&#8230;');

/** Parse a date string to a Temporal.PlainDate, accepting both YYYY-MM-DD and full ISO strings */
export const getTemporalPlainDate = (date: string): Temporal.PlainDate =>
	Temporal.PlainDate.from(date.slice(0, 10));

/** check if a string is a valid YYYY-MM-DD date (also accepts full ISO strings) */
export const isValidDate = (date: string): boolean => {
	try {
		getTemporalPlainDate(date);
		return true;
	} catch {
		return false;
	}
};

/** get an existing or new date as YYYY-MM-DD, ISO 8601 datetime, RFC 822, or extract the year */
export const getDateString = (
	date = Temporal.Now.plainDateISO().toString(),
	as: 'yyyy-mm-dd' | 'iso8601' | 'rfc822' | 'year',
): string => {
	if (!isValidDate(date)) {
		console.error('Invalid date format: ', date);
		return '';
	}
	switch (as) {
		case 'yyyy-mm-dd':
			return date.split('T')[0]; // '2026-01-01'
		case 'iso8601':
			return getTemporalPlainDate(date).toZonedDateTime('UTC').toInstant().toString(); // '2026-01-01T00:00:00Z'
		case 'rfc822': {
			const zdt = getTemporalPlainDate(date).toZonedDateTime('UTC');
			const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			const MON = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];
			const dayName = DOW[zdt.dayOfWeek === 7 ? 0 : zdt.dayOfWeek];
			const monthName = MON[zdt.month - 1];
			return `${dayName}, ${String(zdt.day).padStart(2, '0')} ${monthName} ${zdt.year} 00:00:00 GMT`;
		}
		case 'year':
			return parseInt(date.split('-')[0]).toString(); // '2026'
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
		'@graph': [...schemaGraphObjects],
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
