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
