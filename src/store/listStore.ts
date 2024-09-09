import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { MediaListSort, MediaTag, MediaType } from '@/api/anilist/__genereated__/gql';

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
	updateListFilter: (filter: ListFilterState) => void;
	checkListNames: (type: MediaType, newNames: string[]) => void;
	// clearListFilter: (type: ListFilterState) => void;
};

export const useListFilterStore = create<ListFilterState & ListFilterActions>()(
	persist(
		(set, get) => ({
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
			// clearListFilter(type) {
			// 	set((state) => ({ anilist: { ...state.anilist, ...data } }));
			// },
		}),
		{
			name: 'list-filter-storage',
			storage: createJSONStorage(() => ListFilterStorage),
		},
	),
);
