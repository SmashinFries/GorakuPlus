import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { animeSongsQuery } from './types';
// import {  } from './types';

const animeThemesApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.animethemes.moe' }),
    reducerPath: 'animeThemesApi',
    endpoints: (build) => ({
        getAnimeSongs: build.query<any, animeSongsQuery>({
            query: (params) => ({
                url: '/anime/',
                params: {
                    'filter[has]': 'resources',
                    'filter[site]': 'AniList',
                    'filter[external_id]': params.aniID,
                    include:
                        'animethemes.animethemeentries.videos,animethemes.song,animethemes.song.artists',
                },
            }),
        }),
    }),
});

export default animeThemesApi;
export const { useGetAnimeSongsQuery } = animeThemesApi;
