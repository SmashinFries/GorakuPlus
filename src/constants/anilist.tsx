import { MediaFormat, MediaStatus, MediaType } from '@/api/anilist/__genereated__/gql';

export type MediaSearchSelection = MediaType.Anime | MediaType.Manga | 'NOVEL';

export type CommonSort =
	| 'Trending'
	| 'Popularity'
	| 'Score'
	| 'Updated At'
	| 'Start Date'
	| 'End Date';
export type AnimeSort = CommonSort | 'Episodes' | 'Duration';
export type MangaSort = CommonSort | 'Chapters' | 'Volumes';
export type SortCategories =
	| 'Search Match'
	| 'Trending'
	| 'Popularity'
	| 'Score'
	| 'Updated At'
	| 'Episodes'
	| 'Duration'
	| 'Chapters'
	| 'Volumes'
	| 'Start Date'
	| 'End Date';

export const commonSorts: SortCategories[] = [
	'Search Match',
	'Trending',
	'Popularity',
	'Score',
	'Updated At',
	'Start Date',
	'End Date',
];

export const mediaStatusOptions: MediaStatus[] = [
	MediaStatus.Releasing,
	MediaStatus.Finished,
	MediaStatus.NotYetReleased,
	MediaStatus.Cancelled,
	MediaStatus.Hiatus,
];

export const COUNTRY_OPTIONS = {
	ANY: {
		name: '🌏 Global',
		flag: '🌏',
	},
	JP: {
		name: '🇯🇵 Japan',
		flag: '🇯🇵',
	},
	KR: {
		name: '🇰🇷 South Korea',
		flag: '🇰🇷',
	},
	CN: {
		name: '🇨🇳 China',
		flag: '🇨🇳',
	},
	TW: {
		name: '🇹🇼 Taiwan',
		flag: '🇹🇼',
	},
};

export const MEDIA_FORMAT_ALT = {
	[MediaFormat.Manga]: 'Manga',
	[MediaFormat.OneShot]: 'One Shot',
	[MediaFormat.Novel]: 'Light Novel',
	[MediaFormat.Movie]: 'Movie',
	[MediaFormat.Music]: 'Music',
	[MediaFormat.Ona]: 'ONA',
	[MediaFormat.Ova]: 'OVA',
	[MediaFormat.Special]: 'Special',
	[MediaFormat.Tv]: 'TV',
	[MediaFormat.TvShort]: 'TV Short',
};

export const MEDIA_STATUS_ALT = {
	[MediaStatus.Cancelled]: 'Cancelled',
	[MediaStatus.Finished]: 'Finished',
	[MediaStatus.Hiatus]: 'Hiatus',
	[MediaStatus.NotYetReleased]: 'Unreleased',
	[MediaStatus.Releasing]: 'Releasing',
};
