import { MediaListStatus } from '@/store/services/anilist/generated-anilist';

export const StatusColors = {
    [MediaListStatus.Current]: 'rgba(146, 86, 243, 1)',
    [MediaListStatus.Planning]: 'rgba(2, 169, 255, 1)',
    [MediaListStatus.Completed]: 'rgba(104, 214, 57, 1)',
    [MediaListStatus.Dropped]: 'rgba(232, 93, 117, 1)',
    [MediaListStatus.Paused]: 'rgba(247, 121, 164, 1)',
};

export const ScoreColors = {
    10: 'rgba(210, 72, 45, 1)',
    20: 'rgba(210, 100, 45, 1)',
    30: 'rgba(210, 128, 45, 1)',
    40: 'rgba(210, 155, 45, 1)',
    50: 'rgba(210, 183, 45, 1)',
    60: 'rgba(210, 210, 45, 1)',
    70: 'rgba(183, 210, 45, 1)',
    80: 'rgba(155, 210, 45, 1)',
    90: 'rgba(128, 210, 45, 1)',
    100: 'rgba(100, 210, 45, 1)',
};
