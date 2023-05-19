import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type AuthState = {
    token: string | null;
    timeTillDeath: string | null;
};

const slice = createSlice({
    name: 'authAnilist',
    initialState: { token: null, timeTillDeath: null } as AuthState,
    reducers: {
        setAniAuth: (
            state,
            {
                payload: { token, timeTillDeath },
            }: PayloadAction<{ token: string; timeTillDeath: string }>,
        ) => {
            state.token = token;
            state.timeTillDeath = timeTillDeath;
        },
    },
});

export const { setAniAuth } = slice.actions;

export default slice.reducer;
