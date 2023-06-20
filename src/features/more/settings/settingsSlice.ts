import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { StackAnimationTypes } from 'react-native-screens';
import { ExploreTabsProps } from '../../../navigation/types';
import Constants, { ExecutionEnvironment } from 'expo-constants';

// Define a type for the slice state
export interface SettingsState {
    navAnimation?: StackAnimationTypes;
    btmTabLabels?: boolean;
    exploreTabs?: (keyof ExploreTabsProps)[];
    exploreTabOrder?: (keyof ExploreTabsProps)[];
    mediaLanguage?: 'romaji' | 'english' | 'native';
    defaultDescription?: 'ani' | 'mal';
    showNSFW?: boolean;
    scoreColors?: {
        red: number;
        yellow: number;
    };
}

// Define the initial state using that type
const initialState: SettingsState = {
    navAnimation: 'fade_from_bottom',
    btmTabLabels: true,
    exploreTabs: ['anime', 'manga', 'manhwa', 'novels'],
    exploreTabOrder: ['anime', 'manga', 'manhwa', 'novels'],
    mediaLanguage: 'english',
    defaultDescription: 'mal',
    showNSFW: Constants.executionEnvironment === ExecutionEnvironment.StoreClient ? false : true,
    scoreColors: {
        red: 64,
        yellow: 74,
    },
};

export const settingsSlice = createSlice({
    name: 'settings',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<SettingsState>) => {
            state.navAnimation = action.payload.navAnimation ?? state.navAnimation;
            state.btmTabLabels = action.payload.btmTabLabels ?? state.btmTabLabels;
            state.exploreTabs = action.payload.exploreTabs ?? state.exploreTabs;
            state.exploreTabOrder = action.payload.exploreTabOrder ?? state.exploreTabOrder;
            state.mediaLanguage = action.payload.mediaLanguage ?? state.mediaLanguage;
            state.defaultDescription =
                action.payload.defaultDescription ?? state.defaultDescription;
            state.showNSFW = action.payload.showNSFW ?? state.showNSFW;
            state.scoreColors = action.payload.scoreColors ?? state.scoreColors;
        },
    },
});

export const { setSettings } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default settingsSlice.reducer;
