import type { LayoutLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';

export const load: LayoutLoad = async ({ params }) => {
	const id = params.id;
	const invidious = await createInvidious();
	const channel = await invidious.getChannelById(id);

	return { channel };
};
