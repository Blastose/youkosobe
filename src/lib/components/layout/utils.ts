import type { Action } from 'svelte/action';

export function buildPageTitle(title?: string) {
	const base = 'Youkosobe';

	if (title) {
		return `${title} - ${base}`;
	}
	return base;
}

export function convertNewlinesToBr(text: string) {
	return text.replaceAll(/\n/g, '<br>');
}

export const clickOutside: Action<Node, Node | undefined, { 'on:outclick': () => void }> = (
	node: Node,
	toggleButton?: Node
) => {
	const handleClick = (event: Event) => {
		if (!node.contains(event.target as Node) && !toggleButton?.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};
	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const mousedownOutside: Action<Node, Node | undefined, { 'on:mouseoutside': () => void }> = (
	node: Node,
	toggleButton?: Node
) => {
	const handleClick = (event: Event) => {
		if (!node.contains(event.target as Node) && !toggleButton?.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('mouseoutside'));
		}
	};
	document.addEventListener('mousedown', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('mousedown', handleClick, true);
		}
	};
};

const unitsInSeconds = {
	year: 365 * 24 * 60 * 60 * 1,
	month: (365 / 12) * 24 * 60 * 60 * 1,
	day: 24 * 60 * 60 * 1,
	hour: 60 * 60 * 1,
	minute: 60 * 1,
	second: 1,
	now: -9999
};

const pluralize = (word: string, amount: number) => {
	return amount > 1 ? `${word}s` : word;
};

const formatRelativeTimeOutput = (difference: number, unit: string) => {
	if (difference <= 0) {
		return 'just now';
	}

	return `${difference} ${pluralize(unit, difference)} ago`;
};

export function relativeTime(now: Date, unixTimestampSeconds: number): string {
	const unixTimeNowSeconds = Math.floor(now.getTime() / 1000);
	const differenceInSeconds = unixTimeNowSeconds - unixTimestampSeconds;

	for (const key in unitsInSeconds) {
		const unitValue = unitsInSeconds[key as keyof typeof unitsInSeconds];
		if (differenceInSeconds > unitValue) {
			return formatRelativeTimeOutput(Math.floor(differenceInSeconds / unitValue), key);
		}
	}

	return 'unknown time ago';
}
