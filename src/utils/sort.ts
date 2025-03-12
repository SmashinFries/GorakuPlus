import {
	FuzzyDate,
	MediaTag,
	UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList,
	UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList,
} from '@/api/anilist/__genereated__/gql';
import { ListSortOptions, ListSortOptionsType } from '@/types/anilist';

export const sortTagsRank = (tags: MediaTag[]) => {
	const highestRateTags: MediaTag[] = tags ? tags.map((tag) => tag) : [];
	if (highestRateTags) {
		const sortedTags = highestRateTags?.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
		return sortedTags;
	} else {
		return [];
	}
};

export const isSame = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);

	return obj1Keys.length === obj2Keys.length && obj1Keys.every((key) => obj1[key] === obj2[key]);
};

type CompareItem =
	| UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList
	| UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList
	| null;
// Separate comparison functions
const compareByTime = (
	a: CompareItem,
	b: CompareItem,
	key: keyof UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList,
	isDesc: boolean,
) => {
	const factor = isDesc ? -1 : 1;
	return factor * ((a?.[key] ?? 0) - (b?.[key] ?? 0));
};

const compareByString = (
	a: string | null | undefined,
	b: string | null | undefined,
	isDesc: boolean,
) => {
	const aTitle = a?.toUpperCase() ?? '';
	const bTitle = b?.toUpperCase() ?? '';

	if (!a) return isDesc ? -1 : 1;
	if (!b) return isDesc ? 1 : -1;

	return isDesc ? (aTitle < bTitle ? 1 : -1) : aTitle < bTitle ? -1 : 1;
};

const compareByNumber = (
	a: number | null | undefined,
	b: number | null | undefined,
	isDesc: boolean,
) => {
	if (!a) return isDesc ? 1 : -1;
	if (!b) return isDesc ? -1 : 1;
	if (a === b) return 0;

	const factor = isDesc ? -1 : 1;
	return factor * ((a ?? 0) - (b ?? 0));
};

const compareByFuzzyDate = (
	a: FuzzyDate | null | undefined,
	b: FuzzyDate | null | undefined,
	isDesc: boolean,
) => {
	// Handle null/undefined cases
	if (!a) return isDesc ? 1 : -1;
	if (!b) return isDesc ? -1 : 1;

	// Compare years first
	if (a.year !== b.year) {
		if (!a.year) return isDesc ? 1 : -1;
		if (!b.year) return isDesc ? -1 : 1;
		return isDesc ? b.year - a.year : a.year - b.year;
	}

	// If years are equal, compare months
	if (a.month !== b.month) {
		if (!a.month) return isDesc ? 1 : -1;
		if (!b.month) return isDesc ? -1 : 1;
		return isDesc ? b.month - a.month : a.month - b.month;
	}

	// If months are equal, compare days
	if (a.day !== b.day) {
		if (!a.day) return isDesc ? 1 : -1;
		if (!b.day) return isDesc ? -1 : 1;
		return isDesc ? b.day - a.day : a.day - b.day;
	}

	// If all components are equal
	return 0;
};

type SortingFunctionData =
	| (UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList | null)[]
	| (UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList | null)[];
// Sorting functions map
const sortingFunctions = {
	[ListSortOptions.AddedTimeDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByTime(a, b, 'createdAt', true)),
	[ListSortOptions.AddedTime]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByTime(a, b, 'createdAt', false)),

	[ListSortOptions.ProgressDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByTime(b, a, 'progress', true)),
	[ListSortOptions.Progress]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByTime(a, b, 'progress', false)),

	[ListSortOptions.MediaTitleNativeDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByString(a?.media?.title?.native, b?.media?.title?.native, true),
		),
	[ListSortOptions.MediaTitleNative]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByString(a?.media?.title?.native, b?.media?.title?.native, false),
		),

	[ListSortOptions.MediaTitleRomajiDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByString(a?.media?.title?.romaji, b?.media?.title?.romaji, true),
		),
	[ListSortOptions.MediaTitleRomaji]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByString(a?.media?.title?.romaji, b?.media?.title?.romaji, false),
		),

	[ListSortOptions.MediaTitleEnglishDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByString(a?.media?.title?.english, b?.media?.title?.english, true),
		),
	[ListSortOptions.MediaTitleEnglish]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByString(a?.media?.title?.english, b?.media?.title?.english, false),
		),

	[ListSortOptions.AverageScoreDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByNumber(a?.media?.averageScore, b?.media?.averageScore, true),
		),
	[ListSortOptions.AverageScore]: (data: SortingFunctionData) =>
		[...data].sort((a, b) =>
			compareByNumber(a?.media?.averageScore, b?.media?.averageScore, false),
		),

	[ListSortOptions.MeanScoreDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.media?.meanScore, b?.media?.meanScore, true)),
	[ListSortOptions.MeanScore]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.media?.meanScore, b?.media?.meanScore, false)),

	[ListSortOptions.ScoreDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.score, b?.score, true)),
	[ListSortOptions.Score]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.score, b?.score, false)),

	[ListSortOptions.UpdatedTimeDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.updatedAt, b?.updatedAt, true)),
	[ListSortOptions.UpdatedTime]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.updatedAt, b?.updatedAt, false)),

	[ListSortOptions.StartedOnDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByFuzzyDate(a?.startedAt, b?.startedAt, true)),
	[ListSortOptions.StartedOn]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByFuzzyDate(a?.startedAt, b?.startedAt, false)),

	[ListSortOptions.FinishedOnDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByFuzzyDate(a?.completedAt, b?.completedAt, true)),
	[ListSortOptions.FinishedOn]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByFuzzyDate(a?.completedAt, b?.completedAt, true)),

	[ListSortOptions.RepeatDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.repeat, b?.repeat, true)),
	[ListSortOptions.Repeat]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.repeat, b?.repeat, false)),

	[ListSortOptions.MediaPopularityDesc]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.media?.popularity, b?.media?.popularity, true)),
	[ListSortOptions.MediaPopularity]: (data: SortingFunctionData) =>
		[...data].sort((a, b) => compareByNumber(a?.media?.popularity, b?.media?.popularity, false)),
};

// Simplified main function
export const sortLists = (
	data:
		| (UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList | null)[]
		| (UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList | null)[]
		| null
		| undefined,
	sort: ListSortOptionsType,
) => {
	if (!data) return [];

	const sortFn = sortingFunctions[sort];
	return sortFn ? sortFn(data) : null;
};

export const sortListTabs = (
	listNames: string[],
	tabOrder: string[],
	listCounts: { [key: string]: number },
) => {
	const orderedRouteNames = tabOrder.map((routeName) => routeName);
	const newRoutes = tabOrder.map((routeName) => ({
		key: routeName,
		title: `${routeName} (${listCounts[routeName] ?? 0})`,
	}));
	for (const name of listNames) {
		if (!orderedRouteNames.includes(name)) {
			newRoutes.push({ key: name, title: `${name}  (${listCounts[name] ?? 0})` });
		}
	}
	return newRoutes;
};
