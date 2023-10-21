import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';
import type { GetChannelPlaylistsParams } from '$lib/invidious/types';

export const load: PageLoad = async ({ params, url }) => {
	const id = params.id;
	const sort_by =
		(url.searchParams.get('sort_by') as GetChannelPlaylistsParams['sort_by'] | null) ?? 'newest';
	const invidious = new Invidious('https://invidious.fdn.fr');
	const playlists = await invidious.getChannelPlaylists(id, { sort_by });

	return { playlists, sort_by };
};
