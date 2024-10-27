import {
	CharacterSort,
	MediaFormat,
	MediaSearchQueryVariables,
	MediaSort,
	StaffSort,
	StudioSort,
	UserSort,
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

export const ANIME_DANGER: MediaSearchQueryVariables = {
	chapters: undefined,
	chapters_greater: undefined,
	chapters_lesser: undefined,
	volumes: undefined,
	volumes_greater: undefined,
	volumes_lesser: undefined,
};

export const MANGA_DANGER: MediaSearchQueryVariables = {
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

export type AvailableCharSorts = 'FAVOURITES' | 'RELEVENCE' | 'SEARCH_MATCH' | 'ROLE' | 'ID';
export type AvailableStaffSorts =
	| 'FAVOURITES'
	| 'RELEVENCE'
	| 'SEARCH_MATCH'
	| 'ROLE'
	| 'ID'
	| 'LANGUAGE';
export type AvailableStudioSorts = 'FAVOURITES' | 'SEARCH_MATCH' | 'NAME' | 'ID';
export type AvailableUserSorts =
	| 'WATCHED_TIME'
	| 'CHAPTERS_READ'
	| 'SEARCH_MATCH'
	| 'USERNAME'
	| 'ID';

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

export const CharacterSorts = [
	CharacterSort.Favourites,
	CharacterSort.Relevance,
	CharacterSort.SearchMatch,
	CharacterSort.Role,
	CharacterSort.Id,
];

export const StaffSorts = [
	StaffSort.Favourites,
	StaffSort.Relevance,
	StaffSort.SearchMatch,
	StaffSort.Role,
	StaffSort.Language,
	StaffSort.Id,
];

export const StudioSorts = [
	StudioSort.Favourites,
	StudioSort.SearchMatch,
	StudioSort.Name,
	StudioSort.Id,
];

export const UserSorts = [
	UserSort.WatchedTime,
	UserSort.ChaptersRead,
	UserSort.SearchMatch,
	UserSort.Username,
	UserSort.Id,
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

export const CharacterDescSorts = {
	FAVOURITES: [CharacterSort.FavouritesDesc],
	RELEVENCE: [CharacterSort.Relevance],
	SEARCH_MATCH: [CharacterSort.SearchMatch],
	ROLE: [CharacterSort.RoleDesc],
	ID: [CharacterSort.IdDesc],
};

export const StaffDescSorts = {
	FAVOURITES: [CharacterSort.FavouritesDesc],
	RELEVENCE: [CharacterSort.Relevance],
	SEARCH_MATCH: [CharacterSort.SearchMatch],
	ROLE: [CharacterSort.RoleDesc],
	LANGUAGE: [StaffSort.LanguageDesc],
	ID: [CharacterSort.IdDesc],
};

export const StudioDescSorts = {
	FAVOURITES: [StudioSort.FavouritesDesc],
	SEARCH_MATCH: [StudioSort.SearchMatch],
	NAME: [StudioSort.NameDesc],
	ID: [StudioSort.IdDesc],
};

export const UserDescSorts = {
	WATCHED_TIME: [UserSort.WatchedTimeDesc],
	CHAPTERS_READ: [UserSort.ChaptersReadDesc],
	SEARCH_MATCH: [UserSort.SearchMatch],
	USERNAME: [UserSort.UsernameDesc],
	ID: [UserSort.IdDesc],
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

export const CharacterAscSorts = {
	FAVOURITES: [CharacterSort.Favourites],
	RELEVENCE: [CharacterSort.Relevance],
	SEARCH_MATCH: [CharacterSort.SearchMatch],
	ROLE: [CharacterSort.Role],
	ID: [CharacterSort.Id],
};

export const StaffAscSorts = {
	FAVOURITES: [CharacterSort.Favourites],
	RELEVENCE: [CharacterSort.Relevance],
	SEARCH_MATCH: [CharacterSort.SearchMatch],
	ROLE: [CharacterSort.Role],
	LANGUAGE: [StaffSort.Language],
	ID: [CharacterSort.Id],
};

export const StudioAscSorts = {
	FAVOURITES: [StudioSort.Favourites],
	SEARCH_MATCH: [StudioSort.SearchMatch],
	NAME: [StudioSort.Name],
	ID: [StudioSort.Id],
};

export const UserAscSorts = {
	WATCHED_TIME: [UserSort.WatchedTime],
	CHAPTERS_READ: [UserSort.ChaptersRead],
	SEARCH_MATCH: [UserSort.SearchMatch],
	USERNAME: [UserSort.Username],
	ID: [UserSort.Id],
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
