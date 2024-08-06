import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FavoritesSearchState {
	query: string;
}

// Define the initial state using that type
const initialState: FavoritesSearchState = {
	query: '',
};

export const favSearchSlice = createSlice({
	name: 'favSearch',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		updateFavSearch: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
	},
});

export const { updateFavSearch } = favSearchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default favSearchSlice.reducer;
