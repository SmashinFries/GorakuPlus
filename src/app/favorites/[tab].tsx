import { CharacterCard, MediaCard, MediaProgressBar, StaffCard } from '@/components/cards';
import { FavoritesHeader } from '@/components/headers';
import { EmptyLoadView } from '@/components/search/loading';
import { useAppSelector } from '@/store/hooks';
import {
	useLazyUserAnimeFavoritesQuery,
	useLazyUserMangaFavoritesQuery,
	useLazyUserWaifuFavoritesQuery,
} from '@/store/services/anilist/enhanced';
import {
	MediaType,
	UserAnimeFavoritesQuery,
	UserMangaFavoritesQuery,
	UserStaffFavoritesQuery,
	UserWaifuFavoritesQuery,
	useLazyUserStaffFavoritesQuery,
} from '@/store/services/anilist/generated-anilist';
import { useColumns } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';

type FavoritesTabTypes = 'characters' | 'anime' | 'manga' | 'staff' | 'studios';
// type AnimeMangaDataType<T extends MediaType> = T extends MediaType.Anime ? UserAnimeFavoritesQuery : UserMangaFavoritesQuery;

const AnimeTab = ({
	updateTabTitle,
}: {
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const { userID } = useAppSelector((state) => state.persistedAniLogin);
	const { query } = useAppSelector((state) => state.favSearch);
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(150);

	const [data, setData] = useState<UserAnimeFavoritesQuery>();
	const [getAnime, animeInfo] = useLazyUserAnimeFavoritesQuery();

	const [isRefreshing, setIsRefreshing] = useState(false);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const fetchData = async (nextPage = false) => {
		if (data?.User?.favourites?.anime?.pageInfo?.hasNextPage === false) {
			return;
		} else {
			const results = await getAnime({
				userID: userID,
				page: nextPage ? data?.User?.favourites?.anime?.pageInfo?.currentPage + 1 : 1,
				perPage: 24,
			});
			if (results.data?.User?.favourites?.anime?.pageInfo?.currentPage === 1) {
				setData(results.data);
			} else {
				setData((prev) => {
					return {
						...prev,
						User: {
							...prev.User,
							favourites: {
								...prev.User.favourites,
								anime: {
									...prev.User.favourites.anime,
									pageInfo: results.data.User.favourites.anime.pageInfo,
									nodes: [
										...prev.User.favourites.anime.nodes,
										...results.data.User.favourites.anime.nodes,
									],
								},
							},
						},
					};
				});
			}
		}
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		const results = await fetchData();
		setIsRefreshing(false);
	};

	const RenderItem = useCallback(
		(itemProps: {
			item: UserAnimeFavoritesQuery['User']['favourites']['anime']['nodes'][0];
		}) => (
			<View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 10 }}>
				<MediaCard
					coverImg={itemProps.item.coverImage.extraLarge}
					titles={itemProps.item.title}
					navigate={() => router.push(`${itemProps.item.type}/${itemProps.item.id}`)}
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

	useEffect(() => {
		if (data?.User?.favourites?.anime?.nodes || query) {
			updateTabTitle(
				'anime',
				`Anime (${
					data?.User?.favourites?.anime?.nodes?.filter(
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
	}, [data?.User?.favourites?.anime?.nodes, query]);

	useEffect(() => {
		if (!data) {
			fetchData();
		}
	}, []);

	if (animeInfo?.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
				data={data?.User?.favourites?.anime?.nodes.filter(
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
					paddingLeft: data?.User?.favourites?.anime?.nodes
						? 150 / columns / 3
						: undefined,
				}}
				onEndReached={() => {
					data?.User?.favourites?.anime?.pageInfo?.hasNextPage && fetchData(true);
				}}
				onRefresh={onRefresh}
				refreshing={isRefreshing}
			/>
		</View>
	);
};

const MangaTab = ({
	updateTabTitle,
}: {
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const { userID } = useAppSelector((state) => state.persistedAniLogin);
	const { query } = useAppSelector((state) => state.favSearch);
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(150);

	const [data, setData] = useState<UserMangaFavoritesQuery>();
	const [getManga, mangaInfo] = useLazyUserMangaFavoritesQuery();

	const [isRefreshing, setIsRefreshing] = useState(false);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const fetchData = async (nextPage = false) => {
		if (data?.User?.favourites?.manga?.pageInfo?.hasNextPage === false) {
			return;
		} else {
			const results = await getManga({
				userID: userID,
				page: nextPage ? data?.User?.favourites?.manga?.pageInfo?.currentPage + 1 : 1,
				perPage: 24,
			});
			if (results.data?.User?.favourites?.manga?.pageInfo?.currentPage === 1) {
				setData(results.data);
			} else {
				setData((prev) => {
					return {
						...prev,
						User: {
							...prev.User,
							favourites: {
								...prev.User.favourites,
								manga: {
									...prev.User.favourites.manga,
									pageInfo: results.data.User.favourites.manga.pageInfo,
									nodes: [
										...prev.User.favourites.manga.nodes,
										...results.data.User.favourites.manga.nodes,
									],
								},
							},
						},
					};
				});
			}
		}
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		const results = await fetchData();
		setIsRefreshing(false);
	};

	const RenderItem = useCallback(
		(itemProps: {
			item: UserMangaFavoritesQuery['User']['favourites']['manga']['nodes'][0];
		}) => (
			<View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 10 }}>
				<MediaCard
					coverImg={itemProps.item.coverImage.extraLarge}
					titles={itemProps.item.title}
					navigate={() => router.push(`${itemProps.item.type}/${itemProps.item.id}`)}
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

	useEffect(() => {
		if (data?.User?.favourites?.manga?.nodes || query) {
			updateTabTitle(
				'manga',
				`Manga (${
					data?.User?.favourites?.manga?.nodes?.filter(
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
	}, [data?.User?.favourites?.manga?.nodes, query]);

	useEffect(() => {
		if (!data) {
			fetchData();
		}
	}, []);

	if (mangaInfo?.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
				data={data?.User?.favourites?.manga?.nodes.filter(
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
					paddingLeft: data?.User?.favourites?.manga?.nodes
						? 150 / columns / 3
						: undefined,
				}}
				onEndReached={() => {
					data?.User?.favourites?.manga?.pageInfo?.hasNextPage && fetchData(true);
				}}
				onRefresh={onRefresh}
				refreshing={isRefreshing}
			/>
		</View>
	);
};

const WaifuTab = ({
	updateTabTitle,
}: {
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const { userID } = useAppSelector((state) => state.persistedAniLogin);
	const { query } = useAppSelector((state) => state.favSearch);
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(110);

	const [data, setData] = useState<UserWaifuFavoritesQuery>();
	const [getWaifus, waifuInfo] = useLazyUserWaifuFavoritesQuery();

	const [isRefreshing, setIsRefreshing] = useState(false);

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

	const fetchData = async (nextPage = false) => {
		if (data?.User?.favourites?.characters?.pageInfo?.hasNextPage === false) {
			return;
		} else {
			const results = await getWaifus({
				userID: userID,
				page: nextPage ? data?.User?.favourites?.characters?.pageInfo?.currentPage + 1 : 1,
				perPage: 24,
			});
			if (results.data?.User?.favourites?.characters?.pageInfo?.currentPage === 1) {
				setData(results.data);
			} else {
				setData((prev) => {
					return {
						...prev,
						User: {
							...prev.User,
							favourites: {
								...prev.User.favourites,
								characters: {
									...prev.User.favourites.characters,
									pageInfo: results.data.User.favourites.characters.pageInfo,
									nodes: [
										...prev.User.favourites.characters.nodes,
										...results.data.User.favourites.characters.nodes,
									],
								},
							},
						},
					};
				});
			}
		}
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		const results = await getWaifus({ userID: userID, page: 1, perPage: 24 });
		setData(results.data);
		setIsRefreshing(false);
	};

	useEffect(() => {
		if (data?.User?.favourites?.characters?.nodes || query) {
			updateTabTitle(
				'characters',
				`Waifus (${
					data?.User?.favourites?.characters?.nodes?.filter(
						(item) =>
							item.name.full?.toLowerCase()?.includes(query?.toLowerCase()) ||
							item.name.native?.includes(query),
					).length
				})`,
			);
		}
	}, [data?.User?.favourites?.characters?.nodes, query]);

	useEffect(() => {
		if (!data) {
			fetchData();
		}
	}, []);

	if (waifuInfo?.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
				data={data?.User?.favourites?.characters?.nodes.filter(
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
					paddingLeft: data?.User?.favourites?.characters?.nodes
						? 110 / columns / 3
						: undefined,
				}}
				onEndReached={() => {
					data?.User?.favourites?.characters?.pageInfo?.hasNextPage && fetchData(true);
				}}
				onRefresh={onRefresh}
				refreshing={isRefreshing}
			/>
		</View>
	);
};

const StaffTab = ({
	updateTabTitle,
}: {
	updateTabTitle: (tab: FavoritesTabTypes, title: string) => void;
}) => {
	const { userID } = useAppSelector((state) => state.persistedAniLogin);
	const { query } = useAppSelector((state) => state.favSearch);
	const { width, height } = useWindowDimensions();
	const { columns, listKey } = useColumns(110);

	const [data, setData] = useState<UserStaffFavoritesQuery>();
	const [getStaff, staffInfo] = useLazyUserStaffFavoritesQuery();

	const [isRefreshing, setIsRefreshing] = useState(false);

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

	const fetchData = async (nextPage = false) => {
		if (data?.User?.favourites?.staff?.pageInfo?.hasNextPage === false) {
			return;
		} else {
			const results = await getStaff({
				userID: userID,
				page: nextPage ? data?.User?.favourites?.staff?.pageInfo?.currentPage + 1 : 1,
				perPage: 24,
			});
			if (results.data?.User?.favourites?.staff?.pageInfo?.currentPage === 1) {
				setData(results.data);
			} else {
				setData((prev) => {
					return {
						...prev,
						User: {
							...prev.User,
							favourites: {
								...prev.User.favourites,
								staff: {
									...prev.User.favourites.staff,
									pageInfo: results.data.User.favourites.staff.pageInfo,
									nodes: [
										...prev.User.favourites.staff.nodes,
										...results.data.User.favourites.staff.nodes,
									],
								},
							},
						},
					};
				});
			}
		}
	};

	const onRefresh = async () => {
		setIsRefreshing(true);
		const results = await getStaff({ userID: userID, page: 1, perPage: 24 });
		setData(results.data);
		setIsRefreshing(false);
	};

	useEffect(() => {
		if (data?.User?.favourites?.staff?.nodes) {
			updateTabTitle(
				'staff',
				`Staff (${
					data?.User?.favourites?.staff?.nodes?.filter(
						(item) =>
							item.name.full?.toLowerCase().includes(query?.toLowerCase()) ||
							item.name.native?.includes(query),
					).length
				})`,
			);
		}
	}, [data?.User?.favourites?.staff?.nodes, query]);

	useEffect(() => {
		if (!data) {
			fetchData();
		}
	}, []);

	if (staffInfo?.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<FlashList
				key={listKey}
				data={data?.User?.favourites?.staff?.nodes.filter(
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
					paddingLeft: data?.User?.favourites?.staff?.nodes
						? 110 / columns / 3
						: undefined,
				}}
				onEndReached={() => {
					data?.User?.favourites?.staff?.pageInfo?.hasNextPage && fetchData(true);
				}}
				onRefresh={onRefresh}
				refreshing={isRefreshing}
			/>
		</View>
	);
};

const AnimeTabMem = memo(AnimeTab);
const MangaTabMem = memo(MangaTab);
const WaifuTabMem = memo(WaifuTab);
const StaffTabMem = memo(StaffTab);

const FavoritesPage = () => {
	const { tab } = useLocalSearchParams<{ tab: string }>();
	const { colors } = useTheme();
	const layout = useWindowDimensions();

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
				return <AnimeTabMem updateTabTitle={updateRouteTitle} />;
			case 'manga':
				return <MangaTabMem updateTabTitle={updateRouteTitle} />;
			case 'characters':
				return <WaifuTabMem updateTabTitle={updateRouteTitle} />;
			case 'staff':
				return <StaffTabMem updateTabTitle={updateRouteTitle} />;
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
