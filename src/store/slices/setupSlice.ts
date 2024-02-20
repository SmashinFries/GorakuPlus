import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface SetupState {
    isFirstLaunch?: boolean;
}

// Define the initial state using that type
const initialState: SetupState = {
    isFirstLaunch: true,
};

export const setupSlice = createSlice({
    name: 'setup',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        finishSetup: (state) => {
            state['isFirstLaunch'] = false;
        },
        restartSetup: (state) => {
            state['isFirstLaunch'] = true;
        },
    },
});

export const { finishSetup, restartSetup } = setupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default setupSlice.reducer;
