import { MediaTag } from '../app/services/anilist/generated-anilist';

export const sortTagsRank = (tags: MediaTag[]) => {
    const highestRateTags: MediaTag[] = tags ? tags.map((tag) => tag) : [];
    if (highestRateTags) {
        const sortedTags = highestRateTags?.sort((a, b) => b.rank - a.rank);
        return sortedTags;
    } else {
        return [];
    }
};
