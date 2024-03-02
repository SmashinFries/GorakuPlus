import { useEffect, useState } from 'react';
import {
	WeeklyAnimeQuery,
	useLazyWeeklyAnimeQuery,
} from '@/store/services/anilist/generated-anilist';
import { getWeekStartEnd } from '@/utils';

type WeekData = {
	sunday: WeeklyAnimeQuery['Page']['airingSchedules'];
	monday: WeeklyAnimeQuery['Page']['airingSchedules'];
	tuesday: WeeklyAnimeQuery['Page']['airingSchedules'];
	wednesday: WeeklyAnimeQuery['Page']['airingSchedules'];
	thursday: WeeklyAnimeQuery['Page']['airingSchedules'];
	friday: WeeklyAnimeQuery['Page']['airingSchedules'];
	saturday: WeeklyAnimeQuery['Page']['airingSchedules'];
};

export const useCalendar = () => {
	const { start, end } = getWeekStartEnd();
	const [getWeeklyAnime, weeklyAnimeData] = useLazyWeeklyAnimeQuery();
	const [data, setData] = useState<WeekData>();
	const [loading, setLoading] = useState(true);

	const getAllResults = async () => {
		const tempData: WeeklyAnimeQuery['Page']['airingSchedules'] = [];
		let page = 1;
		let fetchMore = true;
		while (fetchMore === true) {
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
				fetchMore = false;
			}
		}
		const week_days: WeekData = {
			sunday: tempData.filter((ep) => ep.airingAt > start && ep.airingAt < start + 86400),
			monday: tempData.filter(
				(ep) => ep.airingAt > start + 86400 && ep.airingAt < start + 86400 * 2,
			),
			tuesday: tempData.filter(
				(ep) => ep.airingAt > start + 86400 * 2 && ep.airingAt < start + 86400 * 3,
			),
			wednesday: tempData.filter(
				(ep) => ep.airingAt > start + 86400 * 3 && ep.airingAt < start + 86400 * 4,
			),
			thursday: tempData.filter(
				(ep) => ep.airingAt > start + 86400 * 4 && ep.airingAt < start + 86400 * 5,
			),
			friday: tempData.filter(
				(ep) => ep.airingAt > start + 86400 * 5 && ep.airingAt < start + 86400 * 6,
			),
			saturday: tempData.filter((ep) => ep.airingAt > start + 86400 * 6 && ep.airingAt < end),
		};
		setData(week_days);
		setLoading(false);
	};

	// useEffect(() => {
	//     if (weeklyAnimeData.isError) {
	//         sendErrorMessage(`${ + ' - '}${weeklyAnimeData.error?.message}`);
	//     }
	// },[weeklyAnimeData])

	useEffect(() => {
		getAllResults();
	}, []);

	return { data, week: { start, end }, loading, refetch: getAllResults };
};
