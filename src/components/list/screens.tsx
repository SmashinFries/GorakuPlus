import {
	MediaListStatus,
	MediaType,
	UserAnimeListCollectionQuery,
	UserMangaListCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { useListFilterStore } from '@/store/listStore';
import { sortLists, sortListTabs } from '@/utils/sort';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { MediaCard, MediaCardRow } from '../cards';
import { ScrollToTopButton } from '../buttons';
import { compareArrays } from '@/utils/compare';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import { GorakuTabBar } from '../tab';
import { useColumns } from '@/hooks/useColumns';
import { GorakuRefreshControl } from '../explore/lists';

type ListParams = {
	data:
		| NonNullable<NonNullable<UserAnimeListCollectionQuery['MediaListCollection']>['lists']>[0]
		| NonNullable<NonNullable<UserMangaListCollectionQuery['MediaListCollection']>['lists']>[0];
	updateTitle?: (dataLength?: number) => void;
	isRefreshing?: boolean;
	onRefresh?: () => void;
	type?: MediaType;
};

const ListScreen = ({ data, isRefreshing, updateTitle, onRefresh }: ListParams) => {
	const { query, sort, tags_include, tags_exclude, genre_include, genre_exclude } =
		useListFilterStore();
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

	const filterList = (
		search: string = '',
		tags_in: string[] = [],
		tags_ex: string[] = [],
		genres_in: string[] = [],
		genres_ex: string[] = [],
	) => {
		const filtered = (sortedItems || []).filter((item) => {
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

			return true;
		});

		updateTitle?.(filtered.length);

		return filtered;
	};

	const filteredItems = useMemo(() => {
		return filterList(query, tags_include, tags_exclude, genre_include, genre_exclude);
	}, [query, sort, tags_include, tags_exclude, genre_include, genre_exclude]);

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
				)
			) : null;
		},
		[displayMode],
	);

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
					<GorakuRefreshControl
						onRefresh={() => onRefresh?.()}
						refreshing={!!isRefreshing}
					/>
				}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
				// terrible performance without
				drawDistance={0}
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
	const { animeTabOrder, mangaTabOrder } = useListFilterStore();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [tabRoutes, setTabRoutes] = useState<{ key: string; title: string }[]>(routes);

	const updateTitleCount = (key: string, total?: number) => {
		console.log('Updating', key, 'with', total);
		setTabRoutes((prevRoutes) => {
			const newRoutes = prevRoutes.map((route) => {
				if (route.key === key) {
					const baseTitle = route.title.replace(/\s*\(\d+\)$/, '');
					const newRoute = { ...route, title: `${baseTitle} (${total ?? 0})` };
					console.log('Updated route:', newRoute);
					return newRoute;
				}
				return route;
			});
			console.log('New Routes:', newRoutes);
			return newRoutes;
		});
	};

	const computedRoutes = useMemo(() => {
		if (!tabRoutes || !data?.lists || !isViewer) {
			return tabRoutes;
		}

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
			return newRoutes.map((route) => {
				const existingRoute = tabRoutes.find((r) => r.key === route.key);
				return existingRoute || route;
			});
		}

		return tabRoutes;
	}, [data, animeTabOrder, mangaTabOrder, tabRoutes, type, isViewer]);

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
				data={data?.lists?.find((list) => list?.name === route.key) ?? null}
				updateTitle={(dataLength?: number) => updateTitleCount(route.key, dataLength)}
				isRefreshing={isRefreshing}
				onRefresh={onRefresh}
			/>
		);
	};

	return tabRoutes.length > 0 ? (
		<TabView
			navigationState={{ index, routes: computedRoutes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={(props) => <GorakuTabBar {...props} enableChip />}
			swipeEnabled={true}
			lazy
		/>
	) : null;
};
