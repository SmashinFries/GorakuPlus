import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface SearchState {
    search: string;
    history: string[];
    historyLimit: number;
}

// Define the initial state using that type
const initialState: SearchState = {
    search: '',
    history: [],
    historyLimit: 10,
};

export const searchSlice = createSlice({
    name: 'search',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setHistory: (state, action: PayloadAction<SearchState>) => {
            if (action.payload.history.length > state.historyLimit) {
                state.history = action.payload.history.slice(0, state.historyLimit);
            } else {
                state.history = action.payload.history;
            }
        },
        setHistoryLimit: (state, action: PayloadAction<SearchState>) => {
            state.historyLimit = action.payload.historyLimit;
        },
    },
});

export const { setSearch } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default searchSlice.reducer;
