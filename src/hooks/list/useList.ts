import { useEffect, useState } from 'react';
import {
	MediaListGroup,
	MediaListSort,
	MediaTag,
	MediaType,
	UserAnimeListCollectionQuery,
	UserMangaListCollectionQuery,
	useUserAnimeListCollectionQuery,
	useUserMangaListCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { useListFilterStore } from '@/store/listStore';
import { useAuthStore } from '@/store/authStore';
import { NavigationState } from 'react-native-tab-view';
import { useShallow } from 'zustand/react/shallow';

const orderList = (listData: string[], order?: string[], isViewer: boolean = false) => {
	if (isViewer && order) {
		const listOrder = listData.sort((a, b) => {
			return order.indexOf(a) - order.indexOf(b);
		});
		return listOrder;
	} else {
		return listData;
	}
};

const useListOrder = (
	animeList: MediaListGroup[],
	mangaList: MediaListGroup[],
	isViewer: boolean = false,
) => {
	const [animeRoutes, setAnimeRoutes] = useState<NavigationState<any>['routes']>();
	const [mangaRoutes, setMangaRoutes] = useState<NavigationState<any>['routes']>();
	const { animeTabOrder, mangaTabOrder, checkListNames } = useListFilterStore(
		useShallow((state) => ({
			animeTabOrder: state.animeTabOrder,
			mangaTabOrder: state.mangaTabOrder,
			checkListNames: state.checkListNames,
		})),
	);

	const getListRoutes = (listData: MediaListGroup[], type: MediaType) => {
		const count = {};
		for (const list of listData) {
			count[list.name] = list.entries.length;
		}
		const listNames = listData
			.filter((list) => list.isSplitCompletedList === false) // remove split lists (like anilist site)
			.sort((a, b) => Number(a.isCustomList) - Number(b.isCustomList)) // puts customs lists at end
			.map((list) => list.name);
		checkListNames(type, listNames);
		const listOrder = orderList(
			listNames,
			type === MediaType.Anime ? animeTabOrder : mangaTabOrder,
			isViewer,
		);
		return listOrder.map((name) => ({
			key: name,
			title: `${name}  (${count[name] ?? 0})`,
		}));
	};

	// const getTotalTitles = (lists: MediaListGroup[] | MediaListGroup[]) => {
	// 	let count = 0;
	// 	for (const list of lists) {
	// 		count += list.entries.length;
	// 	}
	// 	return count;
	// };

	useEffect(() => {
		if (animeList) {
			const routes = getListRoutes(animeList, MediaType.Anime);
			setAnimeRoutes(routes);
		}
		if (mangaList) {
			const routes = getListRoutes(mangaList, MediaType.Manga);
			setMangaRoutes(routes);
		}
	}, [animeList, mangaList]);

	return { animeRoutes, mangaRoutes };
};

const getAllGenres = (
	animeList: UserAnimeListCollectionQuery['MediaListCollection']['lists'],
	mangaList: UserMangaListCollectionQuery['MediaListCollection']['lists'],
) => {
	let genres: string[] = [];
	for (const list of animeList) {
		for (const entry of list.entries) {
			genres = [...genres, ...entry.media.genres];
		}
	}
	for (const list of mangaList) {
		for (const entry of list.entries) {
			genres = [...genres, ...entry.media.genres];
		}
	}

	const occurrences: { [key: string]: number } = genres.reduce(function (obj, val) {
		obj[val] = (obj[val] || 0) + 1;
		return obj;
	}, {});

	const sortedGenres = Object.keys(occurrences).sort((a, b) =>
		a.toUpperCase() < b.toUpperCase() ? -1 : 1,
	);

	return [...new Set(sortedGenres.map((genre) => `${genre} (${occurrences[genre]})`))];
};

const getAllTags = (
	animeList: UserAnimeListCollectionQuery['MediaListCollection']['lists'],
	mangaList: UserMangaListCollectionQuery['MediaListCollection']['lists'],
) => {
	let tags: MediaTag[] = [];
	for (const list of animeList) {
		for (const entry of list.entries) {
			tags = [...tags, ...entry.media.tags];
		}
	}
	for (const list of mangaList) {
		for (const entry of list.entries) {
			tags = [...tags, ...entry.media.tags];
		}
	}

	const occurrences: { [key: MediaTag['name']]: number } = tags.reduce(function (obj, val) {
		obj[val.name] = (obj[val.name] || 0) + 1;
		return obj;
	}, {});

	return tags
		.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
		.map((tag) => ({ ...tag, name: `${tag.name} (${occurrences[tag.name]})` }))
		.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
};

export const useList = (userId: number, isViewer = true) => {
	const viewerId = useAuthStore(useShallow((state) => state.anilist.userID));
	const {
		data: animeList,
		isLoading: isAnimeListLoading,
		isRefetching: isAnimeListRefetching,
		isFetched: isAnimeListFetched,
		refetch: refreshAnimeList,
	} = useUserAnimeListCollectionQuery(
		{ userId: userId, sort: MediaListSort.AddedTimeDesc },
		{ enabled: !!userId, meta: { persist: viewerId === userId } },
	);
	const {
		data: mangaList,
		isLoading: isMangaListLoading,
		isRefetching: isMangaListRefetching,
		isFetched: isMangaListFetched,
		refetch: refreshMangaList,
	} = useUserMangaListCollectionQuery(
		{ userId: userId, sort: MediaListSort.AddedTimeDesc },
		{ enabled: !!userId, meta: { persist: viewerId === userId } },
	);
	const [rootRoutes, setRootRoutes] = useState<{ key: string; title: string }[]>([]);
	const { animeRoutes, mangaRoutes } = useListOrder(
		animeList?.MediaListCollection?.lists as MediaListGroup[],
		mangaList?.MediaListCollection?.lists as MediaListGroup[],
		isViewer,
	);

	const getTotalTitles = (
		lists:
			| UserAnimeListCollectionQuery['MediaListCollection']['lists']
			| UserMangaListCollectionQuery['MediaListCollection']['lists'],
	) => {
		let count = 0;
		for (const list of lists) {
			count += list.entries.length;
		}
		return count;
	};

	useEffect(() => {
		// if (animeList?.MediaListCollection?.lists) {
		// 	const list = animeList?.MediaListCollection?.lists;

		// 	const listOrder = orderList(list as MediaListGroup[], animeTabOrder, isViewer);
		// 	setAnimeRoutes(
		// 		listOrder.map((name) => ({
		// 			key: name,
		// 			title: `${name}  (${count[name] ?? 0})`,
		// 		})),
		// 	);
		// }
		// if (mangaList?.MediaListCollection?.lists) {
		// 	const list = mangaList?.MediaListCollection?.lists;
		// 	const count = {};
		// 	for (const list of mangaList?.MediaListCollection?.lists) {
		// 		count[list.name] = list.entries.length;
		// 	}
		// 	const listOrder = orderList(list as MediaListGroup[], animeTabOrder, isViewer);
		// 	setMangaRoutes(
		// 		mangaList?.MediaListCollection?.lists.map((list) => ({
		// 			key: list.name,
		// 			title: `${list.name}  (${count[list.name] ?? 0})`,
		// 		})),
		// 	);
		// }
		if (isAnimeListFetched && isMangaListFetched) {
			setRootRoutes([
				{
					key: 'anime',
					title: `Anime (${getTotalTitles(animeList?.MediaListCollection?.lists)})`,
				},
				{
					key: 'manga',
					title: `Manga (${getTotalTitles(mangaList?.MediaListCollection?.lists)})`,
				},
			]);
		}
		// if (animeList && mangaList) {
		// 	const animeListCounts = {};
		// 	const mangaListCounts = {};
		// 	const customAnimeLists = animeList?.MediaListCollection?.lists
		// 		?.map((list) => (!animeTabOrder.includes(list.name) ? list.name : null))
		// 		.filter((x) => x !== null);
		// 	const customMangaLists = mangaList?.MediaListCollection?.lists
		// 		?.map((list) => (!mangaTabOrder.includes(list.name) ? list.name : null))
		// 		.filter((x) => x !== null);

		// 	for (const list of animeList?.MediaListCollection?.lists) {
		// 		animeListCounts[list.name] = list.entries.length;
		// 	}
		// 	for (const list of mangaList?.MediaListCollection?.lists) {
		// 		mangaListCounts[list.name] = list.entries.length;
		// 	}
		// 	const aRoutes = isViewer
		// 		? sortListTabs(
		// 				animeList?.MediaListCollection?.lists.map((list) => list.name),
		// 				animeTabOrder,
		// 				animeListCounts,
		// 			)
		// 		: animeList?.MediaListCollection?.lists.map((list) => ({
		// 				key: list.name,
		// 				title: `${list.name}  (${animeListCounts[list.name] ?? 0})`,
		// 			}));
		// 	const mRoutes = isViewer
		// 		? sortListTabs(
		// 				mangaList?.MediaListCollection?.lists.map((list) => list.name),
		// 				mangaTabOrder,
		// 				mangaListCounts,
		// 			)
		// 		: mangaList?.MediaListCollection?.lists.map((list) => ({
		// 				key: list.name,
		// 				title: `${list.name}  (${mangaListCounts[list.name] ?? 0})`,
		// 			}));
		// 	isViewer &&
		// 		updateListFilter({
		// 			animeTabOrder: [...new Set([...animeTabOrder, ...customAnimeLists])],
		// 		});
		// 	isViewer &&
		// 		updateListFilter({
		// 			mangaTabOrder: [...new Set([...mangaTabOrder, ...customMangaLists])],
		// 		});
		// 	setRootRoutes([
		// 		{
		// 			key: 'anime',
		// 			title: `Anime (${getTotalTitles(animeList?.MediaListCollection?.lists)})`,
		// 		},
		// 		{
		// 			key: 'manga',
		// 			title: `Manga (${getTotalTitles(mangaList?.MediaListCollection?.lists)})`,
		// 		},
		// 	]);
		// 	setAnimeRoutes(aRoutes);
		// 	setMangaRoutes(mRoutes);
		// }
	}, [animeList, mangaList, isAnimeListFetched, isMangaListFetched]);

	return {
		animeList,
		mangaList,
		rootRoutes,
		animeRoutes,
		mangaRoutes,
		loading: isAnimeListLoading || isMangaListLoading,
		isRefreshing: isAnimeListRefetching || isMangaListRefetching,
		refreshAnimeList,
		refreshMangaList,
	};
};
