import {
	MediaFormat,
	MediaSort,
	SearchAnimeQueryVariables,
	SearchMangaQueryVariables,
} from '@/api/anilist/__genereated__/gql';

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

export const ANIME_DANGER: SearchAnimeQueryVariables = {
	chapters: undefined,
	chapters_greater: undefined,
	chapters_lesser: undefined,
	volumes: undefined,
	volumes_greater: undefined,
	volumes_lesser: undefined,
};

export const MANGA_DANGER: SearchMangaQueryVariables = {
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

export type AvailableSorts =
	| 'SEARCH_MATCH'
	| 'TRENDING'
	| 'POPULAR'
	| 'SCORE'
	| 'UPDATED_AT'
	| 'START_DATE'
	| 'END_DATE'
	| 'EPISODES'
	| 'CHAPTERS'
	| 'VOLUMES';

export const AnimeSorts: AvailableSorts[] = [
	'SEARCH_MATCH',
	'TRENDING',
	'POPULAR',
	'SCORE',
	'UPDATED_AT',
	'START_DATE',
	'END_DATE',
	'EPISODES',
];

export const MangaSorts: AvailableSorts[] = [
	'SEARCH_MATCH',
	'TRENDING',
	'POPULAR',
	'SCORE',
	'UPDATED_AT',
	'START_DATE',
	'END_DATE',
	'CHAPTERS',
	'VOLUMES',
];

export const DescSorts = {
	SEARCH_MATCH: [MediaSort.SearchMatch],
	TRENDING: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
	POPULAR: [MediaSort.PopularityDesc],
	SCORE: [MediaSort.ScoreDesc],
	UPDATED_AT: [MediaSort.UpdatedAtDesc],
	START_DATE: [MediaSort.StartDateDesc],
	END_DATE: [MediaSort.EndDateDesc],
	EPISODES: [MediaSort.EpisodesDesc],
	CHAPTERS: [MediaSort.ChaptersDesc],
	VOLUMES: [MediaSort.VolumesDesc],
};

export const AscSorts = {
	SEARCH_MATCH: [MediaSort.SearchMatch],
	TRENDING: [MediaSort.Trending, MediaSort.Popularity],
	POPULAR: [MediaSort.Popularity],
	SCORE: [MediaSort.Score],
	UPDATED_AT: [MediaSort.UpdatedAt],
	START_DATE: [MediaSort.StartDate],
	END_DATE: [MediaSort.EndDate],
	EPISODES: [MediaSort.Episodes],
	CHAPTERS: [MediaSort.Chapters],
	VOLUMES: [MediaSort.Volumes],
};

export const AnimeFormats = [
	MediaFormat.Movie,
	MediaFormat.Tv,
	MediaFormat.Ova,
	MediaFormat.Ona,
	MediaFormat.Music,
	MediaFormat.Special,
	MediaFormat.TvShort,
];

export const MangaFormats = [MediaFormat.Manga, MediaFormat.Novel, MediaFormat.OneShot];
