import { getInstances, getInvidiousUrl } from '$lib/invidious/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const instances = await getInstances();
	const currentInstance = await getInvidiousUrl();

	return { instances, currentInstance };
};
