import type { DateOption, Duration, ResultType, SortBy, VideoFeatures } from '$lib/invidious/types';

export type InputGroup<T> = { display: string; value: T };

export const dateArrayRadio: InputGroup<DateOption | 'none'>[] = [
	{
		display: 'Any',
		value: 'none'
	},
	{
		display: 'Last hour',
		value: 'hour'
	},
	{
		display: 'Today',
		value: 'today'
	},
	{
		display: 'This week',
		value: 'week'
	},
	{
		display: 'This month',
		value: 'month'
	},
	{
		display: 'This year',
		value: 'year'
	}
];

export const typeArrayRadio: InputGroup<ResultType | 'all'>[] = [
	{
		display: 'Any',
		value: 'all'
	},
	{
		display: 'Video',
		value: 'video'
	},
	{
		display: 'Channel',
		value: 'channel'
	},
	{
		display: 'Playlist',
		value: 'playlist'
	},
	{
		display: 'Movie',
		value: 'movie'
	}
];

export const durationArrayRadio: InputGroup<Duration | 'none'>[] = [
	{
		display: 'Any',
		value: 'none'
	},
	{
		display: 'Under 4 minutes',
		value: 'short'
	},
	{
		display: '4 - 20 minutes',
		value: 'medium'
	},
	{
		display: 'Over 20 minutes',
		value: 'long'
	}
];

export const featuresArrayRadio: InputGroup<VideoFeatures>[] = [
	{
		display: 'Live',
		value: 'live'
	},
	{
		display: '4K',
		value: '4k'
	},
	{
		display: 'HD',
		value: 'hd'
	},
	{
		display: 'Subtitles/CC',
		value: 'subtitles'
	},
	{
		display: 'Creative Commons',
		value: 'creative_commons'
	},
	{
		display: '360°',
		value: '360'
	},
	{
		display: 'VR180',
		value: 'vr180'
	},
	{
		display: '3D',
		value: '3d'
	},
	{
		display: 'HDR',
		value: 'hdr'
	},
	{
		display: 'Location',
		value: 'location'
	},
	{
		display: 'Purchased',
		value: 'purchased'
	}
];

export const sortByArrayRadio: InputGroup<SortBy>[] = [
	{
		display: 'Relevance',
		value: 'relevance'
	},
	{
		display: 'Upload date',
		value: 'date'
	},
	{
		display: 'View count',
		value: 'views'
	},
	{
		display: 'Rating',
		value: 'rating'
	}
];
