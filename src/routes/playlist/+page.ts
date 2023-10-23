import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('list');
	if (!id) {
		throw redirect(302, '/');
	}

	const invidious = await createInvidious();
	const playlist = await invidious.getPlaylistsByPlid(id, { page: 1 });

	return { playlist, id };
};
