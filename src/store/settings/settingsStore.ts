import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { StackAnimationTypes } from 'react-native-screens';
import { ExploreTabsProps } from '@/types/navigation';
import { MediaInfoDisplay } from './types';
import { DanbooruRating } from '@/api/danbooru/types';
import { create } from 'zustand';

const storage = new MMKV({ id: 'settings-storage' });
const SettingsStorage = getZustandStorage(storage);

type SettingsState = {
	navAnimation?: StackAnimationTypes;
	btmTabLabels?: boolean;
	btmTabShifting?: boolean;
	btmTabHaptics?: boolean;
	allowSensorMotion?: boolean;
	interaction3D?: boolean;
	autoRotation?: boolean;
	allowBgParticles?: boolean;
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
	defaultScore?: 'average' | 'mean';
	defaultGenreLayout?: 'list' | 'row';
	defaultTagLayout?: 'list' | 'row';
	tagBlacklist?: string[];
	isFirstLaunch?: boolean;
};

type SettingsAction = {
	setSettings: (entries: SettingsState) => void;
	toggle: (type: keyof SettingsState) => void;
};

export const useSettingsStore = create<SettingsState & SettingsAction>()(
	persist(
		(set, _get) => ({
			navAnimation: 'fade',
			btmTabLabels: true,
			btmTabShifting: true,
			btmTabHaptics: false,
			allowSensorMotion: false,
			interaction3D: false,
			autoRotation: false,
			allowBgParticles: false,
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
			defaultScore: 'average',
			defaultGenreLayout: 'row',
			defaultTagLayout: 'list',
			tagBlacklist: [],
			isFirstLaunch: true,
			setSettings: (entries) => set((_state) => entries),
			toggle: (type) =>
				set((state) =>
					typeof state[type] === 'boolean'
						? { ...state, [type]: !state[type] as boolean }
						: state,
				),
		}),
		{
			name: 'settings-storage',
			storage: createJSONStorage(() => SettingsStorage),
		},
	),
);
