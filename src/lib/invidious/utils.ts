import { Invidious } from './invidious';

export async function getInvidiousUrl() {
	const urlOrNull = localStorage.getItem('invidious-instance') as string | null;

	let url: string | null = null;
	if (!urlOrNull) {
		const instances = await getInstances();

		url = instances[Math.floor(Math.random() * instances.length)][1].uri;
	} else {
		url = urlOrNull;
	}

	return url;
}

export async function createInvidious() {
	const url = await getInvidiousUrl();

	return new Invidious(url);
}

function persistInstancesToLocalStorage(instances: InvidiousInstanceStatus[]) {
	localStorage.setItem(
		'invidious-instances-json',
		JSON.stringify({
			lastFecthedSeconds: Math.floor(Date.now() / 1000),
			status: instances
		})
	);
}

export async function getInstances() {
	const updateInterval = 86400; // One day in seconds
	const instancesOrNull = localStorage.getItem('invidious-instances-json');

	if (instancesOrNull) {
		const instancesJson: {
			lastFetchedSeconds: number;
			status: InvidiousInstanceStatus[];
		} = JSON.parse(instancesOrNull);

		if (instancesJson.lastFetchedSeconds + updateInterval < Math.floor(Date.now() / 1000) / 1000) {
			const res = await fetch(
				'https://api.invidious.io/instances.json?pretty=1&sort_by=type,users'
			);
			const newInstancesJson = (await res.json()) as InvidiousInstanceStatus[];
			const apiAvailable = newInstancesJson.filter((v) => {
				return v[1].api && v[1].type?.startsWith('https');
			});

			persistInstancesToLocalStorage(apiAvailable);
			return apiAvailable;
		} else {
			return instancesJson.status;
		}
	} else {
		const res = await fetch('https://api.invidious.io/instances.json?pretty=1&sort_by=type,users');
		const newInstancesJson = (await res.json()) as InvidiousInstanceStatus[];
		const apiAvailable = newInstancesJson.filter((v) => {
			return v[1].api && v[1].type?.startsWith('https');
		});
		persistInstancesToLocalStorage(apiAvailable);
		return apiAvailable;
	}
}

export type InvidiousInstanceStatus = [
	string,
	{
		flag: 'string';
		region: string;
		stats?: {
			version: string;
			software: {
				name: string;
				version: string;
				branch: string;
			};
			openRegistrations: boolean;
			usage: {
				user: {
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
		cors?: boolean;
		api?: boolean;
		type?: string;
		uri: string;
		monitor?: {
			monitorId: number;
			createdAt: number;
			statusClass: string;
			name: string;
			url: null;
			type: string;
			dailyRatios: Ratio[];
			'90dRatio': Ratio;
			'30dRatio': Ratio;
		};
	}
];

type Ratio = {
	ratio: string;
	label: string;
};
