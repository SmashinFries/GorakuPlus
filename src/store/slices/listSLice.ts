import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface ListSearchState {
    query: string;
}

// Define the initial state using that type
const initialState: ListSearchState = {
    query: '',
};

export const listSearchSlice = createSlice({
    name: 'listSearch',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateListSearch: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
    },
});

export const { updateListSearch } = listSearchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default listSearchSlice.reducer;
