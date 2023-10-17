export function formatTime(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const leftoverSeconds = Math.round(seconds % 60);

	let time = '';
	if (leftoverSeconds >= 10) {
		time = `${leftoverSeconds}`;
	} else {
		time = `0${leftoverSeconds}`;
	}

	let hoursMinutes = '';
	if (hours === 0) {
		hoursMinutes = `${minutes}`;
		time = `${hoursMinutes}:${time}`;
	} else {
		hoursMinutes = `${hours}`;
		if (minutes >= 10) {
			hoursMinutes = `${hoursMinutes}:${minutes}`;
		} else {
			hoursMinutes = `${hoursMinutes}:0${minutes}`;
		}
		time = `${hoursMinutes}:${time}`;
	}

	return time;
}

export const numberFormatter = Intl.NumberFormat('en', {
	notation: 'compact',
	maximumSignificantDigits: 3
});

export function fixThumbnailImageUrl(url: string) {
	if (!url.startsWith('//')) return url;

	return url.replace(/^\/\//, 'https://');
}
