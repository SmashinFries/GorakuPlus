import { FlashList, ListRenderItem, ListRenderItemInfo } from '@shopify/flash-list';
import {
	NativeSyntheticEvent,
	SectionList,
	SectionListData,
	SectionListRenderItem,
	View,
	useWindowDimensions,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useColumns } from '@/utils';
import { MutableRefObject, useCallback, useMemo } from 'react';
import { CharacterCard, MediaCard, MediaProgressBar, StaffCard, StudioCard } from '../cards';
import { EmptyLoadView } from './loading';
import Animated, { SharedValue } from 'react-native-reanimated';
import { NativeScrollEvent } from 'react-native';
import { router } from 'expo-router';
import { useSearchStore } from '@/store/search/searchStore';
import useDebounce from '@/hooks/useDebounce';
import {
	AnimeMetaFragment,
	MediaList,
	MediaSearchQuery,
	MediaType,
	SearchAllQuery,
	useInfiniteMediaSearchQuery,
	useInfiniteSearchAllQuery,
	useSearchAllQuery,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export const MediaRenderItem = (
	props: Omit<ListRenderItemInfo<MediaSearchQuery['Page']['media'][0]>, 'target'>,
) => {
	return (
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
				coverImg={props.item.coverImage.extraLarge}
				titles={props.item.title}
				navigate={() => {
					router.push(`/${props.item.type}/${props.item.id}`);
				}}
				imgBgColor={props.item.coverImage.color}
				scoreDistributions={props.item.stats?.scoreDistribution}
				bannerText={props.item.nextAiringEpisode?.airingAt}
				showBanner={props.item.nextAiringEpisode ? true : false}
				averageScore={props.item.averageScore}
				meanScore={props.item.meanScore}
				mediaListEntry={props.item.mediaListEntry}
				fitToParent
			/>
			{/* <MediaProgressBar
				progress={props.item.mediaListEntry?.progress}
				mediaListEntry={props.item.mediaListEntry as MediaList}
				mediaStatus={props.item.status}
				total={props.item.episodes ?? props.item.chapters ?? props.item.volumes ?? 0}
			/> */}
		</View>
	);
};

type MediaSearchListProps = {
	listRef: MutableRefObject<FlashList<any>>;
	onScrollHandler:
		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
		| SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
	headerHeight: number;
};

type SearchAllSection = {
	title: string;
	type: 'anime' | 'manga' | 'characters' | 'staff' | 'studios' | 'users';
	data: any;
};

export const SearchAllList = ({ listRef, headerHeight, onScrollHandler }: MediaSearchListProps) => {
	const { width } = useWindowDimensions();
	const query = useSearchStore((state) => state.query);
	const showNSFW = useSettingsStore((state) => state.showNSFW);
	const debouncedSearch = useDebounce(query, 600);

	const { data, isFetching } = useSearchAllQuery(
		{ search: debouncedSearch, perPage: 6, isAdult: showNSFW },
		{ enabled: debouncedSearch?.length > 0 },
	);

	const sections: SearchAllSection[] = [
		{ title: 'Anime', type: 'anime', data: data?.Anime?.media },
		{ title: 'Manga', type: 'manga', data: data?.Manga?.media },
		{ title: 'Characters', type: 'characters', data: data?.Characters.characters },
		{ title: 'Staff', type: 'staff', data: data?.Staff?.staff },
		{ title: 'Studios', type: 'studios', data: data?.Studios?.studios },
		{ title: 'Users', type: 'users', data: data?.Users?.users },
	];

	const renderSectionTitle = (info: { section: SectionListData<any, SearchAllSection> }) => {
		return (
			<View style={{ marginBottom: 12 }}>
				<Text variant="titleLarge">{info.section.title}</Text>
			</View>
		);
	};

	const renderItem: SectionListRenderItem<any, SearchAllSection> = ({ index, item, section }) => {
		if (section.type === 'anime' || section.type === 'manga') {
			return <MediaRenderItem index={index} item={item} />;
		} else if (section.type === 'characters' || section.type === 'staff') {
			return (
				<View
					style={{
						alignItems: 'center',
						marginVertical: 15,
						marginHorizontal: 4,
					}}
				>
					<CharacterCard
						name={item.name.full}
						imgUrl={item.image?.large}
						nativeName={item.name.native}
						onPress={() => router.push(`/character/${item.id}`)}
						isFavourite={item.isFavourite}
					/>
				</View>
			);
		} else if (section.type === 'studios') {
			return (
				<StudioCard
					{...(item as SearchAllQuery['Studios']['studios'][0])}
					onPress={() => router.push(`/studio/${item.id}`)}
				/>
			);
		}
	};

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{/* Could / should use flashlist here but... aint feelin it */}
			<SectionList
				sections={sections}
				renderItem={renderItem}
				renderSectionHeader={renderSectionTitle}
			/>
		</View>
	);
};

export const AnimeSearchList = ({
	listRef,
	onScrollHandler,
	headerHeight,
}: MediaSearchListProps) => {
	const { query, filter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 600);
	// const { data, hasNextPage, fetchNextPage, isFetching } = useAnimeSearch({
	// 	...filter,
	// 	search: debouncedSearch,
	// });
	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteMediaSearchQuery(
			{
				type: MediaType.Anime,
				...filter,
				search: debouncedSearch.length > 1 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);

	const mergedResults = data?.pages?.flatMap((val) => val.Page?.media);

	const { width } = useWindowDimensions();
	const { columns, listKey } = useColumns(150);

	const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

	// const mergedResults = useMemo(() => data.pages.flatMap((val) => val.Page.media), [data]);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{/* <Button
				onPress={() =>
					console.log({
						type: MediaType.Anime,
						...filter,
						search: debouncedSearch.length > 1 ? debouncedSearch : undefined,
					})
				}
			>
				TEST
			</Button> */}
			<AnimatedFlashList
				key={listKey}
				ref={listRef}
				data={mergedResults}
				nestedScrollEnabled
				renderItem={(props) => (
					<MediaRenderItem
						{...props}
						item={props.item as MediaSearchQuery['Page']['media'][0]}
					/>
				)}
				keyExtractor={keyExtract}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				numColumns={3}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={onScrollHandler}
				contentContainerStyle={{
					// padding: 10,
					paddingTop: headerHeight,
					// paddingLeft: props.results?.Page?.media ? 150 / columns / 3 : undefined,
				}}
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

export const MangaSearchList = ({
	listRef,
	onScrollHandler,
	headerHeight,
}: MediaSearchListProps) => {
	const { query, filter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 600);
	const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteMediaSearchQuery(
			{ type: MediaType.Manga, ...filter },
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);
	const { width } = useWindowDimensions();
	const { columns, listKey } = useColumns(150);

	const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

	const allResults = useMemo(() => data.pages.flatMap((val) => val.Page.media), [data]);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={listKey}
				ref={listRef}
				data={allResults}
				nestedScrollEnabled
				renderItem={(props) => (
					<MediaRenderItem
						{...props}
						item={props.item as MediaSearchQuery['Page']['media'][0]}
					/>
				)}
				keyExtractor={keyExtract}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				numColumns={3}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={onScrollHandler}
				contentContainerStyle={{
					// padding: 10,
					paddingTop: headerHeight,
					// paddingLeft: props.results?.Page?.media ? 150 / columns / 3 : undefined,
				}}
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

// type AniMangListProps = {
// 	filter: ExploreMediaQueryVariables;
// 	results: ExploreMediaQuery;
// 	searchStatus: any;
// 	sheetRef: any;
// 	isLoading: boolean;
// 	nextPage: (currentPage: number, filter: ExploreMediaQueryVariables) => Promise<void>;
// 	onItemPress: (aniID: number, type: MediaType) => void;
// 	onScrollHandler:
// 		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
// 		| Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
// 	headerHeight: number;
// 	listRef: MutableRefObject<FlashList<any>>;
// };
// export const AniMangList = (props: AniMangListProps) => {
// 	const { width } = useWindowDimensions();
// 	const { columns, listKey } = useColumns(150);
// 	const { dismissAll } = useBottomSheetModal();

// 	const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

// 	const RenderItem = useCallback(
// 		(itemProps) => (
// 			<View
// 				style={{
// 					flex: 1,
// 					alignItems: 'center',
// 					justifyContent: 'flex-start',
// 					marginVertical: 10,
// 					marginHorizontal: 5,
// 				}}
// 			>
// 				<MediaCard
// 					coverImg={itemProps.item.coverImage.extraLarge}
// 					titles={itemProps.item.title}
// 					navigate={() => {
// 						dismissAll();
// 						props.onItemPress(itemProps.item.id, itemProps.item.type);
// 					}}
// 					imgBgColor={itemProps.item.coverImage.color}
// 					scoreDistributions={itemProps.item.stats?.scoreDistribution}
// 					bannerText={itemProps.item.nextAiringEpisode?.timeUntilAiring}
// 					showBanner={itemProps.item.nextAiringEpisode ? true : false}
// 					averageScore={itemProps.item.averageScore}
// 					meanScore={itemProps.item.meanScore}
// 					fitToParent
// 				/>
// 				<MediaProgressBar
// 					progress={itemProps.item.mediaListEntry?.progress}
// 					mediaListEntry={itemProps.item.mediaListEntry}
// 					mediaStatus={itemProps.item.status}
// 					total={
// 						itemProps.item.episodes ??
// 						itemProps.item.chapters ??
// 						itemProps.item.volumes ??
// 						0
// 					}
// 				/>
// 			</View>
// 		),
// 		[],
// 	);

// 	return (
// 		<View style={{ flex: 1, height: '100%', width }}>
// 			<AnimatedFlashList
// 				key={listKey}
// 				ref={props.listRef}
// 				data={props.results?.Page?.media}
// 				nestedScrollEnabled
// 				renderItem={RenderItem}
// 				keyExtractor={keyExtract}
// 				keyboardShouldPersistTaps="never"
// 				keyboardDismissMode="interactive"
// 				numColumns={3}
// 				estimatedItemSize={240}
// 				removeClippedSubviews
// 				centerContent
// 				onScroll={props.onScrollHandler}
// 				contentContainerStyle={{
// 					// padding: 10,
// 					paddingTop: props.headerHeight,
// 					// paddingLeft: props.results?.Page?.media ? 150 / columns / 3 : undefined,
// 				}}
// 				onEndReachedThreshold={0.4}
// 				onEndReached={() => {
// 					props.results?.Page &&
// 						props.results?.Page?.pageInfo?.hasNextPage &&
// 						props.results?.Page?.media?.length > 0 &&
// 						props.nextPage(props.results?.Page?.pageInfo?.currentPage, props.filter);
// 				}}
// 			/>
// 		</View>
// 	);
// };

// export const CharacterSearchList = () => {};

// type CharacterListProps = {
// 	results: CharacterSearchQuery;
// 	searchStatus: any;
// 	isLoading: boolean;
// 	onScrollHandler:
// 		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
// 		| Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
// 	headerHeight: number;
// 	listRef: MutableRefObject<FlashList<any>>;
// 	onNavigate: (id: number) => void;
// 	nextPage?: () => Promise<void>;
// };
// export const CharacterList = (props: CharacterListProps) => {
// 	const { width, height } = useWindowDimensions();
// 	// const { dark, colors } = useTheme();
// 	const { columns, listKey } = useColumns(110);
// 	const { dismissAll } = useBottomSheetModal();

// 	const keyExtract = useCallback(
// 		(item, index: number) => item.id.toString() + index.toString(),
// 		[],
// 	);

// 	const RenderItem: ListRenderItem<CharacterSearchQuery['Page']['characters'][0]> = useCallback(
// 		({ item }) => {
// 			return (
// 				<View style={{ flex: 1, alignItems: 'center', marginVertical: 15 }}>
// 					<CharacterCard
// 						onPress={() => {
// 							dismissAll();
// 							props.onNavigate(item.id);
// 						}}
// 						imgUrl={item.image?.large}
// 						name={item.name?.full}
// 						nativeName={item.name?.native}
// 						isFavourite={item.isFavourite}
// 					/>
// 				</View>
// 			);
// 		},
// 		[],
// 	);

// 	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

// 	return (
// 		<View style={{ flex: 1, height: '100%', width }}>
// 			<AnimatedFlashList
// 				key={listKey}
// 				ref={props.listRef}
// 				data={props.results?.Page?.characters}
// 				nestedScrollEnabled
// 				renderItem={RenderItem}
// 				keyExtractor={keyExtract}
// 				numColumns={columns}
// 				estimatedItemSize={240}
// 				removeClippedSubviews
// 				centerContent
// 				onScroll={props.onScrollHandler}
// 				contentContainerStyle={{
// 					// padding: 10,
// 					paddingTop: props.headerHeight,
// 					// paddingLeft: props.results?.Page?.characters ? 110 / columns / 3 : undefined,
// 				}}
// 				onEndReachedThreshold={0.4}
// 				onEndReached={() => {
// 					props.results?.Page &&
// 						props.results?.Page?.characters?.length > 0 &&
// 						props.nextPage();
// 				}}
// 			/>
// 		</View>
// 	);
// };

// type StaffListProps = {
// 	results: StaffSearchQuery;
// 	searchStatus: any;
// 	isLoading: boolean;
// 	onScrollHandler:
// 		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
// 		| Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
// 	headerHeight: number;
// 	listRef: MutableRefObject<FlashList<any>>;
// 	onNavigate: (id: number) => void;
// 	nextPage?: () => Promise<void>;
// };
// export const StaffList = (props: StaffListProps) => {
// 	const { width, height } = useWindowDimensions();
// 	const { dismissAll } = useBottomSheetModal();
// 	const { columns, listKey } = useColumns(110);

// 	const keyExtract = useCallback(
// 		(item, index: number) => item.id.toString() + index.toString(),
// 		[],
// 	);

// 	const RenderItem: ListRenderItem<StaffSearchQuery['Page']['staff'][0]> = useCallback(
// 		({ item }) => {
// 			return (
// 				<View style={{ flex: 1, alignItems: 'center', marginVertical: 15 }}>
// 					<StaffCard
// 						onPress={() => {
// 							dismissAll();
// 							props.onNavigate(item.id);
// 						}}
// 						imgUrl={item.image?.large}
// 						name={item.name?.full}
// 						nativeName={item.name?.native}
// 						isFavourite={item.isFavourite}
// 					/>
// 				</View>
// 			);
// 		},
// 		[],
// 	);

// 	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

// 	return (
// 		<View style={{ flex: 1, height: '100%', width }}>
// 			<AnimatedFlashList
// 				key={listKey}
// 				ref={props.listRef}
// 				data={props.results?.Page?.staff}
// 				nestedScrollEnabled
// 				renderItem={RenderItem}
// 				keyExtractor={keyExtract}
// 				numColumns={columns}
// 				estimatedItemSize={240}
// 				removeClippedSubviews
// 				centerContent
// 				onScroll={props.onScrollHandler}
// 				contentContainerStyle={{
// 					paddingTop: props.headerHeight,
// 				}}
// 				onEndReachedThreshold={0.4}
// 				onEndReached={() => {
// 					props.results?.Page &&
// 						props.results?.Page?.staff?.length > 0 &&
// 						props.nextPage();
// 				}}
// 			/>
// 		</View>
// 	);
// };

// type StudioListProps = {
// 	results: StudioSearchQuery;
// 	searchStatus: any;
// 	isLoading: boolean;
// 	onScrollHandler:
// 		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
// 		| Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
// 	headerHeight: number;
// 	listRef: MutableRefObject<FlashList<any>>;
// 	onNavigate: (studioId: number) => void;
// 	nextPage?: () => Promise<void>;
// };
// export const StudioList = (props: StudioListProps) => {
// 	const { width, height } = useWindowDimensions();
// 	const { dismissAll } = useBottomSheetModal();
// 	const { columns, listKey } = useColumns(110);

// 	const keyExtract = useCallback(
// 		(item, index: number) => item.id.toString() + index.toString(),
// 		[],
// 	);

// 	const RenderItem: ListRenderItem<StudioSearchQuery['Page']['studios'][0]> = useCallback(
// 		({ item }) => {
// 			return (
// 				<View
// 					style={{
// 						flex: 1,
// 						width: '100%',
// 						alignItems: 'center',
// 						marginVertical: 15,
// 						paddingHorizontal: 20,
// 					}}
// 				>
// 					<StudioCard
// 						onPress={() => {
// 							dismissAll();
// 							props.onNavigate(item.id);
// 							// openWebBrowser(item.siteUrl);
// 						}}
// 						name={item.name}
// 						isFavourite={item.isFavourite}
// 						banners={
// 							item.media?.edges?.length > 0
// 								? item.media?.edges?.map((edge) => edge?.node?.bannerImage)
// 								: undefined
// 						}
// 					/>
// 				</View>
// 			);
// 		},
// 		[],
// 	);

// 	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

// 	return (
// 		<View style={{ flex: 1, height: '100%', width }}>
// 			<AnimatedFlashList
// 				key={1}
// 				ref={props.listRef}
// 				data={props.results?.Page?.studios}
// 				nestedScrollEnabled
// 				renderItem={RenderItem}
// 				keyExtractor={keyExtract}
// 				numColumns={1}
// 				estimatedItemSize={240}
// 				removeClippedSubviews
// 				centerContent
// 				onScroll={props.onScrollHandler}
// 				contentContainerStyle={{
// 					paddingTop: props.headerHeight,
// 				}}
// 				onEndReachedThreshold={0.4}
// 				onEndReached={() => {
// 					props.results?.Page &&
// 						props.results?.Page?.studios?.length > 0 &&
// 						props.nextPage();
// 				}}
// 			/>
// 		</View>
// 	);
// };

// type ImageSearchListProps = {
// 	results: SearchResult;
// 	onScrollHandler:
// 		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
// 		| Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
// 	headerHeight: number;
// 	isLoading: boolean;
// 	listRef: MutableRefObject<FlashList<any>>;
// };
// export const ImageSearchList = (props: ImageSearchListProps) => {
// 	const { width, height } = useWindowDimensions();

// 	const keyExtract = useCallback((item, index: number) => index.toString(), []);

// 	const RenderItem: ListRenderItem<Result> = ({ item }) => {
// 		return <ImageSearchItem item={item} />;
// 	};

// 	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

// 	return (
// 		<View style={{ flex: 1, height: '100%', width }}>
// 			<AnimatedFlashList
// 				key={1}
// 				ref={props.listRef}
// 				data={props.results?.result}
// 				nestedScrollEnabled
// 				renderItem={RenderItem}
// 				keyExtractor={keyExtract}
// 				numColumns={1}
// 				estimatedItemSize={240}
// 				removeClippedSubviews
// 				centerContent
// 				onScroll={props.onScrollHandler}
// 				contentContainerStyle={{
// 					padding: 10,
// 					paddingTop: props.headerHeight,
// 				}}
// 			/>
// 		</View>
// 	);
// };

// type WaifuSearchListProps = {
// 	results: CharacterSearchQuery['Page']['characters'];
// 	isLoading: boolean;
// 	onScrollHandler:
// 		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
// 		| Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
// 	headerHeight: number;
// 	listRef: MutableRefObject<FlashList<any>>;
// };
// export const WaifuSearchList = (props: WaifuSearchListProps) => {
// 	const { width, height } = useWindowDimensions();
// 	const { dismissAll } = useBottomSheetModal();
// 	const { columns, listKey } = useColumns(110);

// 	const keyExtract = useCallback(
// 		(item, index: number) => item.id.toString() + index.toString(),
// 		[],
// 	);

// 	const RenderItem: ListRenderItem<
// 		CharacterSearchQuery['Page']['characters'][0] & { confidence: number }
// 	> = useCallback(({ item }) => {
// 		return (
// 			<View style={{ alignItems: 'center', marginVertical: 15 }}>
// 				<CharacterCard
// 					onPress={() => {
// 						dismissAll();
// 						router.push('/characters/info/' + item.id);
// 					}}
// 					imgUrl={item.image?.large}
// 					name={item.name?.full}
// 					nativeName={item.name?.native}
// 					isFavourite={item.isFavourite}
// 					role={`${(item.confidence * 100).toFixed(2)}% Match`}
// 				/>
// 			</View>
// 		);
// 	}, []);

// 	if (props.isLoading)
// 		return <EmptyLoadView isLoading={true} message={'May take some time (queuing system)'} />;

// 	return (
// 		<View style={{ flex: 1, height: '100%', width }}>
// 			<AnimatedFlashList
// 				key={listKey}
// 				ref={props.listRef}
// 				data={props.results}
// 				nestedScrollEnabled
// 				renderItem={RenderItem}
// 				keyExtractor={keyExtract}
// 				numColumns={columns}
// 				estimatedItemSize={240}
// 				removeClippedSubviews
// 				centerContent
// 				onScroll={props.onScrollHandler}
// 				contentContainerStyle={{
// 					padding: 10,
// 					paddingTop: props.headerHeight,
// 					paddingLeft: props.results ? 110 / columns / 3 : undefined,
// 				}}
// 				ListEmptyComponent={() => (
// 					<View style={{ flex: 1, alignItems: 'center' }}>
// 						<Text>No Results</Text>
// 					</View>
// 				)}
// 			/>
// 		</View>
// 	);
// };
