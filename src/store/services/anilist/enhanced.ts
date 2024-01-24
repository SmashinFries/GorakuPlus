import { api as generatedApi } from './generated-anilist';
import {
    transformListDates,
    transformMediaDates,
    transformMediaSorts,
    transformReviewBody,
    transformStudioMediaDates,
    transformWeeklyDates,
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
        'ExploreManhua',
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
        'Notifications',
        'Activity',
        'UserOverview',
        'AnimeFav',
        'MangaFav',
        'CharFav',
        'StaffFav',
        'StudiosFav',
        'UserFavOverview',
        'Reviews',
        'ReviewFull',
        'WeeklyAnime',
        'StudioList',
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
        Reviews: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs && queryArgs.mediaId) {
                    return `${endpointName}${queryArgs.mediaId}`;
                } else {
                    return endpointName;
                }
                // return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.Page.pageInfo = newItems.Page.pageInfo;
                currentCache.Page.reviews.push(...newItems.Page.reviews);
            },
            forceRefetch({ currentArg, previousArg }) {
                if (currentArg && previousArg) {
                    return currentArg.page > previousArg.page;
                }
            },
            providesTags: ['Reviews'],
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
        MangaNewReleases: {
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
        MangaTrending: {
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
        ManhwaNewReleases: {
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
        ManhuaNewReleases: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhua' as const,
                              id: media.id,
                          })),
                          'ExploreManhua',
                      ]
                    : ['ExploreManhua'],
        },
        ManhuaTrending: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhua' as const,
                              id: media.id,
                          })),
                          'ExploreManhua',
                      ]
                    : ['ExploreManhua'],
        },
        ManhuaPopular: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhua' as const,
                              id: media.id,
                          })),
                          'ExploreManhua',
                      ]
                    : ['ExploreManhua'],
        },
        ManhuaTopScored: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.media?.map((media) => ({
                              type: 'ExploreManhua' as const,
                              id: media.id,
                          })),
                          'ExploreManhua',
                      ]
                    : ['ExploreManhua'],
        },
        NovelNewReleases: {
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
                              : result.SaveMediaListEntry?.media?.countryOfOrigin === 'JP'
                              ? 'ExploreManga'
                              : result.SaveMediaListEntry?.media?.countryOfOrigin === 'KR'
                              ? 'ExploreManhwa'
                              : 'ExploreManhua',
                          //   { type: 'AniMedia', id: params?.mediaId },
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
                // 'AniMedia',
                'AniSearch',
                'ExploreAnime',
                'ExploreManga',
                'ExploreManhwa',
                'ExploreNovel',
            ],
        },
        CharacterDetails: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs) {
                    return endpointName + queryArgs.id.toString();
                }
                return endpointName;
            },
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
        ReviewsById: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformReviewBody(baseQueryReturnValue);
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs) {
                    return endpointName + queryArgs.reviewId.toString();
                }
                return endpointName;
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: ['ReviewFull'],
        },
        UserSearch: {
            providesTags: ['UserSearch'],
        },
        UserFollowing: {
            providesTags: ['UserFollowing'],
        },
        UserOverview: {
            providesTags: ['UserOverview'],
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
        UserActivity: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs) {
                    return `${endpointName}${queryArgs.userId ?? 'user'}`;
                } else {
                    return endpointName;
                }
                // return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (currentCache.Page.pageInfo.currentPage < newItems.Page.pageInfo.currentPage) {
                    currentCache.Page.pageInfo = newItems.Page.pageInfo;
                    currentCache.Page.activities.push(...newItems.Page.activities);
                } else {
                    currentCache.Page.activities = newItems.Page.activities;
                    currentCache.Page.pageInfo = newItems.Page.pageInfo;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                if (currentArg && previousArg) {
                    return currentArg.page > previousArg.page;
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.activities?.map((activity) => ({
                              type: 'Activity' as const,
                              // @ts-ignore
                              id: activity.id,
                          })),
                      ]
                    : ['Activity'],
        },
        GetNotifications: {
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs) {
                    return endpointName + queryArgs.page.toString();
                }
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (
                    currentCache.Page.pageInfo?.currentPage <
                    currentCache.Page.pageInfo?.currentPage
                ) {
                    currentCache.Page?.notifications.push(...newItems.Page?.notifications);
                    currentCache.Page.pageInfo = newItems.Page.pageInfo;
                }
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: ['Notifications'],
        },
        DeleteAct: {
            invalidatesTags: (result, error, params) =>
                params ? [{ type: 'Activity' as const, id: params.id }] : ['Activity'],
        },
        UserFavoritesOverview: {
            providesTags: ['UserFavOverview'],
        },
        UserAnimeFavorites: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.User?.favourites?.anime?.nodes.map((media) => ({
                              type: 'AnimeFav' as const,
                              id: media.id,
                          })),
                      ]
                    : ['AnimeFav'],
        },
        UserMangaFavorites: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.User?.favourites?.manga?.nodes.map((media) => ({
                              type: 'MangaFav' as const,
                              id: media.id,
                          })),
                      ]
                    : ['MangaFav'],
        },
        UserWaifuFavorites: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.User?.favourites?.characters?.nodes.map((char) => ({
                              type: 'CharFav' as const,
                              id: char.id,
                          })),
                      ]
                    : ['CharFav'],
        },
        UserStaffFavorites: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.User?.favourites?.staff?.nodes.map((staff) => ({
                              type: 'StaffFav' as const,
                              id: staff.id,
                          })),
                      ]
                    : ['StaffFav'],
        },
        UserStudiosFavorites: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.User?.favourites?.studios?.nodes.map((studios) => ({
                              type: 'StudiosFav' as const,
                              id: studios.id,
                          })),
                      ]
                    : ['StudiosFav'],
        },
        StudioList: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformStudioMediaDates(baseQueryReturnValue);
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                if (queryArgs && queryArgs.studioId) {
                    return `${endpointName}${queryArgs.studioId}`;
                } else {
                    return endpointName;
                }
                // return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.Studio.media.pageInfo = newItems.Studio.media.pageInfo;
                currentCache.Studio.media.nodes.push(...newItems.Studio.media.nodes);
            },
            forceRefetch({ currentArg, previousArg }) {
                if (currentArg && previousArg) {
                    return currentArg.page > previousArg.page;
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Studio?.media?.nodes.map((media) => ({
                              type: 'StudioList' as const,
                              id: media.id,
                          })),
                      ]
                    : ['StudioList'],
        },
        WeeklyAnime: {
            transformResponse(baseQueryReturnValue, meta, arg) {
                return transformWeeklyDates(baseQueryReturnValue);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.Page?.airingSchedules?.map((media) => ({
                              type: 'WeeklyAnime' as const,
                              id: media.media.id,
                          })),
                          'WeeklyAnime',
                      ]
                    : ['WeeklyAnime'],
        },
    },
});

export const {
    useAnimeNextSeasonQuery,
    useAnimeThisSeasonQuery,
    useAnimeTrendingQuery,
    useAnimePopularQuery,
    useAnimeTopScoredQuery,

    useMangaNewReleasesQuery,
    useMangaTrendingQuery,
    useMangaPopularQuery,
    useMangaTopScoredQuery,

    useManhwaNewReleasesQuery,
    useManhwaTrendingQuery,
    useManhwaPopularQuery,
    useManhwaTopScoredQuery,

    useManhuaNewReleasesQuery,
    useManhuaTrendingQuery,
    useManhuaPopularQuery,
    useManhuaTopScoredQuery,

    useNovelNewReleasesQuery,
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

    useUserOverviewQuery,
    useUserActivityQuery,
    useLazyUserOverviewQuery,
    useUserFollowersQuery,
    useLazyUserFollowersQuery,
    useUserFollowingQuery,
    useLazyUserFollowingQuery,
    useLazyUserActivityQuery,
    useDeleteActMutation,

    useToggleFollowMutation,
    useLazyCharacterSearchQuery,
    useLazyStaffSearchQuery,
    useLazyStudioSearchQuery,

    useUserFavoritesOverviewQuery,
    useLazyUserFavoritesOverviewQuery,
    useUserAnimeFavoritesQuery,
    useLazyUserAnimeFavoritesQuery,
    useUserMangaFavoritesQuery,
    useLazyUserMangaFavoritesQuery,
    useUserWaifuFavoritesQuery,
    useLazyUserWaifuFavoritesQuery,
    useUserStaffFavoritesQuery,
    useLazyUserStaffFavoritesQuery,
    useUserStudiosFavoritesQuery,
    useLazyUserStudiosFavoritesQuery,

    useReviewsQuery,
    useLazyReviewsQuery,
    useReviewsByIdQuery,
    useLazyReviewsByIdQuery,

    useStudioListQuery,
    useLazyStudioListQuery,
} = api;
