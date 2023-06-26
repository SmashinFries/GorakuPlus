import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ExploreMediaQueryVariables, MediaTag } from '../../app/services/anilist/generated-anilist';

type Preset = {
    title: string;
    genres_in: string[];
    genres_not_in: string[];
    tags_in: MediaTag['name'][];
    tags_not_in: MediaTag['name'][];
};

// Define a type for the slice state
export interface PresetState {
    // presets: Preset[];
    tagPresets: Preset[];
}

// Define the initial state using that type
const initialState: PresetState = {
    tagPresets: [
        {
            title: '⚔💖Romance Isekai',
            genres_in: ['fantasy', 'romance'],
            genres_not_in: [],
            tags_in: ['isekai'],
            tags_not_in: [],
        },
        {
            title: 'Psychological Tragedy',
            genres_in: ['psychological'],
            genres_not_in: [],
            tags_in: ['philosophy', 'tragedy'],
            tags_not_in: [],
        },
    ],
};

export const presetSlice = createSlice({
    name: 'preset',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addPreset: (state, action: PayloadAction<Preset>) => {
            state.tagPresets = [...state.tagPresets, { ...action.payload }];
        },
        removePreset: (state, action: PayloadAction<string>) => {
            state.tagPresets = state.tagPresets.filter((_, index) => _.title !== action.payload);
        },
        editPreset: (state, action: PayloadAction<Preset>) => {
            state.tagPresets = state.tagPresets.map((_, index) => {
                if (_.title === action.payload.title) {
                    return action.payload;
                }
                return _;
            });
        },
    },
});

export const { addPreset, editPreset, removePreset } = presetSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default presetSlice.reducer;
