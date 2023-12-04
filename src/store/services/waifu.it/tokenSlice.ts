import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type WaifuItAuthState = {
    token: string | null;
};

const slice = createSlice({
    name: 'authWaifuIt',
    initialState: {
        token: null,
    } as WaifuItAuthState,
    reducers: {
        setWaifuItToken: (state, { payload: token }: PayloadAction<string>) => {
            state.token = token;
        },
    },
});

export const { setWaifuItToken } = slice.actions;

export default slice.reducer;
