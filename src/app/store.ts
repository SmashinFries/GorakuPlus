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
const persistedAniLogin = persistReducer<AuthState, AnyAction>(anilistAuthPersistConfig, authSlice);

export const store = configureStore({
    reducer: {
        // [anilistApi.reducerPath]: anilistApi.reducer,
        persistedTheme,
        persistedAniLogin,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
