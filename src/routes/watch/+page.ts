import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';
import { redirect } from '@sveltejs/kit';
import type { GetCommentsByIdParams, GetPlaylistsByPlid } from '$lib/invidious/types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('v');
	const playlistId = url.searchParams.get('list');
	const playlistIndex = url.searchParams.get('index');
	const initialTimestamp = Number(url.searchParams.get('t'));

	if (!id) {
		throw redirect(302, '/');
	}

	const invidious = await createInvidious();
	const videoPromise = invidious.getVideoById(id);

	let playlistPromise: Promise<GetPlaylistsByPlid> | undefined = undefined;
	if (playlistId && playlistIndex) {
		playlistPromise = invidious.getPlaylistsByPlid(playlistId, {
			continuation: id,
			index: Number(playlistIndex)
		});
	}
	const [video, playlist] = await Promise.all([videoPromise, playlistPromise]);

	let sort_by = url.searchParams.get('sort_by') as GetCommentsByIdParams['sort_by'] | null;
	if (!sort_by) sort_by = undefined;

	const commentObject = invidious.getCommentsById(id, {
		sort_by
	});

	return { video, id, initialTimestamp, playlist, streamed: { commentObject } };
};
