import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface ListFilterState {
    query?: string;
    genre?: string[];
}

type filterActions = {
    entryType: keyof ListFilterState;
    value: ListFilterState[keyof ListFilterState];
};

// Define the initial state using that type
const initialState: ListFilterState = {
    query: '',
    genre: [],
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
