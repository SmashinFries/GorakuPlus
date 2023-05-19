import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type AuthState = {
    token: string | null;
    deathDate: string | null;
};

const slice = createSlice({
    name: 'authAnilist',
    initialState: { token: null, deathDate: null } as AuthState,
    reducers: {
        setAniAuth: (
            state,
            {
                payload: { token, deathDate },
            }: PayloadAction<{ token: string; deathDate: string }>,
        ) => {
            state.token = token;
            state.deathDate = deathDate;
        },
    },
});

export const { setAniAuth } = slice.actions;

export default slice.reducer;
