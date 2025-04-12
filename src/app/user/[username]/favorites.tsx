import {
	useInfiniteUserAnimeFavoritesQuery,
	useInfiniteUserMangaFavoritesQuery,
	useInfiniteUserStaffFavoritesQuery,
	useInfiniteUserWaifuFavoritesQuery,
	UserAnimeFavoritesQuery,
	UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media,
	UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media,
	UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff,
	UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character,
} from '@/api/anilist/__genereated__/gql';
import { CharacterCard, CharacterRowCard, MediaCard, MediaCardRow } from '@/components/cards';
import { GorakuRefreshControl } from '@/components/explore/lists';
import { FavoritesHeader } from '@/components/headers/favorites';
import { FlashListAnim } from '@/components/list';
import { EmptyLoadView } from '@/components/search/loading';
import { FavoritesFilterSheet } from '@/components/sheets/favoritesSheet';
import { useColumns } from '@/hooks/useColumns';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { useAppTheme } from '@/store/theme/themes';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
	SceneRendererProps,
	TabBar,
	TabBarItem,
	TabBarProps,
	TabView,
} from 'react-native-tab-view';
import { useShallow } from 'zustand/react/shallow';

const filterFavs = (
	data: (
		| UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media
		| UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media
	)[],
	search: string = '',
	tags_in: string[] = [],
	tags_ex: string[] = [],
	genres_in: string[] = [],
	genres_ex: string[] = [],
) => {
	const filtered = (data || []).filter((item) => {
		// Search filter
		if (search.length > 0) {
			const searchTerm = search.toLowerCase();
			const titles = [item?.title?.romaji, item?.title?.english, item?.title?.native];
			const characters =
				item?.characters?.nodes?.flatMap((val) =>
					[val?.name?.full, val?.name?.native, ...(val?.name?.alternative ?? [])].filter(
						(val) => val !== null && val !== undefined,
					),
				) ?? [];
			const matchesTitle = titles.some((title) => title?.toLowerCase()?.includes(searchTerm));
			const matchesCharacters = characters.some((char) =>
				char?.toLowerCase()?.includes(searchTerm),
			);
			const matchesSynonyms = item?.synonyms?.some((value) =>
				value?.toLowerCase()?.includes(searchTerm),
			);

			if (!matchesTitle && !matchesSynonyms && !matchesCharacters) return false;
		}

		// Favorites query breaks when including tag data :(
		// Tags filter
		// if (
		// 	tags_in.length > 0 &&
		// 	!item?.tags?.some((tag) => tag?.name && tags_in.includes(tag.name))
		// )
		// 	return false;

		// if (
		// 	tags_ex.length > 0 &&
		// 	item?.tags?.some((tag) => tag?.name && tags_ex.includes(tag.name))
		// )
		// 	return false;

		// Genres filter
		if (genres_in.length > 0 && !item?.genres?.some((gen) => gen && genres_in.includes(gen)))
			return false;

		if (genres_ex.length > 0 && item?.genres?.some((gen) => gen && genres_ex.includes(gen)))
			return false;

		return true;
	});

	// updateTitle?.(filtered.length);

	return filtered;
};

type FavoritesTabTypes = 'characters' | 'anime' | 'manga' | 'staff' | 'studios';
// type AnimeMangaDataType<T extends MediaType> = T extends MediaType.Anime ? UserAnimeFavoritesQuery : UserMangaFavoritesQuery;
type MediaTabProps = {
	username: string;
};

const MediaTabList = ({
	data,
	hasNextPage,
	fetchNextPage,
	refreshControl,
}: {
	data:
		| UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media[]
		| undefined;
	refreshControl: FlashListProps<any>['refreshControl'];
	hasNextPage: boolean;
	fetchNextPage: () => void;
}) => {
	const { query } = useFavoritesFilterStore();
	const { itemWidth, columns, displayMode } = useColumns('list');

	const keyExtract = useCallback(
		(item: any, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem = (itemProps: {
		item: NonNullable<
			NonNullable<
				NonNullable<NonNullable<UserAnimeFavoritesQuery['User']>['favourites']>['anime']
			>['nodes']
		>[0];
	}) => {
		return itemProps.item?.id ? (
			displayMode === 'COMPACT' ? (
				<View style={{ width: itemWidth }}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'flex-start',
							marginVertical: 10,
							marginHorizontal: 5,
						}}
					>
						<MediaCard
							{...itemProps.item}
							fitToParent
							allowEntryEdit={false}
							disableFav
						/>
					</View>
				</View>
			) : (
				<MediaCardRow {...itemProps.item} disableFav />
			)
		) : null;
	};

	return (
		<FlashListAnim
			key={columns}
			scrollToTopIconTop={25}
			scrollToTopTravelDistance={200}
			data={data?.filter((item) =>
				query
					? item?.title?.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item?.title?.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item?.title?.native?.includes(query) ||
						item?.synonyms?.some((value) =>
							value?.toLowerCase()?.includes(query?.toLowerCase()),
						) ||
						item?.characters?.nodes?.some(
							(value) =>
								value?.name?.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
								value?.name?.native?.includes(query) ||
								value?.name?.alternative?.some((alt) =>
									alt?.toLowerCase().includes(query?.toLowerCase() ?? ''),
								),
						)
					: true,
			)}
			nestedScrollEnabled
			renderItem={RenderItem}
			keyExtractor={keyExtract}
			numColumns={columns}
			estimatedItemSize={240}
			centerContent
			contentContainerStyle={{
				paddingVertical: 10,
				// paddingLeft: mergedResults ? 150 / columns / 3 : undefined,
			}}
			onEndReached={() => hasNextPage && fetchNextPage()}
			refreshControl={refreshControl}
		/>
	);
};

const AnimeTab = ({ username }: MediaTabProps) => {
	const { viewerUsername } = useAuthStore(
		useShallow((state) => ({
			viewerUsername: state.anilist.username,
		})),
	);
	const { width } = useWindowDimensions();
	const { query, tags_include, tags_exclude, genre_exclude, genre_include } =
		useFavoritesFilterStore();

	const animeFavoriteQuery = useInfiniteUserAnimeFavoritesQuery(
		{ username, page: 1, perPage: 25 },
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.User?.favourites?.anime?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage?.User?.favourites?.anime.pageInfo?.currentPage ?? 0) + 1,
					};
				}
			},
			enabled: !!username,
			meta: {
				persist: viewerUsername === username,
			},
		},
	);

	const mergedResults = useMemo(
		() =>
			animeFavoriteQuery?.data?.pages
				?.flatMap((val) => val?.User?.favourites?.anime?.nodes)
				.filter((item) => item !== null && item !== undefined),
		[animeFavoriteQuery?.data],
	);

	const filteredResults = useMemo(() => {
		return filterFavs(
			mergedResults ?? [],
			query,
			tags_include,
			tags_exclude,
			genre_include,
			genre_exclude,
		);
	}, [mergedResults, query, tags_include, tags_exclude, genre_exclude, genre_include]);

	if (animeFavoriteQuery.isFetching) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<MediaTabList
				data={filteredResults}
				refreshControl={
					<GorakuRefreshControl
						onRefresh={animeFavoriteQuery.refetch}
						refreshing={animeFavoriteQuery.isRefetching}
					/>
				}
				hasNextPage={animeFavoriteQuery.hasNextPage}
				fetchNextPage={animeFavoriteQuery.fetchNextPage}
			/>
		</View>
	);
};

const MangaTab = ({ username }: MediaTabProps) => {
	const { viewerUsername } = useAuthStore(
		useShallow((state) => ({
			viewerUsername: state.anilist.username,
		})),
	);
	const { query, genre_include, genre_exclude, tags_include, tags_exclude } =
		useFavoritesFilterStore();
	const { width } = useWindowDimensions();

	const mangaFavoriteQuery = useInfiniteUserMangaFavoritesQuery(
		{ username, page: 1, perPage: 25 },
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.User?.favourites?.manga?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage?.User?.favourites?.manga.pageInfo?.currentPage ?? 0) + 1,
					};
				}
			},
			enabled: !!username,
			meta: {
				persist: viewerUsername === username,
			},
		},
	);

	const mergedResults = mangaFavoriteQuery?.data?.pages
		?.flatMap((val) => val?.User?.favourites?.manga?.nodes)
		.filter((item) => item !== null && item !== undefined);

	const filteredResults = useMemo(() => {
		return filterFavs(
			mergedResults ?? [],
			query,
			tags_include,
			tags_exclude,
			genre_include,
			genre_exclude,
		);
	}, [mergedResults, query, tags_include, tags_exclude, genre_exclude, genre_include]);

	if (mangaFavoriteQuery.isFetching) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<MediaTabList
				data={filteredResults}
				refreshControl={
					<GorakuRefreshControl
						onRefresh={mangaFavoriteQuery.refetch}
						refreshing={mangaFavoriteQuery.isRefetching}
					/>
				}
				hasNextPage={mangaFavoriteQuery.hasNextPage}
				fetchNextPage={mangaFavoriteQuery.fetchNextPage}
			/>
		</View>
	);
};

const WaifuTab = ({
	username,
}: {
	username: string;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerUsername = useAuthStore(useShallow((state) => state.anilist.username));
	const query = useFavoritesFilterStore(useShallow((state) => state.query));
	const { width } = useWindowDimensions();
	const { itemWidth, columns, displayMode } = useColumns('list');

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserWaifuFavoritesQuery(
			{ username, page: 1, perPage: 25 },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage?.User?.favourites?.characters?.pageInfo?.hasNextPage) {
						return {
							page:
								(lastPage?.User?.favourites?.characters?.pageInfo?.currentPage ??
									0) + 1,
						};
					}
				},
				enabled: !!username,
				meta: {
					persist: username === viewerUsername,
				},
			},
		);

	const keyExtract = useCallback(
		(item: any, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem = ({
		item,
	}: {
		item:
			| UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character
			| null
			| undefined;
	}) => {
		return item?.id ? (
			displayMode === 'COMPACT' ? (
				<View style={{ alignItems: 'center', marginVertical: 15, width: itemWidth }}>
					<CharacterCard
						{...item}
						isFavourite
						isFavList
						disableFav={username !== viewerUsername}
					/>
				</View>
			) : (
				<CharacterRowCard {...item} isFavourite isFavList />
			)
		) : null;
	};

	const mergedResults = data?.pages?.flatMap((val) => val?.User?.favourites?.characters?.nodes);

	// useEffect(() => {
	// 	if (mergedResults || query) {
	// 		updateTabTitle(
	// 			'characters',
	// 			`Waifus (${
	// 				mergedResults?.filter(
	// 					(item) =>
	// 						item.name.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
	// 						item.name.native?.includes(query),
	// 				).length
	// 			})`,
	// 		);
	// 	}
	// }, [mergedResults, query]);

	if (isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={columns}
				data={mergedResults?.filter((item) =>
					query
						? item?.name?.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item?.name?.native?.includes(query)
						: true,
				)}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				centerContent
				contentContainerStyle={{
					paddingVertical: 10,
					// paddingLeft: mergedResults && columns ? 110 / columns / 3 : undefined,
				}}
				onEndReached={() => hasNextPage && fetchNextPage()}
				refreshControl={
					<GorakuRefreshControl onRefresh={refetch} refreshing={isRefetching} />
				}
			/>
		</View>
	);
};

const StaffTab = ({
	username,
}: {
	username: string;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerUsername = useAuthStore(useShallow((state) => state.anilist.username));
	const { query } = useFavoritesFilterStore();
	const { width } = useWindowDimensions();
	const { itemWidth, columns, displayMode } = useColumns('list');

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserStaffFavoritesQuery(
			{ page: 1, perPage: 25, username },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage?.User?.favourites?.staff?.pageInfo?.hasNextPage) {
						return {
							page:
								(lastPage?.User?.favourites?.staff.pageInfo?.currentPage ?? 0) + 1,
						};
					}
				},
				enabled: !!username,
				meta: {
					persist: viewerUsername === username,
				},
			},
		);

	const keyExtract = useCallback(
		(
			item:
				| UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff
				| null
				| undefined,
			index: number,
		) => item?.id.toString() + index.toString(),
		[],
	);

	const RenderItem = ({
		item,
	}: ListRenderItemInfo<
		| UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff
		| null
		| undefined
	>) => {
		return item?.id ? (
			displayMode === 'COMPACT' ? (
				<View style={{ alignItems: 'center', marginVertical: 15, width: itemWidth }}>
					<CharacterCard {...item} isFavourite disableFav isFavList />
				</View>
			) : (
				<CharacterRowCard {...item} isFavourite disableFav isFavList />
			)
		) : null;
	};

	const mergedResults = data?.pages?.flatMap((val) => val?.User?.favourites?.staff?.nodes);

	// useEffect(() => {
	// 	if (mergedResults) {
	// 		updateTabTitle(
	// 			'staff',
	// 			`Staff (${
	// 				mergedResults?.filter(
	// 					(item) =>
	// 						item.name.full?.toLowerCase().includes(query?.toLowerCase()) ||
	// 						item.name.native?.includes(query),
	// 				).length
	// 			})`,
	// 		);
	// 	}
	// }, [mergedResults, query]);

	if (isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={columns}
				data={mergedResults?.filter((item) =>
					query
						? item?.name?.full?.toLowerCase().includes(query?.toLowerCase()) ||
							item?.name?.native?.includes(query)
						: true,
				)}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				centerContent
				contentContainerStyle={{
					padding: 10,
					// paddingLeft: mergedResults && columns ? 110 / columns / 3 : undefined,
				}}
				onEndReached={() => hasNextPage && fetchNextPage()}
				refreshControl={
					<GorakuRefreshControl onRefresh={refetch} refreshing={isRefetching} />
				}
			/>
		</View>
	);
};

const FavoritesPage = () => {
	const { username, type: tab } = useLocalSearchParams<{ username: string; type: string }>();
	const { colors } = useAppTheme();
	const layout = useWindowDimensions();
	const filterSheetRef = useRef<TrueSheet>(null);

	const [routes, setRoutes] = useState<{ key: FavoritesTabTypes; title: string }[]>([
		{ key: 'characters', title: 'Characters' },
		{ key: 'anime', title: 'Anime' },
		{ key: 'manga', title: 'Manga' },
		{ key: 'staff', title: 'Staff' },
	]);
	const [index, setIndex] = useState(
		tab ? routes.findIndex((r) => r.key === tab.toLowerCase()) : 0,
	);

	const updateRouteTitle = (tab: FavoritesTabTypes, title: string) => {
		setRoutes((prev) => {
			const index = prev.findIndex((r) => r.key === tab);
			const newRoutes = [...prev];
			newRoutes[index] = { key: tab, title: title };
			return newRoutes;
		});
	};

	const renderTabBar = (props: TabBarProps<any>) => (
		<TabBar
			{...props}
			tabStyle={{ paddingTop: 10 }}
			indicatorStyle={{ backgroundColor: colors.primary }}
			style={{
				backgroundColor: colors.surface,
				borderBottomColor: colors.elevation.level5,
				borderBottomWidth: 0.8,
			}}
			labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
			scrollEnabled={true}
			android_ripple={{ color: colors.primary, borderless: true }}
			renderTabBarItem={({ key, ...props }) => <TabBarItem {...props} key={key} />}
		/>
	);

	const renderScene = ({
		route,
	}: {
		route: { key: FavoritesTabTypes; title: string };
	} & SceneRendererProps) => {
		switch (route.key) {
			case 'anime':
				return <AnimeTab username={username} />;
			case 'manga':
				return (
					<MangaTab
						// updateTabTitle={updateRouteTitle}
						username={username}
					/>
				);
			case 'characters':
				return <WaifuTab updateTabTitle={updateRouteTitle} username={username} />;
			case 'staff':
				return <StaffTab updateTabTitle={updateRouteTitle} username={username} />;
			default:
				return null;
		}
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: `Favorites`,
					header: (props) => (
						<FavoritesHeader
							isMediaRoute={
								routes[index]?.title === 'Anime' || routes[index]?.title === 'Manga'
							}
							onFilterOpen={() => filterSheetRef.current?.present()}
							{...props}
						/>
					),
				}}
			/>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={renderTabBar}
				swipeEnabled={true}
				lazy
			/>
			<FavoritesFilterSheet sheetRef={filterSheetRef} />
		</>
	);
};

export default FavoritesPage;
