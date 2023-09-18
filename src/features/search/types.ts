import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaType,
} from '../../app/services/anilist/generated-anilist';

export type MediaSearchSelection = MediaType.Anime | MediaType.Manga | 'NOVEL';

export type SearchTypes =
    | MediaType.Anime
    | MediaType.Manga
    | 'users'
    | 'characters'
    | 'staff'
    | 'studios';

export type CommonSort =
    | 'Trending'
    | 'Popularity'
    | 'Score'
    | 'Updated At'
    | 'Start Date'
    | 'End Date';
export type AnimeSort = CommonSort | 'Episodes' | 'Duration';
export type MangaSort = CommonSort | 'Chapters' | 'Volumes';
export type SortCategories =
    | 'Search Match'
    | 'Trending'
    | 'Popularity'
    | 'Score'
    | 'Updated At'
    | 'Episodes'
    | 'Duration'
    | 'Chapters'
    | 'Volumes'
    | 'Start Date'
    | 'End Date';
