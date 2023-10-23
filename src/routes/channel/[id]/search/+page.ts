import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';

export const load: PageLoad = async ({ params, url }) => {
	const id = params.id;
	const invidious = await createInvidious();

	const query = url.searchParams.get('query');

	const searchResults = await invidious.getChannelSearch(id, { q: query ?? '', page: 1 });

	return { searchResults, query };
};
