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
    CharacterSort,
    ExploreMediaQuery,
    MediaType,
    StaffSort,
    StudioSort,
    useGenreTagCollectionQuery,
    useLazyUserSearchQuery,
    useUserSearchQuery,
} from '../../app/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterActions, filterReducer } from './reducers';
import FilterContext from './context';
import { addSearch, clearSearch, updateFilterHistory, updateSearchType } from './historySlice';
import { StatusBar } from 'expo-status-bar';
import { LoadMoreButton } from '../../components/buttons';
import { EmptyLoadView } from './components/loading';
import { SearchFooter } from './components/footers';
import { cleanFilter } from './helpers/cleanFilter';
import { MediaCard, MediaProgressBar, UserCard } from '../../components/cards';
import { useSearch } from './hooks/search';
import { AniMangList, CharacterList, StaffList, StudioList } from './components/lists';
import { openWebBrowser } from '../../utils/webBrowser';
import { FilterState } from './filterSlice';

const SearchScreen2 = ({
    navigation,
    route,
}: NativeStackScreenProps<ExploreStackProps, 'search'>) => {
    const { width, height } = useWindowDimensions();
    const { dark, colors } = useTheme();
    const [loading, setLoading] = useState(false);

    const history = useAppSelector((state) => state.persistedHistory);
    const { showNSFW, globalTagExclude } = useAppSelector((state) => state.persistedSettings);
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

    const onMediaSearch = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const tag_not_in = filter.filter.tag_not_in
            ? [...filter.filter.tag_not_in, ...globalTagExclude]
            : globalTagExclude
            ? globalTagExclude
            : [];
        const cleansedFilter = cleanFilter({
            ...filter.filter,
            search: filter.search,
            page: 1,
            perPage: 24,
            isAdult: showNSFW ? filter.filter.isAdult : false,
            tag_not_in: tag_not_in,
        });
        const response = await searchContent(cleansedFilter, false).unwrap();
        updateNewResults(response);
        sheetRef.current?.close();

        setLoading(false);
    };

    const onMediaPress = useCallback((aniID, malID, type) => {
        sheetRef.current?.close();
        // @ts-ignore
        navigation.navigate('media', { aniID, malID, type });
    }, []);

    const onCharPress = useCallback((charID) => {
        // @ts-ignore
        navigation.navigate('characterStack', {
            screen: 'character',
            params: { id: charID },
        });
    }, []);

    const onStaffPress = useCallback((staffID) => {
        // @ts-ignore
        navigation.navigate('staffStack', {
            screen: 'staff',
            params: { id: staffID },
        });
    }, []);

    const onStudioPress = useCallback(() => null, []);

    const onCharSearch = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const response = await searchContent(
            {
                name: filter.search,
                page: 1,
                isBirthday: filter.search?.length < 1 || !filter.search ? true : undefined,
                sort:
                    filter.search?.length < 1 || !filter.search
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

    const onStaffSearch = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const response = await searchContent(
            {
                name: filter.search,
                page: 1,
                isBirthday: filter.search?.length < 1 || !filter.search ? true : undefined,
                sort:
                    filter.search?.length < 1 || !filter.search
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

    const onStudioSearch = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const response = await searchContent(
            {
                name: filter.search,
                page: 1,
                sort:
                    filter.search?.length < 1 || !filter.search
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

    const onSearch = async () => {
        appDispatch(
            updateFilterHistory({
                filter: filter.filter,
            }),
        );
        appDispatch(addSearch(filter.search));
        if (filter.searchType === MediaType.Anime || filter.searchType === MediaType.Manga) {
            await onMediaSearch();
        } else if (filter.searchType === 'characters') {
            await onCharSearch();
        } else if (filter.searchType === 'staff') {
            await onStaffSearch();
        } else if (filter.searchType === 'studios') {
            await onStudioSearch();
        }
    };

    const filterState = {
        filter,
        dispatch,
    };

    const setSearch = useCallback(
        (query: string) => dispatch({ type: 'SET_SEARCH', payload: query }),
        [],
    );

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <SearchHeader
                    {...props}
                    searchContent={onSearch}
                    openFilter={() => {
                        Keyboard.dismiss();
                        openSheet();
                    }}
                    setSearch={setSearch}
                    search={filter.search}
                    currentType={filter.searchType}
                />
            ),
        });
    }, [filter.search, filter.searchType, filter.filter, isFilterOpen]);

    return (
        <FilterContext.Provider value={filterState}>
            <View style={{ flex: 1 }}>
                <View style={{ maxHeight: 120 }}>
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
                </View>
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
                    />
                )}
                {filter.searchType === 'characters' && (
                    <CharacterList
                        isLoading={loading}
                        onNavigate={onCharPress}
                        results={searchResults}
                        searchStatus={searchStatus}
                        nextPage={() =>
                            nextCharPage(searchResults?.Page?.pageInfo?.hasNextPage, filter.search)
                        }
                    />
                )}
                {filter.searchType === 'staff' && (
                    <StaffList
                        isLoading={loading}
                        onNavigate={onStaffPress}
                        results={searchResults}
                        searchStatus={searchStatus}
                        nextPage={() =>
                            nextStaffPage(searchResults?.Page?.pageInfo?.hasNextPage, filter.search)
                        }
                    />
                )}
                {filter.searchType === 'studios' && (
                    <StudioList
                        onNavigate={onStudioPress}
                        isLoading={loading}
                        results={searchResults}
                        searchStatus={searchStatus}
                        nextPage={() =>
                            nextStudioPage(
                                searchResults?.Page?.pageInfo?.hasNextPage,
                                filter.search,
                            )
                        }
                    />
                )}
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

export default SearchScreen2;
