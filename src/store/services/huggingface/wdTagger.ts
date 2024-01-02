import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '@/store/store';
import { WdTaggerInput, WdTaggerOutput } from './types';

const WD_TAGGER = 'https://smashinfries-wd-v1-4-tags.hf.space/run';

const wdTaggerAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: WD_TAGGER,
    }),
    reducerPath: 'wdTaggerApi',

    endpoints: (build) => ({
        /**
         * @param {string} imageB64 - represents image data as base64 string of 'Input' Image component
         * @param {string} model - represents selected choice of 'Model' Radio component
         * @param {Array} generalThrsh - represents selected value of 'General Tags Threshold' Slider component
         * @param {Array} characterThrsh - represents selected value of 'Character Tags Threshold' Slider component
         */
        predictWaifu: build.query<WdTaggerOutput, WdTaggerInput>({
            query: (input) => ({ url: '/predict', method: 'POST', body: input }),
        }),
    }),
});

export default wdTaggerAPI;
export const { usePredictWaifuQuery, useLazyPredictWaifuQuery } = wdTaggerAPI;
