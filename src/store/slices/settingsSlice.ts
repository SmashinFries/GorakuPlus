import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StackAnimationTypes } from 'react-native-screens';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { MediaListStatus } from '@/store/services/anilist/generated-anilist';
import { DanbooruRating } from '@/store/services/danbooru/types';
import { ExploreTabsProps } from '@/types/navigation';

// Define a type for the slice state
export type SettingsState = {
    navAnimation?: StackAnimationTypes;
    btmTabLabels?: boolean;
    btmTabShifting?: boolean;
    allowSensorMotion?: boolean;
    exploreTabs?: (keyof ExploreTabsProps)[];
    exploreTabOrder?: (keyof ExploreTabsProps)[];
    listATabOrder?: (MediaListStatus | string)[];
    listMTabOrder?: (MediaListStatus | string)[];
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
    scoreGlow?: boolean;
    scoreHealthBar?: boolean;
    scoreNumber?: boolean;
    showItemListStatus?: boolean;
    defaultScore?: 'average' | 'mean';
    defaultGenreLayout?: 'list' | 'row';
    defaultTagLayout?: 'list' | 'row';
    tagBlacklist?: string[];
};

// Define the initial state using that type
const initialState: SettingsState = {
    navAnimation: 'slide_from_bottom',
    btmTabLabels: true,
    btmTabShifting: true,
    allowSensorMotion: false,
    exploreTabs: ['anime', 'manga', 'manhwa', 'novels'],
    exploreTabOrder: ['anime', 'manga', 'manhwa', 'novels'],
    listATabOrder: [
        MediaListStatus.Current,
        MediaListStatus.Planning,
        MediaListStatus.Completed,
        MediaListStatus.Repeating,
        MediaListStatus.Paused,
        MediaListStatus.Dropped,
    ],
    listMTabOrder: [
        MediaListStatus.Current,
        MediaListStatus.Planning,
        MediaListStatus.Completed,
        MediaListStatus.Repeating,
        MediaListStatus.Paused,
        MediaListStatus.Dropped,
    ],
    animeCustomLists: [],
    mangaCustomLists: [],
    mediaLanguage: 'english',
    defaultDescription: 'mal',
    showNSFW: Constants.executionEnvironment === ExecutionEnvironment.StoreClient ? false : true,
    blurNSFW: true,
    blurNSFWLevel: DanbooruRating.General,
    scoreColors: {
        red: 64,
        yellow: 74,
    },
    scoreHealthBar: true,
    scoreGlow: false,
    scoreNumber: false,
    showItemListStatus: true,
    defaultScore: 'average',
    defaultGenreLayout: 'row',
    defaultTagLayout: 'list',
    tagBlacklist: [],
};

type settingsActions = {
    entryType: keyof SettingsState;
    value: SettingsState[keyof SettingsState];
};

export type mediaCardAppearanceActions = {
    scoreHealthBar: boolean;
    scoreGlow: boolean;
    scoreNumber: boolean;
    showItemListStatus: boolean;
};

export const settingsSlice = createSlice({
    name: 'settings',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<settingsActions>) => {
            state[action.payload.entryType] = action.payload.value;
            // state.navAnimation = action.payload.navAnimation ?? state.navAnimation;
            // state.btmTabLabels = action.payload.btmTabLabels ?? state.btmTabLabels;
            // state.exploreTabs = action.payload.exploreTabs ?? state.exploreTabs;
            // state.exploreTabOrder = action.payload.exploreTabOrder ?? state.exploreTabOrder;
            // state.mediaLanguage = action.payload.mediaLanguage ?? state.mediaLanguage;
            // state.defaultDescription =
            //     action.payload.defaultDescription ?? state.defaultDescription;
            // state.showNSFW = action.payload.showNSFW ?? state.showNSFW;
            // state.scoreColors = action.payload.scoreColors ?? state.scoreColors;
            // state.scoreBorders = action.payload.scoreBorders ?? state.scoreBorders;
        },
        setMediaCardAppearance: (state, action: PayloadAction<mediaCardAppearanceActions>) => {
            state.scoreGlow = action.payload.scoreGlow ?? state.scoreGlow;
            state.scoreHealthBar = action.payload.scoreHealthBar ?? state.scoreHealthBar;
            state.scoreNumber = action.payload.scoreNumber ?? state.scoreNumber;
            state.showItemListStatus =
                action.payload.showItemListStatus ?? state.showItemListStatus;
        },
    },
});

export const { setSettings, setMediaCardAppearance } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default settingsSlice.reducer;
