import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
// import { api as anilistApi } from './services/anilist/generated-anilist';
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
import themeSlice, { ThemeState } from '../theme/themeSlice';
import createSecureStorage from './persist-securestore';
import { Platform } from 'react-native';
import authSlice, { AuthState } from './services/anilist/authSlice';
import danbooruApi from './services/danbooru/danbooruApi';
import { api as anilistApi } from './services/anilist/enhanced';
import settingsSlice, { SettingsState } from '../features/more/settings/settingsSlice';
import { malApi } from './services/mal/malApi';
import presetSlice, { PresetState } from '../features/search/presetSlice';
import { mangaUpdatesApi } from './services/mangaupdates/mangaUpdatesApi';
import historySlice, { HistoryState } from '../features/search/historySlice';
import muSlice, { MuDBState } from '../features/media/muSlice';
import notifSlice, { NotifState } from '../features/more/settings/notifications/notifSlice';
import googleBooksApi from './services/google-books/googleApi';
import charArtDBSlice, { CharacterArtState } from '../features/character/charArtSlice';

const secureStorage = createSecureStorage();

const persistThemeConfig: PersistConfig<any, any, any, any> = {
    key: 'theme',
    storage: AsyncStorage,
};

const persistSettingsConfig: PersistConfig<any, any, any, any> = {
    key: 'settings',
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

const persistedTheme = persistReducer<ThemeState, AnyAction>(persistThemeConfig, themeSlice);
const persistedSettings = persistReducer<SettingsState, AnyAction>(
    persistSettingsConfig,
    settingsSlice,
);
const persistedAniLogin = persistReducer<AuthState, AnyAction>(anilistAuthPersistConfig, authSlice);
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
        [mangaUpdatesApi.reducerPath]: mangaUpdatesApi.reducer,
        [googleBooksApi.reducerPath]: googleBooksApi.reducer,
        persistedTheme,
        persistedSettings,
        persistedAniLogin,
        persistedPresets,
        persistedHistory,
        peresistedMuDB,
        persistedCharArtDB,
        persistedNotifs,
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
            mangaUpdatesApi.middleware,
            googleBooksApi.middleware,
        ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
