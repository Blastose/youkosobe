import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, parent }) => {
	const id = params.id;

	const parentData = await parent();
	if (!parentData.channel.tabs.find((v) => v === 'streams')) {
		throw redirect(302, `/channel/${parentData.channel.authorId}`);
	}
	const invidious = await createInvidious();
	const streams = await invidious.getChannelStreams(id);

	return { streams };
};
