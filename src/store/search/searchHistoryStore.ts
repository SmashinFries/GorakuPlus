import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';

const storage = new MMKV({
	id: 'searchHistory-storage',
});
const SearchStorage = getZustandStorage(storage);

type SearchState = {
	searchTerms?: string[];
	searchTermLimit?: number;
};

type SearchActions = {
	updateSearchLimit: (limit: number) => void;
	addSearchTerm: (term: string) => void;
	removeSearchTerm: (term: string) => void;
};

const initialState: SearchState = {
	searchTerms: [],
	searchTermLimit: 20,
};

export const useSearchHistoryStore = create<SearchState & SearchActions>()(
	persist(
		(set, get) => ({
			...initialState,
			updateSearchLimit(limit) {
				set({ searchTermLimit: limit });
			},
			addSearchTerm(term) {
				set((state) => {
					if (state.searchTerms.includes(term)) {
						return;
					} else if (state.searchTerms.length === state.searchTermLimit) {
						const terms = state.searchTerms;
						terms.shift();
						return { searchTerms: terms };
					} else {
						return {
							searchTerms: [term.trim(), ...state.searchTerms],
						};
					}
				});
			},
			removeSearchTerm(term) {
				set((state) => {
					const newSearchTerms = state.searchTerms.filter((val) => val !== term);
					return { searchTerms: newSearchTerms };
				});
			},
		}),
		{
			name: 'searchHistory-storage',
			storage: createJSONStorage(() => SearchStorage),
		},
	),
);
