import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('list');
	if (!id) {
		throw redirect(302, '/');
	}

	const invidious = new Invidious('https://invidious.fdn.fr');
	const playlist = await invidious.getPlaylistsByPlid(id, { page: 1 });

	return { playlist, id };
};
