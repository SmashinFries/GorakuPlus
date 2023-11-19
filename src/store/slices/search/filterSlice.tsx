import { combineReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaSort,
    MediaType,
} from '@/store/services/anilist/generated-anilist';
import { SearchTypes, SortCategories } from '../../../features/search/types';

const animeParams: ExploreMediaQueryVariables = {
    type: MediaType.Anime,
    countryOfOrigin: null,
};

const mangaParams: ExploreMediaQueryVariables = {
    type: MediaType.Manga,
    countryOfOrigin: 'JP',
};

const manhwaParams: ExploreMediaQueryVariables = {
    type: MediaType.Manga,
    countryOfOrigin: 'KR',
};

const novelParams: ExploreMediaQueryVariables = {
    type: MediaType.Manga,
    countryOfOrigin: null,
    format: MediaFormat.Novel,
};

export const getTypeParams = (mediaType: SearchTypes): ExploreMediaQueryVariables => {
    switch (mediaType) {
        case MediaType.Anime:
            return animeParams;
        case MediaType.Manga:
            return mangaParams;
    }
};

const getSortParam = (mode: 'asc' | 'desc', sort: SortCategories) => {
    switch (sort) {
        case 'Trending':
            return mode === 'asc' ? MediaSort.Trending : MediaSort.TrendingDesc;
        case 'Popularity':
            return mode === 'asc' ? MediaSort.Popularity : MediaSort.PopularityDesc;
        case 'Score':
            return mode === 'asc' ? MediaSort.Score : MediaSort.ScoreDesc;
        case 'Updated At':
            return mode === 'asc' ? MediaSort.UpdatedAt : MediaSort.UpdatedAtDesc;
        case 'Episodes':
            return mode === 'asc' ? MediaSort.Episodes : MediaSort.EpisodesDesc;
        case 'Duration':
            return mode === 'asc' ? MediaSort.Duration : MediaSort.DurationDesc;
        case 'Chapters':
            return mode === 'asc' ? MediaSort.Chapters : MediaSort.ChaptersDesc;
        case 'Volumes':
            return mode === 'asc' ? MediaSort.Volumes : MediaSort.VolumesDesc;
    }
};

export type FilterState = {
    current: SearchTypes;
    filter: ExploreMediaQueryVariables;
    sort: {
        mode: 'asc' | 'desc';
        category: SortCategories;
    };
};

type TagToggleProps = {
    type: 'genre' | 'tag';
    name: string;
    mode: 'in' | 'not_in' | 'remove';
};

// Define the initial state using that type
const initialFilterState: FilterState = {
    current: 'anime',
    filter: animeParams,
    sort: {
        mode: 'desc',
        category: 'Trending',
    },
};

// export const filterSlice = createSlice({
//     name: 'filter',
//     initialState: initialFilterState,
//     reducers: {
//         setMediaType: (state, action: PayloadAction<FilterTypes>) => {
//             const newFilter = getTypeParams(action.payload);
//             state.current = action.payload;
//             state.filter = { ...state.filter, ...newFilter };
//         },
//         addFilterParam: (
//             state,
//             action: PayloadAction<{ param: keyof ExploreMediaQueryVariables; value: any }>,
//         ) => {
//             state.filter = { ...state.filter, [action.payload.param]: action.payload.value };
//         },
//         toggleTag: (state, action: PayloadAction<TagToggleProps>) => {
//             switch (action.payload.mode) {
//                 case 'in':
//                     if (action.payload.type === 'genre') {
//                         state.filter.genre_in =
//                             typeof state.filter.genre_in === 'object'
//                                 ? [...state.filter.genre_in, action.payload.name]
//                                 : [action.payload.name];
//                     } else {
//                         state.filter.tag_in =
//                             typeof state.filter.tag_in === 'object'
//                                 ? [...state.filter.tag_in, action.payload.name]
//                                 : [action.payload.name];
//                     }
//                     break;
//                 case 'not_in':
//                     if (action.payload.type === 'genre') {
//                         state.filter.genre_not_in =
//                             typeof state.filter.genre_not_in === 'object'
//                                 ? [...state.filter.genre_not_in, action.payload.name]
//                                 : [action.payload.name];
//                         state.filter.genre_in = state.filter.genre_in?.filter(
//                             (genre: string) => genre !== action.payload.name,
//                         );
//                     } else {
//                         state.filter.tag_not_in =
//                             typeof state.filter.tag_not_in === 'object'
//                                 ? [...state.filter.tag_not_in, action.payload.name]
//                                 : [action.payload.name];
//                         state.filter.tag_in = state.filter.tag_in?.filter(
//                             (tag: string) => tag !== action.payload.name,
//                         );
//                     }

//                     break;
//                 case 'remove':
//                     if (action.payload.type === 'genre') {
//                         state.filter.genre_not_in = state.filter.genre_not_in?.filter(
//                             (genre: string) => genre !== action.payload.name,
//                         );
//                     } else {
//                         state.filter.tag_not_in = state.filter.tag_not_in?.filter(
//                             (tag: string) => tag !== action.payload.name,
//                         );
//                     }
//             }
//         },
//         removeFilterParam: (state, action: PayloadAction<keyof ExploreMediaQueryVariables>) => {
//             // state.filter = { ...state.filter, [action.payload]: null };
//             delete state.filter[action.payload];
//         },
//         changeSort: (
//             state,
//             action: PayloadAction<{ mode: 'asc' | 'desc'; sort: SortCategories }>,
//         ) => {
//             state.filter.sort = getSortParam(action.payload.mode, action.payload.sort);
//             state.sort = { category: action.payload.sort, mode: action.payload.mode };
//         },
//     },
// });

// export const { setMediaType, addFilterParam, removeFilterParam, changeSort, toggleTag } =
//     filterSlice.actions;

// export default filterSlice.reducer;
