import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaType,
} from '../../app/services/anilist/generated-anilist';

export type MediaSearchSelection = MediaType.Anime | MediaType.Manga | 'NOVEL';

export type FilterTypes = 'anime' | 'manga' | 'manhwa' | 'novel';

export type CommonSort = 'Trending' | 'Popularity' | 'Score' | 'Updated At';
export type AnimeSort = CommonSort | 'Episodes' | 'Duration';
export type MangaSort = CommonSort | 'Chapters' | 'Volumes';
export type SortCategories =
    | 'Trending'
    | 'Popularity'
    | 'Score'
    | 'Updated At'
    | 'Episodes'
    | 'Duration'
    | 'Chapters'
    | 'Volumes';
