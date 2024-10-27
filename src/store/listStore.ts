import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { MediaListSort, MediaTag, MediaType } from '@/api/anilist/__genereated__/gql';
import { create } from 'zustand';

const storage = new MMKV({
	id: 'list-filter-storage',
});
const ListFilterStorage = getZustandStorage(storage);

type ListFilterState = {
	query?: string;
	sort?: MediaListSort;
	genre?: string[];
	tags_include?: MediaTag[];
	tags_exclude?: MediaTag[];
	animeTabOrder?: string[];
	mangaTabOrder?: string[];
};

type ListFilterActions = {
	updateListFilter?: (filter: ListFilterState) => void;
	checkListNames?: (type: MediaType, newNames: string[]) => void;
	// clearListFilter: (type: ListFilterState) => void;
};

export const useListFilterStore = create<ListFilterState & ListFilterActions>()(
	persist(
		(set, _get) => ({
			query: '',
			sort: MediaListSort.AddedTimeDesc,
			genre: [],
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
		}),
		{
			name: 'list-filter-storage',
			storage: createJSONStorage(() => ListFilterStorage),
			partialize: (state) => ({
				animeTabOrder: state.animeTabOrder,
				mangaTabOrder: state.mangaTabOrder,
			}),
		},
	),
);
