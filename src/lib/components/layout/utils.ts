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
