import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    ExploreMediaQueryVariables,
    MediaSort,
    MediaType,
} from '../../app/services/anilist/generated-anilist';

// Define a type for the slice state
export interface HistoryState {
    filter?: ExploreMediaQueryVariables;
    search?: string[];
    searchType?: MediaType.Anime | MediaType.Manga | 'users' | 'characters' | 'staff' | 'studios';
    searchLimit?: number;
}

// Define the initial state using that type
const initialState: () => HistoryState = () => ({
    filter: {
        type: MediaType.Anime,
        sort: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
    },
    search: [],
    searchType: MediaType.Anime,
    searchLimit: 10,
});

export const historySlice = createSlice({
    name: 'history',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: initialState(),
    reducers: {
        updateFilterHistory: (state, action: PayloadAction<{ filter: HistoryState['filter'] }>) => {
            state.filter = { ...state.filter, ...action.payload.filter };
        },
        addSearch: (state, action: PayloadAction<string>) => {
            if (state.search?.includes(action.payload)) return;
            if (state.search?.length === state.searchLimit) {
                state.search.pop();
            }
            state.search = [action.payload, ...state.search];
        },
        clearSearch: (state) => {
            state.search = [];
        },
        updateSearchLimit: (state, action: PayloadAction<number>) => {
            state.searchLimit = action.payload;
        },
        resetFilterHistory: () => initialState(),
    },
});

export const {
    updateFilterHistory,
    resetFilterHistory,
    addSearch,
    clearSearch,
    updateSearchLimit,
} = historySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default historySlice.reducer;
