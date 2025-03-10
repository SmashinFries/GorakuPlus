import {
	MediaListStatus,
	MediaType,
	UserAnimeListCollectionQuery,
	UserMangaListCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { useListFilterStore } from '@/store/listStore';
import { sortLists, sortListTabs } from '@/utils/sort';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { MediaCard, MediaCardRow } from '../cards';
import { ScrollToTopButton } from '../buttons';
import { compareArrays } from '@/utils/compare';
import { TabView } from 'react-native-tab-view';
import { GorakuTabBar } from '../tab';
import { useShallow } from 'zustand/react/shallow';
import { useColumns } from '@/hooks/useColumns';
import { GorakuRefreshControl } from '../explore/lists';

type ListParams = {
	data:
		| NonNullable<NonNullable<UserAnimeListCollectionQuery['MediaListCollection']>['lists']>[0]
		| NonNullable<NonNullable<UserMangaListCollectionQuery['MediaListCollection']>['lists']>[0];
	updateTitle?: (dataLength: number) => void;
	isRefreshing?: boolean;
	onRefresh?: () => void;
	type?: MediaType;
};

const ListScreen = ({ data, isRefreshing, updateTitle, onRefresh }: ListParams) => {
	const { query, sort } = useListFilterStore();
	const { columns, displayMode } = useColumns('list');

	const [scrollOffset, setScrollOffset] = useState(0);

	const listRef = useRef<FlashList<any>>(null);

	// const scorebgColor = useMemo(
	// 	() => rgbToRgba(colors.primaryContainer, 0.75),
	// 	[colors.primaryContainer],
	// );

	const sortedItems = useMemo(() => {
		return sort ? sortLists(data?.entries, sort) : null;
	}, [sort]);

	const filterList = (search?: string) => {
		if (search && search.length > 0) {
			return sortedItems?.filter(
				(item) =>
					item?.media?.title?.romaji?.toLowerCase()?.includes(search?.toLowerCase()) ||
					item?.media?.title?.english?.toLowerCase()?.includes(search?.toLowerCase()) ||
					item?.media?.title?.native?.includes(search) ||
					item?.media?.synonyms?.some((value) =>
						value?.toLowerCase()?.includes(search?.toLowerCase()),
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
			return displayMode === 'COMPACT' ? (
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
					{/* {[
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
					)} */}
				</View>
			) : (
				<MediaCardRow {...item?.media} />
			);
		},
		[displayMode],
	);

	useEffect(() => {
		if (query && (query?.length ?? 0) > 0) {
			updateTitle?.(filterList(query)?.length ?? 0);
		} else {
			updateTitle?.(filteredItems?.length ?? 0);
		}
	}, [query]);

	return (
		<View style={{ flex: 1, height: '100%', width: '100%' }}>
			<FlashList
				key={columns}
				ref={listRef}
				data={filteredItems}
				renderItem={RenderItem}
				keyExtractor={(item, idx) => idx.toString()}
				estimatedItemSize={238}
				numColumns={columns}
				refreshControl={
					<GorakuRefreshControl onRefresh={onRefresh} refreshing={!!isRefreshing} />
				}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
				// terrible performance without
				drawDistance={0}
				contentContainerStyle={
					{
						// padding: 10,
					}
				}
				centerContent
				removeClippedSubviews
			/>
			{scrollOffset > 500 && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
				/>
			)}
		</View>
	);
};

export const ListTabs = ({
	isViewer = true,
	type,
	data,
	routes,
	isRefreshing,
	onRefresh,
}: {
	isViewer?: boolean;
	type: MediaType;
	routes: { key: string; title: string }[];
	data:
		| UserAnimeListCollectionQuery['MediaListCollection']
		| UserMangaListCollectionQuery['MediaListCollection'];
	isRefreshing: boolean;
	onRefresh: () => void;
}) => {
	const { animeTabOrder, mangaTabOrder } = useListFilterStore(
		useShallow((state) => ({
			animeTabOrder: state.animeTabOrder,
			mangaTabOrder: state.mangaTabOrder,
		})),
	);
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [tabRoutes, setTabRoutes] = useState<{ key: string; title: string }[]>(routes);

	const updateTitleCount = (key: string, total: number) => {
		setTabRoutes((prevRoutes) =>
			prevRoutes.map((route) =>
				route.key === key ? { ...route, title: `${route.title} (${total ?? 0})` } : route,
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
				data={data?.lists?.find((list) => list?.name === route.key)}
				updateTitle={(dataLength: number) => updateTitleCount(route.key, dataLength ?? 0)}
				isRefreshing={isRefreshing}
				onRefresh={onRefresh}
			/>
		);
	};

	useEffect(() => {
		if (tabRoutes && data?.lists && isViewer) {
			const listCounts: { [key: string]: number } = {};
			for (const list of data.lists) {
				if (list?.name) {
					listCounts[list?.name] = list.entries?.length ?? 0;
				}
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
				isViewer && setTabRoutes(newRoutes);
			}
		}
	}, [data, animeTabOrder, mangaTabOrder]);

	return tabRoutes.length > 0 ? (
		<TabView
			navigationState={{ index, routes: tabRoutes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={(props) => <GorakuTabBar {...props} enableChip />}
			swipeEnabled={true}
			lazy
		/>
	) : null;
};
