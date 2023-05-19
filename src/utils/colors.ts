import { MediaListStatus } from '../app/services/anilist/generated-anilist';

const between = (score: number, min: number, max: number): boolean => {
    return score >= min && score <= max;
};

export const getScoreColor = (score: number): string => {
    if (between(score, 0, 64)) {
        return '#FF0000';
    } else if (between(score, 65, 74)) {
        return '#FFA500';
    } else if (between(score, 75, 100)) {
        return '#00d400';
    } else {
        return '#000000';
    }
};

export const listColor = (status: MediaListStatus) => {
    switch (status) {
        case 'COMPLETED':
            return '#00FF00';
        case 'PLANNING':
            return '#FFA500';
        case 'DROPPED':
        case 'PAUSED':
            return '#FF0000';
        case 'CURRENT':
        case 'REPEATING':
            return '#3AADE9';
    }
};
