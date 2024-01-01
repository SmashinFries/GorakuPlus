import { baseTraceMoe as api } from './baseTraceMoe';
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSearch: build.query<GetSearchApiResponse, GetSearchApiArg>({
            query: (queryArg) => ({
                url: `/search`,
                params: {
                    anilistInfo: queryArg.anilistInfo,
                    cutBorders: queryArg.cutBorders,
                    url: queryArg.url,
                    anilistID: queryArg.anilistId,
                },
            }),
        }),
        postSearch: build.mutation<PostSearchApiResponse, PostSearchApiArg>({
            query: (queryArg) => ({
                url: `/search`,
                method: 'POST',
                body: queryArg.searchBody,
                params: {
                    anilistInfo: queryArg.anilistInfo,
                    cutBorders: queryArg.cutBorders,
                    anilistID: queryArg.anilistId,
                },
            }),
        }),
        getMe: build.query<GetMeApiResponse, GetMeApiArg>({
            query: () => ({ url: `/me` }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as traceMoeApi };
export type GetSearchApiResponse = /** status 200 A search response */ SearchResult;
export type GetSearchApiArg = {
    /** Include Anilist info */
    anilistInfo?: string;
    /** Cut black borders */
    cutBorders?: string;
    /** Image URL */
    url: string;
    /** Filter by Anilist ID */
    anilistId?: number;
};
export type PostSearchApiResponse = /** status 200 A search response */ SearchResult;
export type PostSearchApiArg = {
    /** Include Anilist info */
    anilistInfo?: string;
    /** Cut black borders */
    cutBorders?: string;
    /** Filter by Anilist ID */
    anilistId?: number;
    searchBody: SearchBody;
};
export type GetMeApiResponse = /** status 200 A user response */ User;
export type GetMeApiArg = void;
export type AnilistTitle = {
    native: string | null;
    romaji: string;
    english: string | null;
};
export type Anilist = {
    id: number;
    idMal: number | null;
    isAdult: boolean;
    synonyms: string[];
    title: AnilistTitle;
};
export type Result = {
    anilist: number | Anilist;
    filename: string;
    episode: (number | null) | (string | null) | (number | string)[];
    from: number;
    to: number;
    similarity: number;
    video: string;
    image: string;
};
export type SearchResult = {
    frameCount: number;
    error: string;
    result: Result[];
};
export type Error = {
    error: string;
};
export type SearchBody = {
    image?: Blob;
};
export type User = {
    id: string;
    priority: number;
    concurrency: number;
    quota: number;
    quotaUsed: number;
};
export const {
    useGetSearchQuery,
    useLazyGetSearchQuery,
    usePostSearchMutation,
    useGetMeQuery,
    useLazyGetMeQuery,
} = injectedRtkApi;
