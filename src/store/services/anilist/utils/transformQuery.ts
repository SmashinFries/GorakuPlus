import { getTimeUntil } from '../../../../utils';
import {
    AniMediaQuery,
    AnimeTrendingQuery,
    MediaFormat,
    MediaRelation,
    MediaStatus,
    UserListCollectionQuery,
    WeeklyAnimeQuery,
} from '../generated-anilist';

export const transformMediaDates = (media: AnimeTrendingQuery) => {
    const newResponse = media;
    // {format === MediaFormat.Movie ? 'Movie:' : 'EP'}{' '}
    //                 {format !== MediaFormat.Movie && nextEpisode?.episode + ': '}
    //                 {timeTill}
    if (!newResponse?.Page) return newResponse;
    for (const anime of newResponse?.Page?.media) {
        if (anime.nextAiringEpisode) {
            const timeTill = getTimeUntil(anime.nextAiringEpisode.airingAt);
            const prefix =
                anime.format === MediaFormat.Movie
                    ? 'Movie: '
                    : `EP ${anime.nextAiringEpisode.episode}: `;
            anime.nextAiringEpisode.timeUntilAiring = prefix + timeTill;
        }
    }
    return newResponse;
};

export const transformWeeklyDates = (media: WeeklyAnimeQuery) => {
    const today = new Date().getTime() / 1000;
    const newResponse = media;
    // {format === MediaFormat.Movie ? 'Movie:' : 'EP'}{' '}
    //                 {format !== MediaFormat.Movie && nextEpisode?.episode + ': '}
    //                 {timeTill}
    if (!newResponse?.Page) return newResponse;
    for (const anime of newResponse?.Page?.airingSchedules) {
        if (anime.airingAt) {
            const timeTill = getTimeUntil(anime.airingAt);
            const prefix =
                anime.media.format === MediaFormat.Movie ? 'Movie: ' : `EP ${anime.episode}: `;
            anime.timeUntilAiring = anime.airingAt < today ? 'Aired' : prefix + timeTill;
        }
    }
    return newResponse;
};

export const transformListDates = (types: UserListCollectionQuery) => {
    const newResponse = types;
    for (const parent of newResponse.MediaListCollection.lists) {
        for (const entry of parent.entries) {
            if (entry.media.nextAiringEpisode) {
                const timeTill = getTimeUntil(entry.media.nextAiringEpisode.airingAt);
                const prefix = entry.media.format === MediaFormat.Movie ? 'Movie: ' : 'EP: ';
                entry.media.nextAiringEpisode.timeUntilAiring = prefix + timeTill;
            }
        }
    }
    return newResponse;
};

export const transformMediaSorts = (media: AniMediaQuery) => {
    const newResponse = media;
    if (newResponse.Media.relations) {
        const sourceRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Source;
            }) ?? [];
        const adaptationRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Adaptation;
            }) ?? [];
        const prequelRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Prequel;
            }) ?? [];
        const sequelRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Sequel;
            }) ?? [];
        const parentRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Parent;
            }) ?? [];
        const sideStoryRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.SideStory;
            }) ?? [];
        const summaryRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Summary;
            }) ?? [];
        const alternativeRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Alternative;
            }) ?? [];
        const characterRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Character;
            }) ?? [];
        const spinOffRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.SpinOff;
            }) ?? [];
        const otherRelations =
            newResponse.Media.relations.edges.filter((edge) => {
                return edge.relationType === MediaRelation.Other;
            }) ?? [];
        const newRelations = [
            ...sourceRelations,
            ...adaptationRelations,
            ...prequelRelations,
            ...sequelRelations,
            ...alternativeRelations,
            ...sideStoryRelations,
            ...spinOffRelations,
            ...summaryRelations,
            ...characterRelations,
            ...otherRelations,
            ...parentRelations,
        ];
        newResponse.Media.relations.edges = newRelations;
    }
    return newResponse;
};
