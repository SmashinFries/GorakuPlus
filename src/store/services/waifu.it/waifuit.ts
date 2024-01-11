import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
    FactResponse,
    InteractionParams,
    InteractionResponse,
    QuoteResponse,
    TextGenParams,
    TextGenResponse,
    WaifuResponse,
} from './types';
import { RootState } from '@/store/store';

const WAIFUIT_URL = 'https://waifu.it/api/v4';

const waifuItAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: WAIFUIT_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).persistedWaifuItToken;
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    reducerPath: 'waifuiItApi',

    endpoints: (build) => ({
        getQuote: build.query<QuoteResponse, void>({
            query: () => ({ url: '/quote' }),
        }),
        getFact: build.query<FactResponse, void>({
            query: () => ({ url: '/fact' }),
        }),
        getWaifu: build.query<WaifuResponse, void>({
            query: () => ({ url: '/waifu' }),
        }),
        getInteraction: build.query<InteractionResponse, InteractionParams>({
            query: (params) => ({ url: `/${params.emotion}` }),
        }),
        owoify: build.query<TextGenResponse, TextGenParams>({
            query: (params) => ({ url: '/owoify', params: params }),
        }),
        uvuify: build.query<TextGenResponse, TextGenParams>({
            query: (params) => ({ url: '/uvuify', params: params }),
        }),
        uwuify: build.query<TextGenResponse, TextGenParams>({
            query: (params) => ({ url: '/uwuify', params: params }),
        }),
    }),
});

export default waifuItAPI;
export const {
    useGetQuoteQuery,
    useLazyGetQuoteQuery,
    useGetFactQuery,
    useLazyGetFactQuery,
    useGetWaifuQuery,
    useLazyGetWaifuQuery,
    useGetInteractionQuery,
    useLazyGetInteractionQuery,
    useOwoifyQuery,
    useLazyOwoifyQuery,
    useUvuifyQuery,
    useLazyUvuifyQuery,
    useUwuifyQuery,
    useLazyUwuifyQuery,
} = waifuItAPI;
