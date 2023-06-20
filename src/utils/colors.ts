import { MediaListStatus } from '../app/services/anilist/generated-anilist';

const RED = '#FF0000';
const YELLOW = '#FFA500';
const GREEN = '#00d400';

const between = (score: number, min: number, max: number): boolean => {
    return score >= min && score <= max;
};

const getMalColor = (
    score: number,
    colors: {
        red: number;
        yellow: number;
    },
) => {
    const maxRed = colors.red * 0.1;
    const maxYellow = colors.yellow * 0.1;
    if (between(score, 0, maxRed)) {
        return RED;
    } else if (between(score, maxRed, maxYellow)) {
        return YELLOW;
    } else if (between(score, maxYellow, 10)) {
        return GREEN;
    }
};

export const getScoreColor = (
    score: number,
    colors: {
        red: number;
        yellow: number;
    },
    isMal = false,
): string => {
    const maxRed = colors.red;
    const maxYellow = colors.yellow;

    if (isMal) {
        return getMalColor(score, colors);
    }

    if (between(score, 0, colors.red)) {
        return RED;
    } else if (between(score, maxRed + 1, maxYellow)) {
        return YELLOW;
    } else if (between(score, maxYellow + 1, 100)) {
        return GREEN;
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
