import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';

export const load: PageLoad = async () => {
	const invidious = await createInvidious();
	const trending = await invidious.getTrending();

	return { trending };
};
