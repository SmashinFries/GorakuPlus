import { api as generatedApi } from './generated-anilist';

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
    endpoints: {
        // UserData: {

        // }
        AnimeThisSeason: {
            providesTags: ['ExploreAnime'],
        },
        AnimeNextSeason: {
            providesTags: ['ExploreAnime'],
        },
        AnimePopular: {
            providesTags: ['ExploreAnime'],
        },
        AnimeTrending: {
            providesTags: ['ExploreAnime'],
        },
        AnimeTopScored: {
            providesTags: ['ExploreAnime'],
        },
        MangaTrending: {
            providesTags: ['ExploreManga'],
        },
        MangaPopular: {
            providesTags: ['ExploreManga'],
        },
        MangaTopScored: {
            providesTags: ['ExploreManga'],
        },
        NovelTrending: {
            providesTags: ['ExploreNovel'],
        },
        NovelPopular: {
            providesTags: ['ExploreNovel'],
        },
        NovelTopScored: {
            providesTags: ['ExploreNovel'],
        },
        AniMedia: {
            providesTags: ['AniMedia'],
        },
        ToggleFav: {
            invalidatesTags: ['AniMedia'],
        },
        SaveMediaListItem: {
            invalidatesTags: ['AniMedia'],
        },
        DeleteMediaListItem: {
            invalidatesTags: ['AniMedia'],
        },
    },
    addTagTypes: ['ExploreAnime', 'ExploreManga', 'ExploreNovel', 'AniMedia'],
});

export const { useExploreMediaQuery, useAnimeThisSeasonQuery } = api;
