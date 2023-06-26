import { AnyAction, configureStore } from '@reduxjs/toolkit';
// import { api as anilistApi } from './services/anilist/generated-anilist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeSlice, { ThemeState } from '../theme/themeSlice';
import createSecureStorage from './persist-securestore';
import { Platform } from 'react-native';
import authSlice, { AuthState } from './services/anilist/authSlice';
import danbooruApi from './services/danbooru/danbooruApi';
import { api as anilistApi } from './services/anilist/enhanced';
import settingsSlice, { SettingsState } from '../features/more/settings/settingsSlice';
import { malApi } from './services/mal/malApi';
import animeThemesApi from './services/animethemes/animeThemesApi';
import filterSlice, { FilterState } from '../features/search/filterSlice';
import searchSlice, { SearchState } from '../features/search/searchSlice';
import presetSlice, { PresetState } from '../features/search/presetSlice';
import { ExploreMediaQueryVariables } from './services/anilist/generated-anilist';

const secureStorage = createSecureStorage();

const persistConfig: PersistConfig<any, any, any, any> = {
    key: 'root',
    storage: AsyncStorage,
};

const anilistAuthPersistConfig: PersistConfig<any, any, any, any> = {
    key: 'anilistAuth',
    storage: Platform.OS === 'web' ? AsyncStorage : secureStorage,
};

const persistedTheme = persistReducer<ThemeState, AnyAction>(persistConfig, themeSlice);
const persistedSettings = persistReducer<SettingsState, AnyAction>(persistConfig, settingsSlice);
const persistedAniLogin = persistReducer<AuthState, AnyAction>(anilistAuthPersistConfig, authSlice);
const persistedFilter = persistReducer<FilterState, AnyAction>(persistConfig, filterSlice);
const persistedSearch = persistReducer<SearchState, AnyAction>(persistConfig, searchSlice);
const persistedPresets = persistReducer<PresetState, AnyAction>(persistConfig, presetSlice);

export const store = configureStore({
    reducer: {
        [anilistApi.reducerPath]: anilistApi.reducer,
        [danbooruApi.reducerPath]: danbooruApi.reducer,
        [malApi.reducerPath]: malApi.reducer,
        persistedTheme,
        persistedSettings,
        persistedAniLogin,
        persistedFilter,
        persistedSearch,
        persistedPresets,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([anilistApi.middleware, malApi.middleware, danbooruApi.middleware]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
