import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaSort,
    MediaStatus,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';

type FilterOptions = keyof ExploreMediaQueryVariables;

const commonSorts: MediaSort[] = [
    MediaSort.Trending,
    MediaSort.Popularity,
    MediaSort.Score,
    MediaSort.UpdatedAt,
];

export const animeSort: MediaSort[] = [...commonSorts, MediaSort.Episodes, MediaSort.Duration];

export const mangaNovelSort: MediaSort[] = [...commonSorts, MediaSort.Chapters, MediaSort.Volumes];

export const mediaStatusOptions = ['ANY', ...Object.values(MediaStatus)];

export const ANIME_FORMATS: MediaFormat[] = [
    MediaFormat.TvShort,
    MediaFormat.Tv,
    MediaFormat.Movie,
    MediaFormat.Ova,
    MediaFormat.Ona,
    MediaFormat.Special,
    MediaFormat.Music,
];
export const MANGA_FORMATS: MediaFormat[] = [MediaFormat.Manga, MediaFormat.OneShot];
export const NOVEL_FORMATS: MediaFormat[] = [MediaFormat.Novel];

export const ANIME_DANGER: ExploreMediaQueryVariables = {
    chapters: undefined,
    chapters_greater: undefined,
    chapters_lesser: undefined,
    volumes: undefined,
    volumes_greater: undefined,
    volumes_lesser: undefined,
};

export const MANGA_DANGER: ExploreMediaQueryVariables = {
    episodes: undefined,
    episodes_greater: undefined,
    episodes_lesser: undefined,
    duration: undefined,
    duration_greater: undefined,
    duration_lesser: undefined,
};
