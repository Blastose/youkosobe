import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';

export const load: PageLoad = async ({ params }) => {
	const postId = params.id;
	const invidious = new Invidious('https://invidious.fdn.fr');
	const post = await invidious.getChannelCommunityPost(postId);

	return { post, postId };
};
