import { useEffect, useMemo, useState } from 'react';
import {
	MediaListGroup,
	MediaListSort,
	MediaType,
	UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup,
	UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup,
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
		const count: { [key: string]: number } = {};
		for (const list of listData) {
			count[list.name as string] = list.entries?.length ?? 0;
		}
		const listNames = listData
			.filter((list) => list.isSplitCompletedList === false) // remove split lists (like anilist site)
			.sort((a, b) => Number(a.isCustomList) - Number(b.isCustomList)) // puts customs lists at end
			.map((list) => list.name)
			.filter((name): name is string => name != null);
		checkListNames?.(type, listNames);
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
	// const [rootRoutes, setRootRoutes] = useState<{ key: string; title: string }[]>([]);
	const { animeRoutes, mangaRoutes } = useListOrder(
		animeList?.MediaListCollection?.lists as MediaListGroup[],
		mangaList?.MediaListCollection?.lists as MediaListGroup[],
		isViewer,
	);

	const getTotalTitles = (
		lists:
			| UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup[]
			| UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup[]
			| null
			| undefined,
	) => {
		let count = 0;
		if (lists) {
			for (const list of lists) {
				count += list.entries?.length ?? 0;
			}
		}
		return count;
	};

	const rootRoutes = useMemo(() => {
		if (!isAnimeListFetched || !isMangaListFetched) {
			return [];
		}

		return [
			{
				key: 'anime',
				title: `Anime (${getTotalTitles(
					animeList?.MediaListCollection?.lists?.filter(
						(
							list,
						): list is UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup =>
							list !== null,
					),
				)})`,
			},
			{
				key: 'manga',
				title: `Manga (${getTotalTitles(
					mangaList?.MediaListCollection?.lists?.filter(
						(
							list,
						): list is UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup =>
							list !== null,
					),
				)})`,
			},
		];
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
