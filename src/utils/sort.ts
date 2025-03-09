import { MediaTag, UserAnimeListCollectionQuery } from '@/api/anilist/__genereated__/gql';
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

export const sortLists = (
	data: NonNullable<
		NonNullable<NonNullable<UserAnimeListCollectionQuery['MediaListCollection']>['lists']>[0]
	>['entries'],
	sort: ListSortOptionsType,
) => {
	if (!data) {
		return [];
	}
	const data_copy: NonNullable<
		NonNullable<NonNullable<UserAnimeListCollectionQuery['MediaListCollection']>['lists']>[0]
	>['entries'] = [...data];
	switch (sort) {
		case ListSortOptions.AddedTimeDesc:
			return data_copy.sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));
		case ListSortOptions.AddedTime:
			return data_copy.sort((a, b) => (a?.createdAt ?? 0) - (b?.createdAt ?? 0));

		case ListSortOptions.ProgressDesc:
			return data_copy.sort((a, b) => (b?.progress ?? 0) - (a?.progress ?? 0));
		case ListSortOptions.Progress:
			return data_copy.sort((a, b) => (a?.progress ?? 0) - (b?.progress ?? 0));

		case ListSortOptions.UpdatedTimeDesc:
			return data_copy.sort((a, b) =>
				(b?.updatedAt ?? 0) - (a?.updatedAt ?? 0) === 0
					? (a?.media?.title?.romaji ?? '').toUpperCase() <
						(b?.media?.title?.romaji ?? '').toUpperCase()
						? -1
						: 1
					: (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0),
			);
		case ListSortOptions.UpdatedTime:
			return data_copy.sort((a, b) =>
				(a?.updatedAt ?? 0) - (b?.updatedAt ?? 0) === 0
					? (a?.media?.title?.romaji?.toUpperCase() ?? '') <
						(b?.media?.title?.romaji?.toUpperCase() ?? 0)
						? -1
						: 1
					: (a?.updatedAt ?? 0) - (b?.updatedAt ?? 0),
			);

		case ListSortOptions.MediaTitleRomajiDesc:
			return data_copy.sort((a, b) =>
				(a?.media?.title?.romaji?.toUpperCase() ?? '') <
					(b?.media?.title?.romaji?.toUpperCase() ?? '')
					? -1
					: 1,
			);
		case ListSortOptions.MediaTitleRomaji:
			return data_copy.sort((a, b) =>
				(a?.media?.title?.romaji?.toUpperCase() ?? '') <
					(b?.media?.title?.romaji?.toUpperCase() ?? '')
					? 1
					: -1,
			);

		case ListSortOptions.MediaTitleEnglishDesc:
			return data_copy.sort((a, b) => {
				if (!a?.media?.title?.english) {
					return 1;
				}
				if (!b?.media?.title?.english) {
					return -1;
				}
				return a.media.title.english?.toUpperCase() < b.media.title.english?.toUpperCase()
					? -1
					: 1;
			});
		case ListSortOptions.MediaTitleEnglish:
			return data_copy.sort((a, b) => {
				if (!a?.media?.title?.english) {
					return -1;
				}
				if (!b?.media?.title?.english) {
					return 1;
				}
				return a.media.title.english?.toUpperCase() < b.media.title.english?.toUpperCase()
					? -1
					: 1;
			});

		case ListSortOptions.AverageScoreDesc:
			return data_copy.sort((a, b) => {
				if (!a?.media?.averageScore) {
					return 1;
				}
				if (!b?.media?.averageScore) {
					return -1;
				}
				if (a?.media?.averageScore === b?.media?.averageScore) {
					return 0;
				}
				return (b?.media?.meanScore ?? 0) - (a?.media?.meanScore ?? 0);
			});
		case ListSortOptions.AverageScore:
			return data_copy.sort((a, b) => {
				if (!a?.media?.averageScore) {
					return -1;
				}
				if (!b?.media?.averageScore) {
					return 1;
				}
				if (a?.media?.averageScore === b?.media?.averageScore) {
					return 0;
				}
				return (a?.media?.meanScore ?? 0) - (b?.media?.meanScore ?? 0);
			});

		case ListSortOptions.MeanScoreDesc:
			return data_copy.sort((a, b) => {
				if (!a?.media?.meanScore) {
					return 1;
				}
				if (!b?.media?.meanScore) {
					return -1;
				}
				if (a?.media?.meanScore === b?.media?.meanScore) {
					return 0;
				}
				return b?.media?.meanScore - a?.media?.meanScore;
			});
		case ListSortOptions.MeanScore:
			return data_copy.sort((a, b) => {
				if (!a?.media?.meanScore) {
					return -1;
				}
				if (!b?.media?.meanScore) {
					return 1;
				}
				if (a?.media?.meanScore === b?.media?.meanScore) {
					return 0;
				}
				return a?.media?.meanScore - b?.media?.meanScore;
			});
		default:
			return null;
		// case MediaListSort.StartedOnDesc:
		//     return data_copy.sort((a, b) => () - a.startedAt);
	}
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
