import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AniDanDB = {
    aniId: number;
    booruTag: string;
};

// Define a type for the slice state
export interface CharacterArtState {
    // presets: Preset[];
    data: {
        [key: number]: string;
    };
}

// Define the initial state using that type
const initialState: CharacterArtState = {
    data: {},
};

export const characterArtDBSlice = createSlice({
    name: 'charArtDB',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateCharArtDB: (state, action: PayloadAction<AniDanDB>) => {
            state.data[action.payload.aniId] = action.payload.booruTag;
        },
        removeCharArtDBEntry: (state, action: PayloadAction<number>) => {
            delete state.data[action.payload];
        },
    },
});

export const { updateCharArtDB, removeCharArtDBEntry } = characterArtDBSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default characterArtDBSlice.reducer;
