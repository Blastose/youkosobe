import type { LayoutLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';

export const load: LayoutLoad = async ({ params }) => {
	const id = params.id;
	const invidious = new Invidious('https://invidious.fdn.fr');
	const channel = await invidious.getChannelById(id);

	return { channel };
};
