import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseMal = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
	reducerPath: 'malApi',
	endpoints: () => ({}),
});
