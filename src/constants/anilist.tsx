import { MediaStatus, MediaType } from '@/api/anilist/__genereated__/gql';

export type MediaSearchSelection = MediaType.Anime | MediaType.Manga | 'NOVEL';

export type SearchTypes =
	| MediaType.Anime
	| MediaType.Manga
	| 'users'
	| 'characters'
	| 'staff'
	| 'studios';

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
