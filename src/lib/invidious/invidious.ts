import type {
	GetCaptionsById,
	GetCommentsById,
	GetCaptionsByIdParams,
	GetCommentsByIdParams,
	GetTrendingParams,
	GetVideoByIdParams,
	GetStats,
	GetTrending,
	GetVideoById,
	GetPopular,
	GetChannelSearch,
	GetChannelSearchParams,
	GetSearchSuggestions,
	GetSearchSuggestionsParams,
	GetSearchParams,
	GetSearch,
	GetPlaylistsByPlidParams,
	GetPlaylistsByPlid,
	GetMixesByRdid,
	GetRelatedChannelsFromChannelIdParams,
	GetRelatedChannelsFromChannelId,
	GetChannelById,
	GetChannelPlaylists,
	GetChannelPlaylistsParams,
	GetChannelShortsParams,
	GetChannelVideos,
	GetChannelStreamsParams,
	GetChannelVideosParams,
	GetChannelCommunityPosts,
	GetChannelCommunityPostsParams,
	ISO3166,
	GetChannelCommunityPostCommentsParams,
	GetChannelCommunityPostComments,
	GetChannelCommunityPost
} from './types';

type QueryParams = Record<string, number | string | string[]>;

function buildQueryString(params?: QueryParams): string {
	if (!params) return '';

	let queryString = '';
	Object.entries(params).forEach(([name, recordValue], index) => {
		let value: string | number = '';
		if (Array.isArray(recordValue)) {
			if (recordValue.length > 0) {
				value = recordValue.join(',');
			} else {
				return;
			}
		} else {
			value = recordValue;
		}
		if (index === 0) {
			queryString = `${name}=${value}`;
		} else {
			queryString = `${queryString}&${name}=${value}`;
		}
	});
	return queryString;
}

export class Invidious {
	instanceUrl: string;
	apiVersionPrefix: string;
	lang: ISO3166;

	constructor(instanceUrl: string) {
		this.instanceUrl = instanceUrl;
		this.apiVersionPrefix = '/api/v1';
		this.lang = 'en-US';
	}

	private async get<T>(url: string, params?: QueryParams) {
		const fetchUrl = `${this.instanceUrl}${url}?hl=${this.lang}&${buildQueryString(params)}`;
		const res = await fetch(fetchUrl);

		if (res.status !== 200) {
			throw new Error(`Error fetching ${fetchUrl}`);
		}

		return (await res.json()) as T;
	}

	async getStats() {
		const url = `${this.apiVersionPrefix}/stats`;
		return await this.get<GetStats>(url);
	}

	async getVideoById(id: string, params?: GetVideoByIdParams) {
		const url = `${this.apiVersionPrefix}/videos/${id}`;
		return await this.get<GetVideoById>(url, params);
	}

	// getAnnotationsById (not implemeneted)

	async getCommentsById(id: string, params?: GetCommentsByIdParams) {
		const url = `${this.apiVersionPrefix}/comments/${id}`;
		return await this.get<GetCommentsById>(url, params);
	}

	async getCaptionsById(id: string, params: GetCaptionsByIdParams) {
		const url = `${this.apiVersionPrefix}/captions/${id}`;
		return await this.get<GetCaptionsById>(url, params);
	}

	async getTrending(params?: GetTrendingParams) {
		const url = `${this.apiVersionPrefix}/trending`;
		return await this.get<GetTrending[]>(url, params);
	}

	async getPopular(): Promise<GetPopular[]> {
		const url = `${this.apiVersionPrefix}/popular`;
		return await this.get<GetPopular[]>(url);
	}

	async getChannelById(id: string) {
		const url = `${this.apiVersionPrefix}/channels/${id}`;
		return await this.get<GetChannelById>(url);
	}

	async getRelatedChannelsFromChannelId(
		id: string,
		params?: GetRelatedChannelsFromChannelIdParams
	) {
		const url = `${this.apiVersionPrefix}/channels/${id}/channels`;
		return await this.get<GetRelatedChannelsFromChannelId>(url, params);
	}

	async getChannelPlaylists(id: string, params?: GetChannelPlaylistsParams) {
		const url = `${this.apiVersionPrefix}/channels/${id}/playlists`;
		return await this.get<GetChannelPlaylists>(url, params);
	}

	async getChannelPodcasts(id: string, params?: GetChannelPlaylistsParams) {
		const url = `${this.apiVersionPrefix}/channels/${id}/podcasts`;
		return await this.get<GetChannelPlaylists>(url, params);
	}

	async getChannelShorts(id: string, params?: GetChannelShortsParams) {
		const url = `${this.apiVersionPrefix}/channels/${id}/shorts`;
		return await this.get<GetChannelVideos>(url, params);
	}

	async getChannelStreams(id: string, params?: GetChannelStreamsParams) {
		const url = `${this.apiVersionPrefix}/channels/${id}/streams`;
		return await this.get<GetChannelVideos>(url, params);
	}

	async getChannelVideos(id: string, params?: GetChannelVideosParams) {
		const url = `${this.apiVersionPrefix}/channels/${id}/videos`;
		return await this.get<GetChannelVideos>(url, params);
	}

	async getChannelCommunityPosts(id: string, params?: GetChannelCommunityPostsParams) {
		const url = `${this.apiVersionPrefix}/channels/${id}/community`;
		try {
			return await this.get<GetChannelCommunityPosts>(url, params);
		} catch {
			return { authorId: 'unknown', comments: [], continuation: '' } as GetChannelCommunityPosts;
		}
	}

	async getChannelCommunityPost(postId: string) {
		const url = `${this.apiVersionPrefix}/post/${postId}`;
		return await this.get<GetChannelCommunityPost>(url);
	}

	async getChannelCommunityPostComments(
		postId: string,
		params: GetChannelCommunityPostCommentsParams
	) {
		const url = `${this.apiVersionPrefix}/post/${postId}/comments`;
		return await this.get<GetChannelCommunityPostComments>(url, params);
	}

	async getChannelSearch(id: string, params: GetChannelSearchParams) {
		const url = `${this.apiVersionPrefix}/channels/search/${id}`;
		return await this.get<GetChannelSearch[]>(url, params);
	}

	async getSearchSuggestions(params: GetSearchSuggestionsParams) {
		const url = `${this.apiVersionPrefix}/search/suggestions`;
		return await this.get<GetSearchSuggestions>(url, params);
	}

	async getSearch(params: GetSearchParams) {
		const url = `${this.apiVersionPrefix}/search`;
		console.log(`${this.instanceUrl}${url}?hl=${this.lang}&${buildQueryString(params)}`);

		return await this.get<GetSearch[]>(url, params);
	}

	async getPlaylistsByPlid(plid: string, params: GetPlaylistsByPlidParams) {
		const url = `${this.apiVersionPrefix}/playlists/${plid}`;
		return await this.get<GetPlaylistsByPlid>(url, params);
	}

	async getMixesByRdid(rdid: string) {
		const url = `${this.apiVersionPrefix}/mixes/${rdid}`;
		return await this.get<GetMixesByRdid[]>(url);
	}
}
