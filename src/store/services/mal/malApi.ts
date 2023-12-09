import { baseMal as api } from './baseMal';
export const addTagTypes = [
    'anime',
    'characters',
    'clubs',
    'genres',
    'magazines',
    'manga',
    'people',
    'producers',
    'random',
    'recommendations',
    'reviews',
    'schedules',
    'users',
    'seasons',
    'top',
    'watch',
] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAnimeFullById: build.query<GetAnimeFullByIdApiResponse, GetAnimeFullByIdApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/full` }),
                providesTags: ['anime'],
            }),
            getAnimeById: build.query<GetAnimeByIdApiResponse, GetAnimeByIdApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}` }),
                providesTags: ['anime'],
            }),
            getAnimeCharacters: build.query<
                GetAnimeCharactersApiResponse,
                GetAnimeCharactersApiArg
            >({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/characters` }),
                providesTags: ['anime'],
            }),
            getAnimeStaff: build.query<GetAnimeStaffApiResponse, GetAnimeStaffApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/staff` }),
                providesTags: ['anime'],
            }),
            getAnimeEpisodes: build.query<GetAnimeEpisodesApiResponse, GetAnimeEpisodesApiArg>({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/episodes`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['anime'],
            }),
            getAnimeEpisodeById: build.query<
                GetAnimeEpisodeByIdApiResponse,
                GetAnimeEpisodeByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/episodes/${queryArg.episode}`,
                }),
                providesTags: ['anime'],
            }),
            getAnimeNews: build.query<GetAnimeNewsApiResponse, GetAnimeNewsApiArg>({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/news`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['anime'],
            }),
            getAnimeForum: build.query<GetAnimeForumApiResponse, GetAnimeForumApiArg>({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/forum`,
                    params: { filter: queryArg.filter },
                }),
                providesTags: ['anime'],
            }),
            getAnimeVideos: build.query<GetAnimeVideosApiResponse, GetAnimeVideosApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/videos` }),
                providesTags: ['anime'],
            }),
            getAnimeVideosEpisodes: build.query<
                GetAnimeVideosEpisodesApiResponse,
                GetAnimeVideosEpisodesApiArg
            >({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/videos/episodes`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['anime'],
            }),
            getAnimePictures: build.query<GetAnimePicturesApiResponse, GetAnimePicturesApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/pictures` }),
                providesTags: ['anime'],
            }),
            getAnimeStatistics: build.query<
                GetAnimeStatisticsApiResponse,
                GetAnimeStatisticsApiArg
            >({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/statistics` }),
                providesTags: ['anime'],
            }),
            getAnimeMoreInfo: build.query<GetAnimeMoreInfoApiResponse, GetAnimeMoreInfoApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/moreinfo` }),
                providesTags: ['anime'],
            }),
            getAnimeRecommendations: build.query<
                GetAnimeRecommendationsApiResponse,
                GetAnimeRecommendationsApiArg
            >({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/recommendations` }),
                providesTags: ['anime'],
            }),
            getAnimeUserUpdates: build.query<
                GetAnimeUserUpdatesApiResponse,
                GetAnimeUserUpdatesApiArg
            >({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/userupdates`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['anime'],
            }),
            getAnimeReviews: build.query<GetAnimeReviewsApiResponse, GetAnimeReviewsApiArg>({
                query: (queryArg) => ({
                    url: `/anime/${queryArg.id}/reviews`,
                    params: {
                        page: queryArg.page,
                        preliminary: queryArg.preliminary,
                        spoiler: queryArg.spoiler,
                    },
                }),
                providesTags: ['anime'],
            }),
            getAnimeRelations: build.query<GetAnimeRelationsApiResponse, GetAnimeRelationsApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/relations` }),
                providesTags: ['anime'],
            }),
            getAnimeThemes: build.query<GetAnimeThemesApiResponse, GetAnimeThemesApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/themes` }),
                providesTags: ['anime'],
            }),
            getAnimeExternal: build.query<GetAnimeExternalApiResponse, GetAnimeExternalApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/external` }),
                providesTags: ['anime'],
            }),
            getAnimeStreaming: build.query<GetAnimeStreamingApiResponse, GetAnimeStreamingApiArg>({
                query: (queryArg) => ({ url: `/anime/${queryArg.id}/streaming` }),
                providesTags: ['anime'],
            }),
            getCharacterFullById: build.query<
                GetCharacterFullByIdApiResponse,
                GetCharacterFullByIdApiArg
            >({
                query: (queryArg) => ({ url: `/characters/${queryArg.id}/full` }),
                providesTags: ['characters'],
            }),
            getCharacterById: build.query<GetCharacterByIdApiResponse, GetCharacterByIdApiArg>({
                query: (queryArg) => ({ url: `/characters/${queryArg.id}` }),
                providesTags: ['characters'],
            }),
            getCharacterAnime: build.query<GetCharacterAnimeApiResponse, GetCharacterAnimeApiArg>({
                query: (queryArg) => ({ url: `/characters/${queryArg.id}/anime` }),
                providesTags: ['characters'],
            }),
            getCharacterManga: build.query<GetCharacterMangaApiResponse, GetCharacterMangaApiArg>({
                query: (queryArg) => ({ url: `/characters/${queryArg.id}/manga` }),
                providesTags: ['characters'],
            }),
            getCharacterVoiceActors: build.query<
                GetCharacterVoiceActorsApiResponse,
                GetCharacterVoiceActorsApiArg
            >({
                query: (queryArg) => ({ url: `/characters/${queryArg.id}/voices` }),
                providesTags: ['characters'],
            }),
            getCharacterPictures: build.query<
                GetCharacterPicturesApiResponse,
                GetCharacterPicturesApiArg
            >({
                query: (queryArg) => ({ url: `/characters/${queryArg.id}/pictures` }),
                providesTags: ['characters'],
            }),
            getClubsById: build.query<GetClubsByIdApiResponse, GetClubsByIdApiArg>({
                query: (queryArg) => ({ url: `/clubs/${queryArg.id}` }),
                providesTags: ['clubs'],
            }),
            getClubMembers: build.query<GetClubMembersApiResponse, GetClubMembersApiArg>({
                query: (queryArg) => ({
                    url: `/clubs/${queryArg.id}/members`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['clubs'],
            }),
            getClubStaff: build.query<GetClubStaffApiResponse, GetClubStaffApiArg>({
                query: (queryArg) => ({ url: `/clubs/${queryArg.id}/staff` }),
                providesTags: ['clubs'],
            }),
            getClubRelations: build.query<GetClubRelationsApiResponse, GetClubRelationsApiArg>({
                query: (queryArg) => ({ url: `/clubs/${queryArg.id}/relations` }),
                providesTags: ['clubs'],
            }),
            getAnimeGenres: build.query<GetAnimeGenresApiResponse, GetAnimeGenresApiArg>({
                query: (queryArg) => ({
                    url: `/genres/anime`,
                    params: { filter: queryArg.filter },
                }),
                providesTags: ['genres'],
            }),
            getMangaGenres: build.query<GetMangaGenresApiResponse, GetMangaGenresApiArg>({
                query: (queryArg) => ({
                    url: `/genres/manga`,
                    params: { filter: queryArg.filter },
                }),
                providesTags: ['genres'],
            }),
            getMagazines: build.query<GetMagazinesApiResponse, GetMagazinesApiArg>({
                query: (queryArg) => ({
                    url: `/magazines`,
                    params: {
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                    },
                }),
                providesTags: ['magazines'],
            }),
            getMangaFullById: build.query<GetMangaFullByIdApiResponse, GetMangaFullByIdApiArg>({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/full` }),
                providesTags: ['manga'],
            }),
            getMangaById: build.query<GetMangaByIdApiResponse, GetMangaByIdApiArg>({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}` }),
                providesTags: ['manga'],
            }),
            getMangaCharacters: build.query<
                GetMangaCharactersApiResponse,
                GetMangaCharactersApiArg
            >({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/characters` }),
                providesTags: ['manga'],
            }),
            getMangaNews: build.query<GetMangaNewsApiResponse, GetMangaNewsApiArg>({
                query: (queryArg) => ({
                    url: `/manga/${queryArg.id}/news`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['manga'],
            }),
            getMangaTopics: build.query<GetMangaTopicsApiResponse, GetMangaTopicsApiArg>({
                query: (queryArg) => ({
                    url: `/manga/${queryArg.id}/forum`,
                    params: { filter: queryArg.filter },
                }),
                providesTags: ['manga'],
            }),
            getMangaPictures: build.query<GetMangaPicturesApiResponse, GetMangaPicturesApiArg>({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/pictures` }),
                providesTags: ['manga'],
            }),
            getMangaStatistics: build.query<
                GetMangaStatisticsApiResponse,
                GetMangaStatisticsApiArg
            >({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/statistics` }),
                providesTags: ['manga'],
            }),
            getMangaMoreInfo: build.query<GetMangaMoreInfoApiResponse, GetMangaMoreInfoApiArg>({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/moreinfo` }),
                providesTags: ['manga'],
            }),
            getMangaRecommendations: build.query<
                GetMangaRecommendationsApiResponse,
                GetMangaRecommendationsApiArg
            >({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/recommendations` }),
                providesTags: ['manga'],
            }),
            getMangaUserUpdates: build.query<
                GetMangaUserUpdatesApiResponse,
                GetMangaUserUpdatesApiArg
            >({
                query: (queryArg) => ({
                    url: `/manga/${queryArg.id}/userupdates`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['manga'],
            }),
            getMangaReviews: build.query<GetMangaReviewsApiResponse, GetMangaReviewsApiArg>({
                query: (queryArg) => ({
                    url: `/manga/${queryArg.id}/reviews`,
                    params: {
                        page: queryArg.page,
                        preliminary: queryArg.preliminary,
                        spoiler: queryArg.spoiler,
                    },
                }),
                providesTags: ['manga'],
            }),
            getMangaRelations: build.query<GetMangaRelationsApiResponse, GetMangaRelationsApiArg>({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/relations` }),
                providesTags: ['manga'],
            }),
            getMangaExternal: build.query<GetMangaExternalApiResponse, GetMangaExternalApiArg>({
                query: (queryArg) => ({ url: `/manga/${queryArg.id}/external` }),
                providesTags: ['manga'],
            }),
            getPersonFullById: build.query<GetPersonFullByIdApiResponse, GetPersonFullByIdApiArg>({
                query: (queryArg) => ({ url: `/people/${queryArg.id}/full` }),
                providesTags: ['people'],
            }),
            getPersonById: build.query<GetPersonByIdApiResponse, GetPersonByIdApiArg>({
                query: (queryArg) => ({ url: `/people/${queryArg.id}` }),
                providesTags: ['people'],
            }),
            getPersonAnime: build.query<GetPersonAnimeApiResponse, GetPersonAnimeApiArg>({
                query: (queryArg) => ({ url: `/people/${queryArg.id}/anime` }),
                providesTags: ['people'],
            }),
            getPersonVoices: build.query<GetPersonVoicesApiResponse, GetPersonVoicesApiArg>({
                query: (queryArg) => ({ url: `/people/${queryArg.id}/voices` }),
                providesTags: ['people'],
            }),
            getPersonManga: build.query<GetPersonMangaApiResponse, GetPersonMangaApiArg>({
                query: (queryArg) => ({ url: `/people/${queryArg.id}/manga` }),
                providesTags: ['people'],
            }),
            getPersonPictures: build.query<GetPersonPicturesApiResponse, GetPersonPicturesApiArg>({
                query: (queryArg) => ({ url: `/people/${queryArg.id}/pictures` }),
                providesTags: ['people'],
            }),
            getProducerById: build.query<GetProducerByIdApiResponse, GetProducerByIdApiArg>({
                query: (queryArg) => ({ url: `/producers/${queryArg.id}` }),
                providesTags: ['producers'],
            }),
            getProducerFullById: build.query<
                GetProducerFullByIdApiResponse,
                GetProducerFullByIdApiArg
            >({
                query: (queryArg) => ({ url: `/producers/${queryArg.id}/full` }),
                providesTags: ['producers'],
            }),
            getProducerExternal: build.query<
                GetProducerExternalApiResponse,
                GetProducerExternalApiArg
            >({
                query: (queryArg) => ({ url: `/producers/${queryArg.id}/external` }),
                providesTags: ['producers'],
            }),
            getRandomAnime: build.query<GetRandomAnimeApiResponse, GetRandomAnimeApiArg>({
                query: () => ({ url: `/random/anime` }),
                providesTags: ['random'],
            }),
            getRandomManga: build.query<GetRandomMangaApiResponse, GetRandomMangaApiArg>({
                query: () => ({ url: `/random/manga` }),
                providesTags: ['random'],
            }),
            getRandomCharacters: build.query<
                GetRandomCharactersApiResponse,
                GetRandomCharactersApiArg
            >({
                query: () => ({ url: `/random/characters` }),
                providesTags: ['random'],
            }),
            getRandomPeople: build.query<GetRandomPeopleApiResponse, GetRandomPeopleApiArg>({
                query: () => ({ url: `/random/people` }),
                providesTags: ['random'],
            }),
            getRandomUsers: build.query<GetRandomUsersApiResponse, GetRandomUsersApiArg>({
                query: () => ({ url: `/random/users` }),
                providesTags: ['random'],
            }),
            getRecentAnimeRecommendations: build.query<
                GetRecentAnimeRecommendationsApiResponse,
                GetRecentAnimeRecommendationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/recommendations/anime`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['recommendations'],
            }),
            getRecentMangaRecommendations: build.query<
                GetRecentMangaRecommendationsApiResponse,
                GetRecentMangaRecommendationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/recommendations/manga`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['recommendations'],
            }),
            getRecentAnimeReviews: build.query<
                GetRecentAnimeReviewsApiResponse,
                GetRecentAnimeReviewsApiArg
            >({
                query: (queryArg) => ({
                    url: `/reviews/anime`,
                    params: {
                        page: queryArg.page,
                        preliminary: queryArg.preliminary,
                        spoiler: queryArg.spoiler,
                    },
                }),
                providesTags: ['reviews'],
            }),
            getRecentMangaReviews: build.query<
                GetRecentMangaReviewsApiResponse,
                GetRecentMangaReviewsApiArg
            >({
                query: (queryArg) => ({
                    url: `/reviews/manga`,
                    params: {
                        page: queryArg.page,
                        preliminary: queryArg.preliminary,
                        spoiler: queryArg.spoiler,
                    },
                }),
                providesTags: ['reviews'],
            }),
            getSchedules: build.query<GetSchedulesApiResponse, GetSchedulesApiArg>({
                query: (queryArg) => ({
                    url: `/schedules`,
                    params: {
                        page: queryArg.queryPage,
                        filter: queryArg.filter,
                        kids: queryArg.kids,
                        sfw: queryArg.querySfw,
                        sfw: queryArg._querySfw,
                        unapproved: queryArg.unapproved,
                        page: queryArg._queryPage,
                        limit: queryArg.limit,
                    },
                }),
                providesTags: ['schedules'],
            }),
            getAnimeSearch: build.query<GetAnimeSearchApiResponse, GetAnimeSearchApiArg>({
                query: (queryArg) => ({
                    url: `/anime`,
                    params: {
                        sfw: queryArg.querySfw,
                        unapproved: queryArg.unapproved,
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        type: queryArg['type'],
                        score: queryArg.score,
                        min_score: queryArg.minScore,
                        max_score: queryArg.maxScore,
                        status: queryArg.status,
                        rating: queryArg.rating,
                        sfw: queryArg._querySfw,
                        genres: queryArg.genres,
                        genres_exclude: queryArg.genresExclude,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                        producers: queryArg.producers,
                        start_date: queryArg.startDate,
                        end_date: queryArg.endDate,
                    },
                }),
                providesTags: ['anime'],
            }),
            getMangaSearch: build.query<GetMangaSearchApiResponse, GetMangaSearchApiArg>({
                query: (queryArg) => ({
                    url: `/manga`,
                    params: {
                        sfw: queryArg.querySfw,
                        unapproved: queryArg.unapproved,
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        type: queryArg['type'],
                        score: queryArg.score,
                        min_score: queryArg.minScore,
                        max_score: queryArg.maxScore,
                        status: queryArg.status,
                        sfw: queryArg._querySfw,
                        genres: queryArg.genres,
                        genres_exclude: queryArg.genresExclude,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                        magazines: queryArg.magazines,
                        start_date: queryArg.startDate,
                        end_date: queryArg.endDate,
                    },
                }),
                providesTags: ['manga'],
            }),
            getPeopleSearch: build.query<GetPeopleSearchApiResponse, GetPeopleSearchApiArg>({
                query: (queryArg) => ({
                    url: `/people`,
                    params: {
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                    },
                }),
                providesTags: ['people'],
            }),
            getCharactersSearch: build.query<
                GetCharactersSearchApiResponse,
                GetCharactersSearchApiArg
            >({
                query: (queryArg) => ({
                    url: `/characters`,
                    params: {
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                    },
                }),
                providesTags: ['characters'],
            }),
            getUsersSearch: build.query<GetUsersSearchApiResponse, GetUsersSearchApiArg>({
                query: (queryArg) => ({
                    url: `/users`,
                    params: {
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        gender: queryArg.gender,
                        location: queryArg.location,
                        maxAge: queryArg.maxAge,
                        minAge: queryArg.minAge,
                    },
                }),
                providesTags: ['users'],
            }),
            getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
                query: (queryArg) => ({ url: `/users/userbyid/${queryArg.id}` }),
                providesTags: ['users'],
            }),
            getClubsSearch: build.query<GetClubsSearchApiResponse, GetClubsSearchApiArg>({
                query: (queryArg) => ({
                    url: `/clubs`,
                    params: {
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        type: queryArg['type'],
                        category: queryArg.category,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                    },
                }),
                providesTags: ['clubs'],
            }),
            getProducers: build.query<GetProducersApiResponse, GetProducersApiArg>({
                query: (queryArg) => ({
                    url: `/producers`,
                    params: {
                        page: queryArg.page,
                        limit: queryArg.limit,
                        q: queryArg.q,
                        order_by: queryArg.orderBy,
                        sort: queryArg.sort,
                        letter: queryArg.letter,
                    },
                }),
                providesTags: ['producers'],
            }),
            getSeasonNow: build.query<GetSeasonNowApiResponse, GetSeasonNowApiArg>({
                query: (queryArg) => ({
                    url: `/seasons/now`,
                    params: {
                        filter: queryArg.filter,
                        sfw: queryArg.sfw,
                        unapproved: queryArg.unapproved,
                        page: queryArg.page,
                        limit: queryArg.limit,
                    },
                }),
                providesTags: ['seasons'],
            }),
            getSeason: build.query<GetSeasonApiResponse, GetSeasonApiArg>({
                query: (queryArg) => ({
                    url: `/seasons/${queryArg.year}/${queryArg.season}`,
                    params: {
                        filter: queryArg.filter,
                        sfw: queryArg.sfw,
                        unapproved: queryArg.unapproved,
                        page: queryArg.page,
                        limit: queryArg.limit,
                    },
                }),
                providesTags: ['seasons'],
            }),
            getSeasonsList: build.query<GetSeasonsListApiResponse, GetSeasonsListApiArg>({
                query: () => ({ url: `/seasons` }),
                providesTags: ['seasons'],
            }),
            getSeasonUpcoming: build.query<GetSeasonUpcomingApiResponse, GetSeasonUpcomingApiArg>({
                query: (queryArg) => ({
                    url: `/seasons/upcoming`,
                    params: {
                        filter: queryArg.filter,
                        sfw: queryArg.sfw,
                        unapproved: queryArg.unapproved,
                        page: queryArg.page,
                        limit: queryArg.limit,
                    },
                }),
                providesTags: ['seasons'],
            }),
            getTopAnime: build.query<GetTopAnimeApiResponse, GetTopAnimeApiArg>({
                query: (queryArg) => ({
                    url: `/top/anime`,
                    params: {
                        type: queryArg['type'],
                        filter: queryArg.filter,
                        rating: queryArg.rating,
                        sfw: queryArg.sfw,
                        page: queryArg.page,
                        limit: queryArg.limit,
                    },
                }),
                providesTags: ['top'],
            }),
            getTopManga: build.query<GetTopMangaApiResponse, GetTopMangaApiArg>({
                query: (queryArg) => ({
                    url: `/top/manga`,
                    params: {
                        type: queryArg['type'],
                        filter: queryArg.filter,
                        page: queryArg.page,
                        limit: queryArg.limit,
                    },
                }),
                providesTags: ['top'],
            }),
            getTopPeople: build.query<GetTopPeopleApiResponse, GetTopPeopleApiArg>({
                query: (queryArg) => ({
                    url: `/top/people`,
                    params: { page: queryArg.page, limit: queryArg.limit },
                }),
                providesTags: ['top'],
            }),
            getTopCharacters: build.query<GetTopCharactersApiResponse, GetTopCharactersApiArg>({
                query: (queryArg) => ({
                    url: `/top/characters`,
                    params: { page: queryArg.page, limit: queryArg.limit },
                }),
                providesTags: ['top'],
            }),
            getTopReviews: build.query<GetTopReviewsApiResponse, GetTopReviewsApiArg>({
                query: (queryArg) => ({
                    url: `/top/reviews`,
                    params: {
                        page: queryArg.page,
                        type: queryArg['type'],
                        preliminary: queryArg.preliminary,
                        spoilers: queryArg.spoilers,
                    },
                }),
                providesTags: ['top'],
            }),
            getUserFullProfile: build.query<
                GetUserFullProfileApiResponse,
                GetUserFullProfileApiArg
            >({
                query: (queryArg) => ({ url: `/users/${queryArg.username}/full` }),
                providesTags: ['users'],
            }),
            getUserProfile: build.query<GetUserProfileApiResponse, GetUserProfileApiArg>({
                query: (queryArg) => ({ url: `/users/${queryArg.username}` }),
                providesTags: ['users'],
            }),
            getUserStatistics: build.query<GetUserStatisticsApiResponse, GetUserStatisticsApiArg>({
                query: (queryArg) => ({ url: `/users/${queryArg.username}/statistics` }),
                providesTags: ['users'],
            }),
            getUserFavorites: build.query<GetUserFavoritesApiResponse, GetUserFavoritesApiArg>({
                query: (queryArg) => ({ url: `/users/${queryArg.username}/favorites` }),
                providesTags: ['users'],
            }),
            getUserUpdates: build.query<GetUserUpdatesApiResponse, GetUserUpdatesApiArg>({
                query: (queryArg) => ({ url: `/users/${queryArg.username}/userupdates` }),
                providesTags: ['users'],
            }),
            getUserAbout: build.query<GetUserAboutApiResponse, GetUserAboutApiArg>({
                query: (queryArg) => ({ url: `/users/${queryArg.username}/about` }),
                providesTags: ['users'],
            }),
            getUserHistory: build.query<GetUserHistoryApiResponse, GetUserHistoryApiArg>({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/history`,
                    params: { type: queryArg['type'] },
                }),
                providesTags: ['users'],
            }),
            getUserFriends: build.query<GetUserFriendsApiResponse, GetUserFriendsApiArg>({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/friends`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['users'],
            }),
            getUserAnimelist: build.query<GetUserAnimelistApiResponse, GetUserAnimelistApiArg>({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/animelist`,
                    params: { status: queryArg.status },
                }),
                providesTags: ['users'],
            }),
            getUserMangaList: build.query<GetUserMangaListApiResponse, GetUserMangaListApiArg>({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/mangalist`,
                    params: { status: queryArg.status },
                }),
                providesTags: ['users'],
            }),
            getUserReviews: build.query<GetUserReviewsApiResponse, GetUserReviewsApiArg>({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/reviews`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['users'],
            }),
            getUserRecommendations: build.query<
                GetUserRecommendationsApiResponse,
                GetUserRecommendationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/recommendations`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['users'],
            }),
            getUserClubs: build.query<GetUserClubsApiResponse, GetUserClubsApiArg>({
                query: (queryArg) => ({
                    url: `/users/${queryArg.username}/clubs`,
                    params: { page: queryArg.page },
                }),
                providesTags: ['users'],
            }),
            getUserExternal: build.query<GetUserExternalApiResponse, GetUserExternalApiArg>({
                query: (queryArg) => ({ url: `/users/${queryArg.username}/external` }),
                providesTags: ['users'],
            }),
            getWatchRecentEpisodes: build.query<
                GetWatchRecentEpisodesApiResponse,
                GetWatchRecentEpisodesApiArg
            >({
                query: () => ({ url: `/watch/episodes` }),
                providesTags: ['watch'],
            }),
            getWatchPopularEpisodes: build.query<
                GetWatchPopularEpisodesApiResponse,
                GetWatchPopularEpisodesApiArg
            >({
                query: () => ({ url: `/watch/episodes/popular` }),
                providesTags: ['watch'],
            }),
            getWatchRecentPromos: build.query<
                GetWatchRecentPromosApiResponse,
                GetWatchRecentPromosApiArg
            >({
                query: (queryArg) => ({ url: `/watch/promos`, params: { page: queryArg.page } }),
                providesTags: ['watch'],
            }),
            getWatchPopularPromos: build.query<
                GetWatchPopularPromosApiResponse,
                GetWatchPopularPromosApiArg
            >({
                query: () => ({ url: `/watch/promos/popular` }),
                providesTags: ['watch'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as malApi };
export type GetAnimeFullByIdApiResponse = /** status 200 Returns complete anime resource data */ {
    data?: AnimeFull;
};
export type GetAnimeFullByIdApiArg = {
    id: number;
};
export type GetAnimeByIdApiResponse = /** status 200 Returns anime resource */ {
    data?: Anime;
};
export type GetAnimeByIdApiArg = {
    id: number;
};
export type GetAnimeCharactersApiResponse =
    /** status 200 Returns anime characters resource */ AnimeCharacters;
export type GetAnimeCharactersApiArg = {
    id: number;
};
export type GetAnimeStaffApiResponse = /** status 200 Returns anime staff resource */ AnimeStaff;
export type GetAnimeStaffApiArg = {
    id: number;
};
export type GetAnimeEpisodesApiResponse =
    /** status 200 Returns a list of anime episodes */ AnimeEpisodes;
export type GetAnimeEpisodesApiArg = {
    id: number;
    page?: number;
};
export type GetAnimeEpisodeByIdApiResponse =
    /** status 200 Returns a single anime episode resource */ {
        data?: AnimeEpisode;
    };
export type GetAnimeEpisodeByIdApiArg = {
    id: number;
    episode: number;
};
export type GetAnimeNewsApiResponse =
    /** status 200 Returns a list of news articles related to the entry */ AnimeNews;
export type GetAnimeNewsApiArg = {
    id: number;
    page?: number;
};
export type GetAnimeForumApiResponse =
    /** status 200 Returns a list of forum topics related to the entry */ Forum;
export type GetAnimeForumApiArg = {
    id: number;
    /** Filter topics */
    filter?: 'all' | 'episode' | 'other';
};
export type GetAnimeVideosApiResponse =
    /** status 200 Returns videos related to the entry */ AnimeVideos;
export type GetAnimeVideosApiArg = {
    id: number;
};
export type GetAnimeVideosEpisodesApiResponse =
    /** status 200 Returns episode videos related to the entry */ AnimeVideosEpisodes;
export type GetAnimeVideosEpisodesApiArg = {
    id: number;
    page?: number;
};
export type GetAnimePicturesApiResponse =
    /** status 200 Returns pictures related to the entry */ PicturesVariants;
export type GetAnimePicturesApiArg = {
    id: number;
};
export type GetAnimeStatisticsApiResponse =
    /** status 200 Returns anime statistics */ AnimeStatistics;
export type GetAnimeStatisticsApiArg = {
    id: number;
};
export type GetAnimeMoreInfoApiResponse = /** status 200 Returns anime statistics */ Moreinfo;
export type GetAnimeMoreInfoApiArg = {
    id: number;
};
export type GetAnimeRecommendationsApiResponse =
    /** status 200 Returns anime recommendations */ EntryRecommendations;
export type GetAnimeRecommendationsApiArg = {
    id: number;
};
export type GetAnimeUserUpdatesApiResponse =
    /** status 200 Returns a list of users who have added/updated/removed the entry on their list */ AnimeUserupdates;
export type GetAnimeUserUpdatesApiArg = {
    id: number;
    page?: number;
};
export type GetAnimeReviewsApiResponse = /** status 200 Returns anime reviews */ AnimeReviews;
export type GetAnimeReviewsApiArg = {
    id: number;
    page?: number;
    /** Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. NOTE: Preliminary reviews are not returned by default so if the entry is airing/publishing you need to add this otherwise you will get an empty list. e.g usage: `?preliminary=true` */
    preliminary?: boolean;
    /** Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true` */
    spoiler?: boolean;
};
export type GetAnimeRelationsApiResponse = /** status 200 Returns anime relations */ {
    data?: Relation[];
};
export type GetAnimeRelationsApiArg = {
    id: number;
};
export type GetAnimeThemesApiResponse = /** status 200 Returns anime themes */ AnimeThemes;
export type GetAnimeThemesApiArg = {
    id: number;
};
export type GetAnimeExternalApiResponse =
    /** status 200 Returns anime external links */ ExternalLinks;
export type GetAnimeExternalApiArg = {
    id: number;
};
export type GetAnimeStreamingApiResponse =
    /** status 200 Returns anime streaming links */ ExternalLinks;
export type GetAnimeStreamingApiArg = {
    id: number;
};
export type GetCharacterFullByIdApiResponse =
    /** status 200 Returns complete character resource data */ {
        data?: CharacterFull;
    };
export type GetCharacterFullByIdApiArg = {
    id: number;
};
export type GetCharacterByIdApiResponse = /** status 200 Returns character resource */ {
    data?: Character;
};
export type GetCharacterByIdApiArg = {
    id: number;
};
export type GetCharacterAnimeApiResponse =
    /** status 200 Returns anime that character is in */ CharacterAnime;
export type GetCharacterAnimeApiArg = {
    id: number;
};
export type GetCharacterMangaApiResponse =
    /** status 200 Returns manga that character is in */ CharacterManga;
export type GetCharacterMangaApiArg = {
    id: number;
};
export type GetCharacterVoiceActorsApiResponse =
    /** status 200 Returns the character's voice actors */ CharacterVoiceActors;
export type GetCharacterVoiceActorsApiArg = {
    id: number;
};
export type GetCharacterPicturesApiResponse =
    /** status 200 Returns pictures related to the entry */ CharacterPictures;
export type GetCharacterPicturesApiArg = {
    id: number;
};
export type GetClubsByIdApiResponse = /** status 200 Returns Club Resource */ {
    data?: Club;
};
export type GetClubsByIdApiArg = {
    id: number;
};
export type GetClubMembersApiResponse = /** status 200 Returns Club Members Resource */ Pagination &
    ClubMember;
export type GetClubMembersApiArg = {
    id: number;
    page?: number;
};
export type GetClubStaffApiResponse = /** status 200 Returns Club Staff */ ClubStaff;
export type GetClubStaffApiArg = {
    id: number;
};
export type GetClubRelationsApiResponse = /** status 200 Returns Club Relations */ ClubRelations;
export type GetClubRelationsApiArg = {
    id: number;
};
export type GetAnimeGenresApiResponse =
    /** status 200 Returns entry genres, explicit_genres, themes and demographics */ Genres;
export type GetAnimeGenresApiArg = {
    filter?: GenreQueryFilter;
};
export type GetMangaGenresApiResponse =
    /** status 200 Returns entry genres, explicit_genres, themes and demographics */ Genres;
export type GetMangaGenresApiArg = {
    filter?: GenreQueryFilter;
};
export type GetMagazinesApiResponse = /** status 200 Returns magazines collection */ Magazines;
export type GetMagazinesApiArg = {
    page?: number;
    limit?: number;
    q?: string;
    orderBy?: MagazinesQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
};
export type GetMangaFullByIdApiResponse = /** status 200 Returns complete manga resource data */ {
    data?: MangaFull;
};
export type GetMangaFullByIdApiArg = {
    id: number;
};
export type GetMangaByIdApiResponse = /** status 200 Returns pictures related to the entry */ {
    data?: Manga;
};
export type GetMangaByIdApiArg = {
    id: number;
};
export type GetMangaCharactersApiResponse =
    /** status 200 Returns manga characters resource */ MangaCharacters;
export type GetMangaCharactersApiArg = {
    id: number;
};
export type GetMangaNewsApiResponse =
    /** status 200 Returns a list of manga news topics */ MangaNews;
export type GetMangaNewsApiArg = {
    id: number;
    page?: number;
};
export type GetMangaTopicsApiResponse =
    /** status 200 Returns a list of manga forum topics */ Forum;
export type GetMangaTopicsApiArg = {
    id: number;
    /** Filter topics */
    filter?: 'all' | 'episode' | 'other';
};
export type GetMangaPicturesApiResponse =
    /** status 200 Returns a list of manga pictures */ MangaPictures;
export type GetMangaPicturesApiArg = {
    id: number;
};
export type GetMangaStatisticsApiResponse =
    /** status 200 Returns anime statistics */ MangaStatistics;
export type GetMangaStatisticsApiArg = {
    id: number;
};
export type GetMangaMoreInfoApiResponse = /** status 200 Returns manga moreinfo */ Moreinfo;
export type GetMangaMoreInfoApiArg = {
    id: number;
};
export type GetMangaRecommendationsApiResponse =
    /** status 200 Returns manga recommendations */ EntryRecommendations;
export type GetMangaRecommendationsApiArg = {
    id: number;
};
export type GetMangaUserUpdatesApiResponse =
    /** status 200 Returns manga user updates */ MangaUserupdates;
export type GetMangaUserUpdatesApiArg = {
    id: number;
    page?: number;
};
export type GetMangaReviewsApiResponse = /** status 200 Returns manga reviews */ MangaReviews;
export type GetMangaReviewsApiArg = {
    id: number;
    page?: number;
    /** Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. NOTE: Preliminary reviews are not returned by default so if the entry is airing/publishing you need to add this otherwise you will get an empty list. e.g usage: `?preliminary=true` */
    preliminary?: boolean;
    /** Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true` */
    spoiler?: boolean;
};
export type GetMangaRelationsApiResponse = /** status 200 Returns manga relations */ {
    data?: Relation[];
};
export type GetMangaRelationsApiArg = {
    id: number;
};
export type GetMangaExternalApiResponse =
    /** status 200 Returns manga external links */ ExternalLinks;
export type GetMangaExternalApiArg = {
    id: number;
};
export type GetPersonFullByIdApiResponse =
    /** status 200 Returns complete character resource data */ {
        data?: PersonFull;
    };
export type GetPersonFullByIdApiArg = {
    id: number;
};
export type GetPersonByIdApiResponse = /** status 200 Returns pictures related to the entry */ {
    data?: Person;
};
export type GetPersonByIdApiArg = {
    id: number;
};
export type GetPersonAnimeApiResponse =
    /** status 200 Returns person's anime staff positions */ PersonAnime;
export type GetPersonAnimeApiArg = {
    id: number;
};
export type GetPersonVoicesApiResponse =
    /** status 200 Returns person's voice acting roles */ PersonVoiceActingRoles;
export type GetPersonVoicesApiArg = {
    id: number;
};
export type GetPersonMangaApiResponse =
    /** status 200 Returns person's published manga works */ PersonManga;
export type GetPersonMangaApiArg = {
    id: number;
};
export type GetPersonPicturesApiResponse =
    /** status 200 Returns a list of pictures of the person */ PersonPictures;
export type GetPersonPicturesApiArg = {
    id: number;
};
export type GetProducerByIdApiResponse = /** status 200 Returns producer resource */ {
    data?: Producer;
};
export type GetProducerByIdApiArg = {
    id: number;
};
export type GetProducerFullByIdApiResponse = /** status 200 Returns producer resource */ {
    data?: ProducerFull;
};
export type GetProducerFullByIdApiArg = {
    id: number;
};
export type GetProducerExternalApiResponse =
    /** status 200 Returns producer's external links */ ExternalLinks;
export type GetProducerExternalApiArg = {
    id: number;
};
export type GetRandomAnimeApiResponse = /** status 200 Returns a random anime resource */ {
    data?: Anime;
};
export type GetRandomAnimeApiArg = void;
export type GetRandomMangaApiResponse = /** status 200 Returns a random manga resource */ {
    data?: Manga;
};
export type GetRandomMangaApiArg = void;
export type GetRandomCharactersApiResponse = /** status 200 Returns a random character resource */ {
    data?: Character;
};
export type GetRandomCharactersApiArg = void;
export type GetRandomPeopleApiResponse = /** status 200 Returns a random person resource */ {
    data?: Person;
};
export type GetRandomPeopleApiArg = void;
export type GetRandomUsersApiResponse = /** status 200 Returns a random user profile resource */ {
    data?: UserProfile;
};
export type GetRandomUsersApiArg = void;
export type GetRecentAnimeRecommendationsApiResponse =
    /** status 200 Returns recent anime recommendations */ Recommendations;
export type GetRecentAnimeRecommendationsApiArg = {
    page?: number;
};
export type GetRecentMangaRecommendationsApiResponse =
    /** status 200 Returns recent manga recommendations */ Recommendations;
export type GetRecentMangaRecommendationsApiArg = {
    page?: number;
};
export type GetRecentAnimeReviewsApiResponse = /** status 200 Returns recent anime reviews */ any;
export type GetRecentAnimeReviewsApiArg = {
    page?: number;
    /** Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. NOTE: Preliminary reviews are not returned by default so if the entry is airing/publishing you need to add this otherwise you will get an empty list. e.g usage: `?preliminary=true` */
    preliminary?: boolean;
    /** Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true` */
    spoiler?: boolean;
};
export type GetRecentMangaReviewsApiResponse = /** status 200 Returns recent manga reviews */ any;
export type GetRecentMangaReviewsApiArg = {
    page?: number;
    /** Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. NOTE: Preliminary reviews are not returned by default so if the entry is airing/publishing you need to add this otherwise you will get an empty list. e.g usage: `?preliminary=true` */
    preliminary?: boolean;
    /** Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true` */
    spoiler?: boolean;
};
export type GetSchedulesApiResponse = /** status 200 Returns weekly schedule */ Schedules;
export type GetSchedulesApiArg = {
    queryPage?: number;
    /** Filter by day */
    filter?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'unknown' | 'other';
    /** When supplied, it will filter entries with the `Kids` Genre Demographic. When supplied as `kids=true`, it will return only Kid entries and when supplied as `kids=false`, it will filter out any Kid entries. Defaults to `false`. */
    kids?: 'true' | 'false';
    /** 'Safe For Work'. When supplied, it will filter entries with the `Hentai` Genre. When supplied as `sfw=true`, it will return only SFW entries and when supplied as `sfw=false`, it will filter out any Hentai entries. Defaults to `false`. */
    querySfw?: 'true' | 'false';
    /** 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw` */
    _querySfw?: boolean;
    /** This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved` */
    unapproved?: boolean;
    _queryPage?: number;
    limit?: number;
};
export type GetAnimeSearchApiResponse =
    /** status 200 Returns search results for anime */ AnimeSearch;
export type GetAnimeSearchApiArg = {
    /** 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw` */
    querySfw?: boolean;
    /** This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved` */
    unapproved?: boolean;
    page?: number;
    limit?: number;
    q?: string;
    type?: AnimeSearchQueryType;
    score?: number;
    /** Set a minimum score for results. */
    minScore?: number;
    /** Set a maximum score for results */
    maxScore?: number;
    status?: AnimeSearchQueryStatus;
    rating?: AnimeSearchQueryRating;
    /** Filter out Adult entries */
    _querySfw?: boolean;
    /** Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3 */
    genres?: string;
    /** Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3 */
    genresExclude?: string;
    orderBy?: AnimeSearchQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
    /** Filter by producer(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3 */
    producers?: string;
    /** Filter by starting date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01` */
    startDate?: string;
    /** Filter by ending date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01` */
    endDate?: string;
};
export type GetMangaSearchApiResponse =
    /** status 200 Returns search results for manga */ MangaSearch;
export type GetMangaSearchApiArg = {
    /** 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw` */
    querySfw?: boolean;
    /** This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved` */
    unapproved?: boolean;
    page?: number;
    limit?: number;
    q?: string;
    type?: MangaSearchQueryType;
    score?: number;
    /** Set a minimum score for results. */
    minScore?: number;
    /** Set a maximum score for results */
    maxScore?: number;
    status?: MangaSearchQueryStatus;
    /** Filter out Adult entries */
    _querySfw?: boolean;
    /** Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3 */
    genres?: string;
    /** Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3 */
    genresExclude?: string;
    orderBy?: MangaSearchQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
    /** Filter by magazine(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3 */
    magazines?: string;
    /** Filter by starting date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01` */
    startDate?: string;
    /** Filter by ending date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01` */
    endDate?: string;
};
export type GetPeopleSearchApiResponse =
    /** status 200 Returns search results for people */ PeopleSearch;
export type GetPeopleSearchApiArg = {
    page?: number;
    limit?: number;
    q?: string;
    orderBy?: PeopleSearchQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
};
export type GetCharactersSearchApiResponse =
    /** status 200 Returns search results for characters */ CharactersSearch;
export type GetCharactersSearchApiArg = {
    page?: number;
    limit?: number;
    q?: string;
    orderBy?: CharactersSearchQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
};
export type GetUsersSearchApiResponse =
    /** status 200 Returns search results for users */ UsersSearch;
export type GetUsersSearchApiArg = {
    page?: number;
    limit?: number;
    q?: string;
    gender?: UsersSearchQueryGender;
    location?: string;
    maxAge?: number;
    minAge?: number;
};
export type GetUserByIdApiResponse = /** status 200 Returns username by ID search */ {
    data?: UserById;
};
export type GetUserByIdApiArg = {
    id: number;
};
export type GetClubsSearchApiResponse =
    /** status 200 Returns search results for clubs */ ClubsSearch;
export type GetClubsSearchApiArg = {
    page?: number;
    limit?: number;
    q?: string;
    type?: ClubSearchQueryType;
    category?: ClubSearchQueryCategory;
    orderBy?: ClubSearchQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
};
export type GetProducersApiResponse = /** status 200 Returns producers collection */ Producers;
export type GetProducersApiArg = {
    page?: number;
    limit?: number;
    q?: string;
    orderBy?: ProducersQueryOrderby;
    sort?: SearchQuerySort;
    /** Return entries starting with the given letter */
    letter?: string;
};
export type GetSeasonNowApiResponse = /** status 200 Returns current seasonal anime */ AnimeSearch;
export type GetSeasonNowApiArg = {
    /** Entry types */
    filter?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
    /** 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw` */
    sfw?: boolean;
    /** This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved` */
    unapproved?: boolean;
    page?: number;
    limit?: number;
};
export type GetSeasonApiResponse = /** status 200 Returns seasonal anime */ AnimeSearch;
export type GetSeasonApiArg = {
    year: number;
    season: string;
    /** Entry types */
    filter?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
    /** 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw` */
    sfw?: boolean;
    /** This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved` */
    unapproved?: boolean;
    page?: number;
    limit?: number;
};
export type GetSeasonsListApiResponse = /** status 200 Returns available list of seasons */ Seasons;
export type GetSeasonsListApiArg = void;
export type GetSeasonUpcomingApiResponse =
    /** status 200 Returns upcoming season's anime */ AnimeSearch;
export type GetSeasonUpcomingApiArg = {
    /** Entry types */
    filter?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
    /** 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw` */
    sfw?: boolean;
    /** This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved` */
    unapproved?: boolean;
    page?: number;
    limit?: number;
};
export type GetTopAnimeApiResponse = /** status 200 Returns top anime */ AnimeSearch;
export type GetTopAnimeApiArg = {
    type?: AnimeSearchQueryType;
    filter?: TopAnimeFilter;
    rating?: AnimeSearchQueryRating;
    /** Filter out Adult entries */
    sfw?: boolean;
    page?: number;
    limit?: number;
};
export type GetTopMangaApiResponse = /** status 200 Returns top manga */ MangaSearch;
export type GetTopMangaApiArg = {
    type?: MangaSearchQueryType;
    filter?: TopMangaFilter;
    page?: number;
    limit?: number;
};
export type GetTopPeopleApiResponse = /** status 200 Returns top people */ PeopleSearch;
export type GetTopPeopleApiArg = {
    page?: number;
    limit?: number;
};
export type GetTopCharactersApiResponse = /** status 200 Returns top characters */ CharactersSearch;
export type GetTopCharactersApiArg = {
    page?: number;
    limit?: number;
};
export type GetTopReviewsApiResponse = /** status 200 Returns top reviews */ {
    data?: {
        data?: (
            | ({
                  user?: UserMeta;
              } & {
                  anime?: AnimeMeta;
              } & AnimeReview)
            | ({
                  user?: UserMeta;
              } & {
                  manga?: MangaMeta;
              } & MangaReview)
        )[];
    } & Pagination;
};
export type GetTopReviewsApiArg = {
    page?: number;
    type?: TopReviewsTypeEnum;
    /** Whether the results include preliminary reviews or not. Defaults to true. */
    preliminary?: boolean;
    /** Whether the results include reviews with spoilers or not. Defaults to true. */
    spoilers?: boolean;
};
export type GetUserFullProfileApiResponse = /** status 200 Returns complete user resource data */ {
    data?: UserProfileFull;
};
export type GetUserFullProfileApiArg = {
    username: string;
};
export type GetUserProfileApiResponse = /** status 200 Returns user profile */ {
    data?: UserProfile;
};
export type GetUserProfileApiArg = {
    username: string;
};
export type GetUserStatisticsApiResponse = /** status 200 Returns user statistics */ UserStatistics;
export type GetUserStatisticsApiArg = {
    username: string;
};
export type GetUserFavoritesApiResponse = /** status 200 Returns user favorites */ {
    data?: UserFavorites;
};
export type GetUserFavoritesApiArg = {
    username: string;
};
export type GetUserUpdatesApiResponse = /** status 200 Returns user updates */ UserUpdates;
export type GetUserUpdatesApiArg = {
    username: string;
};
export type GetUserAboutApiResponse = /** status 200 Returns user about in raw HTML */ UserAbout;
export type GetUserAboutApiArg = {
    username: string;
};
export type GetUserHistoryApiResponse =
    /** status 200 Returns user history (past 30 days) */ UserHistory;
export type GetUserHistoryApiArg = {
    username: string;
    type?: 'anime' | 'manga';
};
export type GetUserFriendsApiResponse = /** status 200 Returns user friends */ UserFriends;
export type GetUserFriendsApiArg = {
    username: string;
    page?: number;
};
export type GetUserAnimelistApiResponse = /** status 200 Returns user anime list */ any;
export type GetUserAnimelistApiArg = {
    username: string;
    status?: UserAnimeListStatusFilter;
};
export type GetUserMangaListApiResponse = /** status 200 Returns user manga list */ any;
export type GetUserMangaListApiArg = {
    username: string;
    status?: UserMangaListStatusFilter;
};
export type GetUserReviewsApiResponse = /** status 200 Returns user reviews */ {
    data?: {
        data?: (
            | ({
                  user?: UserMeta;
              } & {
                  anime?: AnimeMeta;
              } & AnimeReview)
            | ({
                  user?: UserMeta;
              } & {
                  manga?: MangaMeta;
              } & MangaReview)
        )[];
    } & Pagination;
};
export type GetUserReviewsApiArg = {
    username: string;
    page?: number;
};
export type GetUserRecommendationsApiResponse =
    /** status 200 Returns Recent Anime Recommendations */ Recommendations;
export type GetUserRecommendationsApiArg = {
    username: string;
    page?: number;
};
export type GetUserClubsApiResponse = /** status 200 Returns user clubs */ UserClubs;
export type GetUserClubsApiArg = {
    username: string;
    page?: number;
};
export type GetUserExternalApiResponse =
    /** status 200 Returns user's external links */ ExternalLinks;
export type GetUserExternalApiArg = {
    username: string;
};
export type GetWatchRecentEpisodesApiResponse =
    /** status 200 Returns Recently Added Episodes */ WatchEpisodes;
export type GetWatchRecentEpisodesApiArg = void;
export type GetWatchPopularEpisodesApiResponse =
    /** status 200 Returns Popular Episodes */ WatchEpisodes;
export type GetWatchPopularEpisodesApiArg = void;
export type GetWatchRecentPromosApiResponse =
    /** status 200 Returns Recently Added Promotional Videos */ WatchPromos;
export type GetWatchRecentPromosApiArg = {
    page?: number;
};
export type GetWatchPopularPromosApiResponse =
    /** status 200 Returns Popular Promotional Videos */ WatchPromos;
export type GetWatchPopularPromosApiArg = void;
export type AnimeImages = {
    jpg?: {
        image_url?: string | null;
        small_image_url?: string | null;
        large_image_url?: string | null;
    };
    webp?: {
        image_url?: string | null;
        small_image_url?: string | null;
        large_image_url?: string | null;
    };
};
export type TrailerBase = {
    youtube_id?: string | null;
    url?: string | null;
    embed_url?: string | null;
};
export type Title = {
    type?: string;
    title?: string;
};
export type Daterange = {
    from?: string | null;
    to?: string | null;
    prop?: {
        from?: {
            day?: number | null;
            month?: number | null;
            year?: number | null;
        };
        to?: {
            day?: number | null;
            month?: number | null;
            year?: number | null;
        };
        string?: string | null;
    };
};
export type Broadcast = {
    day?: string | null;
    time?: string | null;
    timezone?: string | null;
    string?: string | null;
};
export type MalUrl = {
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
};
export type AnimeFull = {
    mal_id?: number;
    url?: string;
    images?: AnimeImages;
    trailer?: TrailerBase;
    approved?: boolean;
    titles?: Title[];
    title?: string;
    title_english?: string | null;
    title_japanese?: string | null;
    title_synonyms?: string[];
    type?: ('TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music') | null;
    source?: string | null;
    episodes?: number | null;
    status?: ('Finished Airing' | 'Currently Airing' | 'Not yet aired') | null;
    airing?: boolean;
    aired?: Daterange;
    duration?: string | null;
    rating?:
        | (
              | 'G - All Ages'
              | 'PG - Children'
              | 'PG-13 - Teens 13 or older'
              | 'R - 17+ (violence & profanity)'
              | 'R+ - Mild Nudity'
              | 'Rx - Hentai'
          )
        | null;
    score?: number | null;
    scored_by?: number | null;
    rank?: number | null;
    popularity?: number | null;
    members?: number | null;
    favorites?: number | null;
    synopsis?: string | null;
    background?: string | null;
    season?: ('summer' | 'winter' | 'spring' | 'fall') | null;
    year?: number | null;
    broadcast?: Broadcast;
    producers?: MalUrl[];
    licensors?: MalUrl[];
    studios?: MalUrl[];
    genres?: MalUrl[];
    explicit_genres?: MalUrl[];
    themes?: MalUrl[];
    demographics?: MalUrl[];
    relations?: {
        relation?: string;
        entry?: MalUrl[];
    }[];
    theme?: {
        openings?: string[];
        endings?: string[];
    };
    external?: {
        name?: string;
        url?: string;
    }[];
    streaming?: {
        name?: string;
        url?: string;
    }[];
};
export type Anime = {
    mal_id?: number;
    url?: string;
    images?: AnimeImages;
    trailer?: TrailerBase;
    approved?: boolean;
    titles?: Title[];
    title?: string;
    title_english?: string | null;
    title_japanese?: string | null;
    title_synonyms?: string[];
    type?: ('TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music') | null;
    source?: string | null;
    episodes?: number | null;
    status?: ('Finished Airing' | 'Currently Airing' | 'Not yet aired') | null;
    airing?: boolean;
    aired?: Daterange;
    duration?: string | null;
    rating?:
        | (
              | 'G - All Ages'
              | 'PG - Children'
              | 'PG-13 - Teens 13 or older'
              | 'R - 17+ (violence & profanity)'
              | 'R+ - Mild Nudity'
              | 'Rx - Hentai'
          )
        | null;
    score?: number | null;
    scored_by?: number | null;
    rank?: number | null;
    popularity?: number | null;
    members?: number | null;
    favorites?: number | null;
    synopsis?: string | null;
    background?: string | null;
    season?: ('summer' | 'winter' | 'spring' | 'fall') | null;
    year?: number | null;
    broadcast?: Broadcast;
    producers?: MalUrl[];
    licensors?: MalUrl[];
    studios?: MalUrl[];
    genres?: MalUrl[];
    explicit_genres?: MalUrl[];
    themes?: MalUrl[];
    demographics?: MalUrl[];
};
export type CharacterImages = {
    jpg?: {
        image_url?: string | null;
        small_image_url?: string | null;
    };
    webp?: {
        image_url?: string | null;
        small_image_url?: string | null;
    };
};
export type PeopleImages = {
    jpg?: {
        image_url?: string | null;
    };
};
export type AnimeCharacters = {
    data?: {
        character?: {
            mal_id?: number;
            url?: string;
            images?: CharacterImages;
            name?: string;
        };
        role?: string;
        voice_actors?: {
            person?: {
                mal_id?: number;
                url?: string;
                images?: PeopleImages;
                name?: string;
            };
            language?: string;
        }[];
    }[];
};
export type AnimeStaff = {
    data?: {
        person?: {
            mal_id?: number;
            url?: string;
            images?: PeopleImages;
            name?: string;
        };
        positions?: string[];
    }[];
};
export type Pagination = {
    pagination?: {
        last_visible_page?: number;
        has_next_page?: boolean;
    };
};
export type AnimeEpisodes = {
    data?: {
        mal_id?: number;
        url?: string | null;
        title?: string;
        title_japanese?: string | null;
        title_romanji?: string | null;
        duration?: number | null;
        aired?: string | null;
        filler?: boolean;
        recap?: boolean;
        forum_url?: string | null;
    }[];
} & Pagination;
export type AnimeEpisode = {
    mal_id?: number;
    url?: string;
    title?: string;
    title_japanese?: string | null;
    title_romanji?: string | null;
    duration?: number | null;
    aired?: string | null;
    filler?: boolean;
    recap?: boolean;
    synopsis?: string | null;
};
export type CommonImages = {
    jpg?: {
        image_url?: string | null;
    };
};
export type News = {
    data?: {
        mal_id?: number;
        url?: string;
        title?: string;
        date?: string;
        author_username?: string;
        author_url?: string;
        forum_url?: string;
        images?: CommonImages;
        comments?: number;
        excerpt?: string;
    }[];
};
export type AnimeNews = Pagination & News;
export type Forum = {
    data?: {
        mal_id?: number;
        url?: string;
        title?: string;
        date?: string;
        author_username?: string;
        author_url?: string;
        comments?: number;
        last_comment?: {
            url?: string;
            author_username?: string;
            author_url?: string;
            date?: string | null;
        };
    }[];
};
export type TrailerImages = {
    images?: {
        image_url?: string | null;
        small_image_url?: string | null;
        medium_image_url?: string | null;
        large_image_url?: string | null;
        maximum_image_url?: string | null;
    };
};
export type Trailer = TrailerBase & TrailerImages;
export type AnimeVideos = {
    data?: {
        promo?: {
            title?: string;
            trailer?: Trailer;
        }[];
        episodes?: {
            mal_id?: number;
            url?: string;
            title?: string;
            episode?: string;
            images?: CommonImages;
        }[];
        music_videos?: {
            title?: string;
            video?: Trailer;
            meta?: {
                title?: string | null;
                author?: string | null;
            };
        }[];
    };
};
export type AnimeVideosEpisodes = {
    data?: {
        mal_id?: number;
        title?: string;
        episode?: string;
        url?: string;
        images?: CommonImages;
    }[];
} & Pagination;
export type PicturesVariants = {
    data?: {
        images?: CommonImages;
    }[];
};
export type AnimeStatistics = {
    data?: {
        watching?: number;
        completed?: number;
        on_hold?: number;
        dropped?: number;
        plan_to_watch?: number;
        total?: number;
        scores?: {
            score?: number;
            votes?: number;
            percentage?: number;
        }[];
    };
};
export type Moreinfo = {
    data?: {
        moreinfo?: string | null;
    };
};
export type AnimeMeta = {
    mal_id?: number;
    url?: string;
    images?: AnimeImages;
    title?: string;
};
export type MangaImages = {
    jpg?: {
        image_url?: string | null;
        small_image_url?: string | null;
        large_image_url?: string | null;
    };
    webp?: {
        image_url?: string | null;
        small_image_url?: string | null;
        large_image_url?: string | null;
    };
};
export type MangaMeta = {
    mal_id?: number;
    url?: string;
    images?: MangaImages;
    title?: string;
};
export type EntryRecommendations = {
    data?: {
        entry?: AnimeMeta | MangaMeta;
    }[];
};
export type UserImages = {
    jpg?: {
        image_url?: string | null;
    };
    webp?: {
        image_url?: string | null;
    };
};
export type UserMeta = {
    username?: string;
    url?: string;
    images?: UserImages;
};
export type AnimeUserupdates = {
    data?: {
        user?: UserMeta;
        score?: number | null;
        status?: string;
        episodes_seen?: number | null;
        episodes_total?: number | null;
        date?: string;
    }[];
} & Pagination;
export type AnimeReview = {
    mal_id?: number;
    url?: string;
    type?: string;
    reactions?: {
        overall?: number;
        nice?: number;
        love_it?: number;
        funny?: number;
        confusing?: number;
        informative?: number;
        well_written?: number;
        creative?: number;
    };
    date?: string;
    review?: string;
    score?: number;
    tags?: string[];
    is_spoiler?: boolean;
    is_preliminary?: boolean;
    episodes_watched?: number;
};
export type AnimeReviews = {
    data?: ({
        user?: UserMeta;
    } & AnimeReview)[];
} & Pagination;
export type Relation = {
    relation?: string;
    entry?: MalUrl[];
};
export type AnimeThemes = {
    data?: {
        openings?: string[];
        endings?: string[];
    };
};
export type ExternalLinks = {
    data?: {
        name?: string;
        url?: string;
    }[];
};
export type PersonMeta = {
    mal_id?: number;
    url?: string;
    images?: PeopleImages;
    name?: string;
};
export type CharacterFull = {
    mal_id?: number;
    url?: string;
    images?: CharacterImages;
    name?: string;
    name_kanji?: string | null;
    nicknames?: string[];
    favorites?: number;
    about?: string | null;
    anime?: {
        role?: string;
        anime?: AnimeMeta;
    }[];
    manga?: {
        role?: string;
        manga?: MangaMeta;
    }[];
    voices?: {
        language?: string;
        person?: PersonMeta;
    }[];
};
export type Character = {
    mal_id?: number;
    url?: string;
    images?: CharacterImages;
    name?: string;
    name_kanji?: string | null;
    nicknames?: string[];
    favorites?: number;
    about?: string | null;
};
export type CharacterAnime = {
    data?: {
        role?: string;
        anime?: AnimeMeta;
    }[];
};
export type CharacterManga = {
    data?: {
        role?: string;
        manga?: MangaMeta;
    }[];
};
export type CharacterVoiceActors = {
    data?: {
        language?: string;
        person?: PersonMeta;
    }[];
};
export type CharacterPictures = {
    data?: {
        image_url?: string | null;
        large_image_url?: string | null;
    }[];
};
export type Club = {
    mal_id?: number;
    name?: string;
    url?: string;
    images?: CommonImages;
    members?: number;
    category?:
        | 'actors & artists'
        | 'anime'
        | 'characters'
        | 'cities & neighborhoods'
        | 'companies'
        | 'conventions'
        | 'games'
        | 'japan'
        | 'manga'
        | 'music'
        | 'others'
        | 'schools';
    created?: string;
    access?: 'public' | 'private' | 'secret';
};
export type ClubMember = {
    data?: {
        username?: string;
        url?: string;
        images?: UserImages;
    }[];
};
export type ClubStaff = {
    data?: {
        url?: string;
        username?: string;
    }[];
};
export type ClubRelations = {
    data?: {
        anime?: MalUrl[];
        manga?: MalUrl[];
        characters?: MalUrl[];
    };
};
export type Genre = {
    mal_id?: number;
    name?: string;
    url?: string;
    count?: number;
};
export type Genres = {
    data?: Genre[];
};
export type GenreQueryFilter = 'genres' | 'explicit_genres' | 'themes' | 'demographics';
export type Magazine = {
    mal_id?: number;
    name?: string;
    url?: string;
    count?: number;
};
export type Magazines = {
    data?: Magazine[];
} & Pagination;
export type MagazinesQueryOrderby = 'mal_id' | 'name' | 'count';
export type SearchQuerySort = 'desc' | 'asc';
export type MangaFull = {
    mal_id?: number;
    url?: string;
    images?: MangaImages;
    approved?: boolean;
    titles?: Title[];
    title?: string;
    title_english?: string | null;
    title_japanese?: string | null;
    title_synonyms?: string[];
    type?:
        | (
              | 'Manga'
              | 'Novel'
              | 'Light Novel'
              | 'One-shot'
              | 'Doujinshi'
              | 'Manhua'
              | 'Manhwa'
              | 'OEL'
          )
        | null;
    chapters?: number | null;
    volumes?: number | null;
    status?: 'Finished' | 'Publishing' | 'On Hiatus' | 'Discontinued' | 'Not yet published';
    publishing?: boolean;
    published?: Daterange;
    score?: number | null;
    scored_by?: number | null;
    rank?: number | null;
    popularity?: number | null;
    members?: number | null;
    favorites?: number | null;
    synopsis?: string | null;
    background?: string | null;
    authors?: MalUrl[];
    serializations?: MalUrl[];
    genres?: MalUrl[];
    explicit_genres?: MalUrl[];
    themes?: MalUrl[];
    demographics?: MalUrl[];
    relations?: {
        relation?: string;
        entry?: MalUrl[];
    }[];
    external?: {
        name?: string;
        url?: string;
    }[];
};
export type Manga = {
    mal_id?: number;
    url?: string;
    images?: MangaImages;
    approved?: boolean;
    titles?: Title[];
    title?: string;
    title_english?: string | null;
    title_japanese?: string | null;
    type?:
        | (
              | 'Manga'
              | 'Novel'
              | 'Light Novel'
              | 'One-shot'
              | 'Doujinshi'
              | 'Manhua'
              | 'Manhwa'
              | 'OEL'
          )
        | null;
    chapters?: number | null;
    volumes?: number | null;
    status?: 'Finished' | 'Publishing' | 'On Hiatus' | 'Discontinued' | 'Not yet published';
    publishing?: boolean;
    published?: Daterange;
    score?: number | null;
    scored_by?: number | null;
    rank?: number | null;
    popularity?: number | null;
    members?: number | null;
    favorites?: number | null;
    synopsis?: string | null;
    background?: string | null;
    authors?: MalUrl[];
    serializations?: MalUrl[];
    genres?: MalUrl[];
    explicit_genres?: MalUrl[];
    themes?: MalUrl[];
    demographics?: MalUrl[];
};
export type CharacterMeta = {
    mal_id?: number;
    url?: string;
    images?: CharacterImages;
    name?: string;
};
export type MangaCharacters = {
    data?: {
        character?: CharacterMeta;
        role?: string;
    }[];
};
export type MangaNews = Pagination & News;
export type MangaPictures = {
    data?: MangaImages[];
};
export type MangaStatistics = {
    data?: {
        reading?: number;
        completed?: number;
        on_hold?: number;
        dropped?: number;
        plan_to_read?: number;
        total?: number;
        scores?: {
            score?: number;
            votes?: number;
            percentage?: number;
        }[];
    };
};
export type MangaUserupdates = {
    data?: {
        user?: UserMeta;
        score?: number | null;
        status?: string;
        volumes_read?: number;
        volumes_total?: number;
        chapters_read?: number;
        chapters_total?: number;
        date?: string;
    }[];
} & Pagination;
export type MangaReview = {
    mal_id?: number;
    url?: string;
    type?: string;
    reactions?: {
        overall?: number;
        nice?: number;
        love_it?: number;
        funny?: number;
        confusing?: number;
        informative?: number;
        well_written?: number;
        creative?: number;
    };
    date?: string;
    review?: string;
    score?: number;
    tags?: string[];
    is_spoiler?: boolean;
    is_preliminary?: boolean;
};
export type MangaReviews = {
    data?: ({
        user?: UserMeta;
    } & MangaReview)[];
} & Pagination;
export type PersonFull = {
    mal_id?: number;
    url?: string;
    website_url?: string | null;
    images?: PeopleImages;
    name?: string;
    given_name?: string | null;
    family_name?: string | null;
    alternate_names?: string[];
    birthday?: string | null;
    favorites?: number;
    about?: string | null;
    anime?: {
        position?: string;
        anime?: AnimeMeta;
    }[];
    manga?: {
        position?: string;
        manga?: MangaMeta;
    }[];
    voices?: {
        role?: string;
        anime?: AnimeMeta;
        character?: CharacterMeta;
    }[];
};
export type Person = {
    mal_id?: number;
    url?: string;
    website_url?: string | null;
    images?: PeopleImages;
    name?: string;
    given_name?: string | null;
    family_name?: string | null;
    alternate_names?: string[];
    birthday?: string | null;
    favorites?: number;
    about?: string | null;
};
export type PersonAnime = {
    data?: {
        position?: string;
        anime?: AnimeMeta;
    }[];
};
export type PersonVoiceActingRoles = {
    data?: {
        role?: string;
        anime?: AnimeMeta;
        character?: CharacterMeta;
    }[];
};
export type PersonManga = {
    data?: {
        position?: string;
        manga?: MangaMeta;
    }[];
};
export type PersonPictures = {
    data?: PeopleImages[];
};
export type Producer = {
    mal_id?: number;
    url?: string;
    titles?: Title[];
    images?: CommonImages;
    favorites?: number;
    count?: number;
    established?: string | null;
    about?: string | null;
};
export type ProducerFull = {
    mal_id?: number;
    url?: string;
    titles?: Title[];
    images?: CommonImages;
    favorites?: number;
    count?: number;
    established?: string | null;
    about?: string | null;
    external?: {
        name?: string;
        url?: string;
    }[];
};
export type UserProfile = {
    mal_id?: number | null;
    username?: string;
    url?: string;
    images?: UserImages;
    last_online?: string | null;
    gender?: string | null;
    birthday?: string | null;
    location?: string | null;
    joined?: string | null;
};
export type UserById = {
    url?: string;
    username?: string;
};
export type Recommendations = {
    data?: {
        mal_id?: string;
        entry?: (AnimeMeta | MangaMeta)[];
        content?: string;
        user?: UserById;
    }[];
} & Pagination;
export type PaginationPlus = {
    pagination?: {
        last_visible_page?: number;
        has_next_page?: boolean;
        items?: {
            count?: number;
            total?: number;
            per_page?: number;
        };
    };
};
export type Schedules = {
    data?: Anime[];
} & PaginationPlus;
export type AnimeSearch = {
    data?: Anime[];
} & PaginationPlus;
export type AnimeSearchQueryType = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
export type AnimeSearchQueryStatus = 'airing' | 'complete' | 'upcoming';
export type AnimeSearchQueryRating = 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
export type AnimeSearchQueryOrderby =
    | 'mal_id'
    | 'title'
    | 'start_date'
    | 'end_date'
    | 'episodes'
    | 'score'
    | 'scored_by'
    | 'rank'
    | 'popularity'
    | 'members'
    | 'favorites';
export type MangaSearch = {
    data?: Manga[];
} & PaginationPlus;
export type MangaSearchQueryType =
    | 'manga'
    | 'novel'
    | 'lightnovel'
    | 'oneshot'
    | 'doujin'
    | 'manhwa'
    | 'manhua';
export type MangaSearchQueryStatus =
    | 'publishing'
    | 'complete'
    | 'hiatus'
    | 'discontinued'
    | 'upcoming';
export type MangaSearchQueryOrderby =
    | 'mal_id'
    | 'title'
    | 'start_date'
    | 'end_date'
    | 'chapters'
    | 'volumes'
    | 'score'
    | 'scored_by'
    | 'rank'
    | 'popularity'
    | 'members'
    | 'favorites';
export type PeopleSearch = {
    data?: Person[];
} & PaginationPlus;
export type PeopleSearchQueryOrderby = 'mal_id' | 'name' | 'birthday' | 'favorites';
export type CharactersSearch = {
    data?: Character[];
} & PaginationPlus;
export type CharactersSearchQueryOrderby = 'mal_id' | 'name' | 'favorites';
export type UsersSearch = {
    data?: {
        url?: string;
        username?: string;
        images?: UserImages;
        last_online?: string;
    }[];
} & Pagination;
export type UsersSearchQueryGender = 'any' | 'male' | 'female' | 'nonbinary';
export type ClubsSearch = {
    data?: Club[];
} & Pagination;
export type ClubSearchQueryType = 'public' | 'private' | 'secret';
export type ClubSearchQueryCategory =
    | 'anime'
    | 'manga'
    | 'actors_and_artists'
    | 'characters'
    | 'cities_and_neighborhoods'
    | 'companies'
    | 'conventions'
    | 'games'
    | 'japan'
    | 'music'
    | 'other'
    | 'schools';
export type ClubSearchQueryOrderby = 'mal_id' | 'name' | 'members_count' | 'created';
export type Producers = {
    data?: Producer[];
} & Pagination;
export type ProducersQueryOrderby = 'mal_id' | 'count' | 'favorites' | 'established';
export type Seasons = {
    data?: {
        year?: number;
        seasons?: string[];
    }[];
};
export type TopAnimeFilter = 'airing' | 'upcoming' | 'bypopularity' | 'favorite';
export type TopMangaFilter = 'publishing' | 'upcoming' | 'bypopularity' | 'favorite';
export type TopReviewsTypeEnum = 'anime' | 'manga';
export type UserProfileFull = {
    mal_id?: number | null;
    username?: string;
    url?: string;
    images?: UserImages;
    last_online?: string | null;
    gender?: string | null;
    birthday?: string | null;
    location?: string | null;
    joined?: string | null;
    statistics?: {
        anime?: {
            days_watched?: number;
            mean_score?: number;
            watching?: number;
            completed?: number;
            on_hold?: number;
            dropped?: number;
            plan_to_watch?: number;
            total_entries?: number;
            rewatched?: number;
            episodes_watched?: number;
        };
        manga?: {
            days_read?: number;
            mean_score?: number;
            reading?: number;
            completed?: number;
            on_hold?: number;
            dropped?: number;
            plan_to_read?: number;
            total_entries?: number;
            reread?: number;
            chapters_read?: number;
            volumes_read?: number;
        };
    };
    external?: {
        name?: string;
        url?: string;
    }[];
};
export type UserStatistics = {
    data?: {
        anime?: {
            days_watched?: number;
            mean_score?: number;
            watching?: number;
            completed?: number;
            on_hold?: number;
            dropped?: number;
            plan_to_watch?: number;
            total_entries?: number;
            rewatched?: number;
            episodes_watched?: number;
        };
        manga?: {
            days_read?: number;
            mean_score?: number;
            reading?: number;
            completed?: number;
            on_hold?: number;
            dropped?: number;
            plan_to_read?: number;
            total_entries?: number;
            reread?: number;
            chapters_read?: number;
            volumes_read?: number;
        };
    };
};
export type MalUrl2 = {
    mal_id?: number;
    type?: string;
    title?: string;
    url?: string;
};
export type UserFavorites = {
    anime?: ({
        type?: string;
        start_year?: number;
    } & AnimeMeta)[];
    manga?: ({
        type?: string;
        start_year?: number;
    } & MangaMeta)[];
    characters?: (CharacterMeta & MalUrl2)[];
    people?: CharacterMeta[];
};
export type UserUpdates = {
    data?: {
        anime?: ({
            entry?: AnimeMeta;
        } & {
            score?: number | null;
            status?: string;
            episodes_seen?: number | null;
            episodes_total?: number | null;
            date?: string;
        })[];
        manga?: ({
            entry?: MangaMeta;
        } & {
            score?: number | null;
            status?: string;
            chapters_read?: number | null;
            chapters_total?: number | null;
            volumes_read?: number | null;
            volumes_total?: number | null;
            date?: string;
        })[];
    };
};
export type UserAbout = {
    data?: {
        about?: string | null;
    }[];
};
export type History = {
    entry?: MalUrl;
    increment?: number;
    date?: string;
};
export type UserHistory = {
    data?: History[];
};
export type UserFriends = {
    data?: ({
        user?: UserMeta;
    } & {
        last_online?: string;
        friends_since?: string;
    })[];
} & Pagination;
export type UserAnimeListStatusFilter =
    | 'all'
    | 'watching'
    | 'completed'
    | 'onhold'
    | 'dropped'
    | 'plantowatch';
export type UserMangaListStatusFilter =
    | 'all'
    | 'reading'
    | 'completed'
    | 'onhold'
    | 'dropped'
    | 'plantoread';
export type UserClubs = {
    data?: {
        mal_id?: number;
        name?: string;
        url?: string;
    }[];
} & Pagination;
export type WatchEpisodes = {
    data?: {
        entry?: AnimeMeta;
        episodes?: {
            mal_id?: string;
            url?: string;
            title?: string;
            premium?: boolean;
        }[];
        region_locked?: boolean;
    }[];
} & Pagination;
export type WatchPromos = Pagination &
    ({
        title?: string;
    } & {
        data?: {
            entry?: AnimeMeta;
            trailer?: Trailer[];
        }[];
    });
export const {
    useGetAnimeFullByIdQuery,
    useLazyGetAnimeFullByIdQuery,
    useGetAnimeByIdQuery,
    useLazyGetAnimeByIdQuery,
    useGetAnimeCharactersQuery,
    useLazyGetAnimeCharactersQuery,
    useGetAnimeStaffQuery,
    useLazyGetAnimeStaffQuery,
    useGetAnimeEpisodesQuery,
    useLazyGetAnimeEpisodesQuery,
    useGetAnimeEpisodeByIdQuery,
    useLazyGetAnimeEpisodeByIdQuery,
    useGetAnimeNewsQuery,
    useLazyGetAnimeNewsQuery,
    useGetAnimeForumQuery,
    useLazyGetAnimeForumQuery,
    useGetAnimeVideosQuery,
    useLazyGetAnimeVideosQuery,
    useGetAnimeVideosEpisodesQuery,
    useLazyGetAnimeVideosEpisodesQuery,
    useGetAnimePicturesQuery,
    useLazyGetAnimePicturesQuery,
    useGetAnimeStatisticsQuery,
    useLazyGetAnimeStatisticsQuery,
    useGetAnimeMoreInfoQuery,
    useLazyGetAnimeMoreInfoQuery,
    useGetAnimeRecommendationsQuery,
    useLazyGetAnimeRecommendationsQuery,
    useGetAnimeUserUpdatesQuery,
    useLazyGetAnimeUserUpdatesQuery,
    useGetAnimeReviewsQuery,
    useLazyGetAnimeReviewsQuery,
    useGetAnimeRelationsQuery,
    useLazyGetAnimeRelationsQuery,
    useGetAnimeThemesQuery,
    useLazyGetAnimeThemesQuery,
    useGetAnimeExternalQuery,
    useLazyGetAnimeExternalQuery,
    useGetAnimeStreamingQuery,
    useLazyGetAnimeStreamingQuery,
    useGetCharacterFullByIdQuery,
    useLazyGetCharacterFullByIdQuery,
    useGetCharacterByIdQuery,
    useLazyGetCharacterByIdQuery,
    useGetCharacterAnimeQuery,
    useLazyGetCharacterAnimeQuery,
    useGetCharacterMangaQuery,
    useLazyGetCharacterMangaQuery,
    useGetCharacterVoiceActorsQuery,
    useLazyGetCharacterVoiceActorsQuery,
    useGetCharacterPicturesQuery,
    useLazyGetCharacterPicturesQuery,
    useGetClubsByIdQuery,
    useLazyGetClubsByIdQuery,
    useGetClubMembersQuery,
    useLazyGetClubMembersQuery,
    useGetClubStaffQuery,
    useLazyGetClubStaffQuery,
    useGetClubRelationsQuery,
    useLazyGetClubRelationsQuery,
    useGetAnimeGenresQuery,
    useLazyGetAnimeGenresQuery,
    useGetMangaGenresQuery,
    useLazyGetMangaGenresQuery,
    useGetMagazinesQuery,
    useLazyGetMagazinesQuery,
    useGetMangaFullByIdQuery,
    useLazyGetMangaFullByIdQuery,
    useGetMangaByIdQuery,
    useLazyGetMangaByIdQuery,
    useGetMangaCharactersQuery,
    useLazyGetMangaCharactersQuery,
    useGetMangaNewsQuery,
    useLazyGetMangaNewsQuery,
    useGetMangaTopicsQuery,
    useLazyGetMangaTopicsQuery,
    useGetMangaPicturesQuery,
    useLazyGetMangaPicturesQuery,
    useGetMangaStatisticsQuery,
    useLazyGetMangaStatisticsQuery,
    useGetMangaMoreInfoQuery,
    useLazyGetMangaMoreInfoQuery,
    useGetMangaRecommendationsQuery,
    useLazyGetMangaRecommendationsQuery,
    useGetMangaUserUpdatesQuery,
    useLazyGetMangaUserUpdatesQuery,
    useGetMangaReviewsQuery,
    useLazyGetMangaReviewsQuery,
    useGetMangaRelationsQuery,
    useLazyGetMangaRelationsQuery,
    useGetMangaExternalQuery,
    useLazyGetMangaExternalQuery,
    useGetPersonFullByIdQuery,
    useLazyGetPersonFullByIdQuery,
    useGetPersonByIdQuery,
    useLazyGetPersonByIdQuery,
    useGetPersonAnimeQuery,
    useLazyGetPersonAnimeQuery,
    useGetPersonVoicesQuery,
    useLazyGetPersonVoicesQuery,
    useGetPersonMangaQuery,
    useLazyGetPersonMangaQuery,
    useGetPersonPicturesQuery,
    useLazyGetPersonPicturesQuery,
    useGetProducerByIdQuery,
    useLazyGetProducerByIdQuery,
    useGetProducerFullByIdQuery,
    useLazyGetProducerFullByIdQuery,
    useGetProducerExternalQuery,
    useLazyGetProducerExternalQuery,
    useGetRandomAnimeQuery,
    useLazyGetRandomAnimeQuery,
    useGetRandomMangaQuery,
    useLazyGetRandomMangaQuery,
    useGetRandomCharactersQuery,
    useLazyGetRandomCharactersQuery,
    useGetRandomPeopleQuery,
    useLazyGetRandomPeopleQuery,
    useGetRandomUsersQuery,
    useLazyGetRandomUsersQuery,
    useGetRecentAnimeRecommendationsQuery,
    useLazyGetRecentAnimeRecommendationsQuery,
    useGetRecentMangaRecommendationsQuery,
    useLazyGetRecentMangaRecommendationsQuery,
    useGetRecentAnimeReviewsQuery,
    useLazyGetRecentAnimeReviewsQuery,
    useGetRecentMangaReviewsQuery,
    useLazyGetRecentMangaReviewsQuery,
    useGetSchedulesQuery,
    useLazyGetSchedulesQuery,
    useGetAnimeSearchQuery,
    useLazyGetAnimeSearchQuery,
    useGetMangaSearchQuery,
    useLazyGetMangaSearchQuery,
    useGetPeopleSearchQuery,
    useLazyGetPeopleSearchQuery,
    useGetCharactersSearchQuery,
    useLazyGetCharactersSearchQuery,
    useGetUsersSearchQuery,
    useLazyGetUsersSearchQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useGetClubsSearchQuery,
    useLazyGetClubsSearchQuery,
    useGetProducersQuery,
    useLazyGetProducersQuery,
    useGetSeasonNowQuery,
    useLazyGetSeasonNowQuery,
    useGetSeasonQuery,
    useLazyGetSeasonQuery,
    useGetSeasonsListQuery,
    useLazyGetSeasonsListQuery,
    useGetSeasonUpcomingQuery,
    useLazyGetSeasonUpcomingQuery,
    useGetTopAnimeQuery,
    useLazyGetTopAnimeQuery,
    useGetTopMangaQuery,
    useLazyGetTopMangaQuery,
    useGetTopPeopleQuery,
    useLazyGetTopPeopleQuery,
    useGetTopCharactersQuery,
    useLazyGetTopCharactersQuery,
    useGetTopReviewsQuery,
    useLazyGetTopReviewsQuery,
    useGetUserFullProfileQuery,
    useLazyGetUserFullProfileQuery,
    useGetUserProfileQuery,
    useLazyGetUserProfileQuery,
    useGetUserStatisticsQuery,
    useLazyGetUserStatisticsQuery,
    useGetUserFavoritesQuery,
    useLazyGetUserFavoritesQuery,
    useGetUserUpdatesQuery,
    useLazyGetUserUpdatesQuery,
    useGetUserAboutQuery,
    useLazyGetUserAboutQuery,
    useGetUserHistoryQuery,
    useLazyGetUserHistoryQuery,
    useGetUserFriendsQuery,
    useLazyGetUserFriendsQuery,
    useGetUserAnimelistQuery,
    useLazyGetUserAnimelistQuery,
    useGetUserMangaListQuery,
    useLazyGetUserMangaListQuery,
    useGetUserReviewsQuery,
    useLazyGetUserReviewsQuery,
    useGetUserRecommendationsQuery,
    useLazyGetUserRecommendationsQuery,
    useGetUserClubsQuery,
    useLazyGetUserClubsQuery,
    useGetUserExternalQuery,
    useLazyGetUserExternalQuery,
    useGetWatchRecentEpisodesQuery,
    useLazyGetWatchRecentEpisodesQuery,
    useGetWatchPopularEpisodesQuery,
    useLazyGetWatchPopularEpisodesQuery,
    useGetWatchRecentPromosQuery,
    useLazyGetWatchRecentPromosQuery,
    useGetWatchPopularPromosQuery,
    useLazyGetWatchPopularPromosQuery,
} = injectedRtkApi;
