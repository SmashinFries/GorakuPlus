import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { create } from 'zustand';

// const storage = new MMKV({
// 	id: 'favorites-filter-storage',
// });
// const FavoritesFilterStorage = getZustandStorage(storage);

// EXPAND AT SOME POINT!
type FavoritesFilterState = {
	query?: string;
};

type FavoritesFilterActions = {
	updateFilter: (filter: FavoritesFilterState) => void;
	// clearListFilter: (type: ListFilterState) => void;
};

export const useFavoritesFilterStore = create<FavoritesFilterState & FavoritesFilterActions>(
	(set, _get) => ({
		query: '',
		updateFilter(filter) {
			set((state) => ({ ...state, ...filter }));
		},
	}),
);
