import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';

const storage = new MMKV({
	id: 'match-storage',
});
const MatchStorage = getZustandStorage(storage);

type MatchState = {
	mangaUpdates: {
		[aniId: number]: number;
	};
	booru: {
		[aniCharId: number]: string;
	};
	mal: {
		[aniId: number]: number;
	};
	isMangaUpdatesEnabled: boolean;
	isMangaDexEnabled: boolean;
	isMalEnabled: boolean;
};

type MatchActions = {
	addMangaUpdatesID: (aniId: number, muId: number) => void;
	deleteMangaUpdatesID: (aniId: number) => void;
	addBooruTag: (aniCharId: number, tag: string) => void;
	deleteBooruTag: (aniCharId: number) => void;
	addMalID: (aniId: number, malId: number) => void;
	deleteMalID: (aniId: number) => void;
	reset: (type: 'all' | 'booru' | 'mal' | 'mangaUpdates') => void;
	toggleService: (service: 'mal' | 'mangaUpdates' | 'mangaDex') => void;
};

const initialData: MatchState = {
	booru: {},
	mal: {},
	mangaUpdates: {},
	isMalEnabled: true,
	isMangaDexEnabled: true,
	isMangaUpdatesEnabled: true,
};

/**
 * Store for mangaupdates and booru tags tied to Anilist IDs
 */
export const useMatchStore = create<MatchState & MatchActions>()(
	persist(
		(set, get) => ({
			...initialData,
			addMangaUpdatesID(aniId, muId) {
				set((state) => ({ mangaUpdates: { ...state.mangaUpdates, [aniId]: muId } }));
			},
			deleteMangaUpdatesID(aniId) {
				set((state) => {
					delete state.mangaUpdates[aniId];
					console.log(
						`Deleted ${aniId} muID: ${state.mangaUpdates[aniId] ? 'false' : 'true'}`,
					);
					return state;
				});
			},
			addBooruTag(aniCharId, tag) {
				set((state) => ({ booru: { ...state.booru, [aniCharId]: tag } }));
			},
			deleteBooruTag(aniCharId) {
				set((state) => {
					delete state.booru[aniCharId];
					console.log(
						`Deleted ${aniCharId} boorutag: ${state.booru[aniCharId] ? 'false' : 'true'}`,
					);
					return state;
				});
			},
			addMalID(aniId, malId) {
				set((state) => ({ mal: { ...state.mal, [aniId]: malId } }));
			},
			deleteMalID(aniId) {
				set((state) => {
					delete state.mal[aniId];
					console.log(
						`Deleted ${aniId} mal combo: ${state.mal[aniId] ? 'false' : 'true'}`,
					);
					return state;
				});
			},
			toggleService(service) {
				switch (service) {
					case 'mal':
						set((state) => ({ isMalEnabled: !state.isMalEnabled }));
						break;
					case 'mangaDex':
						set((state) => ({ isMangaDexEnabled: !state.isMangaDexEnabled }));
						break;
					case 'mangaUpdates':
						set((state) => ({ isMangaUpdatesEnabled: !state.isMangaUpdatesEnabled }));
						break;
				}
			},
			reset(type) {
				switch (type) {
					case 'all':
						set(initialData);
					case 'booru':
						set({ booru: {} });
					case 'mal':
						set({ mal: {} });
					case 'mangaUpdates':
						set({ mangaUpdates: {} });
				}
			},
		}),
		{
			name: 'match-storage',
			storage: createJSONStorage(() => MatchStorage),
		},
	),
);
