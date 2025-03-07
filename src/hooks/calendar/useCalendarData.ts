import { useMemo, useState } from 'react';
import { getAniListCalendarDates, getDayStartEnd, getFuzzytoDate } from '@/utils';
import { fromDateId, toDateId } from '@marceloterreiro/flash-calendar';
import { useSeasonalAnimeAllQuery } from '@/api/anilist/extended';
import { useDisplayStore } from '@/store/displayStore';
import { useShallow } from 'zustand/react/shallow';
import { getSeason } from '@/utils/explore/helpers';
import { FuzzyDate, MediaFormat, useAiringRangeQuery } from '@/api/anilist/__genereated__/gql';

export const useCalendarData = () => {
	const { listOnly } = useDisplayStore(
		useShallow((state) => ({
			listOnly: state.calendar.list_only,
		})),
	);
	const [selectedDate, setSelectedDate] = useState<{ date: Date; id: string }>({
		date: new Date(),
		id: toDateId(new Date()),
	});
	const [selectedMonth, setSelectedMonth] = useState<{ start: Date; end: Date } | null>(
		getAniListCalendarDates(new Date(), 'month'),
	);
	const selectedSeason = useMemo(() => getSeason(selectedMonth?.start), [selectedMonth?.start]);
	const selectedDateRange = useMemo(
		() => getDayStartEnd(selectedDate.date?.getTime()),
		[selectedDate],
	);

	const seasonQuery = useSeasonalAnimeAllQuery({
		season: selectedSeason?.current_season,
		year: selectedSeason?.year,
	});
	const airingQuery = useAiringRangeQuery({
		start: selectedDateRange?.todayStart,
		end: selectedDateRange?.todayEnd,
		page: 1,
	});

	const selectedMonthAnimeDates = useMemo(
		() =>
			seasonQuery?.data
				?.filter((media) => {
					if (
						media?.airingSchedule?.nodes?.some(
							(as) =>
								selectedMonth && (as?.airingAt ?? 1) * 1000 >= selectedMonth.start.getTime() &&
								selectedMonth && (as?.airingAt ?? 1) * 1000 <= selectedMonth.end.getTime(),
						) &&
						!!media.mediaListEntry
					) {
						return true;
					}
				})
				?.flatMap((media) => {
					// If the media is movie or music, use next airing date or start date if prev aired
					if (media?.format && [MediaFormat.Movie, MediaFormat.Music].includes(media.format)) {
						return media.nextAiringEpisode
							? toDateId(new Date(media.nextAiringEpisode?.airingAt * 1000))
							: toDateId(getFuzzytoDate(media.startDate as FuzzyDate));
					} else {
						return media?.airingSchedule?.nodes?.map((as) =>
							as?.airingAt && toDateId(new Date(as?.airingAt * 1000)),
						);
					}
				}) ?? [],
		[seasonQuery?.data, selectedMonth],
	);

	const onDateChange = (dateId: string) => {
		const newDate = fromDateId(dateId);
		setSelectedMonth(getAniListCalendarDates(newDate, 'month'));
		setSelectedDate({
			date: newDate,
			id: dateId,
		});
	};

	const onMonthChange = (direction: 'prev' | 'next') => {
		if (!selectedMonth) return;
		let newMonth = new Date(
			selectedMonth.start.setMonth(
				selectedMonth.start.getMonth() + (direction === 'next' ? 1 : -1),
			),
		);
		setSelectedMonth(getAniListCalendarDates(newMonth, 'month'));
	};

	return {
		selectedDate,
		selectedMonth,
		selectedMonthAnimeDates,
		airingQuery,
		seasonQuery,
		listOnly,
		selectedDateRange,
		selectedSeason,
		onDateChange,
		onMonthChange,
	};
};
