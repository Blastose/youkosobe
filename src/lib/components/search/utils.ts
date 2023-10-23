import { createInvidious } from '$lib/invidious/utils';
import type { GetSearchParams } from '$lib/invidious/types';

export function castSearchParamsToType<T>(searchParam: string | string[] | null, valueIfNull: T) {
	if (searchParam === null) return valueIfNull;
	return searchParam as T;
}

export async function getSearchFromUrl(url: URL, page: number) {
	const search_query = url.searchParams.get('q') ?? '';

	const date = castSearchParamsToType<GetSearchParams['date']>(
		url.searchParams.get('date'),
		'none'
	);
	const type = castSearchParamsToType<GetSearchParams['type']>(url.searchParams.get('type'), 'all');
	const duration = castSearchParamsToType<GetSearchParams['duration']>(
		url.searchParams.get('duration'),
		'none'
	);
	const features = castSearchParamsToType<GetSearchParams['features']>(
		url.searchParams.getAll('features'),
		[]
	);
	const sort = castSearchParamsToType<GetSearchParams['sort']>(
		url.searchParams.get('sort'),
		'relevance'
	);

	console.log(date);
	console.log(type);
	console.log(duration);
	console.log(features);
	console.log(sort);
	const invidious = await createInvidious();
	return await invidious.getSearch({
		q: search_query,
		page,
		date,
		type,
		duration,
		features,
		sort
	});
}
