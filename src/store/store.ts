import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    PersistConfig,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import themeSlice, { ThemeState } from '@/store/theme/themeSlice';
import createSecureStorage from '@/store/persist-securestore';
import { Platform } from 'react-native';
import authSlice, { AuthState } from '@/store/services/anilist/authSlice';
import waifuItSlice, { WaifuItAuthState } from '@/store/services/waifu.it/tokenSlice';
import danbooruApi from '@/store/services/danbooru/danbooruApi';
import { api as anilistApi } from '@/store/services/anilist/enhanced';
import settingsSlice, { SettingsState } from '@/store/slices/settingsSlice';
import { malApi } from '@/store/services/mal/malApi';
import presetSlice, { PresetState } from '@/store/slices/search/presetSlice';
import { mangaUpdatesApi } from '@/store/services/mangaupdates/mangaUpdatesApi';
import historySlice, { HistoryState } from '@/store/slices/search/historySlice';
import muSlice, { MuDBState } from '@/store/slices/muSlice';
import notifSlice, { NotifState } from '@/store/slices/notifSlice';
import googleBooksApi from '@/store/services/google-books/googleApi';
import charArtDBSlice, { CharacterArtState } from '@/store/slices/charArtSlice';
import waifuItAPI from './services/waifu.it/waifuit';
import { favSearchSlice } from './slices/favoritesSlice';
import { listFilterSlice } from './slices/listSLice';
import animeThemesApi from './services/animethemes/animeThemesApi';
import { traceMoeApi } from './services/tracemoe/traceMoeApi';
import wdTaggerAPI from './services/huggingface/wdTagger';
import setupSlice, { SetupState } from './slices/setupSlice';
import displaySettingSlice, { DisplaySettingState } from './slices/displaySlice';

const secureStorage = createSecureStorage();

const persistThemeConfig: PersistConfig<any, any, any, any> = {
    key: 'theme',
    storage: AsyncStorage,
};

const persistSettingsConfig: PersistConfig<any, any, any, any> = {
    key: 'settings',
    storage: AsyncStorage,
};

const persistSetupConfig: PersistConfig<any, any, any, any> = {
    key: 'setup',
    storage: AsyncStorage,
};

const persistHistoryConfig: PersistConfig<any, any, any, any> = {
    key: 'search-history',
    storage: AsyncStorage,
};

const persistPresetsConfig: PersistConfig<any, any, any, any> = {
    key: 'presets',
    storage: AsyncStorage,
};

// aniId --> manga updates id
const persistMuDBConfig: PersistConfig<any, any, any, any> = {
    key: 'mu-db',
    storage: AsyncStorage,
};

const persistCharArtDBConfig: PersistConfig<any, any, any, any> = {
    key: 'charArt-db',
    storage: AsyncStorage,
};

const persistNotifConfig: PersistConfig<any, any, any, any> = {
    key: 'notifications',
    storage: AsyncStorage,
};

const anilistAuthPersistConfig: PersistConfig<any, any, any, any> = {
    key: 'anilistAuth',
    storage: Platform.OS === 'web' ? AsyncStorage : secureStorage,
};

const displaySettingsPersistConfig: PersistConfig<any, any, any, any> = {
    key: 'displaySettings',
    storage: AsyncStorage,
};

const waifuItAuthPersistConfig: PersistConfig<any, any, any, any> = {
    key: 'waifuItAuth',
    storage: Platform.OS === 'web' ? AsyncStorage : secureStorage,
};

const persistedTheme = persistReducer<ThemeState, AnyAction>(persistThemeConfig, themeSlice);
const persistedSettings = persistReducer<SettingsState, AnyAction>(
    persistSettingsConfig,
    settingsSlice,
);
const persistedDisplaySettings = persistReducer<DisplaySettingState, AnyAction>(displaySettingsPersistConfig, displaySettingSlice);
const persistedSetup = persistReducer<SetupState, AnyAction>(persistSetupConfig, setupSlice);

const persistedAniLogin = persistReducer<AuthState, AnyAction>(anilistAuthPersistConfig, authSlice);
const persistedWaifuItToken = persistReducer<WaifuItAuthState, AnyAction>(
    waifuItAuthPersistConfig,
    waifuItSlice,
);

const persistedHistory = persistReducer<HistoryState, AnyAction>(
    persistHistoryConfig,
    historySlice,
);
const persistedPresets = persistReducer<PresetState, AnyAction>(persistPresetsConfig, presetSlice);
const peresistedMuDB = persistReducer<MuDBState, AnyAction>(persistMuDBConfig, muSlice);
const persistedCharArtDB = persistReducer<CharacterArtState, AnyAction>(
    persistCharArtDBConfig,
    charArtDBSlice,
);
const persistedNotifs = persistReducer<NotifState, AnyAction>(persistNotifConfig, notifSlice);

export const store = configureStore({
    reducer: {
        [anilistApi.reducerPath]: anilistApi.reducer,
        [danbooruApi.reducerPath]: danbooruApi.reducer,
        [malApi.reducerPath]: malApi.reducer,
        [animeThemesApi.reducerPath]: animeThemesApi.reducer,
        [mangaUpdatesApi.reducerPath]: mangaUpdatesApi.reducer,
        [googleBooksApi.reducerPath]: googleBooksApi.reducer,
        [waifuItAPI.reducerPath]: waifuItAPI.reducer,
        [traceMoeApi.reducerPath]: traceMoeApi.reducer,
        [wdTaggerAPI.reducerPath]: wdTaggerAPI.reducer,
        listFilter: listFilterSlice.reducer,
        favSearch: favSearchSlice.reducer,
        persistedTheme,
        persistedSettings,
        persistedSetup,
        persistedAniLogin,
        persistedWaifuItToken,
        persistedPresets,
        persistedHistory,
        peresistedMuDB,
        persistedCharArtDB,
        persistedNotifs,
        persistedDisplaySettings
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
            immutableCheck: false,
            serializableCheck: false,
        }).concat([
            anilistApi.middleware,
            malApi.middleware,
            danbooruApi.middleware,
            animeThemesApi.middleware,
            mangaUpdatesApi.middleware,
            traceMoeApi.middleware,
            googleBooksApi.middleware,
            waifuItAPI.middleware,
            wdTaggerAPI.middleware,
        ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
