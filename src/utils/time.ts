import { useEffect, useState } from 'react';
import { FuzzyDate } from '@/store/services/anilist/generated-anilist';

const monthByNumber = {
    [1]: 'Jan',
    [2]: 'Feb',
    [3]: 'Mar',
    [4]: 'Apr',
    [5]: 'May',
    [6]: 'June',
    [7]: 'July',
    [8]: 'Aug',
    [9]: 'Sep',
    [10]: 'Oct',
    [11]: 'Nov',
    [12]: 'Dec',
};

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState<number>();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return { currentTime };
};

type TokenTimeProps = {
    death?: number;
};
export const useTokenTime = ({ death }: TokenTimeProps) => {
    const [aniTokenTime, setAniTokenTime] = useState<string>();

    useEffect(() => {
        if (death) {
            // const anilistTime = new Date(new Date().getTime() + anilistSeconds * 1000).getTime();
            const interval = setInterval(() => {
                const today = new Date().getTime();
                const futureDate = new Date(death * 1000).getTime();
                const diffTime = Math.abs(futureDate - today);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
                const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
                const diffSeconds = Math.floor((diffTime / 1000) % 60);
                setAniTokenTime(`${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    return { aniTokenTime };
};

export const convertDate = (date: FuzzyDate, bdayFormat?: boolean): string | null => {
    if (!date) return null;
    const { year, month, day } = date;

    if (bdayFormat) {
        // Jul 11, 1966
        return month ? `${monthByNumber[month]} ${day ?? '??'}, ${year ?? '????'}` : null;
    }

    if (!date?.day && !date?.month && !date?.year) return null;

    return `${month ?? '??'}-${day ?? '??'}-${year ?? '????'}`;
};

export const getTimeUntil = (time: number, format: 'until' | 'createdAt' = 'until') => {
    const today = new Date().getTime();
    const episodeDate = new Date(time * 1000).getTime();
    const diffTime = Math.abs(episodeDate - today);
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7 * 4));
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

    if (format === 'until')
        return `${diffDays > 0 ? `${diffDays}d ` : ''}${diffHours > 0 ? `${diffHours}h ` : ''}${
            diffMinutes > 0 ? `${diffMinutes}m` : ''
        }`;
    if (format === 'createdAt') {
        if (diffMonths > 0)
            return `${diffMonths > 1 ? `${diffMonths} months` : `${diffMonths} month`} ago`;
        if (diffWeeks > 0)
            return `${diffWeeks > 1 ? `${diffWeeks} weeks` : `${diffWeeks} week`} ago`;
        if (diffDays > 0) return `${diffDays > 1 ? `${diffDays} days` : `${diffDays} day`} ago`;
        if (diffHours > 0)
            return `${diffHours > 1 ? `${diffHours} hours` : `${diffHours} hour`} ago`;
        if (diffMinutes > 0)
            return `${diffMinutes > 1 ? `${diffMinutes} minutes` : `${diffMinutes} minute`} ago`;
    }
};

export const useTimeUntil = (time: number) => {
    const [timeUntil, setTimeUntil] = useState<string>(getTimeUntil(time));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = getTimeUntil(time);
            setTimeUntil(newTime);
        }, 60000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return { timeUntil };
};

export const getFuzzytoDate = (value: FuzzyDate): Date => {
    if (!value.day || !value.month || !value.year) return null;
    const newDate = new Date(value.year, value.month, value.day);
    return newDate;
};

export const getDatetoFuzzy = (value: Date): FuzzyDate => {
    const newDate = {
        day: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear(),
    };
    return newDate;
};

export const getWeekStartEnd = () => {
    const weekStart = new Date();
    const weekEnd = new Date();
    const currentDay = weekStart.getDay();

    const startDiff = weekStart.getDate() - currentDay;
    const endDiff = weekEnd.getDate() + (6 - currentDay);

    weekStart.setDate(startDiff);
    weekEnd.setDate(endDiff);

    // set hours to 0
    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 0);

    // console.log(
    //     'Start:',
    //     Math.round(weekStart.getTime() / 1000),
    //     '/',
    //     weekStart.toDateString(),
    //     '/',
    //     weekStart.toTimeString(),
    // );
    // console.log(
    //     'End:',
    //     Math.round(weekEnd.getTime() / 1000),
    //     '/',
    //     weekEnd.toDateString(),
    //     '/',
    //     weekEnd.toTimeString(),
    // );

    return {
        start: Math.round(weekStart.getTime() / 1000),
        end: Math.round(weekEnd.getTime() / 1000),
    };
};
