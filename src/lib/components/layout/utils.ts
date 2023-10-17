export function buildPageTitle(title?: string) {
	const base = 'Youkosobe';

	if (title) {
		return `${title} - ${base}`;
	}
	return base;
}
