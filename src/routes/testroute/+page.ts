import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const url = 'https://invidious.fdn.fr/api/v1/search/suggestions?q=neuro';

	const a = await fetch(url);

	const b = await a.json();
	console.log(b);

	return { b };
};
