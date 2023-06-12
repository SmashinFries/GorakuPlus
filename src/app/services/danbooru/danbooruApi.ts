import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { DanPost, DanSearchQuery } from './types';

const DANBOORU_TEST_URL = 'https://testbooru.donmai.us';
const DANBOORU_URL = 'https://danbooru.donmai.us';

const danbooruApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: DANBOORU_TEST_URL }),
    reducerPath: 'danbooruApi',
    endpoints: (build) => ({
        searchPosts: build.query<DanPost[], DanSearchQuery>({
            query: (params) => ({ url: `/posts.json/`, params: params }),
        }),
    }),
});

export default danbooruApi;
export const { useSearchPostsQuery } = danbooruApi;
