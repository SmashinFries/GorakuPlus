import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { MediaListSort, MediaTag } from '@/api/anilist/__genereated__/gql';

const storage = new MMKV({
	id: 'favorites-filter-storage',
});
const FavoritesFilterStorage = getZustandStorage(storage);

// EXPAND AT SOME POINT!
type FavoritesFilterState = {
	query?: string;
};

type FavoritesFilterActions = {
	updateFilter: (filter: FavoritesFilterState) => void;
	// clearListFilter: (type: ListFilterState) => void;
};

export const useFavoritesFilterStore = create<FavoritesFilterState & FavoritesFilterActions>()(
	persist(
		(set, get) => ({
			query: '',
			updateFilter(filter) {
				set((state) => ({ ...state, ...filter }));
			},
		}),
		{
			name: 'favorites-filter-storage',
			storage: createJSONStorage(() => FavoritesFilterStorage),
		},
	),
);
