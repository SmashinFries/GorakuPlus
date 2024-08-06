import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { StackAnimationTypes } from 'react-native-screens';
import { ExploreTabsProps } from '@/types/navigation';
import { MediaInfoDisplay, ScoreVisualType } from './types';
import { DanbooruRating } from '@/api/danbooru/types';

const storage = new MMKV({ id: 'settings-storage' });
const SettingsStorage = getZustandStorage(storage);

type SettingsState = {
	navAnimation?: StackAnimationTypes;
	btmTabLabels?: boolean;
	btmTabShifting?: boolean;
	allowSensorMotion?: boolean;
	interaction3D?: boolean;
	autoRotation?: boolean;
	exploreTabs?: (keyof ExploreTabsProps)[];
	exploreTabOrder?: (keyof ExploreTabsProps)[];
	mediaInfoDisplay?: MediaInfoDisplay;
	animeCustomLists?: string[];
	mangaCustomLists?: string[];
	mediaLanguage?: 'romaji' | 'english' | 'native';
	defaultDescription?: 'ani' | 'mal';
	showNSFW?: boolean;
	blurNSFW?: boolean;
	blurNSFWLevel?: DanbooruRating;
	scoreColors?: {
		red: number;
		yellow: number;
	};
	scoreVisualType?: ScoreVisualType;
	showItemListStatus?: boolean;
	defaultScore?: 'average' | 'mean';
	defaultGenreLayout?: 'list' | 'row';
	defaultTagLayout?: 'list' | 'row';
	tagBlacklist?: string[];
	isFirstLaunch?: boolean;
};

type SettingsAction = {
	setSettings: (entries: SettingsState) => void;
};

export const useSettingsStore = create<SettingsState & SettingsAction>()(
	persist(
		(set, get) => ({
			navAnimation: 'slide_from_bottom',
			btmTabLabels: true,
			btmTabShifting: true,
			allowSensorMotion: false,
			interaction3D: false,
			autoRotation: false,
			exploreTabs: ['anime', 'manga', 'manhwa', 'manhua', 'novels'],
			exploreTabOrder: ['anime', 'manga', 'manhwa', 'manhua', 'novels'],
			mediaInfoDisplay: 'list',
			animeCustomLists: [],
			mangaCustomLists: [],
			mediaLanguage: 'english',
			defaultDescription: 'mal',
			showNSFW: false,
			blurNSFW: true,
			blurNSFWLevel: DanbooruRating.General,
			scoreColors: {
				red: 64,
				yellow: 74,
			},
			scoreVisualType: 'healthbar-full',
			showItemListStatus: true,
			defaultScore: 'average',
			defaultGenreLayout: 'row',
			defaultTagLayout: 'list',
			tagBlacklist: [],
			isFirstLaunch: true,
			setSettings: (entries) => set((state) => entries),
		}),
		{
			name: 'settings-storage',
			storage: createJSONStorage(() => SettingsStorage),
		},
	),
);
