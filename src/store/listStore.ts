import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { MediaListSort, MediaType } from '@/api/anilist/__genereated__/gql';
import { create } from 'zustand';

const storage = new MMKV({
	id: 'list-filter-storage',
});
const ListFilterStorage = getZustandStorage(storage);

type ListFilterTagGenre = {
	genre_include: string[];
	genre_exclude: string[];
	tags_include: string[];
	tags_exclude: string[];
};
type ListFilterState = {
	query: string;
	sort?: MediaListSort;
	animeTabOrder: string[];
	mangaTabOrder: string[];
} & ListFilterTagGenre;

type ListFilterActions = {
	updateListFilter: (filter: Partial<ListFilterState>) => void;
	checkListNames: (type: MediaType, newNames: string[]) => void;
	updateTagGenre: (value: string, type: 'tags' | 'genre') => void;
	// clearListFilter: (type: ListFilterState) => void;
};

export const useListFilterStore = create<ListFilterState & ListFilterActions>()(
	persist(
		(set, _get) => ({
			query: '',
			sort: MediaListSort.AddedTimeDesc,
			genre_include: [],
			genre_exclude: [],
			tags_include: [],
			tags_exclude: [],
			animeTabOrder: ['Watching', 'Planning', 'Completed', 'Rewatching', 'Paused', 'Dropped'],
			mangaTabOrder: ['Reading', 'Planning', 'Completed', 'Rereading', 'Paused', 'Dropped'],
			updateListFilter(filter) {
				set((state) => ({ ...state, ...filter }));
			},
			checkListNames(type, newNames) {
				const newNamesSet = new Set(newNames);
				if (type === MediaType.Anime) {
					set((state) => {
						const currentNames = state.animeTabOrder.filter((item) =>
							newNamesSet.has(item),
						);
						newNames.forEach((item) => {
							if (!currentNames.includes(item)) {
								currentNames.push(item);
							}
						});
						return { ...state, animeTabOrder: currentNames };
					});
				} else {
					set((state) => {
						const currentNames = state.mangaTabOrder.filter((item) =>
							newNamesSet.has(item),
						);
						newNames.forEach((item) => {
							if (!currentNames.includes(item)) {
								currentNames.push(item);
							}
						});
						return { ...state, mangaTabOrder: currentNames };
					});
				}
			},
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
		}),
		{
			name: 'list-filter-storage',
			storage: createJSONStorage(() => ListFilterStorage),
			partialize: (state) => ({
				animeTabOrder: state.animeTabOrder,
				mangaTabOrder: state.mangaTabOrder,
				sort: state.sort,
			}),
		},
	),
);
