import { MediaCard, MediaProgressBar } from '@/components/cards';
import { ListHeader } from '@/components/headers';
import { ListFilterSheet } from '@/components/list/filtersheet';
import { GorakuActivityIndicator } from '@/components/loading';
import { RenderTabBar, TabBarWithChip } from '@/components/tab';
import { useList } from '@/hooks/list/useList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	MediaList,
	MediaListSort,
	MediaListStatus,
	MediaType,
	UserAnimeListCollectionQuery,
	UserMangaListCollectionQuery,
} from '@/store/services/anilist/generated-anilist';
import { updateListFilter } from '@/store/slices/listSLice';
import { rgbToRgba, useColumns } from '@/utils';
import { compareArrays } from '@/utils/compare';
import { sortListTabs, sortLists } from '@/utils/sort';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { FlashList } from '@shopify/flash-list';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

type ListParams = {
    data:
        | UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]
        | UserMangaListCollectionQuery['MediaListCollection']['lists'][0];
    updateTitle?: (dataLength: number) => void;
    isRefreshing?: boolean;
    onRefresh?: () => void;
    type?: MediaType;
};

const ListScreen = ({ data, isRefreshing, updateTitle, onRefresh }: ListParams) => {
	const [entries, setEntries] = useState(data?.entries);
	const { colors } = useTheme();
	const { query } = useAppSelector((state) => state.listFilter);
	const { sort } = useAppSelector((state) => state.listFilter);

	const scorebgColor = useMemo(
		() => rgbToRgba(colors.primaryContainer, 0.75),
		[colors.primaryContainer],
	);

	const sortedItems = useMemo(() => {
		return sortLists(entries, sort);
	}, [sort]);

	const filterList = (search: string) => {
		if (search.length > 0) {
			return sortedItems.filter(
				(item) =>
					item.media.title.romaji?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    item.media.title.english?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    item.media.title.native?.includes(search) ||
                    item.media.synonyms?.some((value, index) =>
                    	value.toLowerCase()?.includes(search?.toLowerCase()),
                    ),
			);
		} else {
			return sortedItems;
		}
	};

	const filteredItems = useMemo(() => {
		return filterList(query);
	}, [query, sort]);

	const RenderItem = useCallback(
		({
			item,
		}: {
            item:
                | UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]['entries'][0]
                | UserMangaListCollectionQuery['MediaListCollection']['lists'][0]['entries'][0];
        }) => {
			return (
			// <View style={{ width: '100%', alignItems: 'center', marginVertical: 12 }}>
			//     <MediaItemMem item={item.media} navigate={navigate} />
			// </View>
			// <TouchableOpacity
			//     onPress={() => navigate(item.media.id, item.media.idMal, item.media.type)}
			//     style={{
			//         flex: 1,
			//         alignItems: 'center',
			//         marginVertical: 12,
			//         marginHorizontal: width / 150 / 3,
			//     }}
			// >
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
						coverImg={item.media.coverImage.extraLarge}
						titles={item.media.title}
						navigate={() =>
							router.push(`/${item.media.type.toLowerCase()}/${item.media.id}`)
						}
						scorebgColor={scorebgColor}
						averageScore={item.media.averageScore}
						meanScore={item.media.meanScore}
						// @ts-ignore timeUntilAiring is transformed to string via RTK Query
						bannerText={item.media.nextAiringEpisode?.timeUntilAiring}
						imgBgColor={item.media.coverImage.color}
						showBanner={item.media.nextAiringEpisode ? true : false}
						scoreDistributions={item.media.stats?.scoreDistribution}
						fitToParent
						isFavorite={item.media.isFavourite}
					/>
					{[
						MediaListStatus.Current,
						MediaListStatus.Repeating,
						MediaListStatus.Paused,
					].includes(item.status) && (
						<MediaProgressBar
							progress={item.progress}
							mediaListEntry={item as MediaList}
							mediaStatus={item.media.status}
							total={
								item.media.episodes ??
                                item.media.chapters ??
                                item.media.volumes ??
                                0
							}
							showListStatus={false}
						/>
					)}
				</View>
			);
		},
		[],
	);

	// useEffect(() => {
	//     setEntries((prev) => sortLists(prev, sort));
	// }, [sort]);

	useEffect(() => {
		if (query.length > 0) {
			updateTitle(filterList(query).length);
		} else {
			updateTitle(filteredItems.length);
		}
	}, [query]);

	return (
		<View style={{ flex: 1, height: '100%', width: '100%' }}>
			<FlashList
				key={3}
				// data={query.length > 0 ? filterList(query) : entries}
				data={filteredItems}
				// extraData={sort}
				// drawDistance={height * 2}
				renderItem={RenderItem}
				keyExtractor={(item, idx) => item?.media?.id.toString()}
				estimatedItemSize={238}
				numColumns={3}
				// onRefresh={onRefresh}
				// refreshing={isRefreshing}
				// terrible performance without
				drawDistance={0}
				contentContainerStyle={{
					padding: 10,
				}}
				// onViewableItemsChanged={(test) => test.}
				centerContent
				removeClippedSubviews
			/>
		</View>
	);
};

const ListTabs = ({
	type,
	data,
	routes,
	loading,
	isRefreshing,
	onRefresh,
}: {
    type: MediaType;
    loading: boolean;
    routes: { key: string; title: string }[];
    data:
        | UserAnimeListCollectionQuery['MediaListCollection']
        | UserMangaListCollectionQuery['MediaListCollection'];
    isRefreshing: boolean;
    onRefresh: () => void;
}) => {
	const { animeTabOrder, mangaTabOrder } = useAppSelector((state) => state.listFilter);
	const { colors } = useTheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [tabRoutes, setTabRoutes] = useState<{ key: string; title: string }[]>(routes);
	const [listData, setListData] = useState(data);

	const updateTitleCount = (key: string, total: number) => {
		setTabRoutes((prevRoutes) =>
			prevRoutes.map((route) =>
				route.key === key ? { ...route, title: `${route.title} (${total})` } : route,
			),
		);
	};

	// const updateTabOrder = () => {
	//     setTabRoutes((prevRoutes) =>
	//         prevRoutes.map((route) => (route.key === key ? { ...route, title: `${route.title} (${total})` } : route)),
	//     );
	// };

	const renderScene = ({ route }) => {
		return (
			<ListScreen
				data={data?.lists.find((list) => list.name === route.key)}
				updateTitle={(dataLength: number) => updateTitleCount(route.key, dataLength)}
				isRefreshing={isRefreshing}
				onRefresh={onRefresh}
			/>
		);
	};

	useEffect(() => {
		if (tabRoutes && listData) {
			const listCounts = {};
			for (const list of listData?.lists) {
				listCounts[list.name] = list.entries.length;
			}
			const newRoutes = sortListTabs(
				tabRoutes.map((route) => route.key),
				type === MediaType.Anime ? animeTabOrder : mangaTabOrder,
				listCounts,
			);
			const isOrderSame = compareArrays(
				tabRoutes.map((route) => route.key),
				newRoutes,
			);

			if (!isOrderSame) {
				setTabRoutes(newRoutes);
			}
		}
	}, [listData, animeTabOrder, mangaTabOrder]);

	return tabRoutes.length > 0 ? (
		<TabView
			navigationState={{ index, routes: tabRoutes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={TabBarWithChip}
			swipeEnabled={true}
		/>
	) : null;
};

const ListPage = () => {
	const layout = useWindowDimensions();
	const { colors } = useTheme();
	const { userID } = useAppSelector((state) => state.persistedAniLogin);
	const [index, setIndex] = useState(0);

	const {
		animeList,
		mangaList,
		rootRoutes,
		animeRoutes,
		mangaRoutes,
		tags,
		genres,
		loading,
		isRefreshing,
		refreshAnimeList,
		refreshMangaList,
	} = useList(userID);

	const filterSheetRef = useRef<BottomSheetModalMethods>(null);

	const [routes, setRoutes] = useState(rootRoutes);

	// const renderTabBar = (props) => (
	//     <TabBar
	//         {...props}
	//         tabStyle={{ paddingTop: 10 }}
	//         indicatorStyle={{ backgroundColor: colors.primary }}
	//         style={{ backgroundColor: colors.surface }}
	//         labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
	//         scrollEnabled={false}
	//         android_ripple={{ color: colors.primary, borderless: true }}
	//     />
	// );

	const renderScene = ({ route }) => {
		switch (route.key) {
		case 'anime':
			return (
				<ListTabs
					type={MediaType.Anime}
					data={animeList?.data?.MediaListCollection}
					routes={animeRoutes}
					loading={loading}
					isRefreshing={isRefreshing}
					onRefresh={refreshAnimeList}
				/>
			);
		case 'manga':
			return (
				<ListTabs
					type={MediaType.Manga}
					data={mangaList?.data?.MediaListCollection}
					routes={mangaRoutes}
					loading={loading}
					isRefreshing={isRefreshing}
					onRefresh={refreshAnimeList}
				/>
			);
		default:
			return null;
		}
	};

	useEffect(() => {
		if (rootRoutes.length > 0) {
			setRoutes(rootRoutes);
		}
	}, [rootRoutes]);

	return (
		<>
			<ListHeader
				openFilter={() => filterSheetRef.current?.present()}
				onRefresh={index === 0 ? refreshAnimeList : refreshMangaList}
			/>
			{!loading && !isRefreshing && routes.length > 0 ? (
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
					renderTabBar={TabBarWithChip}
					swipeEnabled={false}
				/>
			) : (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					{/* <ActivityIndicator animating={true} size={'large'} color={colors.primary} /> */}
					<GorakuActivityIndicator />
					<Text variant="labelMedium">Fetching lists</Text>
				</View>
			)}
			<ListFilterSheet
				ref={filterSheetRef}
				mediaType={index === 0 ? MediaType.Anime : MediaType.Manga}
				tags={tags}
				genres={genres}
				// sortList={sortLists}
			/>
		</>
	);
};

export default ListPage;
