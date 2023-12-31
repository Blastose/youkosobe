export type ISO3166 = string;
export type UnixTimestampSeconds = number;

export type GetStats = {
	version: string;
	software: {
		name: 'invidious';
		version: string;
		branch: string;
	};
	openRegistrations: boolean;
	usage: {
		users: {
			total: number;
			activeHalfyear: number;
			activeMonth: number;
		};
	};
	metadata: {
		updatedAt: number;
		lastChannelRefreshedAt: number;
	};
};

export type GetVideoByIdParams = {
	region: ISO3166;
};

export type GetVideoById = {
	type: 'video' | 'livestream' | 'scheduled';
	title: string;
	videoId: string;
	videoThumbnails: ThumbnailObject[];

	description: string;
	descriptionHtml: string;
	published: number;
	publishedText: string;

	keywords: string[];
	viewCount: number;
	likeCount: number;
	dislikeCount: number;

	musicTracks?: {
		album: string;
		artist: string;
		license: string;
		song: string;
	}[];

	paid: boolean;
	premium: boolean;
	isFamilyFriendly: boolean;
	allowedRegions: string[];
	genre: string;
	genreUrl: string;

	author: string;
	authorId: string;
	authorUrl: string;
	authorThumbnails: {
		url: string;
		width: number;
		height: number;
	}[];

	subCountText: string;
	lengthSeconds: number;
	allowRatings: boolean;
	rating: number;
	isListed: boolean;
	liveNow: boolean;
	isUpcoming: boolean;
	premiereTimestamp?: number;

	hlsUrl?: string;
	adaptiveFormats: {
		index: string;
		bitrate: string;
		init: string;
		url: string;
		itag: string;
		type: string;
		clen: string;
		lmt: string;
		projectionType: number;
		container: string;
		encoding: string;
		qualityLabel?: string;
		resolution?: string;
	}[];
	formatStreams: {
		url: string;
		itag: string;
		type: string;
		quality: string;
		container: string;
		encoding: string;
		qualityLabel: string;
		resolution: string;
		size: string;
	}[];
	captions: {
		label: string;
		languageCode: string;
		url: string;
	}[];
	recommendedVideos: {
		videoId: string;
		title: string;
		videoThumbnails: ThumbnailObject[];
		author: string;
		lengthSeconds: number;
		viewCount: number;
		viewCountText: string;
	}[];
};

export type GetCommentsByIdParams = {
	sort_by?: 'top' | 'new';
	source?: 'youtube' | 'reddit';
	continuation?: string;
	action?: 'action_get_comment_replies';
};

export type Comment = {
	author: string;
	authorThumbnails: {
		url: string;
		width: number;
		height: number;
	}[];
	authorId: string;
	authorUrl: string;
	verified: boolean;

	isEdited: boolean;
	isPinned: boolean;
	isSponsor?: boolean;
	sponsorIconUrl?: string;

	content: string;
	contentHtml: string;
	published: number;
	publishedText: string;
	likeCount: number;
	commentId: string;
	authorIsChannelOwner: boolean;
	creatorHeart?: {
		creatorThumbnail: string;
		creatorName: string;
	};
	replies?: {
		replyCount: number;
		continuation: string;
	};
};
export type GetCommentsById = {
	commentCount?: number;
	videoId: string;
	comments: Comment[];
	continuation?: string;
};

export type GetCaptionsByIdParams = {
	label: string;
	lang: string;
	tlang: string;
	region: ISO3166;
};

export type GetCaptionsById = {
	captions: {
		label: string;
		languageCode: string;
		url: string;
	}[];
};

export type GetTrendingParams = {
	type: 'music' | 'gaming' | 'news' | 'movies';
	region: ISO3166;
};

export type GetTrending = {
	title: string;
	videoId: string;
	videoThumbnails: ThumbnailObject[];

	lengthSeconds: number;
	viewCount: number;
	viewCountText: string;

	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;

	published: number;
	publishedText: string;
	description: string;
	descriptionHtml: string;

	liveNow: boolean;
	paid: boolean;
	premium: boolean;
};

export type GetPopular = {
	type: 'shortVideo';
	title: string;
	videoId: string;
	videoThumbnails: ThumbnailObject[];

	lengthSeconds: number;
	viewCount: number;

	author: string;
	authorId: string;
	authorUrl: string;

	published: number;
	publishedText: string;
};

export type GetChannelById = {
	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;
	authorBanners: ImageObject[];
	authorThumbnails: ImageObject[];

	subCount: number;
	totalViews: number;
	joined: UnixTimestampSeconds;

	autoGenerated: boolean;
	isFamilyFriendly: boolean;

	description: string;
	descriptionHtml: string;
	allowedRegions: string[];

	tabs: string[];

	latestVideos: VideoObject[];
	relatedChannels: ChannelObject[];
};

export type GetRelatedChannelsFromChannelIdParams = {
	continuation: string;
};

export type GetRelatedChannelsFromChannelId = {
	relatedChannels: ChannelObject[];
	continuation: string;
};

export type GetChannelPlaylistsParams = {
	continuation?: string;
	sort_by: 'oldest' | 'newest' | 'last';
};

export type GetChannelPlaylists = {
	playlists: PlaylistObject[];
	continuation: string;
};

export type GetChannelShortsParams = { continuation?: string };
export type GetChannelStreamsParams = GetChannelVideosParams;
export type GetChannelVideosParams = {
	continuation?: string;
	sort_by: 'newest' | 'popular' | 'oldest';
};
export type GetChannelVideos = {
	videos: VideoObject[];
	continuation: string;
};

export type VideoAttachment = VideoObject;
export type PlaylistAttachment = PlaylistObject;
export type ImageAttachment = {
	type: 'image';
	imageThumbnails: ImageObject[];
};
export type MultiImageAttachment = {
	type: 'multiImage';
	images: ImageObject[][];
};
export type PollAttachment = {
	type: 'poll';
	totalVotes: number;
	choices: { text: string; image?: ImageObject }[];
};

export type Attachment =
	| ImageAttachment
	| MultiImageAttachment
	| VideoAttachment
	| PollAttachment
	| PlaylistAttachment;
export type GetChannelCommunityPostsParams = {
	continuation: string;
};
export type CommunityPost = {
	attachment?: Attachment;
	author: string;
	authorIsChannelOwner: boolean;
	authorId: string;
	authorThumbnails: ImageObject[];
	authorUrl: string;
	commentId: string;
	content: string;
	contentHtml: string;
	isEdited: boolean;
	likeCount: number;
	published: number;
	publishedText: string;
	replyCount: number;
};
export type GetChannelCommunityPosts = {
	authorId: string;
	comments: CommunityPost[];
	continuation: string;
};
export type GetChannelCommunityPost = {
	authorId: string;
	singlePost: boolean;
	comments: CommunityPost[];
};
export type GetChannelCommunityPostComments = {
	commentCount: number;
	postId: string;
	continuation?: string;
	comments: Comment[];
};
export type GetChannelCommunityPostCommentsParams = {
	ucid: string;
	action?: 'action_get_comment_replies';
	continuation?: string;
};

export type GetChannelSearchParams = {
	q: string;
	page: number;
};

export type ChannelSearchVideoObject = {
	type: 'video';
	title: string;
	videoId: string;
	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;
	videoThumbnails: ThumbnailObject[];
	description: string;
	descriptionHtml: string;
	isUpcoming: boolean;
	viewCount: number;
	viewCountText: string;
	published: number;
	publishedText: string;
	lengthSeconds: number;
	liveNow: boolean;
	paid: boolean;
	premium: boolean;
};
export type ChannelSearchPlaylistObject = {
	type: 'playlist';
	title: string;
	playlistId: string;
	playlistThumbnail: string;
	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;

	videoCount: number;
	videos: {
		title: string;
		videoId: string;
		lengthSeconds: number;
		videoThumbnails: ThumbnailObject[];
	}[];
};
export type ChannelSearchChannelObject = {
	type: 'channel';
	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;
	autoGenerated: boolean;
	authorThumbnails: ThumbnailObject[]; // maybe doesn't have quality?
	subCount: number;
	videoCount: number;
	description: string;
	descriptionHtml: string;
};
export type GetChannelSearch =
	| ChannelSearchVideoObject
	| ChannelSearchPlaylistObject
	| ChannelSearchChannelObject;

export type GetSearchSuggestionsParams = {
	q: string;
};

export type GetSearchSuggestions = {
	query: string;
	suggestions: string[];
};

export const sortByArray = ['relevance', 'rating', 'date', 'views'] as const;
export type SortBy = (typeof sortByArray)[number];
export const dateArray = ['none', 'hour', 'today', 'week', 'month', 'year'] as const;
export type DateOption = (typeof dateArray)[number];
export const durationArray = ['none', 'short', 'long', 'medium'] as const;
export type Duration = (typeof durationArray)[number];
export const typeArray = ['all', 'video', 'playlist', 'channel', 'movie', 'show', 'all'] as const;
export type ResultType = (typeof typeArray)[number];
export const featuresArray = [
	'hd',
	'subtitles',
	'creative_commons',
	'3d',
	'live',
	'purchased',
	'4k',
	'360',
	'location',
	'hdr',
	'vr180'
] as const;
export type VideoFeatures = (typeof featuresArray)[number];
export type GetSearchParams = {
	q: string;
	page: number;
	sort?: SortBy;
	date?: DateOption;
	duration?: Duration;
	type?: ResultType;
	features?: VideoFeatures[];
	region?: ISO3166;
};

export type GetSearch =
	| {
			type: 'video';
			title: string;
			videoId: string;
			author: string;
			authorId: string;
			authorUrl: string;
			authorVerified: boolean;
			videoThumbnails: ThumbnailObject[];
			description: string;
			descriptionHtml: string;
			viewCount: number;
			viewCountText: string;
			isUpcoming: boolean;
			published: number;
			publishedText: string;
			lengthSeconds: number;
			liveNow: boolean;
			paid: boolean;
			premium: boolean;
	  }
	| {
			type: 'playlist';
			title: string;
			playlistId: string;
			playlistThumbnail: string;
			author: string;
			authorId: string;
			authorUrl: string;
			authorVerified: boolean;

			videoCount: number;
			videos: {
				title: string;
				videoId: string;
				lengthSeconds: number;
				videoThumbnails: ThumbnailObject[];
			}[];
	  }
	| {
			type: 'channel';
			author: string;
			authorId: string;
			authorUrl: string;
			authorVerified: boolean;

			authorThumbnails: {
				url: string;
				width: number;
				height: number;
			}[];
			autoGenerated: boolean;
			subCount: number;
			videoCount: number;
			description: string;
			descriptionHtml: string;
	  };
[];

export type GetPlaylistsByPlidParams =
	| {
			page: number;
	  }
	| {
			index: number;
			continuation: string;
	  };

export type GetPlaylistsByPlid = {
	title: string;
	playlistId: string;
	playlistThumbnail: string;

	author: string;
	authorId: string;
	authorThumbnails: {
		url: string;
		width: string;
		height: string;
	}[];
	description: string;
	descriptionHtml: string;

	videoCount: number;
	viewCount: number;
	updated: number;

	videos: {
		title: string;
		videoId: string;
		author: string;
		authorId: string;
		authorUrl: string;

		videoThumbnails: ThumbnailObject[];
		index: number;
		lengthSeconds: number;
	}[];
};

export type GetMixesByRdid = {
	title: string;
	mixId: string;
	videos: {
		title: string;
		videoId: string;
		author: string;
		authorId: string;
		authorUrl: string;
		videoThumbnails: ThumbnailObject[];
		index: number;
		lengthSeconds: number;
	}[];
};

export type ImageObject = {
	url: string;
	width: number;
	height: number;
};

export type ThumbnailObject = {
	quality: string;
	url: string;
	width: number;
	height: number;
};

export type VideoObject = {
	type: 'video';

	title: string;
	videoId: string;

	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;

	videoThumbnails: ThumbnailObject[];

	description: string;
	descriptionHtml: string;

	viewCount: number;
	viewCountText: string;
	lengthSeconds: number;

	published: UnixTimestampSeconds;
	publishedText: string;

	// Only available on premiered videos
	premiereTimestamp?: UnixTimestampSeconds;

	liveNow: boolean;
	premium: boolean;
	isUpcoming: boolean;
};

export type ChannelObject = {
	type: 'channel';

	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;
	authorThumbnails: ThumbnailObject[];

	autoGenerated: boolean;
	subCount: number;
	videoCount: number;

	description: string;
	descriptionHtml: string;
};

export type PlaylistVideoObject = {
	title: string;
	videoId: string;
	lengthSeconds: number;
	videoThumbnails: ThumbnailObject[];
};

export type PlaylistObject = {
	type: 'playlist';

	title: string;
	playlistId: string;
	playlistThumbnail: string;

	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;

	videoCount: number;
	videos: PlaylistVideoObject[];
};
