import { MediaTag, UserAnimeListCollectionQuery } from '@/api/anilist/__genereated__/gql';
import { ListSortOptions, ListSortOptionsType } from '@/types/anilist';

export const sortTagsRank = (tags: MediaTag[]) => {
	const highestRateTags: MediaTag[] = tags ? tags.map((tag) => tag) : [];
	if (highestRateTags) {
		const sortedTags = highestRateTags?.sort((a, b) => b.rank - a.rank);
		return sortedTags;
	} else {
		return [];
	}
};

export const isSame = (obj1: object, obj2: object) => {
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);

	return obj1Keys.length === obj2Keys.length && obj1Keys.every((key) => obj1[key] === obj2[key]);
};

export const sortLists = (
	data: UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]['entries'],
	sort: ListSortOptionsType,
) => {
	if (!data) {
		return [];
	}
	const data_copy: UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]['entries'] = [
		...data,
	];
	switch (sort) {
		case ListSortOptions.AddedTimeDesc:
			return data_copy.sort((a, b) => b.createdAt - a.createdAt);
		case ListSortOptions.AddedTime:
			return data_copy.sort((a, b) => a.createdAt - b.createdAt);

		case ListSortOptions.ProgressDesc:
			return data_copy.sort((a, b) => b.progress - a.progress);
		case ListSortOptions.Progress:
			return data_copy.sort((a, b) => a.progress - b.progress);

		case ListSortOptions.UpdatedTimeDesc:
			return data_copy.sort((a, b) =>
				b.updatedAt - a.updatedAt === 0
					? a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase()
						? -1
						: 1
					: b.updatedAt - a.updatedAt,
			);
		case ListSortOptions.UpdatedTime:
			return data_copy.sort((a, b) =>
				a.updatedAt - b.updatedAt === 0
					? a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase()
						? -1
						: 1
					: a.updatedAt - b.updatedAt,
			);

		case ListSortOptions.MediaTitleRomajiDesc:
			return data_copy.sort((a, b) =>
				a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase() ? -1 : 1,
			);
		case ListSortOptions.MediaTitleRomaji:
			return data_copy.sort((a, b) =>
				a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase() ? 1 : -1,
			);

		case ListSortOptions.MediaTitleEnglishDesc:
			return data_copy.sort((a, b) => {
				if (!a.media.title.english) {
					return 1;
				}
				if (!b.media.title.english) {
					return -1;
				}
				return a.media.title.english?.toUpperCase() < b.media.title.english?.toUpperCase()
					? -1
					: 1;
			});
		case ListSortOptions.MediaTitleEnglish:
			return data_copy.sort((a, b) => {
				if (!a.media.title.english) {
					return -1;
				}
				if (!b.media.title.english) {
					return 1;
				}
				return a.media.title.english?.toUpperCase() < b.media.title.english?.toUpperCase()
					? -1
					: 1;
			});

		case ListSortOptions.AverageScoreDesc:
			return data_copy.sort((a, b) => {
				if (!a.media.averageScore) {
					return 1;
				}
				if (!b.media.averageScore) {
					return -1;
				}
				if (a.media.averageScore === b.media.averageScore) {
					return 0;
				}
				return b.media.meanScore - a.media.meanScore;
			});
		case ListSortOptions.AverageScore:
			return data_copy.sort((a, b) => {
				if (!a.media.averageScore) {
					return -1;
				}
				if (!b.media.averageScore) {
					return 1;
				}
				if (a.media.averageScore === b.media.averageScore) {
					return 0;
				}
				return a.media.meanScore - b.media.meanScore;
			});

		case ListSortOptions.MeanScoreDesc:
			return data_copy.sort((a, b) => {
				if (!a.media.meanScore) {
					return 1;
				}
				if (!b.media.meanScore) {
					return -1;
				}
				if (a.media.meanScore === b.media.meanScore) {
					return 0;
				}
				return b.media.meanScore - a.media.meanScore;
			});
		case ListSortOptions.MeanScore:
			return data_copy.sort((a, b) => {
				if (!a.media.meanScore) {
					return -1;
				}
				if (!b.media.meanScore) {
					return 1;
				}
				if (a.media.meanScore === b.media.meanScore) {
					return 0;
				}
				return a.media.meanScore - b.media.meanScore;
			});
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
