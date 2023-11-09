import { Api } from '@reduxjs/toolkit/dist/query';
import { isSame } from '../../../utils/sort';
import { ExploreMediaQuery, api as generatedApi } from './generated-anilist';
import { ToastAndroid } from 'react-native';
import {
    transformListDates,
    transformMediaDates,
    transformMediaSorts,
} from './utils/transformQuery';

// function sortAiring(data: any[]) {
//     return data.sort((a, b) => {
//         if (!a.nextAiringEpisode) {
//             return 1;
//         } else if (!b.nextAiringEpisode) {
//             return -1;
//         } else {
//             return a.nextAiringEpisode.timeUntilAiring - b.nextAiringEpisode.timeUntilAiring;
//         }
//     });
// }

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: [
        'ExploreAnime',
        'ExploreManga',
        'ExploreManhwa',
        'ExploreNovel',
        'AniMedia',
        'AniSearch',
        'UserList',
        'CharacterDetails',
        'StaffDetails',
        'UserSearch',
        'UserFollowing',
        'CharacterSearch',
        'StaffSearch',
        'StudioSearch',
    ],
    endpoints: {
        ExploreMedia: {
            // serializeQueryArgs: ({ endpointName }) => {
            //     return endpointName;
            // },
            // merge: (currentCache, newItems) => {
            //     if (currentCache.Page.pageInfo.currentPage < newItems.Page.pageInfo.currentPage) {
            //         currentCache.Page.pageInfo = newItems.Page.pageInfo;
            //         currentCache.Page.media.push(...newItems.Page.media);
            //     }
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     if (currentArg && previousArg) {
            //         return currentArg.page > previousArg.page;
            //     }
            // },
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'AniSearch' as const,
                              id: media.id,
                          })),
                          'AniSearch',
                      ]
                    : ['AniSearch'],
        },
        CharacterList: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs && queryArgs.id) {
                    return `${endpointName}${queryArgs.id}`;
                } else {
                    return endpointName;
                }
                // return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.Media.characters.pageInfo = newItems.Media.characters.pageInfo;
                currentCache.Media.characters.edges.push(...newItems.Media.characters.edges);
            },
            forceRefetch({ currentArg, previousArg }) {
                if (currentArg && previousArg) {
                    return currentArg.page > previousArg.page;
                }
            },
        },
        StaffList: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs && queryArgs.id) {
                    return `${endpointName}${queryArgs.id}`;
                } else {
                    return endpointName;
                }
                // return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.Media.staff.pageInfo = newItems.Media.staff.pageInfo;
                currentCache.Media.staff.edges.push(...newItems.Media.staff.edges);
            },
            forceRefetch({ currentArg, previousArg }) {
                if (currentArg && previousArg) {
                    return currentArg.page > previousArg.page;
                }
            },
        },
        AnimeTrending: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreAnime' as const,
                              id: media.id,
                          })),
                          'ExploreAnime',
                      ]
                    : ['ExploreAnime'],
        },
        AnimeThisSeason: {
            // serializeQueryArgs: ({ endpointName }) => {
            //     return endpointName;
            // },
            // merge: (currentCache, newItems) => {
            //     if (currentCache.Page.pageInfo.currentPage < newItems.Page.pageInfo.currentPage) {
            //         currentCache.Page.pageInfo = newItems.Page.pageInfo;
            //         currentCache.Page.media.push(...newItems.Page.media);
            //     }
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     if (currentArg && previousArg) {
            //         return currentArg.page > previousArg.page;
            //     }
            // },
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreAnime' as const,
                              id: media.id,
                          })),
                          'ExploreAnime',
                      ]
                    : ['ExploreAnime'],
        },
        AnimeNextSeason: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreAnime' as const,
                              id: media.id,
                          })),
                          'ExploreAnime',
                      ]
                    : ['ExploreAnime'],
        },
        AnimePopular: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreAnime' as const,
                              id: media.id,
                          })),
                          'ExploreAnime',
                      ]
                    : ['ExploreAnime'],
        },
        AnimeTopScored: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreAnime' as const,
                              id: media.id,
                          })),
                          'ExploreAnime',
                      ]
                    : ['ExploreAnime'],
        },
        MangaTrending: {
            // serializeQueryArgs: ({ endpointName }) => {
            //     return endpointName;
            // },
            // merge: (currentCache, newItems) => {
            //     if (currentCache.Page.pageInfo.currentPage < newItems.Page.pageInfo.currentPage) {
            //         currentCache.Page.pageInfo = newItems.Page.pageInfo;
            //         currentCache.Page.media.push(...newItems.Page.media);
            //     }
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     if (currentArg && previousArg) {
            //         return currentArg.page > previousArg.page;
            //     }
            // },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManga' as const,
                              id: media.id,
                          })),
                          'ExploreManga',
                      ]
                    : ['ExploreManga'],
        },
        MangaPopular: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManga' as const,
                              id: media.id,
                          })),
                          'ExploreManga',
                      ]
                    : ['ExploreManga'],
        },
        MangaTopScored: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManga' as const,
                              id: media.id,
                          })),
                          'ExploreManga',
                      ]
                    : ['ExploreManga'],
        },
        ManhwaTrending: {
            // serializeQueryArgs: ({ endpointName }) => {
            //     return endpointName;
            // },
            // merge: (currentCache, newItems) => {
            //     if (currentCache.Page.pageInfo.currentPage < newItems.Page.pageInfo.currentPage) {
            //         currentCache.Page.pageInfo = newItems.Page.pageInfo;
            //         currentCache.Page.media.push(...newItems.Page.media);
            //     }
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     if (currentArg && previousArg) {
            //         return currentArg.page > previousArg.page;
            //     }
            // },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhwa' as const,
                              id: media.id,
                          })),
                          'ExploreManhwa',
                      ]
                    : ['ExploreManhwa'],
        },
        ManhwaPopular: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhwa' as const,
                              id: media.id,
                          })),
                          'ExploreManhwa',
                      ]
                    : ['ExploreManhwa'],
        },
        ManhwaTopScored: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhwa' as const,
                              id: media.id,
                          })),
                          'ExploreManhwa',
                      ]
                    : ['ExploreManhwa'],
        },
        NovelTrending: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreNovel' as const,
                              id: media.id,
                          })),
                          'ExploreNovel',
                      ]
                    : ['ExploreNovel'],
        },
        NovelPopular: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreNovel' as const,
                              id: media.id,
                          })),
                          'ExploreNovel',
                      ]
                    : ['ExploreNovel'],
        },
        NovelTopScored: {
            // serializeQueryArgs: ({ endpointName }) => {
            //     return endpointName;
            // },
            // merge: (currentCache, newItems) => {
            //     if (currentCache.Page.pageInfo.currentPage < newItems.Page.pageInfo.currentPage) {
            //         currentCache.Page.pageInfo = newItems.Page.pageInfo;
            //         currentCache.Page.media.push(...newItems.Page.media);
            //     }
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     if (currentArg && previousArg) {
            //         return currentArg.page > previousArg.page;
            //     }
            // },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreNovel' as const,
                              id: media.id,
                          })),
                          'ExploreNovel',
                      ]
                    : ['ExploreNovel'],
        },
        AniMedia: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformMediaSorts(baseQueryReturnValue);
            },
            providesTags: (result, error, arg) => [{ type: 'AniMedia', id: arg?.id }],
        },
        ToggleFav: {
            invalidatesTags: (result, error, arg) =>
                arg
                    ? [
                          arg?.animeId
                              ? { type: 'ExploreAnime', id: arg?.animeId }
                              : arg.mangaId
                              ? { type: 'ExploreManga', id: arg?.mangaId }
                              : arg.characterId
                              ? { type: 'CharacterSearch', id: arg?.characterId }
                              : arg.staffId
                              ? { type: 'StaffSearch', id: arg?.staffId }
                              : { type: 'StudioSearch', id: arg?.studioId },
                          'AniMedia',
                          'CharacterDetails',
                          'StaffDetails',
                      ]
                    : [
                          'ExploreAnime',
                          'ExploreManga',
                          'ExploreManhwa',
                          'ExploreNovel',
                          'AniMedia',
                          'AniSearch',
                          'CharacterDetails',
                          'StaffDetails',
                          'CharacterSearch',
                      ],
        },
        UserListCollection: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformListDates(baseQueryReturnValue);
            },
            providesTags: (result) => ['UserList'],
            // transformResponse(baseQueryReturnValue, meta, arg) {
            //     return transformMediaDates(baseQueryReturnValue);
            // },
        },
        SaveMediaListItem: {
            invalidatesTags: (result, error, params) =>
                params
                    ? [
                          result.SaveMediaListEntry?.media?.type === 'ANIME'
                              ? { type: 'ExploreAnime', id: params?.mediaId }
                              : result.SaveMediaListEntry?.media?.format === 'NOVEL'
                              ? 'ExploreNovel'
                              : 'ExploreManga',
                          { type: 'AniMedia', id: params?.mediaId },
                          { type: 'AniSearch', id: params?.mediaId },
                      ]
                    : [
                          'ExploreAnime',
                          'ExploreManga',
                          'ExploreManhwa',
                          'ExploreNovel',
                          'AniSearch',
                      ],
        },
        DeleteMediaListItem: {
            invalidatesTags: (result, error, params) => [
                'AniMedia',
                'AniSearch',
                'ExploreAnime',
                'ExploreManga',
                'ExploreManhwa',
                'ExploreNovel',
            ],
        },
        CharacterDetails: {
            providesTags: ['CharacterDetails'],
        },
        StaffDetails: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs) {
                    return endpointName + queryArgs.id.toString();
                }
                return endpointName;
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                if (
                    currentCache.Staff.staffMedia?.pageInfo?.currentPage <
                    newItems.Staff.staffMedia?.pageInfo?.currentPage
                ) {
                    currentCache.Staff.staffMedia.edges.push(...newItems.Staff.staffMedia.edges);
                    currentCache.Staff.staffMedia.pageInfo = newItems.Staff.staffMedia.pageInfo;
                }
                if (
                    currentCache.Staff.characters?.pageInfo?.currentPage <
                    newItems.Staff.characters?.pageInfo?.currentPage
                ) {
                    currentCache.Staff.characters.edges.push(...newItems.Staff.characters.edges);
                    currentCache.Staff.characters.pageInfo = newItems.Staff.characters.pageInfo;
                }
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: ['StaffDetails'],
        },
        UserSearch: {
            providesTags: ['UserSearch'],
        },
        UserFollowing: {
            providesTags: ['UserFollowing'],
        },
        ToggleFollow: {
            invalidatesTags: (result, error, params) => ['UserSearch', 'AniMedia', 'UserFollowing'],
        },
        CharacterSearch: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.characters?.map((char) => ({
                              type: 'CharacterSearch' as const,
                              id: char.id,
                          })),
                          'CharacterSearch',
                      ]
                    : ['CharacterSearch'],
        },
        StaffSearch: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.staff?.map((staff) => ({
                              type: 'StaffSearch' as const,
                              id: staff.id,
                          })),
                          'StaffSearch',
                      ]
                    : ['StaffSearch'],
        },
        StudioSearch: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.studios?.map((studio) => ({
                              type: 'StudioSearch' as const,
                              id: studio.id,
                          })),
                          'StudioSearch',
                      ]
                    : ['StudioSearch'],
        },
    },
});

export const {
    useAnimeNextSeasonQuery,
    useAnimeThisSeasonQuery,
    useAnimeTrendingQuery,
    useAnimePopularQuery,
    useAnimeTopScoredQuery,
    useMangaTrendingQuery,
    useMangaPopularQuery,
    useMangaTopScoredQuery,
    useManhwaTrendingQuery,
    useManhwaPopularQuery,
    useManhwaTopScoredQuery,
    useNovelTrendingQuery,
    useNovelPopularQuery,
    useNovelTopScoredQuery,
    useExploreMediaQuery,
    useLazyExploreMediaQuery,
    useCharacterListQuery,
    useStaffListQuery,
    useSaveMediaListItemMutation,
    useToggleFavMutation,
    useDeleteMediaListItemMutation,
    useCharacterDetailsQuery,
    useLazyUserSearchQuery,
    useUserFollowingQuery,
    useToggleFollowMutation,
    useLazyCharacterSearchQuery,
    useLazyStaffSearchQuery,
    useLazyStudioSearchQuery,
} = api;
