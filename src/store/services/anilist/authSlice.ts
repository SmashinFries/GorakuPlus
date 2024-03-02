import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type AuthState = {
	token: string | null;
	deathDate: string | null;
	username?: string | null;
	avatar?: string | null;
	userID?: number | null;
};

const slice = createSlice({
	name: 'authAnilist',
	initialState: {
		token: null,
		deathDate: null,
		avatar: null,
		userID: null,
		username: null,
	} as AuthState,
	reducers: {
		setAniAuth: (
			state,
			{ payload: { token, deathDate, avatar, userID, username } }: PayloadAction<AuthState>,
		) => {
			state.token = token;
			state.deathDate = deathDate;
			state.avatar = avatar;
			state.userID = userID;
			state.username = username;
		},
	},
});

export const { setAniAuth } = slice.actions;

export default slice.reducer;
