import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import Constants from 'expo-constants';
import { create } from 'zustand';
import { AboutServerQuery } from '@/api/suwayomi/types';

const storage = new MMKV({
	id: 'auth-storage',
	encryptionKey: Constants.expoConfig?.extra?.AUTH_ENCRYPTION_KEY,
});
const AuthStorage = getZustandStorage(storage);

export type AuthState = {
	anilist: {
		token?: string | null;
		deathDate?: string | null;
		username?: string | null;
		avatar?: string | null;
		userID?: number | null;
	};
	sauceNao: {
		api_key: string | null;
	};
	waifuit: {
		token: string | null;
	};
	suwayomi: {
		serverUrl: string | null;
		username?: string | null;
		password?: string | null;
		info?: AboutServerQuery['data']['aboutServer'] | undefined;
		selectedSources: { id: string; name: string; order: number; iconUrl: string }[];
		autoDownload: boolean;
	};
};
type AuthAction = {
	setAnilistAuth: (data: AuthState['anilist']) => void;
	setSauceNaoAuth: (api_key: AuthState['sauceNao']['api_key']) => void;
	setWaifuit: (token: AuthState['waifuit']['token']) => void;
	setSuwayomi: (
		config: Partial<AuthState['suwayomi']>,
		// url: string,
		// auth?: { username: string; password: string },
		// serverInfo?: AuthState['suwayomi']['info'],
		// selectedSources?: AuthState['suwayomi']['selectedSources'],
	) => void;
	clearAuth: (type: keyof AuthState) => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
	persist(
		(set, _get) => ({
			anilist: {
				token: null,
				deathDate: null,
				avatar: null,
				userID: null,
				username: null,
			},
			waifuit: {
				token: null,
			},
			sauceNao: {
				api_key: null,
			},
			suwayomi: {
				serverUrl: null,
				selectedSources: [],
				autoDownload: false,
			},
			setAnilistAuth(data) {
				set((state) => ({ anilist: { ...state.anilist, ...data } }));
			},
			setSauceNaoAuth(api_key) {
				set({ sauceNao: { api_key } });
			},
			setWaifuit(token) {
				set({ waifuit: { token } });
			},
			setSuwayomi(config) {
				set((state) => ({
					suwayomi: {
						...state.suwayomi,
						...config,
						selectedSources:
							config.selectedSources ?? state.suwayomi.selectedSources ?? [],
					},
				}));
			},
			clearAuth(type) {
				switch (type) {
					case 'anilist':
						set({
							anilist: {
								token: null,
								deathDate: null,
								avatar: null,
								userID: null,
								username: null,
							},
						});
						break;
					case 'sauceNao':
						set({ sauceNao: { api_key: null } });
					case 'suwayomi':
						set({
							suwayomi: {
								serverUrl: null,
								username: null,
								password: null,
								autoDownload: false,
								selectedSources: [],
							},
						});
						break;
				}
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AuthStorage),
		},
	),
);
