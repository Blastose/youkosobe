import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';

export const load: PageLoad = async ({ params }) => {
	const postId = params.id;
	const invidious = await createInvidious();
	const post = await invidious.getChannelCommunityPost(postId);

	return { post, postId };
};
