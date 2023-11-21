import { SearchHeader } from '@/components/headers';
import { FilterSheet } from '@/components/search/filtersheet';
import { AniMangList, CharacterList, StaffList, StudioList } from '@/components/search/lists';
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
import { Keyboard, Pressable, TextInput } from 'react-native';
import { View } from 'react-native';
import { IconButton, List, useTheme } from 'react-native-paper';

const SearchPage = () => {
    const { dark, colors } = useTheme();
    const searchbarRef = useRef<TextInput>();
    const [filterSearch, setFilterSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentHistorySearch, setCurrentHistorySearch] = useState<string | null>(null);

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
        const tag_not_in = filter.filter.tag_not_in
            ? [...filter.filter.tag_not_in, ...tagBlacklist]
            : tagBlacklist
            ? tagBlacklist
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

    const onStudioPress = useCallback(() => null, []);

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
                searchType: filter.searchType,
            }),
        );
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

    useEffect(() => {
        if (history.searchType === MediaType.Anime || history.searchType === MediaType.Manga) {
            dispatch({ type: 'SET_TYPE', payload: history.searchType });
        }
    }, [history.searchType]);

    // useEffect(() => {
    //     navigation.setOptions({
    //         header: (props) => (
    //             <SearchHeader
    //                 {...props}
    //                 searchContent={onSearch}
    //                 openFilter={() => {
    //                     Keyboard.dismiss();
    //                     openSheet();
    //                 }}
    //                 // setSearch={setSearch}
    //                 // search={filter.search}
    //                 historySelected={currentHistorySearch}
    //                 onHistorySelected={() => setCurrentHistorySearch(null)}
    //                 currentType={filter.searchType}
    //                 toggleIsFocused={toggleIsFocused}
    //                 searchbarRef={searchbarRef}
    //             />
    //         ),
    //     });
    // }, [filter.search, filter.searchType, filter.filter, currentHistorySearch, isFilterOpen]);

    return (
        <FilterContext.Provider value={filterState}>
            <Stack.Screen
                options={{
                    header: (props) => (
                        <SearchHeader
                            {...props}
                            searchContent={onSearch}
                            openFilter={() => {
                                Keyboard.dismiss();
                                openSheet();
                            }}
                            // setSearch={setSearch}
                            // search={filter.search}
                            historySelected={currentHistorySearch}
                            onHistorySelected={() => setCurrentHistorySearch(null)}
                            currentType={filter.searchType}
                            toggleIsFocused={toggleIsFocused}
                            searchbarRef={searchbarRef}
                            setFilterSearch={(query) => setFilterSearch(query)}
                        />
                    ),
                }}
            />
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
                {isFocused && (
                    <Pressable
                        onPress={() => {
                            searchbarRef.current?.blur();
                            toggleIsFocused(false);
                        }}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            backgroundColor: colors.background,
                            top: 120,
                        }}
                    >
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
                    </Pressable>
                )}
            </View>
            <FilterSheet
                sheetRef={sheetRef}
                handleSheetChange={handleSheetChange}
                onSearch={(query: string) => onSearch(query)}
                filterSearch={filterSearch}
                filterData={filter}
                updateFilter={updateFilter}
                toggleSheet={closeSheet}
                genreTagData={genreTagResult.data}
            />
        </FilterContext.Provider>
    );
};

export default SearchPage;
