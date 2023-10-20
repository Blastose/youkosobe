import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';
import { redirect } from '@sveltejs/kit';
import type { GetPlaylistsByPlid } from '$lib/invidious/types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('v');
	const playlistId = url.searchParams.get('list');
	const playlistIndex = url.searchParams.get('index');
	const initialTimestamp = Number(url.searchParams.get('t'));

	if (!id) {
		throw redirect(302, '/');
	}

	const invidious = new Invidious('https://invidious.fdn.fr');
	const video = await invidious.getVideoById(id);

	let playlist: GetPlaylistsByPlid | undefined = undefined;
	if (playlistId && playlistIndex) {
		playlist = await invidious.getPlaylistsByPlid(playlistId, {
			continuation: id,
			index: Number(playlistIndex)
		});
	}

	return { video, id, initialTimestamp, playlist };
};
