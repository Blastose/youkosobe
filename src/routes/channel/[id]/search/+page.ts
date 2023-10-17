import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';

export const load: PageLoad = async ({ params, url }) => {
	const id = params.id;
	const invidious = new Invidious('https://invidious.fdn.fr');

	const query = url.searchParams.get('query');

	const searchResults = await invidious.getChannelSearch(id, { q: query ?? '', page: 1 });

	return { searchResults, query };
};
