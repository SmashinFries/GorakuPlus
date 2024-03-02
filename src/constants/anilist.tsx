import {
	ExploreMediaQueryVariables,
	MediaFormat,
	MediaSort,
	MediaStatus,
	MediaType,
} from '@/store/services/anilist/generated-anilist';

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

export const animeSort: SortCategories[] = [...commonSorts, 'Episodes', 'Duration'];

export const mangaNovelSort: SortCategories[] = [...commonSorts, 'Chapters', 'Volumes'];

const commonSortMap = {
	'Search Match': {
		desc: [MediaSort.SearchMatch],
		asc: [MediaSort.SearchMatch],
	},
	Trending: {
		desc: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
		asc: [MediaSort.Trending, MediaSort.Popularity],
	},
	Popularity: {
		desc: [MediaSort.PopularityDesc],
		asc: [MediaSort.Popularity],
	},
	Score: {
		desc: [MediaSort.ScoreDesc],
		asc: [MediaSort.Score],
	},
	'Updated At': {
		desc: [MediaSort.UpdatedAtDesc],
		asc: [MediaSort.UpdatedAt],
	},
	'Start Date': {
		desc: [MediaSort.IdDesc, MediaSort.StartDateDesc],
		asc: [MediaSort.Id, MediaSort.StartDate],
	},
	'End Date': {
		desc: [MediaSort.IdDesc, MediaSort.EndDateDesc],
		asc: [MediaSort.Id, MediaSort.EndDate],
	},
};

type SortMap = {
	[MediaType.Anime]: {
		[key in AnimeSort]: {
			desc: MediaSort[];
			asc: MediaSort[];
		};
	};
	[MediaType.Manga]: {
		[key in MangaSort]: {
			desc: MediaSort[];
			asc: MediaSort[];
		};
	};
};
export const sortMap: SortMap = {
	ANIME: {
		...commonSortMap,
		Episodes: {
			desc: [MediaSort.EpisodesDesc],
			asc: [MediaSort.Episodes],
		},
		Duration: {
			desc: [MediaSort.DurationDesc],
			asc: [MediaSort.Duration],
		},
	},
	MANGA: {
		...commonSortMap,
		Chapters: {
			desc: [MediaSort.ChaptersDesc],
			asc: [MediaSort.Chapters],
		},
		Volumes: {
			desc: [MediaSort.VolumesDesc],
			asc: [MediaSort.Volumes],
		},
	},
};

export const mediaStatusOptions: MediaStatus[] = [
	MediaStatus.Releasing,
	MediaStatus.Finished,
	MediaStatus.NotYetReleased,
	MediaStatus.Cancelled,
	MediaStatus.Hiatus,
];

export const ANIME_FORMATS: MediaFormat[] = [
	MediaFormat.Tv,
	MediaFormat.TvShort,
	MediaFormat.Movie,
	MediaFormat.Ova,
	MediaFormat.Ona,
	MediaFormat.Special,
	MediaFormat.Music,
];
export const MANGA_FORMATS: MediaFormat[] = [
	MediaFormat.Manga,
	MediaFormat.OneShot,
	MediaFormat.Novel,
];
// export const NOVEL_FORMATS: MediaFormat[] = [];

export const ANIME_DANGER: ExploreMediaQueryVariables = {
	chapters: undefined,
	chapters_greater: undefined,
	chapters_lesser: undefined,
	volumes: undefined,
	volumes_greater: undefined,
	volumes_lesser: undefined,
};

export const MANGA_DANGER: ExploreMediaQueryVariables = {
	episodes: undefined,
	episodes_greater: undefined,
	episodes_lesser: undefined,
	duration: undefined,
	duration_greater: undefined,
	duration_lesser: undefined,
};

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
