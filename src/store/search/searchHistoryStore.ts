import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { create } from 'zustand';

const storage = new MMKV({
	id: 'searchHistory-storage',
});
const SearchStorage = getZustandStorage(storage);

type SearchState = {
	searchTerms?: string[];
};

type SearchActions = {
	addSearchTerm: (term: string) => void;
	removeSearchTerm: (term: string) => void;
};

const initialState: SearchState = {
	searchTerms: [],
};

const LIMIT = 50; // removed customizable limit for simplicity but no idea what to set it as lol
export const useSearchHistoryStore = create<SearchState & SearchActions>()(
	persist(
		(set, _get) => ({
			...initialState,
			addSearchTerm(term) {
				set((state) => {
					if (state.searchTerms.includes(term)) {
						return;
					} else if (state.searchTerms.length === LIMIT) {
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
