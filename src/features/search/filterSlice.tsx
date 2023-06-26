import { combineReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { StackAnimationTypes } from 'react-native-screens';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaSort,
    MediaType,
} from '../../app/services/anilist/generated-anilist';
import { FilterTypes, SortCategories } from './types';
import { animeSort, commonSorts, mangaNovelSort } from './constants/mediaConsts';

const animeParams: ExploreMediaQueryVariables = {
    type: MediaType.Anime,
    format: undefined,
    format_in: undefined,
    format_not_in: undefined,
    format_not: undefined,
    chapters: undefined,
    chapters_greater: undefined,
    chapters_lesser: undefined,
    volumes: undefined,
    volumes_greater: undefined,
    volumes_lesser: undefined,
    countryOfOrigin: undefined,
};

const mangaParams: ExploreMediaQueryVariables = {
    type: MediaType.Manga,
    format: undefined,
    format_in: undefined,
    format_not_in: undefined,
    format_not: undefined,
    episodes: undefined,
    episodes_greater: undefined,
    episodes_lesser: undefined,
    duration: undefined,
    duration_greater: undefined,
    duration_lesser: undefined,
    season: undefined,
    seasonYear: undefined,
};

const getTypeParams = (mediaType: FilterTypes): ExploreMediaQueryVariables => {
    switch (mediaType) {
        case 'anime':
            return animeParams;
        case 'manga':
            return mangaParams;
        case 'manhwa':
            const manhwaParams = mangaParams;
            return manhwaParams;
        case 'novel':
            const novelParams = mangaParams;
            novelParams.countryOfOrigin = undefined;
            return novelParams;
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
    current: FilterTypes;
    filter: ExploreMediaQueryVariables;
    sort: {
        mode: 'asc' | 'desc';
        category: SortCategories;
    };
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

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setMediaType: (state, action: PayloadAction<FilterTypes>) => {
            const newFilter = getTypeParams(action.payload);
            state.current = action.payload;
            state.filter = { ...state.filter, ...newFilter };
        },
        addFilterParam: (
            state,
            action: PayloadAction<{ param: keyof ExploreMediaQueryVariables; value: any }>,
        ) => {
            state.filter = { ...state.filter, [action.payload.param]: action.payload.value };
        },
        removeFilterParam: (state, action: PayloadAction<keyof ExploreMediaQueryVariables>) => {
            state = { ...state, [action.payload]: undefined };
        },
        changeSort: (
            state,
            action: PayloadAction<{ mode: 'asc' | 'desc'; sort: SortCategories }>,
        ) => {
            state.filter.sort = getSortParam(action.payload.mode, action.payload.sort);
            state.sort = { category: action.payload.sort, mode: action.payload.mode };
        },
    },
});

export const { setMediaType, addFilterParam, removeFilterParam, changeSort } = filterSlice.actions;

export default filterSlice.reducer;
