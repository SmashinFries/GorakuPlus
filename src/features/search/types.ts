import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaType,
} from '../../app/services/anilist/generated-anilist';

export type MediaSearchSelection = MediaType.Anime | MediaType.Manga | 'NOVEL';

export type ExploreAnimeVars = Omit<ExploreMediaQueryVariables, 'type'> & { type: MediaType.Anime };
export type ExploreMangaVars = Omit<
    ExploreMediaQueryVariables,
    'type' | 'format_not_in' | 'season' | 'seasonYear'
> & {
    type: MediaType.Manga;
    format_not_in: [MediaFormat.Novel];
};

export type ExploreNovelVars = Omit<
    ExploreMediaQueryVariables,
    'type' | 'format_in' | 'season' | 'seasonYear'
> & {
    type: MediaType.Manga;
    format_in: [MediaFormat.Novel];
};

export type FilterOptions = MediaSearchSelection extends MediaType.Anime
    ? ExploreAnimeVars
    : MediaSearchSelection extends MediaType.Manga
    ? ExploreMangaVars
    : ExploreNovelVars;
