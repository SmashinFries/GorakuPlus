import { SearchHeader } from '@/components/headers';
import { KeyboardSpacerView } from '@/components/keyboard';
import { ImageSearchDialog } from '@/components/search/dialogs';
import { FilterSheet } from '@/components/search/filtersheet';
import {
	AniMangList,
	CharacterList,
	ImageSearchList,
	StaffList,
	StudioList,
	WaifuSearchList,
} from '@/components/search/lists';
import { MediaSelectorMem } from '@/components/search/mediaSelector';
import { FilterContext } from '@/hooks/search/useFilter';
import { useSearch } from '@/hooks/search/useSearch';
import useFilterSheet from '@/hooks/search/useSheet';
import { FilterActions, filterReducer } from '@/reducers/search/reducers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	CharacterSort,
	MediaType,
	StaffSort,
	StudioSort,
	useGenreTagCollectionQuery,
} from '@/store/services/anilist/generated-anilist';
import {
	addSearch,
	removeSearchTerm,
	updateFilterHistory,
	updateSearchType,
} from '@/store/slices/search/historySlice';
import { cleanFilter } from '@/utils/search/cleanFilter';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Keyboard, Pressable, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { IconButton, List, Portal, Text, useTheme } from 'react-native-paper';
import Animated, {
	SlideInDown,
	SlideInUp,
	SlideOutDown,
	runOnJS,
	useAnimatedReaction,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	Extrapolation,
	interpolateColor,
	withTiming,
} from 'react-native-reanimated';

type ScrollCtx = {
	prevY: number;
};

const clamp = (value: number, lowerBound: number, upperBound: number) => {
	'worklet';
	return Math.min(Math.max(lowerBound, value), upperBound);
};

const SearchPage = () => {
	const { dark, colors } = useTheme();
	const { height } = useWindowDimensions();
	const searchbarRef = useRef<TextInput>();
	const [filterSearch, setFilterSearch] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentHistorySearch, setCurrentHistorySearch] = useState<string | null>(null);

	const [showImageSearchDialog, setShowImageSearchDialog] = useState(false);
	const [showWaifuSearchDialog, setShowWaifuSearchDialog] = useState(false);

	const [headerHeight, setHeaderHeight] = useState(0);
	const [categoryHeight, setCategoryHeight] = useState(0);
	const scrollClamp = useSharedValue(0);
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
			},
			onMomentumEnd: () => {
				'worklet';
			},
		},
		[categoryHeight],
	);

	const toggleIsFocused = useCallback((value: boolean) => setIsFocused(value), []);

	const history = useAppSelector((state) => state.persistedHistory);
	const { showNSFW, tagBlacklist } = useAppSelector((state) => state.persistedSettings);
	const appDispatch = useAppDispatch();

	const [filter, dispatch] = useReducer(filterReducer, {
		filter: history.filter,
		search: null,
		searchType: history.searchType,
		enableTagBlacklist: history.enableTagBlacklist,
	});

	const {
		searchContent,
		searchStatus,
		searchResults,
		imageSearchResults,
		imageUrlStatus,
		localImageStatus,
		waifuImageResults,
		waifuImageStatus,
		searchWaifu,
		searchImage,
		updateNewResults,
		nextCharPage,
		nextMediaPage,
		nextStaffPage,
		nextStudioPage,
	} = useSearch(filter.searchType);

	// Filter Sheet
	const sheetRef = useRef<BottomSheetModalMethods>(null);
	const genreTagResult = useGenreTagCollectionQuery();
	const { isFilterOpen, openSheet, closeSheet, handleSheetChange, setIsFilterOpen } =
		useFilterSheet(sheetRef);

	const updateFilter = useCallback((props: FilterActions) => dispatch(props), []);

	const onMediaSearch = async (query: string) => {
		Keyboard.dismiss();
		setLoading(true);
		const tag_not_in = filter.enableTagBlacklist
			? filter.filter.tag_not_in
				? [...filter.filter.tag_not_in, ...tagBlacklist]
				: tagBlacklist
					? tagBlacklist
					: []
			: [];
		const cleansedFilter = cleanFilter({
			...filter.filter,
			search: query,
			page: 1,
			perPage: 24,
			isAdult: showNSFW ? filter.filter.isAdult : false,
			tag_not_in: tag_not_in,
		});
		const response = await searchContent(cleansedFilter, false).unwrap();
		updateNewResults(response);
		appDispatch(
			updateFilterHistory({
				filter: { ...filter.filter, type: filter.filter.type },
				searchType: filter.searchType,
			}),
		);
		sheetRef.current?.close();

		setLoading(false);
	};

	const onMediaPress = useCallback((aniID: number, type: MediaType) => {
		sheetRef.current?.close();
		router.push(`/${type}/${aniID}`);
	}, []);

	const onCharPress = useCallback((charID: number) => {
		router.push(`/characters/info/${charID}`);
	}, []);

	const onStaffPress = useCallback((staffID: number) => {
		router.push(`/staff/info/${staffID}`);
	}, []);

	const onStudioPress = useCallback((studioId: number) => router.push(`/studio/${studioId}`), []);

	const onCharSearch = async (query: string) => {
		Keyboard.dismiss();
		setLoading(true);
		const response = await searchContent(
			{
				name: query?.length < 1 || !query ? undefined : query,
				page: 1,
				isBirthday: query?.length < 1 || !query ? true : undefined,
				sort:
					query?.length < 1 || !query
						? [CharacterSort.FavouritesDesc]
						: [CharacterSort.SearchMatch],
			},
			false,
		).unwrap();
		updateNewResults(response);

		appDispatch(
			updateFilterHistory({
				filter: filter.filter,
			}),
		);
		setLoading(false);
	};

	const onStaffSearch = async (query: string) => {
		Keyboard.dismiss();
		setLoading(true);
		const response = await searchContent(
			{
				name: query?.length < 1 || !query ? undefined : query,
				page: 1,
				isBirthday: query?.length < 1 || !query ? true : undefined,
				sort:
					query?.length < 1 || !query
						? [StaffSort.FavouritesDesc]
						: [StaffSort.SearchMatch],
			},
			false,
		).unwrap();
		updateNewResults(response);

		appDispatch(
			updateFilterHistory({
				filter: filter.filter,
			}),
		);
		setLoading(false);
	};

	const onStudioSearch = async (query: string) => {
		Keyboard.dismiss();
		setLoading(true);
		const response = await searchContent(
			{
				name: query?.length < 1 || !query ? undefined : query,
				page: 1,
				sort:
					query?.length < 1 || !query
						? [StudioSort.FavouritesDesc]
						: [StudioSort.SearchMatch],
			},
			false,
		).unwrap();
		updateNewResults(response);

		appDispatch(
			updateFilterHistory({
				filter: filter.filter,
			}),
		);
		setLoading(false);
	};

	const onSearch = async (query: string) => {
		appDispatch(
			updateFilterHistory({
				filter: { ...filter.filter, type: filter.filter.type },
				searchType:
					filter.searchType === 'imageSearch'
						? MediaType.Anime
						: filter.searchType === 'waifuSearch'
							? 'characters'
							: filter.searchType,
			}),
		);
		setFilterSearch(query);
		appDispatch(addSearch(query));
		if (filter.searchType === MediaType.Anime || filter.searchType === MediaType.Manga) {
			await onMediaSearch(query);
		} else if (filter.searchType === 'characters') {
			await onCharSearch(query);
		} else if (filter.searchType === 'staff') {
			await onStaffSearch(query);
		} else if (filter.searchType === 'studios') {
			await onStudioSearch(query);
		}
	};

	const filterState = {
		filter,
		dispatch,
	};

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

	useEffect(() => {
		if (history.searchType === MediaType.Anime || history.searchType === MediaType.Manga) {
			dispatch({ type: 'SET_TYPE', payload: history.searchType });
		}
	}, [history.searchType]);

	return (
		<FilterContext.Provider value={filterState}>
			<Stack.Screen
				options={{
					header: (props) => (
						<Animated.View
							// style={[{ position: 'absolute' }]}
							onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
						>
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
								<MediaSelectorMem
									selection={filter.searchType}
									onSelect={(type) => {
										dispatch({ type: 'CHANGE_SEARCHTYPE', payload: type });
										appDispatch(updateSearchType(type));
										if (type !== MediaType.Anime && type !== MediaType.Manga) {
											sheetRef?.current?.close();
										}
									}}
								/>
							</Animated.View>
							<SearchHeader
								{...props}
								searchContent={onSearch}
								openFilter={() => {
									Keyboard.dismiss();
									dispatch({
										type: 'CHANGE_SEARCHTYPE',
										payload:
											filter.searchType === 'imageSearch'
												? MediaType.Anime
												: filter.searchType,
									});
									appDispatch(updateSearchType(MediaType.Anime));
									openSheet();
								}}
								historySelected={currentHistorySearch}
								onHistorySelected={() => setCurrentHistorySearch(null)}
								currentType={filter.searchType}
								toggleIsFocused={toggleIsFocused}
								searchbarRef={searchbarRef}
								setFilterSearch={(query) => setFilterSearch(query)}
								openImageSearch={() => {
									Keyboard.dismiss();
									dispatch({ type: 'CHANGE_SEARCHTYPE', payload: 'imageSearch' });
									appDispatch(updateSearchType('imageSearch'));
									setShowImageSearchDialog(true);
								}}
								openWaifuSearch={() => {
									Keyboard.dismiss();
									dispatch({ type: 'CHANGE_SEARCHTYPE', payload: 'waifuSearch' });
									appDispatch(updateSearchType('waifuSearch'));
									setShowWaifuSearchDialog(true);
								}}
								onFocus={() => {
									if (filter.searchType === 'imageSearch') {
										dispatch({
											type: 'CHANGE_SEARCHTYPE',
											payload: MediaType.Anime,
										});
										appDispatch(updateSearchType(MediaType.Anime));
									} else if (filter.searchType === 'waifuSearch') {
										dispatch({
											type: 'CHANGE_SEARCHTYPE',
											payload: 'characters',
										});
										appDispatch(updateSearchType('characters'));
									}
									scrollClamp.value = withTiming(-categoryHeight);
								}}
							/>
						</Animated.View>
					),
				}}
			/>
			<View style={{ flex: 1 }}>
				{(filter.searchType === MediaType.Anime ||
					filter.searchType === MediaType.Manga) && (
					<AniMangList
						filter={filter}
						isLoading={loading}
						nextPage={nextMediaPage}
						results={searchResults}
						searchStatus={searchStatus}
						sheetRef={sheetRef}
						onItemPress={onMediaPress}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
					/>
				)}
				{filter.searchType === 'characters' && (
					<CharacterList
						isLoading={loading}
						onNavigate={onCharPress}
						results={searchResults}
						searchStatus={searchStatus}
						nextPage={() => nextCharPage(filterSearch)}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
					/>
				)}
				{filter.searchType === 'staff' && (
					<StaffList
						isLoading={loading}
						onNavigate={onStaffPress}
						results={searchResults}
						searchStatus={searchStatus}
						nextPage={() => nextStaffPage(filterSearch)}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
					/>
				)}
				{filter.searchType === 'studios' && (
					<StudioList
						onNavigate={onStudioPress}
						isLoading={loading}
						results={searchResults}
						searchStatus={searchStatus}
						nextPage={() => nextStudioPage(filterSearch)}
						onScrollHandler={scrollHandler}
						headerHeight={categoryHeight}
					/>
				)}
				{filter.searchType === 'imageSearch' && (
					<ImageSearchList
						results={imageSearchResults}
						headerHeight={categoryHeight}
						onScrollHandler={scrollHandler}
						isLoading={imageUrlStatus.isFetching || localImageStatus.isLoading}
					/>
				)}
				{filter.searchType === 'waifuSearch' && (
					<WaifuSearchList
						results={waifuImageResults}
						headerHeight={categoryHeight}
						onScrollHandler={scrollHandler}
						isLoading={waifuImageStatus.isFetching || waifuImageStatus.isLoading}
					/>
				)}
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
							{history.search.map((term, idx) => (
								<List.Item
									key={idx}
									title={term}
									right={(props) => (
										<IconButton
											{...props}
											icon={'delete-outline'}
											onPress={() => appDispatch(removeSearchTerm(term))}
										/>
									)}
									onPress={() => {
										setCurrentHistorySearch(term);
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
                            selection={filter.searchType}
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
				onSearch={(query: string) => onSearch(query)}
				filterSearch={filterSearch}
				filterData={filter}
				filterType={filter.searchType}
				updateFilter={updateFilter}
				toggleSheet={closeSheet}
				genreTagData={genreTagResult.data}
			/>
			<Portal>
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
			</Portal>
		</FilterContext.Provider>
	);
};

export default SearchPage;
