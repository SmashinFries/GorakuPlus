import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { MainMusic, animeSongsQuery } from './types';
// import {  } from './types';

const animeThemesApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.animethemes.moe' }),
    reducerPath: 'animeThemesApi',
    endpoints: (build) => ({
        getAnimeSongs: build.query<MainMusic, animeSongsQuery>({
            query: (params) => ({
                url: '/anime/',
                params: {
                    'filter[has]': 'resources',
                    'filter[site]': 'AniList',
                    'filter[external_id]': params.aniId,
                    'fields[video]': 'id,basename,link,tags',
                    'fields[audio]': 'id,basename,link,size',
                    include:
                        'animethemes.animethemeentries.videos,animethemes.animethemeentries.videos.audio,animethemes.song,animethemes.song.artists',
                },
            }),
        }),
    }),
});

export default animeThemesApi;
export const { useGetAnimeSongsQuery } = animeThemesApi;
