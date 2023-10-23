import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';
import type { GetChannelPlaylistsParams } from '$lib/invidious/types';

export const load: PageLoad = async ({ params, url }) => {
	const id = params.id;
	const sort_by =
		(url.searchParams.get('sort_by') as GetChannelPlaylistsParams['sort_by'] | null) ?? 'newest';
	const invidious = await createInvidious();
	const playlists = await invidious.getChannelPlaylists(id, { sort_by });

	return { playlists, sort_by };
};
