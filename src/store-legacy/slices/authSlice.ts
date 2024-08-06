import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
	anilist: {
		token: string | null;
		deathDate: string | null;
		username?: string | null;
		avatar?: string | null;
		userID?: number | null;
	};
	sauceNao: {
		api_key: string | null;
	},
	waifuit: {
		token: string | null;
	};
};

const slice = createSlice({
	name: 'authSlice',
	initialState: {
		anilist: {
			token: null,
			deathDate: null,
			avatar: null,
			userID: null,
			username: null,
		},
		waifuit: {
			token: null
		},
		sauceNao: {
			api_key: null
		},
	} as AuthState,
	reducers: {
		setAnilistAuth: (
			state,
			{ payload: { token, deathDate, avatar, userID, username } }: PayloadAction<AuthState['anilist']>,
		) => {
			state.anilist.token = token;
			state.anilist.deathDate = deathDate;
			state.anilist.avatar = avatar;
			state.anilist.userID = userID;
			state.anilist.username = username;
		},
		setSauceNaoAuth: (state, { payload: {api_key}}: PayloadAction<AuthState['sauceNao']>) => {
			state.sauceNao.api_key = api_key
		},
		setWaifuItAuth: (state, { payload: {token}}: PayloadAction<AuthState['waifuit']>) => {
			state.waifuit.token = token
		},
	},
});

export const { setAnilistAuth, setSauceNaoAuth, setWaifuItAuth } = slice.actions;

export default slice.reducer;