import {
	MediaType,
	useInfiniteUserAnimeFavoritesQuery,
	useInfiniteUserMangaFavoritesQuery,
	useInfiniteUserStaffFavoritesQuery,
	useInfiniteUserWaifuFavoritesQuery,
	UserAnimeFavoritesQuery,
	UserWaifuFavoritesQuery,
} from '@/api/anilist/__genereated__/gql';
import { ScrollToTopButton } from '@/components/buttons';
import { CharacterCard, MediaCard, MediaCardRow, StaffCard } from '@/components/cards';
import { FavoritesHeader } from '@/components/headers';
import { EmptyLoadView } from '@/components/search/loading';
import { useColumns } from '@/hooks/useColumns';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { useAppTheme } from '@/store/theme/themes';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { useShallow } from 'zustand/react/shallow';

type FavoritesTabTypes = 'characters' | 'anime' | 'manga' | 'staff' | 'studios';
// type AnimeMangaDataType<T extends MediaType> = T extends MediaType.Anime ? UserAnimeFavoritesQuery : UserMangaFavoritesQuery;

const MediaTab = ({
	updateTabTitle,
	username,
	type,
}: {
	username: string;
	type: MediaType;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const { viewerUsername, token } = useAuthStore(
		useShallow((state) => ({
			viewerUsername: state.anilist.username,
			token: state.anilist.token,
		})),
	);
	const { query } = useFavoritesFilterStore();
	const { width } = useWindowDimensions();
	const { itemWidth, columns, displayMode } = useColumns('list');

	const animeFavoriteQuery = useInfiniteUserAnimeFavoritesQuery(
		{ username, page: 1, perPage: 25 },
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.User?.favourites?.anime.pageInfo.hasNextPage) {
					return {
						page: lastPage.User?.favourites?.anime.pageInfo.currentPage + 1,
					};
				}
			},
			enabled: !!username && type === MediaType.Anime,
			meta: {
				persist: viewerUsername === username,
			},
		},
	);

	const mangaFavoriteQuery = useInfiniteUserMangaFavoritesQuery(
		{
			username,
			page: 1,
			perPage: 25,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.User?.favourites?.manga.pageInfo.hasNextPage) {
					return {
						page: lastPage.User?.favourites?.manga.pageInfo.currentPage + 1,
					};
				}
			},
			enabled: !!username && type === MediaType.Manga,
			meta: {
				persist: viewerUsername === username,
			},
		},
	);

	const [scrollOffset, setScrollOffset] = useState<number>(0);
	const listRef = useRef<FlashList<any>>(null);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem = useCallback(
		(itemProps: {
			item: UserAnimeFavoritesQuery['User']['favourites']['anime']['nodes'][0];
		}) =>
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
						<MediaCard {...itemProps.item} fitToParent allowEntryEdit={false} />
					</View>
				</View>
			) : (
				<MediaCardRow {...itemProps.item} />
			),
		[itemWidth, displayMode],
	);

	const mergedResults = (
		type === MediaType.Anime ? animeFavoriteQuery : mangaFavoriteQuery
	)?.data?.pages?.flatMap(
		(val) => val.User?.favourites?.anime?.nodes,
	) as UserAnimeFavoritesQuery['User']['favourites']['anime']['nodes'];

	// useEffect(() => {
	// 	if (mergedResults || query) {
	// 		updateTabTitle(
	// 			'anime',
	// 			`Anime (${
	// 				mergedResults?.filter(
	// 					(item) =>
	// 						item.title?.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
	// 						item.title?.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
	// 						item.title?.native?.includes(query) ||
	// 						item.synonyms?.some((value, index) =>
	// 							value.toLowerCase()?.includes(query?.toLowerCase()),
	// 						) ||
	// 						item.characters?.nodes?.some(
	// 							(value, index) =>
	// 								value.name?.full
	// 									?.toLowerCase()
	// 									?.includes(query?.toLowerCase()) ||
	// 								value.name?.native?.includes(query),
	// 						),
	// 				).length
	// 			})`,
	// 		);
	// 	}
	// }, [mergedResults, query]);

	if ((type === MediaType.Anime ? animeFavoriteQuery : mangaFavoriteQuery).isFetching)
		return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				ref={listRef}
				key={columns}
				data={mergedResults.filter(
					(item) =>
						item?.title?.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item?.title?.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item?.title?.native?.includes(query) ||
						item?.synonyms?.some((value, index) =>
							value.toLowerCase()?.includes(query?.toLowerCase()),
						) ||
						item?.characters?.nodes?.some(
							(value, index) =>
								value.name?.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
								value.name?.native?.includes(query) ||
								value.name?.alternative?.some((alt) =>
									alt.toLowerCase().includes(query.toLowerCase()),
								),
						),
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
				onEndReached={() =>
					(type === MediaType.Anime ? animeFavoriteQuery : mangaFavoriteQuery)
						.hasNextPage &&
					(type === MediaType.Anime
						? animeFavoriteQuery
						: mangaFavoriteQuery
					).fetchNextPage()
				}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
				onRefresh={
					(type === MediaType.Anime ? animeFavoriteQuery : mangaFavoriteQuery).refetch
				}
				refreshing={
					(type === MediaType.Anime ? animeFavoriteQuery : mangaFavoriteQuery)
						.isRefetching
				}
			/>
			{scrollOffset > 500 && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
				/>
			)}
		</View>
	);
};

const WaifuTab = ({
	username,
	updateTabTitle,
}: {
	username: string;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerUsername = useAuthStore(useShallow((state) => state.anilist.username));
	const query = useFavoritesFilterStore(useShallow((state) => state.query));
	const { width } = useWindowDimensions();
	const { itemWidth, columns } = useColumns('list');

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserWaifuFavoritesQuery(
			{ username, page: 1, perPage: 25 },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.User?.favourites?.characters.pageInfo.hasNextPage) {
						return {
							page: lastPage.User?.favourites?.characters.pageInfo.currentPage + 1,
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
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem = useCallback(
		({
			item,
		}: {
			item: UserWaifuFavoritesQuery['User']['favourites']['characters']['nodes'][0];
		}) => {
			return (
				<View style={{ alignItems: 'center', marginVertical: 15, width: itemWidth }}>
					<CharacterCard {...item} />
				</View>
			);
		},
		[itemWidth],
	);

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
				data={mergedResults?.filter(
					(item) =>
						item.name?.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item.name?.native?.includes(query),
				)}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				centerContent
				contentContainerStyle={{
					padding: 10,
					paddingLeft: mergedResults ? 110 / columns / 3 : undefined,
				}}
				onEndReached={() => hasNextPage && fetchNextPage()}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

const StaffTab = ({
	username,
	updateTabTitle,
}: {
	username: string;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerUsername = useAuthStore(useShallow((state) => state.anilist.username));
	const { query } = useFavoritesFilterStore();
	const { width } = useWindowDimensions();
	const { itemWidth, columns } = useColumns('list');

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserStaffFavoritesQuery(
			{ page: 1, perPage: 25, username },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.User?.favourites?.staff.pageInfo.hasNextPage) {
						return {
							page: lastPage.User?.favourites?.staff.pageInfo.currentPage + 1,
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
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem = useCallback(
		({
			item,
		}: {
			item: UserWaifuFavoritesQuery['User']['favourites']['characters']['nodes'][0];
		}) => {
			return (
				<View style={{ alignItems: 'center', marginVertical: 15, width: itemWidth }}>
					<StaffCard {...item} isStaff />
				</View>
			);
		},
		[],
	);

	const mergedResults = data?.pages?.flatMap((val) => val.User?.favourites?.staff?.nodes);

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
				data={mergedResults.filter(
					(item) =>
						item.name.full?.toLowerCase().includes(query?.toLowerCase()) ||
						item.name.native?.includes(query),
				)}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				centerContent
				contentContainerStyle={{
					padding: 10,
					paddingLeft: mergedResults ? 110 / columns / 3 : undefined,
				}}
				onEndReached={() => hasNextPage && fetchNextPage()}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

const MediaTabMem = memo(MediaTab);
// const MangaTabMem = memo(MangaTab);
const WaifuTabMem = memo(WaifuTab);
const StaffTabMem = memo(StaffTab);

const FavoritesPage = () => {
	const { username, type: tab } = useLocalSearchParams<{ username: string; type: string }>();
	const { colors } = useAppTheme();
	const layout = useWindowDimensions();

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

	const renderTabBar = (props) => (
		<TabBar
			{...props}
			tabStyle={{ paddingTop: 10 }}
			indicatorStyle={{ backgroundColor: colors.primary }}
			style={{ backgroundColor: colors.surface }}
			labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
			scrollEnabled={true}
			android_ripple={{ color: colors.primary, borderless: true }}
		/>
	);

	const renderScene = ({
		route,
	}: {
		route: { key: FavoritesTabTypes; title: FavoritesTabTypes };
	} & SceneRendererProps) => {
		switch (route.key) {
			case 'anime':
			case 'manga':
				return (
					<MediaTabMem
						updateTabTitle={updateRouteTitle}
						username={username}
						type={
							route.key.toUpperCase() === MediaType.Anime
								? MediaType.Anime
								: MediaType.Manga
						}
					/>
				);
			case 'characters':
				return <WaifuTabMem updateTabTitle={updateRouteTitle} username={username} />;
			case 'staff':
				return <StaffTabMem updateTabTitle={updateRouteTitle} username={username} />;
		}
	};

	// useEffect(() => {
	// 	if (tab) {
	// 		setIndex(routes.findIndex((r) => r.key === tab.toLowerCase()));
	// 	}
	// }, [tab]);

	return (
		<>
			<Stack.Screen
				options={{
					title: `Favorites`,
					header: (props) => <FavoritesHeader {...props} />,
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
		</>
	);
};

export default FavoritesPage;
