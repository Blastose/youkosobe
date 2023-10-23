import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const invidious = await createInvidious();
	const communityPosts = await invidious.getChannelCommunityPosts(id);

	return { communityPosts };
};
