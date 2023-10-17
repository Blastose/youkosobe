export type ChannelTab = {
	display: string;
	hrefFragment: string;
};
export const channelTabs: ChannelTab[] = [
	{
		display: 'home',
		hrefFragment: 'home'
	},
	{
		display: 'videos',
		hrefFragment: 'videos'
	},
	{
		display: 'shorts',
		hrefFragment: 'shorts'
	},
	{
		display: 'live',
		hrefFragment: 'streams'
	},
	{
		display: 'playlists',
		hrefFragment: 'playlists'
	},
	{
		display: 'community',
		hrefFragment: 'community'
	},
	{
		display: 'channels',
		hrefFragment: 'channels'
	},
	{
		display: 'about',
		hrefFragment: 'about'
	}
];
