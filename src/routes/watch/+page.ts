import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('v');

	if (!id) {
		throw redirect(302, '/');
	}

	const invidious = new Invidious('https://invidious.fdn.fr');
	const video = await invidious.getVideoById(id);

	return { video, id };
};
