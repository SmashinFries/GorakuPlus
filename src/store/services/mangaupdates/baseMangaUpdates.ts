import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseMangaUpdates = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.mangaupdates.com/v1' }),
    reducerPath: 'mangaUpdatesApi',
    endpoints: () => ({}),
});
