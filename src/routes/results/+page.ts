import type { PageLoad } from './$types';
import { getSearchFromUrl } from '$lib/components/search/utils';

export const load: PageLoad = async ({ url }) => {
	const search_query = url.searchParams.get('q') ?? '';

	const searchResults = getSearchFromUrl(url, 1);

	return { searchResults, searchQuery: search_query };
};
