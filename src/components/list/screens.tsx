import {
	MediaListSort,
	MediaListStatus,
	MediaType,
	UserAnimeListCollectionQuery,
	UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection,
	UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList,
	UserMangaListCollectionQuery,
	UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList,
	useUserAnimeListCollectionQuery,
	useUserMangaListCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { useListFilterStore } from '@/store/listStore';
import { sortLists, sortListTabs } from '@/utils/sort';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { MediaCard, MediaCardRow } from '../cards';
import { compareArrays } from '@/utils/compare';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import { GorakuTabBar } from '../tab';
import { useColumns } from '@/hooks/useColumns';
import { GorakuRefreshControl } from '../explore/lists';
import { useAuthStore } from '@/store/authStore';
import { GorakuActivityIndicator } from '../loading';
import { FlashListAnim } from '../list';
import { FlashList } from '@shopify/flash-list';

type ListParams = {
	data:
		| NonNullable<NonNullable<UserAnimeListCollectionQuery['MediaListCollection']>['lists']>[0]
		| NonNullable<NonNullable<UserMangaListCollectionQuery['MediaListCollection']>['lists']>[0];
	updateTitle?: (dataLength?: number) => void;
	updateMainTitle?: (dataLength?: number) => void;
	isRefreshing?: boolean;
	onRefresh?: () => void;
	type: MediaType;
};

const filterList = (
	data:
		| (
				| UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList
				| UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList
				| null
		  )[]
		| null,
	search: string = '',
	tags_in: string[] = [],
	tags_ex: string[] = [],
	genres_in: string[] = [],
	genres_ex: string[] = [],
	format_in: string[] = [],
	format_not_in: string[] = [],
	countryOfOrigin?: string,
) => {
	const filtered = (data || [])
		.filter((item) => item !== undefined && item !== null)
		.filter((item) => {
			// Search filter
			if (search.length > 0) {
				const searchTerm = search.toLowerCase();
				const titles = [
					item?.media?.title?.romaji,
					item?.media?.title?.english,
					item?.media?.title?.native,
				];
				const matchesTitle = titles.some((title) =>
					title?.toLowerCase()?.includes(searchTerm),
				);
				const matchesSynonyms = item?.media?.synonyms?.some((value) =>
					value?.toLowerCase()?.includes(searchTerm),
				);

				if (!matchesTitle && !matchesSynonyms) return false;
			}

			// Origin filter
			if (countryOfOrigin && item?.media?.countryOfOrigin !== countryOfOrigin) return false;

			// Tags filter
			if (
				tags_in.length > 0 &&
				!item?.media?.tags?.some((tag) => tag?.name && tags_in.includes(tag.name))
			)
				return false;

			if (
				tags_ex.length > 0 &&
				item?.media?.tags?.some((tag) => tag?.name && tags_ex.includes(tag.name))
			)
				return false;

			// Genres filter
			if (
				genres_in.length > 0 &&
				!item?.media?.genres?.some((gen) => gen && genres_in.includes(gen))
			)
				return false;

			if (
				genres_ex.length > 0 &&
				item?.media?.genres?.some((gen) => gen && genres_ex.includes(gen))
			)
				return false;

			if (
				format_in.length > 0 &&
				item?.media?.format &&
				!format_in.includes(item?.media?.format)
				// !item?.media?.format?.some((format) => format && format_in.includes(format))
			)
				return false;

			if (
				format_not_in.length > 0 &&
				item?.media?.format &&
				format_not_in.includes(item?.media?.format)
				// !item?.media?.format?.some((format) => format && format_in.includes(format))
			)
				return false;

			return true;
		});
	return filtered;
};

const ListScreen = ({ data, isRefreshing, updateTitle, onRefresh, type }: ListParams) => {
	const {
		query,
		sort,
		tags_include,
		tags_exclude,
		genre_include,
		genre_exclude,
		anime_format_in,
		anime_format_not_in,
		manga_format_in,
		manga_format_not_in,
		countryOfOrigin,
	} = useListFilterStore();
	const { columns, displayMode } = useColumns('list');

	const listRef = useRef<FlashList<any>>(null);

	const sortedItems = useMemo(() => {
		return sort ? sortLists(data?.entries, sort) : null;
	}, [sort, data]);

	const filteredItems = useMemo(() => {
		return filterList(
			sortedItems,
			query,
			tags_include,
			tags_exclude,
			genre_include,
			genre_exclude,
			type === MediaType.Anime ? anime_format_in : manga_format_in,
			type === MediaType.Anime ? anime_format_not_in : manga_format_not_in,
			countryOfOrigin,
		);
	}, [
		sortedItems,
		query,
		tags_include,
		tags_exclude,
		genre_include,
		genre_exclude,
		anime_format_in,
		anime_format_not_in,
		manga_format_in,
		manga_format_not_in,
		countryOfOrigin,
	]);

	const RenderItem = useCallback(
		({
			item,
		}: {
			item:
				| NonNullable<
						NonNullable<
							NonNullable<
								NonNullable<
									UserAnimeListCollectionQuery['MediaListCollection']
								>['lists']
							>[0]
						>['entries']
				  >[0]
				| NonNullable<
						NonNullable<
							NonNullable<
								NonNullable<
									UserMangaListCollectionQuery['MediaListCollection']
								>['lists']
							>[0]
						>['entries']
				  >[0];
		}) => {
			return item?.media?.id && item.status ? (
				displayMode === 'COMPACT' ? (
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'flex-start',
							marginVertical: 10,
							marginHorizontal: 5,
						}}
					>
						<MediaCard
							{...item?.media}
							fitToParent
							tempListStatusMode={
								[
									MediaListStatus.Current,
									MediaListStatus.Dropped,
									MediaListStatus.Paused,
									MediaListStatus.Repeating,
								].includes(item.status)
									? 'bar'
									: 'dot'
							}
						/>
					</View>
				) : (
					<MediaCardRow {...item?.media} />
				)
			) : null;
		},
		[displayMode],
	);

	useEffect(() => {
		updateTitle?.(filteredItems.length);
	}, [filteredItems]);

	return (
		<View style={{ flex: 1, height: '100%', width: '100%' }}>
			<FlashListAnim
				key={columns}
				listRef={listRef}
				data={filteredItems}
				scrollToTopIconTop={25}
				renderItem={RenderItem}
				keyExtractor={(item, idx) => idx.toString()}
				estimatedItemSize={238}
				numColumns={columns}
				refreshControl={
					<GorakuRefreshControl
						onRefresh={() => {
							onRefresh?.();
						}}
						refreshing={!!isRefreshing}
					/>
				}
				// terrible performance without
				drawDistance={0}
				centerContent
				removeClippedSubviews
			/>
		</View>
	);
};

export const AnimeTab = ({
	userId,
	updateMainTitleCount,
}: {
	userId: number;
	updateMainTitleCount: (key: string, total?: number) => void;
}) => {
	const { width } = useWindowDimensions();
	const { userID: viewerId } = useAuthStore((state) => state.anilist);
	const { data, isLoading, isRefetching, refetch } = useUserAnimeListCollectionQuery(
		{ userId, sort: MediaListSort.UpdatedTimeDesc },
		{ enabled: !!userId, refetchOnMount: false, meta: { persist: viewerId === userId } },
	);
	const { index, routes, setIndex, updateTitleCount } = useListTabRoutes(
		data?.MediaListCollection,
		MediaType.Anime,
		viewerId === userId,
	);

	const renderScene = ({
		route,
	}: SceneRendererProps & {
		route: {
			key: string;
			title: string;
		};
	}) => {
		return (
			<ListScreen
				data={
					data?.MediaListCollection?.lists?.find((list) => list?.name === route.key) ??
					null
				}
				updateTitle={(dataLength?: number) => updateTitleCount(route.key, dataLength)}
				updateMainTitle={(dataLength?: number) =>
					updateMainTitleCount(route.key, dataLength)
				}
				isRefreshing={isRefetching}
				onRefresh={refetch}
				type={MediaType.Anime}
			/>
		);
	};

	useEffect(() => {
		updateMainTitleCount(
			'anime',
			data?.MediaListCollection?.lists?.reduce(
				(acc, val) => acc + (val?.entries?.length ?? 0),
				0,
			),
		);
	}, [data]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return routes.length > 0 ? (
		<TabView
			navigationState={{ index, routes: routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width }}
			renderTabBar={(props) => <GorakuTabBar {...props} enableChip />}
			swipeEnabled={true}
			lazy
		/>
	) : null;
};

export const MangaTab = ({
	userId,
	updateMainTitleCount,
}: {
	userId: number;
	updateMainTitleCount: (key: string, total?: number) => void;
}) => {
	const { width } = useWindowDimensions();
	const { userID: viewerId } = useAuthStore((state) => state.anilist);
	const { data, isLoading, isRefetching, refetch } = useUserMangaListCollectionQuery(
		{ userId, sort: MediaListSort.UpdatedTimeDesc },
		{ enabled: !!userId, meta: { persist: viewerId === userId } },
	);
	const { index, routes, setIndex, updateTitleCount } = useListTabRoutes(
		data?.MediaListCollection,
		MediaType.Manga,
		viewerId === userId,
	);

	const renderScene = ({
		route,
	}: SceneRendererProps & {
		route: {
			key: string;
			title: string;
		};
	}) => {
		return (
			<ListScreen
				data={
					data?.MediaListCollection?.lists?.find((list) => list?.name === route.key) ??
					null
				}
				updateTitle={(dataLength?: number) => updateTitleCount(route.key, dataLength)}
				updateMainTitle={(dataLength?: number) =>
					updateMainTitleCount(route.key, dataLength)
				}
				isRefreshing={isRefetching}
				onRefresh={refetch}
				type={MediaType.Manga}
			/>
		);
	};

	useEffect(() => {
		updateMainTitleCount(
			'manga',
			data?.MediaListCollection?.lists?.reduce(
				(acc, val) => acc + (val?.entries?.length ?? 0),
				0,
			),
		);
	}, [data]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return routes.length > 0 ? (
		<TabView
			navigationState={{ index, routes: routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width }}
			renderTabBar={(props) => <GorakuTabBar {...props} enableChip />}
			swipeEnabled={true}
			lazy
		/>
	) : null;
};

const useListTabRoutes = (
	data: UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection | null | undefined,
	type: MediaType,
	isViewer: boolean = false,
) => {
	const { animeTabOrder, mangaTabOrder } = useListFilterStore();
	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState<{ key: string; title: string }[]>([]);

	const updateTitleCount = (key: string, total?: number) => {
		setRoutes((prevRoutes) => {
			const newRoutes = prevRoutes.map((route) => {
				if (route.key === key) {
					const baseTitle = route.title.replace(/\s*\(\d+\)$/, '');
					const newRoute = { ...route, title: `${baseTitle} (${total ?? 0})` };
					return newRoute;
				}
				return route;
			});
			return newRoutes;
		});
	};

	const computedRoutes = useMemo(() => {
		if (!routes || !data?.lists || !isViewer) {
			return routes;
		}

		const listCounts: { [key: string]: number } = {};
		for (const list of data.lists) {
			if (list?.name) {
				listCounts[list?.name] = list.entries?.length ?? 0;
			}
		}

		const newRoutes = sortListTabs(
			routes.map((route) => route.key),
			type === MediaType.Anime ? animeTabOrder : mangaTabOrder,
			listCounts,
		);

		const isOrderSame = compareArrays(
			routes.map((route) => route.key),
			newRoutes,
		);

		if (!isOrderSame) {
			return newRoutes.map((route) => {
				const existingRoute = routes.find((r) => r.key === route.key);
				return existingRoute || route;
			});
		}

		return routes;
	}, [data, animeTabOrder, mangaTabOrder, routes, type, isViewer]);

	useEffect(() => {
		if (data?.lists) {
			const newRoutes = data.lists
				.map((list) =>
					list?.name
						? {
								key: list.name,
								title: `${list.name} (${list.entries?.length})`,
							}
						: null,
				)
				?.filter((list) => list !== undefined && list !== null);
			setRoutes(newRoutes);
		}
	}, [data]);

	return { routes: computedRoutes, index, setIndex, updateTitleCount };
};
