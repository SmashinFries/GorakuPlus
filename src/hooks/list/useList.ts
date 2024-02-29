import { useLazyUserAnimeListCollectionQuery, useLazyUserMangaListCollectionQuery } from '@/store/services/anilist/enhanced';
import { useEffect, useMemo, useState } from 'react';
import Burnt from 'burnt';
import { MediaList, MediaListSort, MediaTag, UserAnimeListCollectionQuery, UserMangaListCollectionQuery } from '@/store/services/anilist/generated-anilist';
import { sendErrorMessage } from '@/utils/toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateListFilter } from '@/store/slices/listSlice';
import { AnimatedFlashList } from '@shopify/flash-list';


const getAllGenres = (animeList: UserAnimeListCollectionQuery['MediaListCollection']['lists'], mangaList: UserMangaListCollectionQuery['MediaListCollection']['lists']) => {
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

	let occurrences: { [key: string]: number } = genres.reduce(function (obj, val) {
		obj[val] = (obj[val] || 0) + 1;
		return obj;
	}, {})

	let sortedGenres = Object.keys(occurrences).sort((a, b) =>
		a.toUpperCase() < b.toUpperCase() ? -1 : 1,
	);

	return [...new Set(sortedGenres.map((genre) => `${genre} (${occurrences[genre]})`))];
};

const getAllTags = (animeList: UserAnimeListCollectionQuery['MediaListCollection']['lists'], mangaList: UserMangaListCollectionQuery['MediaListCollection']['lists']) => {
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

	let occurrences: { [key: MediaTag['name']]: number } = tags.reduce(function (obj, val) {
		obj[val.name] = (obj[val.name] || 0) + 1;
		return obj;
	}, {});


	return tags.filter((value, index, self) =>
		index === self.findIndex((t) =>
			t.name === value.name
		)
	).map((tag) => ({ ...tag, name: `${tag.name} (${occurrences[tag.name]})` })).sort((a, b) =>
		a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1,
	);
};

export const useList = (userId: number) => {
	const [fetchAnimeList, animeList] = useLazyUserAnimeListCollectionQuery();
	const [fetchMangaList, mangaList] = useLazyUserMangaListCollectionQuery();
	const [loading, setLoading] = useState<boolean>(true);
	const [isAnimeRefresh, setIsAnimeRefresh] = useState<boolean>(false);
	const [isMangaRefresh, setIsMangaRefresh] = useState<boolean>(false);
	const [animeRoutes, setAnimeRoutes] = useState<{ key: string, title: string }[]>([]);
	const [mangaRoutes, setMangaRoutes] = useState<{ key: string, title: string }[]>([]);
	const [rootRoutes, setRootRoutes] = useState<{ key: string, title: string }[]>([]);

	const [genres, setGenres] = useState<string[]>([]);
	const [tags, setTags] = useState<MediaTag[]>([]);

	const { animeTabOrder, mangaTabOrder } = useAppSelector((state) => state.listFilter);
	const dispatch = useAppDispatch();

	const getTotalTitles = (lists: UserAnimeListCollectionQuery['MediaListCollection']['lists'] | UserMangaListCollectionQuery['MediaListCollection']['lists']) => {
		let count = 0;
		for (const list of lists) {
			count += list.entries.length;
		}
		return count;
	};

	const fetchAll = async () => {
		setLoading(true);
		const animeData = await fetchAnimeList({ userId: userId, sort: MediaListSort.AddedTimeDesc });
		const mangaData = await fetchMangaList({ userId: userId, sort: MediaListSort.AddedTimeDesc });

		const aRoutes = animeData?.data?.MediaListCollection?.lists?.map((list) => ({
			key: list.name,
			title: `${list.name} (${list.entries.length})`
		}));
		const mRoutes = mangaData?.data?.MediaListCollection?.lists?.map((list) => ({
			key: list.name,
			title: `${list.name} (${list.entries.length})`
		}))
		setGenres(getAllGenres(animeData?.data?.MediaListCollection?.lists, mangaData?.data?.MediaListCollection?.lists));
		setTags(getAllTags(animeData?.data?.MediaListCollection?.lists, mangaData?.data?.MediaListCollection?.lists));
		// dispatch(updateListFilter({ entryType: 'animeTabOrder', value: animeData?.data?.MediaListCollection?.lists?.map((list) => list.name) }));
		// dispatch(updateListFilter({ entryType: 'mangaTabOrder', value: mangaData?.data?.MediaListCollection?.lists?.map((list) => list.name) }));
		setRootRoutes([{ key: 'anime', title: `Anime (${getTotalTitles(animeData?.data?.MediaListCollection?.lists)})` }, { key: 'manga', title: `Manga (${getTotalTitles(mangaData?.data?.MediaListCollection?.lists)})` }])
		setAnimeRoutes(aRoutes);
		setMangaRoutes(mRoutes);
		setLoading(false);
	};

	const refreshAnimeList = async () => {
		setIsAnimeRefresh(true);
		await fetchAnimeList({ userId: userId, sort: MediaListSort.AddedTimeDesc });
		setIsAnimeRefresh(false);
	};

	const refreshMangaList = async () => {
		setIsMangaRefresh(true);
		await fetchMangaList({ userId: userId, sort: MediaListSort.AddedTimeDesc });
		setIsMangaRefresh(false);
	};

	const reorderedAnimeRoutes = useMemo(() => {

		if (!animeRoutes) return [];
		const orderedRouteNames = animeTabOrder.map((routeName) => routeName);
		const newRoutes = animeTabOrder.map((routeName) => ({ key: routeName, title: routeName }));
		for (const route of animeRoutes) {
			if (!orderedRouteNames.includes(route.key)) {
				newRoutes.push(route);
			}
		}
		return newRoutes
	}, [animeTabOrder, animeRoutes])

	// useEffect(() => {
	//     if (animeList.isError || mangaList.isError) {
	//         sendErrorMessage(animeList.isError ? animeList.error?.message : mangaList.error?.message);
	//     }
	// },[animeList, mangaList])

	// useEffect(() => {
	//     const orderedRouteNames = animeTabOrder.map((routeName) => routeName);
	//     for (const route of routes) {
	//         if (!orderedRouteNames.includes(route.key)) {
	//             console.log('adding', route.key)
	//             orderedRouteNames.push(route.key);
	//         }
	//     }
	//     setTabRoutes(
	//         orderedRouteNames.map((routeName) => ({ key: routeName, title: routeName })),
	//     );
	// }, [animeTabOrder]);

	useEffect(() => {
		if (userId && animeList.isUninitialized && mangaList.isUninitialized) {
			fetchAll();
		}
	}, [])


	return { animeList, mangaList, rootRoutes, animeRoutes, mangaRoutes, reorderedAnimeRoutes, genres, tags, loading, isAnimeRefresh, isMangaRefresh, refreshAnimeList, refreshMangaList };
};