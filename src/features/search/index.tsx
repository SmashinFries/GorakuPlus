import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { View, ScrollView, useWindowDimensions, Keyboard, FlatList } from 'react-native';
import { ExploreStackProps } from '../../navigation/types';
import { SearchHeader } from '../../components/headers';
import { MediaSelector, MediaSelectorMem } from './components/mediaSelector';
import { FilterSheet } from './components/filtersheet';
import { FlashList } from '@shopify/flash-list';
import { rgbToRgba, useColumns } from '../../utils';
import { RenderSearchItem, RenderSearchItemMem } from './components/media';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import useFilterSheet from './hooks/sheet';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { useLazyExploreMediaQuery } from '../../app/services/anilist/enhanced';
import {
    ExploreMediaQuery,
    MediaType,
    useGenreTagCollectionQuery,
    useLazyUserSearchQuery,
    useUserSearchQuery,
} from '../../app/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterActions, filterReducer } from './reducers';
import FilterContext from './context';
import { updateFilterHistory } from './historySlice';
import { StatusBar } from 'expo-status-bar';
import { LoadMoreButton } from '../../components/buttons';
import { EmptyLoadView } from './components/loading';
import { SearchFooter } from './components/footers';
import { set } from 'react-native-reanimated';
import { cleanFilter } from './helpers/cleanFilter';
import { MediaCard, MediaProgressBar, UserCard } from '../../components/cards';

const SearchScreen = ({
    navigation,
    route,
}: NativeStackScreenProps<ExploreStackProps, 'search'>) => {
    const { width, height } = useWindowDimensions();
    const { dark, colors } = useTheme();

    // Filter Sheet
    const sheetRef = useRef<BottomSheetModalMethods>(null);
    const genreTagResult = useGenreTagCollectionQuery();
    const { isFilterOpen, openSheet, closeSheet, handleSheetChange, setIsFilterOpen } =
        useFilterSheet(sheetRef);

    // Filter Data
    const history = useAppSelector((state) => state.persistedHistory);

    const [filter, dispatch] = useReducer(filterReducer, {
        filter: history.filter,
        search: null,
        searchType: history.searchType,
    });

    const updateFilter = useCallback((props: FilterActions) => dispatch(props), []);

    const appDispatch = useAppDispatch();

    // List Columns
    const { columns, listKey } = useColumns(150);

    // Search
    const [searchTrigger, searchStatus] = useLazyExploreMediaQuery();
    const [userSearchTrigger, userSearchStatus] = useLazyUserSearchQuery();
    const [results, setResults] = useState<ExploreMediaQuery>();
    const [userResults, setUserResults] = useState<ExploreMediaQuery>();
    const [loading, setLoading] = useState(false);

    const onSearch = async () => {
        Keyboard.dismiss();
        setLoading(true);
        if (filter.filter.type !== MediaType.Anime && filter.filter.type !== MediaType.Manga) {
            const response = await userSearchTrigger({
                search: filter.search,
            }).unwrap();
            setUserResults(response);
        } else {
            const cleansedFilter = cleanFilter({
                ...filter.filter,
                search: filter.search,
                page: 1,
                perPage: 24,
                isAdult: allowAdult ? filter.filter.isAdult : false,
            });
            const response = await searchTrigger(cleansedFilter, false).unwrap();
            setResults(response);

            appDispatch(
                updateFilterHistory({
                    filter: filter.filter,
                }),
            );
            sheetRef.current?.close();
        }

        setLoading(false);
    };

    const filterState = {
        filter,
        dispatch,
    };

    const onItemPress = useCallback((aniID, malID, type) => {
        sheetRef.current?.close();
        // @ts-ignore
        navigation.navigate('media', { aniID, malID, type });
    }, []);

    const scorebgColor = useMemo(
        () => rgbToRgba(colors.primaryContainer, 0.75),
        [colors.primaryContainer],
    );

    const RenderItem = useCallback(
        (props) => (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <MediaCard
                    coverImg={props.item.coverImage.extraLarge}
                    titles={props.item.title}
                    navigate={() => onItemPress(props.item.id, props.item.idMal, props.item.type)}
                    scorebgColor={scorebgColor}
                    imgBgColor={props.item.coverImage.color}
                    showHealthBar={props.item.averageScore || props.item.meanScore ? true : false}
                    bannerText={props.item.nextAiringEpisode?.timeUntilAiring}
                    showBanner={props.item.nextAiringEpisode ? true : false}
                    averageScore={props.item.averageScore}
                    meanScore={props.item.meanScore}
                />
                <MediaProgressBar
                    progress={props.item.mediaListEntry?.progress}
                    mediaListEntry={props.item.mediaListEntry}
                    mediaStatus={props.item.status}
                    total={props.item.episodes ?? props.item.chapters ?? props.item.volumes ?? 0}
                    statusColor={colors.onSurfaceVariant}
                    showListStatus={true}
                />
            </View>
        ),
        [],
    );

    const UserRenderItem = useCallback((props) => <UserCard {...props} />, []);

    const ListFooter = useCallback(() => {
        return (
            <SearchFooter
                hasMore={results?.Page?.pageInfo?.hasNextPage}
                nextPage={nextPage}
                isUnitialized={searchStatus?.isUninitialized}
            />
        );
    }, [
        results?.Page?.pageInfo?.hasNextPage,
        results?.Page?.pageInfo?.currentPage,
        allowAdult,
        searchStatus?.isUninitialized,
        filter.filter,
    ]);

    const setSearch = useCallback(
        (query: string) => dispatch({ type: 'SET_SEARCH', payload: query }),
        [],
    );

    const nextPage = async () => {
        if (results?.Page?.pageInfo?.hasNextPage && !searchStatus?.isFetching) {
            const cleansedFilter = cleanFilter({
                ...filter.filter,
                search: filter.search,
                page: results?.Page?.pageInfo?.currentPage + 1,
                perPage: 24,
                isAdult: allowAdult ? filter.filter.isAdult : false,
            });
            const response = await searchTrigger(cleansedFilter, false).unwrap();

            setResults((prev) => ({
                ...prev,
                Page: {
                    ...prev.Page,
                    media: [...prev.Page.media, ...response.Page.media],
                    pageInfo: { ...response.Page.pageInfo },
                },
            }));
        }
    };

    const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <SearchHeader
                    {...props}
                    searchContent={() => onSearch()}
                    openFilter={() => {
                        Keyboard.dismiss();
                        openSheet();
                    }}
                    setSearch={setSearch}
                    search={filter.search}
                    currentType={filter.filter.type}
                />
            ),
        });
    }, [filter.search, filter.filter, isFilterOpen]);

    return (
        <FilterContext.Provider value={filterState}>
            {/* <ScrollView
                style={{ flex: 1, height: '100%' }}
                stickyHeaderHiddenOnScroll
                stickyHeaderIndices={[1]}
                scrollEnabled={false}
                removeClippedSubviews
                nestedScrollEnabled
            > */}
            <View style={{ flex: 1 }}>
                <View style={{ maxHeight: 120 }}>
                    <MediaSelectorMem
                        selection={filter.filter.type}
                        onSelect={(type) => {
                            // if (type !== MediaType.Anime && type !== MediaType.Manga) {
                            //     null;
                            // } else {
                            //     dispatch({ type: 'SET_TYPE', payload: type });
                            // }
                            dispatch({ type: 'SET_TYPE', payload: type });

                            // onSearch();
                        }}
                    />
                </View>
                {loading ? (
                    <EmptyLoadView isLoading={true} isUninitialized={false} />
                ) : (
                    <View style={{ flex: 1, height: '100%', width }}>
                        <FlashList
                            key={listKey}
                            data={
                                filter.filter.type === 'user'
                                    ? userResults?.Page?.users
                                    : results?.Page?.media
                            }
                            nestedScrollEnabled
                            // stickyHeaderIndices={[0]}
                            // stickyHeaderHiddenOnScroll
                            // StickyHeaderComponent={() => (
                            //     <MediaSelectorMem
                            //         selection={filter.filter.type}
                            //         onSelect={(type) => {
                            //             if (type !== MediaType.Anime && type !== MediaType.Manga) {
                            //                 null;
                            //             } else {
                            //                 dispatch({ type: 'SET_TYPE', payload: type });
                            //             }

                            //             // onSearch();
                            //         }}
                            //     />
                            // )}
                            renderItem={filter.filter.type === 'user' ? UserRenderItem : RenderItem}
                            keyExtractor={keyExtract}
                            // scrollEnabled={false}
                            numColumns={columns}
                            estimatedItemSize={240}
                            removeClippedSubviews
                            centerContent
                            contentContainerStyle={{
                                padding: 10,
                                paddingLeft: results?.Page?.media ? 150 / columns / 3 : undefined,
                            }}
                            // windowSize={3}
                            // initialNumToRender={24}
                            // maxToRenderPerBatch={6}
                            ListFooterComponent={!loading && ListFooter}
                            ListFooterComponentStyle={{ alignItems: 'center' }}
                            // viewabilityConfig={{
                            //     minimumViewTime: 300,
                            //     viewAreaCoveragePercentThreshold: 50,
                            //     waitForInteraction: true,
                            // }}
                            // onEndReached={() => (loading ? null : console.log('End Reached!'))}
                            // onEndReachedThreshold={0.75}
                        />
                    </View>
                )}

                {/* </ScrollView> */}
            </View>
            <FilterSheet
                sheetRef={sheetRef}
                handleSheetChange={handleSheetChange}
                onSearch={onSearch}
                filterData={filter}
                updateFilter={updateFilter}
                toggleSheet={closeSheet}
                genreTagData={genreTagResult.data}
            />
        </FilterContext.Provider>
    );
};

export default SearchScreen;
