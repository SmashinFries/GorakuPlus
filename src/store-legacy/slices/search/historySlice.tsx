import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	ExploreMediaQueryVariables,
	MediaSort,
	MediaType,
} from '@/store/services/anilist/generated-anilist';
import { SearchTypes } from '@/constants/anilist';
import { SearchType } from '@/types/search';

// Define a type for the slice state
export interface HistoryState {
	filter?: ExploreMediaQueryVariables;
	search?: string[];
	searchType?: SearchType;
	searchLimit?: number;
	enableTagBlacklist?: boolean;
}

// Define the initial state using that type
const initialState: () => HistoryState = () => ({
	filter: {
		type: MediaType.Anime,
		sort: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
	},
	search: [],
	searchType: MediaType.Anime,
	searchLimit: 5,
	enableTagBlacklist: true,
});

export const historySlice = createSlice({
	name: 'history',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: initialState(),
	reducers: {
		updateFilterHistory: (state, action: PayloadAction<HistoryState>) => {
			state = {
				...state,
				filter: { ...action.payload.filter },
				searchType: action.payload.searchType ?? state.searchType,
				enableTagBlacklist: action.payload.enableTagBlacklist ?? state.enableTagBlacklist,
			};
		},
		updateSearchType: (state, action: PayloadAction<SearchType>) => {
			state.searchType = action.payload;
		},
		addSearch: (state, action: PayloadAction<string>) => {
			if (state.search?.includes(action.payload.trim())) return;
			if (state.search?.length === state.searchLimit) {
				state.search.pop();
			}
			if (action.payload.trim()) {
				state.search = [action.payload.trim(), ...state.search];
			}
		},
		clearSearch: (state) => {
			state.search = [];
		},
		removeSearchTerm: (state, action: PayloadAction<string>) => {
			const searchIndx = state.search?.indexOf(action.payload);
			if (searchIndx > -1) {
				state.search.splice(searchIndx, 1);
			}
		},
		updateSearchLimit: (state, action: PayloadAction<number>) => {
			state.searchLimit = action.payload;
		},
		resetFilterHistory: () => initialState(),
	},
});

export const {
	updateFilterHistory,
	resetFilterHistory,
	addSearch,
	clearSearch,
	updateSearchLimit,
	updateSearchType,
	removeSearchTerm,
} = historySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default historySlice.reducer;
