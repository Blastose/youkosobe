import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, parent }) => {
	const id = params.id;

	const parentData = await parent();
	if (!parentData.channel.tabs.find((v) => v === 'streams')) {
		throw redirect(301, `/channel/${parentData.channel.authorId}`);
	}
	const invidious = new Invidious('https://invidious.fdn.fr');
	const streams = await invidious.getChannelStreams(id);

	return { streams };
};
