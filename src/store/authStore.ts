import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import Constants from 'expo-constants';
import { create } from 'zustand';

const storage = new MMKV({
	id: 'auth-storage',
	encryptionKey: Constants.expoConfig?.extra?.AUTH_ENCRYPTION_KEY,
});
const AuthStorage = getZustandStorage(storage);

type AuthState = {
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
};
type AuthAction = {
	setAnilistAuth: (data: AuthState['anilist']) => void;
	setSauceNaoAuth: (api_key: AuthState['sauceNao']['api_key']) => void;
	setWaifuit: (token: AuthState['waifuit']['token']) => void;
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
			setAnilistAuth(data) {
				set((state) => ({ anilist: { ...state.anilist, ...data } }));
			},
			setSauceNaoAuth(api_key) {
				set({ sauceNao: { api_key } });
			},
			setWaifuit(token) {
				set({ waifuit: { token } });
			},
			clearAuth(type) {
				if (type === 'anilist') {
					set({
						anilist: {
							token: null,
							deathDate: null,
							avatar: null,
							userID: null,
							username: null,
						},
					});
				} else if (type === 'sauceNao') {
					set({ sauceNao: { api_key: null } });
				}
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AuthStorage),
		},
	),
);
