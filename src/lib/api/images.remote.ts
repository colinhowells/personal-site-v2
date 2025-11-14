import { prerender } from '$app/server';

export const getImages = prerender(async (): Promise<Images> => {
	let images: Images = {};
	const imageModules = import.meta.glob('$lib/images/*', { eager: true });

	for (const [path, module] of Object.entries(imageModules)) {
		const filename = path.split('/').pop() as string;
		images[filename] = (module as { default: string }).default;
	}

	return images;
});
