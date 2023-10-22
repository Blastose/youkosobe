import { get, writable, type Writable } from 'svelte/store';
import { windowSizeStore } from './windowSizeStore';
import { page } from '$app/stores';

function startingSidebarState(size: 'large' | 'small', pathname: string): 'open' | 'closed' {
	if (pathname.startsWith('/watch')) return 'closed';

	if (size === 'large') {
		return 'open';
	} else {
		return 'closed';
	}
}

export const sidebarStateStore: Writable<'open' | 'closed'> = writable(
	startingSidebarState(get(windowSizeStore), get(page)?.url?.pathname ?? '')
);
