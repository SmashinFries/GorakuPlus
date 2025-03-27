import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { create } from 'zustand';
import { MediaListSort } from '@/api/anilist/__genereated__/gql';

type ListFilterTagGenre = {
	genre_include: string[];
	genre_exclude: string[];
	tags_include: string[];
	tags_exclude: string[];
};

type FavoritesFilterState = {
	query?: string;
	mediaSort?: MediaListSort;
} & ListFilterTagGenre;

type FavoritesFilterActions = {
	updateFilter: (filter: Partial<FavoritesFilterState>) => void;
	updateTagGenre: (value: string, type: 'tags' | 'genre') => void;
	reset: () => void;
};

export const useFavoritesFilterStore = create<FavoritesFilterState & FavoritesFilterActions>(
	(set, _get) => ({
		query: '',
		mediaSort: MediaListSort.AddedTimeDesc,
		genre_include: [],
		genre_exclude: [],
		tags_include: [],
		tags_exclude: [],
		updateTagGenre(value, type) {
			set((state) => {
				const include_key = `${type}_include` as keyof ListFilterTagGenre;
				const exclude_key = `${type}_exclude` as keyof ListFilterTagGenre;

				const include_list = state[include_key] || [];
				const exclude_list = state[exclude_key] || [];

				// If value exists in include list, move to exclude
				if (include_list.includes(value)) {
					return {
						...state,
						[include_key]: include_list.filter((item) => item !== value),
						[exclude_key]: [...exclude_list, value],
					};
				}

				// If value exists in exclude list, remove it completely
				if (exclude_list.includes(value)) {
					return {
						...state,
						[exclude_key]: exclude_list.filter((item) => item !== value),
					};
				}

				// If value doesn't exist in either list, add to include
				return {
					...state,
					[include_key]: [...include_list, value],
				};
			});
		},
		updateFilter(filter) {
			set((state) => ({ ...state, ...filter }));
		},
		reset() {
			set((state) => ({
				...state,
				genre_include: [],
				genre_exclude: [],
				tags_include: [],
				tags_exclude: [],
			}));
		},
	}),
);
