import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';

export const load: PageLoad = async ({ fetch }) => {
	const url = 'https://invidious.fdn.fr/api/v1/search/suggestions?q=neuro';

	const a = await fetch(url);

	const b = await a.json();
	console.log(b);

	const invidious = new Invidious('https://invidious.fdn.fr');
	const vid = await invidious.getVideoById('Gw15GATnuXo');

	return { vid };
};
