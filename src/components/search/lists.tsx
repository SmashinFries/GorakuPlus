import { FlashList, FlashListProps, ListRenderItem } from '@shopify/flash-list';
import { NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Card, Chip, Text, useTheme } from 'react-native-paper';
import { rgbToRgba, useColumns } from '@/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CharacterCard, MediaCard, MediaProgressBar, StaffCard, StudioCard } from '../cards';
import { SearchFooter } from './footers';
import { useAppSelector } from '@/store/hooks';
import {
	CharacterSearchQuery,
	ExploreMediaQuery,
	MediaType,
	StaffSearchQuery,
	StudioSearchQuery,
} from '@/store/services/anilist/generated-anilist';
import { EmptyLoadView } from './loading';
import { FilterReducerState } from '@/reducers/search/reducers';
import { openWebBrowser } from '@/utils/webBrowser';
import Animated, {
	SharedValue,
	useAnimatedReaction,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import { NativeScrollEvent } from 'react-native';
import { Anilist, Result, SearchResult } from '@/store/services/tracemoe/traceMoeApi';
import { Image } from 'expo-image';
import { ResizeMode, Video } from 'expo-av';
import { ImageSearchItem } from './media';
import { WdTaggerOutput } from '@/store/services/huggingface/types';
import { useLazyCharacterSearchQuery } from '@/store/services/anilist/enhanced';
import { router } from 'expo-router';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type AniMangListProps = {
    filter: FilterReducerState;
    results: ExploreMediaQuery;
    searchStatus: any;
    sheetRef: any;
    isLoading: boolean;
    nextPage: (currentPage: number, filter: FilterReducerState) => Promise<void>;
    onItemPress: (aniID: number, type: MediaType) => void;
    onScrollHandler:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
    headerHeight: number;
};
export const AniMangList = (props: AniMangListProps) => {
	const { width, height } = useWindowDimensions();
	const { dark, colors } = useTheme();
	const { columns, listKey } = useColumns(150);
	const { dismissAll } = useBottomSheetModal();

	const scorebgColor = useMemo(
		() => rgbToRgba(colors.primaryContainer, 0.75),
		[colors.primaryContainer],
	);

	const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

	const RenderItem = useCallback(
		(itemProps) => (
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
					coverImg={itemProps.item.coverImage.extraLarge}
					titles={itemProps.item.title}
					navigate={() => {
						dismissAll();
						props.onItemPress(itemProps.item.id, itemProps.item.type);
					}}
					imgBgColor={itemProps.item.coverImage.color}
					scoreDistributions={itemProps.item.stats?.scoreDistribution}
					bannerText={itemProps.item.nextAiringEpisode?.timeUntilAiring}
					showBanner={itemProps.item.nextAiringEpisode ? true : false}
					averageScore={itemProps.item.averageScore}
					meanScore={itemProps.item.meanScore}
					fitToParent
				/>
				<MediaProgressBar
					progress={itemProps.item.mediaListEntry?.progress}
					mediaListEntry={itemProps.item.mediaListEntry}
					mediaStatus={itemProps.item.status}
					total={
						itemProps.item.episodes ??
                        itemProps.item.chapters ??
                        itemProps.item.volumes ??
                        0
					}
				/>
			</View>
		),
		[],
	);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={listKey}
				data={props.results?.Page?.media}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				numColumns={3}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={props.onScrollHandler}
				contentContainerStyle={{
					// padding: 10,
					paddingTop: props.headerHeight,
					// paddingLeft: props.results?.Page?.media ? 150 / columns / 3 : undefined,
				}}
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					props.results?.Page &&
                        props.results?.Page?.media?.length > 0 &&
                        props.nextPage(props.results?.Page?.pageInfo?.currentPage, props.filter);
				}}
			/>
		</View>
	);
};

type CharacterListProps = {
    results: CharacterSearchQuery;
    searchStatus: any;
    isLoading: boolean;
    onScrollHandler:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
    headerHeight: number;
    onNavigate: (id: number) => void;
    nextPage?: () => Promise<void>;
};
export const CharacterList = (props: CharacterListProps) => {
	const { width, height } = useWindowDimensions();
	// const { dark, colors } = useTheme();
	const { columns, listKey } = useColumns(110);
	const { dismissAll } = useBottomSheetModal();

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem: ListRenderItem<CharacterSearchQuery['Page']['characters'][0]> = useCallback(
		({ item }) => {
			return (
				<View style={{ flex: 1, alignItems: 'center', marginVertical: 15 }}>
					<CharacterCard
						onPress={() => {
							dismissAll();
							props.onNavigate(item.id);
						}}
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

	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={listKey}
				data={props.results?.Page?.characters}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={props.onScrollHandler}
				contentContainerStyle={{
					// padding: 10,
					paddingTop: props.headerHeight,
					// paddingLeft: props.results?.Page?.characters ? 110 / columns / 3 : undefined,
				}}
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					props.results?.Page &&
                        props.results?.Page?.characters?.length > 0 &&
                        props.nextPage();
				}}
			/>
		</View>
	);
};

type StaffListProps = {
    results: StaffSearchQuery;
    searchStatus: any;
    isLoading: boolean;
    onScrollHandler:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
    headerHeight: number;
    onNavigate: (id: number) => void;
    nextPage?: () => Promise<void>;
};
export const StaffList = (props: StaffListProps) => {
	const { width, height } = useWindowDimensions();
	const { dismissAll } = useBottomSheetModal();
	const { columns, listKey } = useColumns(110);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem: ListRenderItem<StaffSearchQuery['Page']['staff'][0]> = useCallback(
		({ item }) => {
			return (
				<View style={{ flex: 1, alignItems: 'center', marginVertical: 15 }}>
					<StaffCard
						onPress={() => {
							dismissAll();
							props.onNavigate(item.id);
						}}
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

	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={listKey}
				data={props.results?.Page?.staff}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={props.onScrollHandler}
				contentContainerStyle={{
					paddingTop: props.headerHeight,
				}}
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					props.results?.Page &&
                        props.results?.Page?.staff?.length > 0 &&
                        props.nextPage();
				}}
			/>
		</View>
	);
};

type StudioListProps = {
    results: StudioSearchQuery;
    searchStatus: any;
    isLoading: boolean;
    onScrollHandler:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
    headerHeight: number;
    onNavigate: (studioId: number) => void;
    nextPage?: () => Promise<void>;
};
export const StudioList = (props: StudioListProps) => {
	const { width, height } = useWindowDimensions();
	const { dismissAll } = useBottomSheetModal();
	const { columns, listKey } = useColumns(110);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem: ListRenderItem<StudioSearchQuery['Page']['studios'][0]> = useCallback(
		({ item }) => {
			return (
				<View
					style={{
						flex: 1,
						width: '100%',
						alignItems: 'center',
						marginVertical: 15,
						paddingHorizontal: 20,
					}}
				>
					<StudioCard
						onPress={() => {
							dismissAll();
							props.onNavigate(item.id);
							// openWebBrowser(item.siteUrl);
						}}
						name={item.name}
						isFavourite={item.isFavourite}
						banners={
							item.media?.edges?.length > 0
								? item.media?.edges?.map((edge) => edge?.node?.bannerImage)
								: undefined
						}
					/>
				</View>
			);
		},
		[],
	);

	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={1}
				data={props.results?.Page?.studios}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={1}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={props.onScrollHandler}
				contentContainerStyle={{
					paddingTop: props.headerHeight,
				}}
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					props.results?.Page &&
                        props.results?.Page?.studios?.length > 0 &&
                        props.nextPage();
				}}
			/>
		</View>
	);
};

type ImageSearchListProps = {
    results: SearchResult;
    onScrollHandler:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
    headerHeight: number;
    isLoading: boolean;
};
export const ImageSearchList = (props: ImageSearchListProps) => {
	const { width, height } = useWindowDimensions();

	const keyExtract = useCallback((item, index: number) => index.toString(), []);

	const RenderItem: ListRenderItem<Result> = ({ item }) => {
		return <ImageSearchItem item={item} />;
	};

	if (props.isLoading) return <EmptyLoadView isLoading={true} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={1}
				data={props.results?.result}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={1}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={props.onScrollHandler}
				contentContainerStyle={{
					padding: 10,
					paddingTop: props.headerHeight,
				}}
			/>
		</View>
	);
};

type WaifuSearchListProps = {
    results: CharacterSearchQuery['Page']['characters'];
    isLoading: boolean;
    onScrollHandler:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | Animated.SharedValue<(event: NativeSyntheticEvent<NativeScrollEvent>) => void>;
    headerHeight: number;
};
export const WaifuSearchList = (props: WaifuSearchListProps) => {
	const { width, height } = useWindowDimensions();
	const { dismissAll } = useBottomSheetModal();
	const { columns, listKey } = useColumns(110);

	const keyExtract = useCallback(
		(item, index: number) => item.id.toString() + index.toString(),
		[],
	);

	const RenderItem: ListRenderItem<
        CharacterSearchQuery['Page']['characters'][0] & { confidence: number }
    > = useCallback(({ item }) => {
    	return (
    		<View style={{ alignItems: 'center', marginVertical: 15 }}>
    			<CharacterCard
    				onPress={() => {
    					dismissAll();
    					router.push('/characters/info/' + item.id);
    				}}
    				imgUrl={item.image?.large}
    				name={item.name?.full}
    				nativeName={item.name?.native}
    				isFavourite={item.isFavourite}
    				role={`${(item.confidence * 100).toFixed(2)}% Match`}
    			/>
    		</View>
    	);
    }, []);

	if (props.isLoading)
		return <EmptyLoadView isLoading={true} message={'May take some time (queuing system)'} />;

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			<AnimatedFlashList
				key={listKey}
				data={props.results}
				nestedScrollEnabled
				renderItem={RenderItem}
				keyExtractor={keyExtract}
				numColumns={columns}
				estimatedItemSize={240}
				removeClippedSubviews
				centerContent
				onScroll={props.onScrollHandler}
				contentContainerStyle={{
					padding: 10,
					paddingTop: props.headerHeight,
					paddingLeft: props.results ? 110 / columns / 3 : undefined,
				}}
				ListEmptyComponent={() => (
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text>No Results</Text>
					</View>
				)}
			/>
		</View>
	);
};
