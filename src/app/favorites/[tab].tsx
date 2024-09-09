import {
	useInfiniteUserAnimeFavoritesQuery,
	useInfiniteUserMangaFavoritesQuery,
	useInfiniteUserStaffFavoritesQuery,
	useInfiniteUserWaifuFavoritesQuery,
	UserAnimeFavoritesQuery,
	UserMangaFavoritesQuery,
	UserWaifuFavoritesQuery,
} from '@/api/anilist/__genereated__/gql';
import { ScrollToTopButton } from '@/components/buttons';
import { CharacterCard, MediaCard, StaffCard } from '@/components/cards';
import { EmptyLoadView } from '@/components/search/loading';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { useAppTheme } from '@/store/theme/themes';
import { useColumns } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';

type FavoritesTabTypes = 'characters' | 'anime' | 'manga' | 'staff' | 'studios';
// type AnimeMangaDataType<T extends MediaType> = T extends MediaType.Anime ? UserAnimeFavoritesQuery : UserMangaFavoritesQuery;

const AnimeTab = ({
	updateTabTitle,
	userId,
}: {
	userId: number;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerId = useAuthStore((state) => state.anilist.userID);
	const { query } = useFavoritesFilterStore();
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(150);

	const { data, isLoading, isRefetching, fetchNextPage, refetch, hasNextPage } =
		useInfiniteUserAnimeFavoritesQuery(
			{ userID: userId, page: 1, perPage: 25 },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.User?.favourites?.anime.pageInfo.hasNextPage) {
						return {
							page: lastPage.User?.favourites?.anime.pageInfo.currentPage + 1,
						};
					}
				},
				enabled: !!userId,
				meta: {
					persist: viewerId === userId,
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
		}) => (
			<View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 10 }}>
				<MediaCard
					coverImg={itemProps.item.coverImage.extraLarge}
					titles={itemProps.item.title}
					navigate={() =>
						router.push(`/media/${itemProps.item.type}/${itemProps.item.id}`)
					}
					// scorebgColor={scorebgColor}
					imgBgColor={itemProps.item.coverImage.color}
					showBanner={false}
					averageScore={itemProps.item.averageScore}
					meanScore={itemProps.item.meanScore}
					scoreDistributions={itemProps.item.stats?.scoreDistribution}
				/>
			</View>
		),
		[],
	);

	const mergedResults = data?.pages?.flatMap((val) => val.User?.favourites?.anime?.nodes);

	useEffect(() => {
		if (mergedResults || query) {
			updateTabTitle(
				'anime',
				`Anime (${
					mergedResults?.filter(
						(item) =>
							item.title.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item.title.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item.title.native?.includes(query) ||
							item.synonyms?.some((value, index) =>
								value.toLowerCase()?.includes(query?.toLowerCase()),
							) ||
							item.characters?.nodes?.some(
								(value, index) =>
									value.name.full
										?.toLowerCase()
										?.includes(query?.toLowerCase()) ||
									value.name.native?.includes(query),
							),
					).length
				})`,
			);
		}
	}, [mergedResults, query]);

	if (isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				ref={listRef}
				key={listKey}
				data={mergedResults.filter(
					(item) =>
						item.title.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item.title.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item.title.native?.includes(query) ||
						item.synonyms?.some((value, index) =>
							value.toLowerCase()?.includes(query?.toLowerCase()),
						) ||
						item.characters?.nodes?.some(
							(value, index) =>
								value.name.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
								value.name.native?.includes(query),
						),
				)}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				centerContent
				contentContainerStyle={{
					padding: 10,
					paddingLeft: mergedResults ? 150 / columns / 3 : undefined,
				}}
				onEndReached={() => hasNextPage && fetchNextPage()}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
			{scrollOffset > 500 && <ScrollToTopButton listRef={listRef} />}
		</View>
	);
};

const MangaTab = ({
	userId,
	updateTabTitle,
}: {
	userId: number;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerId = useAuthStore((state) => state.anilist.userID);
	const { query } = useFavoritesFilterStore();
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(150);

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserMangaFavoritesQuery(
			{
				userID: userId,
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
				enabled: !!userId,
				meta: {
					persist: viewerId === userId,
				},
			},
		);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem = useCallback(
		(itemProps: {
			item: UserMangaFavoritesQuery['User']['favourites']['manga']['nodes'][0];
		}) => (
			<View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 10 }}>
				<MediaCard
					coverImg={itemProps.item.coverImage.extraLarge}
					titles={itemProps.item.title}
					navigate={() =>
						router.push(`/media/${itemProps.item.type}/${itemProps.item.id}`)
					}
					imgBgColor={itemProps.item.coverImage.color}
					showBanner={false}
					averageScore={itemProps.item.averageScore}
					meanScore={itemProps.item.meanScore}
					scoreDistributions={itemProps.item.stats?.scoreDistribution}
				/>
			</View>
		),
		[],
	);

	const mergedResults = data?.pages?.flatMap((val) => val.User?.favourites?.manga?.nodes);

	useEffect(() => {
		if (mergedResults || query) {
			updateTabTitle(
				'manga',
				`Manga (${
					mergedResults?.filter(
						(item) =>
							item.title.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item.title.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item.title.native?.includes(query) ||
							item.synonyms?.some((value, index) =>
								value?.toLowerCase()?.includes(query?.toLowerCase()),
							) ||
							item.characters?.nodes?.some(
								(value, index) =>
									value.name.full
										?.toLowerCase()
										?.includes(query?.toLowerCase()) ||
									value.name.native?.includes(query),
							),
					).length
				})`,
			);
		}
	}, [mergedResults, query]);

	if (isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
				data={mergedResults.filter(
					(item) =>
						item.title.romaji?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item.title.english?.toLowerCase()?.includes(query?.toLowerCase()) ||
						item.title.native?.includes(query) ||
						item.synonyms?.some((value, index) =>
							value?.toLowerCase()?.includes(query?.toLowerCase()),
						) ||
						item.characters?.nodes?.some(
							(value, index) =>
								value.name.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
								value.name.native?.includes(query),
						),
				)}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				centerContent
				contentContainerStyle={{
					padding: 10,
					paddingLeft: mergedResults ? 150 / columns / 3 : undefined,
				}}
				onEndReached={() => hasNextPage && fetchNextPage()}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

const WaifuTab = ({
	userId,
	updateTabTitle,
}: {
	userId: number;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerId = useAuthStore((state) => state.anilist.userID);
	const { query } = useFavoritesFilterStore();
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(110);

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserWaifuFavoritesQuery(
			{ userID: userId, page: 1, perPage: 25 },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.User?.favourites?.characters.pageInfo.hasNextPage) {
						return {
							page: lastPage.User?.favourites?.characters.pageInfo.currentPage + 1,
						};
					}
				},
				enabled: !!userId,
				meta: {
					persist: userId === viewerId,
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
				<View style={{ alignItems: 'center', marginVertical: 15 }}>
					<CharacterCard
						onPress={() => router.push(`/characters/info/${item.id}`)}
						imgUrl={item.image?.large}
						name={item.name?.full}
						nativeName={item.name?.native}
						isFavourite={item.isFavourite}
					/>
				</View>
			);
		},
		[],
	);

	const mergedResults = data?.pages?.flatMap((val) => val.User?.favourites?.characters?.nodes);

	useEffect(() => {
		if (mergedResults || query) {
			updateTabTitle(
				'characters',
				`Waifus (${
					mergedResults?.filter(
						(item) =>
							item.name.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item.name.native?.includes(query),
					).length
				})`,
			);
		}
	}, [mergedResults, query]);

	if (isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
				data={mergedResults.filter(
					(item) =>
						item.name.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
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

const StaffTab = ({
	userId,
	updateTabTitle,
}: {
	userId: number;
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const viewerId = useAuthStore((state) => state.anilist.userID);
	const { query } = useFavoritesFilterStore();
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(110);

	const { data, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } =
		useInfiniteUserStaffFavoritesQuery(
			{ page: 1, perPage: 25, userID: userId },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.User?.favourites?.staff.pageInfo.hasNextPage) {
						return {
							page: lastPage.User?.favourites?.staff.pageInfo.currentPage + 1,
						};
					}
				},
				enabled: !!userId,
				meta: {
					persist: viewerId === userId,
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
				<View style={{ alignItems: 'center', marginVertical: 15 }}>
					<StaffCard
						onPress={() => router.push(`/staff/info/${item.id}`)}
						imgUrl={item.image?.large}
						name={item.name?.full}
						nativeName={item.name?.native}
						isFavourite={item.isFavourite}
					/>
				</View>
			);
		},
		[],
	);

	const mergedResults = data?.pages?.flatMap((val) => val.User?.favourites?.staff?.nodes);

	useEffect(() => {
		if (mergedResults) {
			updateTabTitle(
				'staff',
				`Staff (${
					mergedResults?.filter(
						(item) =>
							item.name.full?.toLowerCase().includes(query?.toLowerCase()) ||
							item.name.native?.includes(query),
					).length
				})`,
			);
		}
	}, [mergedResults, query]);

	if (isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
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

const AnimeTabMem = memo(AnimeTab);
const MangaTabMem = memo(MangaTab);
const WaifuTabMem = memo(WaifuTab);
const StaffTabMem = memo(StaffTab);

const FavoritesPage = () => {
	const { tab, userId: userIdParam } = useLocalSearchParams<{ tab: string; userId: string }>();
	const { colors } = useAppTheme();
	const layout = useWindowDimensions();

	const userId = userIdParam ? parseInt(userIdParam) : 0;

	const [routes, setRoutes] = useState<{ key: FavoritesTabTypes; title: string }[]>([
		{ key: 'characters', title: 'Characters' },
		{ key: 'anime', title: 'Anime' },
		{ key: 'manga', title: 'Manga' },
		{ key: 'staff', title: 'Staff' },
	]);
	const [index, setIndex] = useState(tab ? routes.findIndex((r) => r.key === tab) : 0);

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
				return <AnimeTabMem updateTabTitle={updateRouteTitle} userId={userId} />;
			case 'manga':
				return <MangaTabMem updateTabTitle={updateRouteTitle} userId={userId} />;
			case 'characters':
				return <WaifuTabMem updateTabTitle={updateRouteTitle} userId={userId} />;
			case 'staff':
				return <StaffTabMem updateTabTitle={updateRouteTitle} userId={userId} />;
		}
	};

	return (
		<>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={renderTabBar}
				swipeEnabled={true}
			/>
		</>
	);
};

export default FavoritesPage;
