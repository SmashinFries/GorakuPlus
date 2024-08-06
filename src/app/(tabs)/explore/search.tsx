import {
	CharacterSort,
	MediaType,
	StaffSort,
	StudioSort,
	useGenreTagCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { ScrollToTopButton } from '@/components/buttons';
import { SearchHeader } from '@/components/headers';
import { KeyboardSpacerView } from '@/components/keyboard';
import { ImageSearchDialog, FilterTagDialog } from '@/components/search/dialogs';
import { FilterSheet } from '@/components/search/filtersheet';
import {
	AnimeSearchList,
	MangaSearchList,
	CharacterList,
	ImageSearchList,
	StaffList,
	StudioList,
	WaifuSearchList,
} from '@/components/search/lists';
import { MediaSelectorMem } from '@/components/search/mediaSelector';
import { useFilter } from '@/hooks/search/useFilter';
import useFilterSheet from '@/hooks/search/useSheet';
import { useSearchHistoryStore } from '@/store/search/searchHistoryStore';
import { useSearchStore } from '@/store/search/searchStore';
import { useAppTheme } from '@/store/theme/themes';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { FlashList } from '@shopify/flash-list';
import { Stack, router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { IconButton, List, Portal } from 'react-native-paper';
import Animated, {
	SlideInDown,
	SlideInUp,
	SlideOutDown,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	Extrapolation,
	withTiming,
	runOnJS,
	useAnimatedReaction,
} from 'react-native-reanimated';

type ScrollCtx = {
	prevY: number;
};

const clamp = (value: number, lowerBound: number, upperBound: number) => {
	'worklet';
	return Math.min(Math.max(lowerBound, value), upperBound);
};

const SearchPage = () => {
	const { dark, colors } = useAppTheme();
	const { height } = useWindowDimensions();
	const searchbarRef = useRef<TextInput>();
	const [isFocused, setIsFocused] = useState(false);
	const [loading, setLoading] = useState(false);

	const [showImageSearchDialog, setShowImageSearchDialog] = useState(false);
	const [showWaifuSearchDialog, setShowWaifuSearchDialog] = useState(false);
	const [showTagDialog, setShowTagDialog] = useState(false);

	const [categoryHeight, setCategoryHeight] = useState(0);
	const listRef = useRef<FlashList<any>>(null);
	const scrollClamp = useSharedValue(0);
	const scrollOffset = useSharedValue(0);
	const [showScrollToTop, setShowScrollToTop] = useState(false);
	const scrollHandler = useAnimatedScrollHandler(
		{
			onBeginDrag: (e, ctx: ScrollCtx) => {
				'worklet';
				ctx.prevY = e.contentOffset.y;
			},
			onScroll: (e, ctx: ScrollCtx) => {
				'worklet';
				// scrollPos.value = e.contentOffset.y;
				const diff = e.contentOffset.y - ctx.prevY;
				scrollClamp.value = clamp(scrollClamp.value + diff, 0, categoryHeight);
				ctx.prevY = e.contentOffset.y;
				scrollOffset.value = e.contentOffset.y;
			},
			onMomentumEnd: () => {
				'worklet';
			},
		},
		[categoryHeight],
	);

	const toggleIsFocused = useCallback((value: boolean) => setIsFocused(value), []);

	const { query, searchType, updateQuery, updateSearchType } = useSearchStore();
	const { searchTerms, searchTermLimit, addSearchTerm, removeSearchTerm, updateSearchLimit } =
		useSearchHistoryStore();

	// const { filter, filterType, updateTag, onMediaTypeChange } = useFilter();

	// Filter Sheet
	const sheetRef = useRef<BottomSheetModalMethods>(null);
	// const sheetRef = useRef<TrueSheet>(null);
	const genreTagResult = useGenreTagCollectionQuery();
	const { isFilterOpen, openSheet, closeSheet, setIsFilterOpen, handleSheetChange } =
		useFilterSheet(sheetRef);

	// const onMediaSearch = async () => {
	// 	Keyboard.dismiss();
	// 	setLoading(true);
	// 	const response = await searchMedia(
	// 		Object.fromEntries(
	// 			Object.entries({
	// 				...filter,
	// 				search: query?.length > 0 ? query : undefined,
	// 			}).filter(([_, value]) => value !== undefined),
	// 		),
	// 	).unwrap();
	// 	updateNewResults(response);
	// 	// sheetRef.current?.close();
	// 	closeSheet();
	// 	setLoading(false);
	// };

	// const onMediaPress = useCallback((aniID: number, type: MediaType) => {
	// 	// sheetRef.current?.close();
	// 	closeSheet();
	// 	router.push(`/${type}/${aniID}`);
	// }, []);

	// const onCharPress = useCallback((charID: number) => {
	// 	router.push(`/characters/info/${charID}`);
	// }, []);

	// const onStaffPress = useCallback((staffID: number) => {
	// 	router.push(`/staff/info/${staffID}`);
	// }, []);

	// const onStudioPress = useCallback((studioId: number) => router.push(`/studio/${studioId}`), []);

	// const onCharSearch = async () => {
	// 	Keyboard.dismiss();
	// 	setLoading(true);
	// 	const response = await searchCharacters(
	// 		{
	// 			name: query?.length < 1 || !query ? undefined : query,
	// 			page: 1,
	// 			isBirthday: query?.length < 1 || !query ? true : undefined,
	// 			sort:
	// 				query?.length < 1 || !query
	// 					? [CharacterSort.FavouritesDesc]
	// 					: [CharacterSort.SearchMatch],
	// 		},
	// 		false,
	// 	).unwrap();
	// 	updateNewResults(response);
	// 	setLoading(false);
	// };

	// const onStaffSearch = async () => {
	// 	Keyboard.dismiss();
	// 	setLoading(true);
	// 	const response = await searchStaff(
	// 		{
	// 			name: query?.length < 1 || !query ? undefined : query,
	// 			page: 1,
	// 			isBirthday: query?.length < 1 || !query ? true : undefined,
	// 			sort:
	// 				query?.length < 1 || !query
	// 					? [StaffSort.FavouritesDesc]
	// 					: [StaffSort.SearchMatch],
	// 		},
	// 		false,
	// 	).unwrap();
	// 	updateNewResults(response);
	// 	setLoading(false);
	// };

	// const onStudioSearch = async () => {
	// 	Keyboard.dismiss();
	// 	setLoading(true);
	// 	const response = await searchStudios(
	// 		{
	// 			name: query?.length < 1 || !query ? undefined : query,
	// 			page: 1,
	// 			sort:
	// 				query?.length < 1 || !query
	// 					? [StudioSort.FavouritesDesc]
	// 					: [StudioSort.SearchMatch],
	// 		},
	// 		false,
	// 	).unwrap();
	// 	updateNewResults(response);

	// 	// appDispatch(
	// 	// 	updateFilterHistory({
	// 	// 		filter: filter.filter,
	// 	// 	}),
	// 	// );
	// 	setLoading(false);
	// };

	// const onSearch = async () => {
	// 	addSearchTerm(query);
	// 	if (filterType === MediaType.Anime || filterType === MediaType.Manga) {
	// 		await onMediaSearch();
	// 	} else if (filterType === 'characters') {
	// 		await onCharSearch();
	// 	} else if (filterType === 'staff') {
	// 		await onStaffSearch();
	// 	} else if (filterType === 'studios') {
	// 		await onStudioSearch();
	// 	} else if (filterType === 'imageSearch') {
	// 		onMediaTypeChange(MediaType.Anime);
	// 		await onMediaSearch();
	// 	} else if (filterType === 'waifuSearch') {
	// 		onMediaTypeChange('characters');
	// 		await onCharSearch();
	// 	}
	// };

	const stickyHeaderStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollClamp.value,
						[0, categoryHeight],
						[0, -categoryHeight],
						Extrapolation.CLAMP,
					),
				},
			],
		};
	}, [categoryHeight]);

	useAnimatedReaction(
		() => {
			return scrollOffset.value > 500;
		},
		(shouldShow) => {
			if (shouldShow) runOnJS(setShowScrollToTop)(true);
			if (!shouldShow) runOnJS(setShowScrollToTop)(false);
		},
	);

	// useEffect(() => {
	// 	if (searchType === MediaType.Anime || history.searchType === MediaType.Manga) {
	// 		dispatch({ type: 'SET_TYPE', payload: history.searchType });
	// 	}
	// }, [history.searchType]);

	return (
		<>
			<Stack.Screen
				options={{
					header: (props) => (
						<Animated.View>
							<Animated.View
								onLayout={(e) => setCategoryHeight(e.nativeEvent.layout.height)}
								entering={SlideInUp.duration(500)}
								exiting={SlideOutDown}
								style={[
									stickyHeaderStyle,
									{
										zIndex: -1,
										maxHeight: 120,
										position: 'absolute',
										bottom: -categoryHeight,
									},
								]}
							>
								<MediaSelectorMem />
								{showScrollToTop && (
									<ScrollToTopButton listRef={listRef} top={110} />
								)}
							</Animated.View>
							<SearchHeader
								{...props}
								// searchContent={onSearch}
								openFilter={() => {
									Keyboard.dismiss();
									// onSearchTypeChange
									openSheet();
									// router.push('/filter');
								}}
								currentType={searchType}
								toggleIsFocused={toggleIsFocused}
								searchbarRef={searchbarRef}
								searchTerm={query}
								setSearchTerm={(search) => updateQuery(search)}
								openImageSearch={() => {
									Keyboard.dismiss();
									// onSearchTypeChange('imageSearch');
									// onMediaTypeChange('imageSearch');
									setShowImageSearchDialog(true);
								}}
								openWaifuSearch={() => {
									Keyboard.dismiss();
									// onMediaTypeChange('waifuSearch');
									// dispatch({ type: 'CHANGE_SEARCHTYPE', payload: 'waifuSearch' });
									// appDispatch(updateSearchType('waifuSearch'));
									setShowWaifuSearchDialog(true);
								}}
								onFocus={() => {
									scrollClamp.value = withTiming(-categoryHeight);
								}}
							/>
						</Animated.View>
					),
				}}
			/>
			<View style={{ flex: 1 }}>
				{searchType === MediaType.Anime && (
					<AnimeSearchList
						headerHeight={categoryHeight}
						listRef={listRef}
						onScrollHandler={scrollHandler}
					/>
				)}
				{searchType === MediaType.Manga && (
					<MangaSearchList
						headerHeight={categoryHeight}
						listRef={listRef}
						onScrollHandler={scrollHandler}
					/>
				)}
				{/* {searchType === 'CHARACTER' && (
					<CharacterList
						isLoading={loading}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
						listRef={listRef}
					/>
				)}
				{filterType === 'staff' && (
					<StaffList
						isLoading={loading}
						onNavigate={onStaffPress}
						results={staffResults}
						searchStatus={searchStatus}
						nextPage={() => nextStaffPage()}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
						listRef={listRef}
					/>
				)}
				{filterType === 'studios' && (
					<StudioList
						onNavigate={onStudioPress}
						isLoading={loading}
						results={studioResults}
						searchStatus={searchStatus}
						nextPage={() => nextStudioPage()}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
						listRef={listRef}
					/>
				)} */}
				{isFocused && (
					<Animated.View
						style={{
							position: 'absolute',
							height: height - categoryHeight,
							width: '100%',
							backgroundColor: colors.background,
							top: categoryHeight,
							zIndex: 1,
						}}
						exiting={SlideOutDown}
						entering={SlideInDown}
					>
						<ScrollView keyboardShouldPersistTaps={'always'}>
							{searchTerms.map((term, idx) => (
								<List.Item
									key={idx}
									title={term}
									right={(props) => (
										<IconButton
											{...props}
											icon={'delete-outline'}
											onPress={() => removeSearchTerm(term)}
										/>
									)}
									onPress={() => {
										updateQuery(term);
									}}
								/>
							))}
							<KeyboardSpacerView />
						</ScrollView>
					</Animated.View>
				)}
				{/* {showCategory && (
                    <Animated.View
                        entering={SlideInUp.duration(500)}
                        exiting={SlideOutDown}
                        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
                        style={[
                            stickyHeaderStyle,
                            { maxHeight: 120, position: 'absolute', zIndex: 3 },
                        ]}
                    >
                        <MediaSelectorMem
                            selection={searchType}
                            onSelect={(type) => {
                                dispatch({ type: 'CHANGE_SEARCHTYPE', payload: type });
                                appDispatch(updateSearchType(type));
                                if (type !== MediaType.Anime && type !== MediaType.Manga) {
                                    sheetRef?.current?.close();
                                }
                            }}
                        />
                    </Animated.View>
                )} */}
			</View>
			<FilterSheet
				sheetRef={sheetRef}
				handleSheetChange={handleSheetChange}
				toggleSheet={closeSheet}
				openTagDialog={() => setShowTagDialog(true)}
				genreTagData={genreTagResult.data}
			/>
			{/* <Portal>
				<ImageSearchDialog
					visible={showImageSearchDialog}
					onDismiss={() => setShowImageSearchDialog(false)}
					searchImage={(imgType) => searchImage(undefined, imgType === 'camera')}
					searchUrl={(url) => searchImage(url)}
				/>
				<ImageSearchDialog
					visible={showWaifuSearchDialog}
					onDismiss={() => setShowWaifuSearchDialog(false)}
					searchImage={(imgType) => searchWaifu(undefined, imgType === 'camera')}
					searchUrl={(url) => searchWaifu(url, false)}
				/>
				<FilterTagDialog
					data={genreTagResult?.data?.MediaTagCollection}
					visible={showTagDialog}
					onDismiss={() => setShowTagDialog(false)}
					toggleTag={(name) => updateTag(name)}
				/>
			</Portal> */}
		</>
	);
};

export default SearchPage;
