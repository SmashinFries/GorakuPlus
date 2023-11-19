import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaType,
} from '@/store/services/anilist/generated-anilist';
import { useAppSelector } from '@/store/hooks';

export const FilterContext = createContext({});

export const useFilterContext = () => {
    return useContext(FilterContext);
};

type FilterState = ExploreMediaQueryVariables;

type FilterActions = {
    type: 'SET_SEARCH' | 'SET_TYPE' | 'SET_FILTER' | 'REMOVE_FILTER';
    key?: keyof ExploreMediaQueryVariables;
    payload?: ExploreMediaQueryVariables[keyof ExploreMediaQueryVariables];
    mediaType?: 'anime' | 'manga' | 'manhwa' | 'novel';
};

const filterReducer = (state: FilterState, action: FilterActions): FilterState => {
    switch (action.type) {
        case 'SET_SEARCH':
            return { ...state, search: action.payload.length > 0 ? action.payload : null };
        case 'SET_TYPE':
            return {
                ...state,
                type: action.mediaType === 'anime' ? MediaType.Anime : MediaType.Manga,
                format: action.mediaType === 'novel' ? MediaFormat.Novel : null,
            };
        case 'SET_FILTER':
            return { ...state, [action.key]: action.payload };
        case 'REMOVE_FILTER':
            delete state[action.key];
            return { ...state };
        default:
            return state;
    }
};

const useFilter = () => {
    const history = useAppSelector((state) => state.persistedHistory);
    const [filter, dispatch] = useReducer(filterReducer, history.filter);
};

// export type FilterValues = {
//     filter: RootState['filterSlice']['filter'];
//     sort: RootState['filterSlice']['sort'];
//     current: RootState['filterSlice']['current'];
//     updateFilter: (param: keyof ExploreMediaQueryVariables, value: any) => void;
//     removeFilter: (filter_param: keyof ExploreMediaQueryVariables) => void;
//     switchType: (m_type: FilterTypes) => void;
//     updateSort: (
//         mode: FilterState['sort']['mode'],
//         category: FilterState['sort']['category'],
//     ) => void;
//     toggleGenreTag: (type: 'genre' | 'tag', name: string, mode: 'in' | 'not_in' | 'remove') => void;
//     updateSearch: (query: string) => void;
// };

// export const useFilter = (): FilterValues => {
//     const { current, filter, sort } = useAppSelector((state) => state.filterSlice);
//     const dispatch = useDispatch();

//     const updateFilter = (param: keyof ExploreMediaQueryVariables, value: any) => {
//         value ? dispatch(addFilterParam({ param: param, value: value })) : removeFilter(param);
//     };

//     const removeFilter = (filter_param: keyof ExploreMediaQueryVariables) => {
//         dispatch(removeFilterParam(filter_param));
//     };

//     const switchType = (m_type: FilterTypes) => {
//         dispatch(setMediaType(m_type));

//         // sort adjust
//         if (m_type === 'anime' && animeSort.includes(sort.category) === false) {
//             updateSort(sort.mode, 'Trending');
//         } else if (m_type !== 'anime' && mangaNovelSort.includes(sort.category) === false) {
//             updateSort(sort.mode, 'Trending');
//         }

//         // format adjust
//         if (m_type === 'anime' && ANIME_FORMATS.includes(filter.format) === false) {
//             removeFilter('format');
//             console.log('removed!');
//         } else if (
//             (m_type === 'manga' || m_type === 'manhwa') &&
//             MANGA_FORMATS.includes(filter.format) === false
//         ) {
//             removeFilter('format');
//         } else if (m_type === 'novel') {
//             updateFilter('format', MediaFormat.Novel);
//         }

//         // Country adjust
//         if (m_type === 'manga') {
//             updateFilter('countryOfOrigin', 'JP');
//         } else if (m_type === 'manhwa') {
//             updateFilter('countryOfOrigin', 'KR');
//         } else {
//             removeFilter('countryOfOrigin');
//         }
//     };

//     const updateSort = (
//         mode: FilterState['sort']['mode'],
//         category: FilterState['sort']['category'],
//     ) => {
//         dispatch(changeSort({ mode: mode, sort: category }));
//     };

//     const toggleGenreTag: FilterValues['toggleGenreTag'] = (type, name, mode) =>
//         dispatch(toggleTag({ mode, name, type }));

//     const updateSearch = (query: string) => {
//         dispatch(setSearch(query));
//     };

//     useEffect(() => {
//         if (filter.genre_in?.length === 0 || filter.genre_in === null) {
//             removeFilter('genre_in');
//         } else if (filter.genre_not_in?.length === 0 || filter.genre_not_in === null) {
//             removeFilter('genre_not_in');
//         } else if (filter.tag_in?.length === 0 || filter.tag_in === null) {
//             removeFilter('tag_in');
//         } else if (filter.tag_not_in?.length === 0 || filter.tag_not_in === null) {
//             removeFilter('tag_not_in');
//         } else if (filter.search === '' || filter.search === null) {
//             removeFilter('search');
//         }
//     }, [filter]);

//     return {
//         filter,
//         sort,
//         current,
//         updateFilter,
//         removeFilter,
//         switchType,
//         updateSort,
//         toggleGenreTag,
//         updateSearch,
//     };
// };

export default useFilter;
