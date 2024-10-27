import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { create } from 'zustand';

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
	mangadex: {
		[aniId: number]: {
			mangaId: string;
			firstChapterId?: string;
		};
	};
	isMangaUpdatesEnabled: boolean;
	isMangaDexEnabled: boolean;
	isMalEnabled: boolean;
	isBooruEnabled: boolean;
};

type MatchActions = {
	addMangaUpdatesID: (aniId: number, muId: number) => void;
	deleteMangaUpdatesID: (aniId: number) => void;
	addBooruTag: (aniCharId: number, tag: string) => void;
	deleteBooruTag: (aniCharId: number) => void;
	addMalID: (aniId: number, malId: number) => void;
	deleteMalID: (aniId: number) => void;
	addMangaDexID: (aniId: number, mangaId: string, firstChapterId?: string) => void;
	deleteMangaDexID: (aniId: number) => void;
	reset: (type: 'all' | 'booru' | 'mal' | 'mangaUpdates' | 'mangadex') => void;
	toggleService: (service: 'mal' | 'mangaUpdates' | 'mangaDex' | 'booru') => void;
};

const initialData: MatchState = {
	booru: {},
	mal: {},
	mangaUpdates: {},
	mangadex: {},
	isMalEnabled: true,
	isMangaDexEnabled: false,
	isMangaUpdatesEnabled: true,
	isBooruEnabled: true,
};

/**
 * Store for mangaupdates and booru tags tied to Anilist IDs
 */
export const useMatchStore = create<MatchState & MatchActions>()(
	persist(
		(set, _get) => ({
			...initialData,
			addMangaUpdatesID(aniId, muId) {
				set((state) => ({ mangaUpdates: { ...state.mangaUpdates, [aniId]: muId } }));
			},
			deleteMangaUpdatesID(aniId) {
				set((state) => {
					delete state.mangaUpdates[aniId];
					return state;
				});
			},
			addBooruTag(aniCharId, tag) {
				set((state) => ({ booru: { ...state.booru, [aniCharId]: tag } }));
			},
			deleteBooruTag(aniCharId) {
				set((state) => {
					delete state.booru[aniCharId];
					return state;
				});
			},
			addMalID(aniId, malId) {
				set((state) => ({ mal: { ...state.mal, [aniId]: malId } }));
			},
			deleteMalID(aniId) {
				set((state) => {
					delete state.mal[aniId];
					return state;
				});
			},
			addMangaDexID(aniId, mangaId, firstChapterId) {
				set((state) => ({
					mangadex: {
						...state.mangadex,
						[aniId]: { mangaId, firstChapterId },
					},
				}));
			},
			deleteMangaDexID(aniId) {
				set((state) => {
					delete state.mangadex[aniId];
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
						break;
					case 'booru':
						set({ booru: {} });
						break;
					case 'mal':
						set({ mal: {} });
						break;
					case 'mangaUpdates':
						set({ mangaUpdates: {} });
						break;
					case 'mangadex':
						set({ mangadex: {} });
						break;
					default:
						break;
				}
			},
		}),
		{
			name: 'match-storage',
			storage: createJSONStorage(() => MatchStorage),
		},
	),
);
