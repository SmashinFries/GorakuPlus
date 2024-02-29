import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MediaListSort, MediaListStatus, MediaTag } from '../services/anilist/generated-anilist';

// Define a type for the slice state
export interface ListFilterState {
    query?: string;
    sort?: MediaListSort;
    genre?: string[];
    tags_include?: MediaTag[];
    tags_exclude?: MediaTag[];
    animeTabOrder?: string[];
    mangaTabOrder?: string[];
}

type filterActions = {
    entryType: keyof ListFilterState;
    value: ListFilterState[keyof ListFilterState];
};

// Define the initial state using that type
const initialState: ListFilterState = {
    query: '',
    sort: MediaListSort.AddedTimeDesc,
    genre: [],
    tags_include: [],
    tags_exclude: [],
    animeTabOrder: [
        "Watching",
        "Planning",
        "Completed",
        "Rewatching",
        "Paused",
        "Dropped"
    ],
    mangaTabOrder: [
        "Reading",
        "Planning",
        "Completed",
        "Rereading",
        "Paused",
        "Dropped"
    ],
};

export const listFilterSlice = createSlice({
    name: 'listFilter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateListFilter: (state, action: PayloadAction<filterActions>) => {
            state[action.payload.entryType] = action.payload.value;
        },
    },
});

export const { updateListFilter } = listFilterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default listFilterSlice.reducer;
