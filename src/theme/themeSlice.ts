import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { ThemeOptions } from './theme';

// Define a type for the slice state
export interface ThemeState {
    mode: ThemeOptions;
    isDark: boolean;
}

// Define the initial state using that type
const initialState: ThemeState = {
    mode: 'default',
    isDark: false,
};

export const themeSlice = createSlice({
    name: 'theme',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeState>) => {
            state.mode = action.payload.mode ?? state.mode;
            state.isDark = action.payload.isDark ?? state.isDark;
        },
    },
});

export const { setTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default themeSlice.reducer;
