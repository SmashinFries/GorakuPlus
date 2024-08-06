import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type MuDB = {
	aniId: number;
	muId: number;
};

// Define a type for the slice state
export interface MuDBState {
	// presets: Preset[];
	data: {
		[key: number]: number;
	};
}

// Define the initial state using that type
const initialState: MuDBState = {
	data: {},
};

export const mangaUpdateDBSlice = createSlice({
	name: 'muDB',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		updateDB: (state, action: PayloadAction<MuDB>) => {
			state.data[action.payload.aniId] = action.payload.muId;
		},
		removeDBEntry: (state, action: PayloadAction<number>) => {
			delete state.data[action.payload];
		},
	},
});

export const { updateDB, removeDBEntry } = mangaUpdateDBSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default mangaUpdateDBSlice.reducer;
