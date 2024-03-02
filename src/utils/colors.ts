import { MediaListStatus, MediaStatus } from '@/store/services/anilist/generated-anilist';

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
        case MediaListStatus.Completed:
            return '#00FF00';
        case MediaListStatus.Planning:
            return '#FFA500';
        case MediaListStatus.Dropped:
        case MediaListStatus.Paused:
            return '#FF0000';
        case MediaListStatus.Current:
        case MediaListStatus.Repeating:
            return '#3AADE9';
    }
};

export const getStatusColor = (status: MediaStatus) => {
    switch (status) {
        case MediaStatus.Releasing:
            return '';
    }
};

export const rgbToRgba = (rgb: string, alpha: number) => {
    if (rgb.includes('rgba')) {
        return rgb;
    }
    return rgb.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
};

export const getPieChartColor = (index: number, primaryColor: string) => {
    switch (index) {
        case 0:
            return primaryColor;
        case 1:
            return 'grey';
        case 2:
            return 'red';
        case 3:
            return 'orange';
        case 4:
            return 'purple';
        case 5:
            return 'pink';
        case 6:
            return 'blue';
        default:
            break;
    }
};
