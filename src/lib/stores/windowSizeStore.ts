import { writable, type Writable } from 'svelte/store';

export const windowSizeStore: Writable<'large' | 'small'> = writable(
	window.innerWidth >= 1280 ? 'large' : 'small'
);
