import { Invidious } from '$lib/invidious/invidious';
import type { GetSearchParams } from '$lib/invidious/types';

export function castSearchParamsToType<T>(searchParam: string | string[] | null) {
	if (searchParam === null || searchParam === 'none') return undefined;
	return searchParam as T;
}

export async function getSearchFromUrl(url: URL, page: number) {
	const search_query = url.searchParams.get('q') ?? '';

	const date = castSearchParamsToType<GetSearchParams['date']>(url.searchParams.get('date'));
	const type = castSearchParamsToType<GetSearchParams['type']>(url.searchParams.get('type'));
	const duration = castSearchParamsToType<GetSearchParams['duration']>(
		url.searchParams.get('duration')
	);
	const features = castSearchParamsToType<GetSearchParams['features']>(
		url.searchParams.getAll('features')
	);
	const sort_by = castSearchParamsToType<GetSearchParams['sort_by']>(url.searchParams.get('sort'));

	const invidious = new Invidious('https://invidious.fdn.fr');
	return await invidious.getSearch({
		q: search_query,
		page,
		date,
		type,
		duration,
		features,
		sort_by
	});
}
