import { useEffect, useState } from 'react';
import {
    WeeklyAnimeQuery,
    useLazyWeeklyAnimeQuery,
} from '@/store/services/anilist/generated-anilist';
import { getWeekStartEnd } from '@/utils';

export const useCalendar = () => {
    const { start, end } = getWeekStartEnd();
    const [getWeeklyAnime] = useLazyWeeklyAnimeQuery();
    const [data, setData] = useState<WeeklyAnimeQuery['Page']['airingSchedules']>([]);
    const [loading, setLoading] = useState(true);

    const getAllResults = async () => {
        const tempData = [];
        let page = 1;
        let fetchMore = true;
        while (fetchMore === true) {
            // console.log(`Fetching page ${page}`);
            try {
                const resp = await getWeeklyAnime({
                    page: page,
                    weekStart: start,
                    weekEnd: end,
                }).unwrap();
                if (resp.Page?.airingSchedules) tempData.push(...resp.Page?.airingSchedules);
                // setData((prev) => [...prev, ...resp.Page?.airingSchedules]);

                if (resp.Page?.pageInfo?.hasNextPage) {
                    page = page + 1;
                } else {
                    fetchMore = false;
                }
            } catch (e) {
                // console.log('PROBLEM!', e);
                fetchMore = false;
            }
        }
        setData((prev) => tempData);
        setLoading(false);
    };

    useEffect(() => {
        data.length < 1 && getAllResults();
    }, []);

    return { data, week: { start, end }, loading, refetch: getAllResults };
};
