import { MediaTag } from '@/store/services/anilist/generated-anilist';

export const sortTagsRank = (tags: MediaTag[]) => {
    const highestRateTags: MediaTag[] = tags ? tags.map((tag) => tag) : [];
    if (highestRateTags) {
        const sortedTags = highestRateTags?.sort((a, b) => b.rank - a.rank);
        return sortedTags;
    } else {
        return [];
    }
};

export const isSame = (obj1: object, obj2: object) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    return obj1Keys.length === obj2Keys.length && obj1Keys.every((key) => obj1[key] === obj2[key]);
};
