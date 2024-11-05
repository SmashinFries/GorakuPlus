import {
	AiringSchedule,
	FuzzyDate,
	MediaStatus,
	MediaType,
} from '@/api/anilist/__genereated__/gql';
import { useEffect, useState } from 'react';

export const getOrdinalString = (number: number) => {
	const suffixes = ['th', 'st', 'nd', 'rd'];
	const value = number % 100;
	return `${value}${suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]}`;
};

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
	}, [death]);

	return { aniTokenTime };
};

export const convertDate = (date: FuzzyDate, bdayFormat?: boolean): string | null => {
	if (!date) return null;
	const { year, month, day } = date;

	if (bdayFormat) {
		// Jul 11, 1966
		return month ? `${monthByNumber[month]} ${day ?? '??'}${year ? `, ${year}` : ''}` : null;
	}

	if (!date?.day && !date?.month && !date?.year) return null;

	return `${month ?? '??'}-${day ?? '??'}-${year ?? '????'}`;
};

export const getEstimatedChapterTime = (latest: Date, freq: number): string => {
	const today = new Date();
	const futureDate = new Date(new Date(latest).setDate(latest.getDate() + freq));
	const estimated_days = Math.round(
		(futureDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
	);
	const pos_estimated_days = estimated_days > 0 ? estimated_days : estimated_days * -1;
	return `${pos_estimated_days > 1
			? pos_estimated_days?.toString() + ' days'
			: pos_estimated_days === 1
				? pos_estimated_days.toString() + ' day'
				: 'Today'
		}`;
};

export const getMovieDuration = (minutes: number) => {
	return `${Math.floor(minutes / 60)} ${Math.floor(minutes / 60) > 1 ? 'hours' : 'hour'}, ${minutes % 60} minutes`;
};

const getDateDifferences = (dates: Date[]) => {
	const day_differences: number[] = [];
	let count = 0;
	for (const _i in dates) {
		if (dates.length > 1 && dates.length > count + 1) {
			const time_diff = dates[count].getTime() - dates[count + 1].getTime();
			const time_diff_days = Math.round(time_diff / (1000 * 3600 * 24));
			day_differences.push(time_diff_days);
			count += 1;
		} else {
			break;
		}
	}
	return day_differences;
};

export const getChapterFrequency = (release_dates: string[]) => {
	if (!release_dates) return null;
	const dates = release_dates.map((date) => new Date(date));
	const m = new Map();

	const frequencies = getDateDifferences(dates);
	if (!frequencies) return null;
	for (const i in frequencies) {
		if (!m.get(frequencies[i])) {
			m.set(frequencies[i], 1);
		} else {
			m.set(frequencies[i], m.get(frequencies[i]) + 1);
		}
	}
	let max = 0;
	let common_freq: number;
	m.forEach((val, key, _map) => {
		if (max < val) {
			max = val;
			common_freq = key;
		}
	});
	return common_freq;
};

export const subtractMonths = (num_months: number) => {
	const today = new Date();
	today.setDate(0);
	const newDate = new Date(today.setMonth(today.getMonth() - num_months));
	return newDate.toISOString().split('T')[0].replaceAll('-', '').slice(0, -2) + '00';
};

export const getReleaseTime = (
	type: MediaType,
	status: MediaStatus,
	nextEpisode: AiringSchedule,
	chapterTime: string,
	chapters: number,
	episodes: number,
	volumes: number,
) => {
	if (type === MediaType.Manga && status !== MediaStatus.Hiatus) {
		if (chapters) {
			return `${chapters} chapters`;
		} else if (volumes) {
			return `${volumes} volumes`;
		} else {
			return chapterTime;
		}
	} else if (type === MediaType.Anime && status !== MediaStatus.Hiatus) {
		if (nextEpisode) {
			return `${getTimeUntil(nextEpisode.airingAt, 'days')}${'\n'}EP ${nextEpisode.episode}`;
		} else if (episodes && ![MediaStatus.NotYetReleased].includes(status)) {
			return `${episodes} Episodes`;
		} else if (status === MediaStatus.NotYetReleased && !nextEpisode) {
			return 'Unreleased';
		}
	} else {
		return 'Unknown';
	}
};

export const getTimeUntil = (time: number, format: 'until' | 'createdAt' | 'days' = 'until') => {
	const today = new Date();
	const episodeDate = new Date(time * 1000);
	const diffTime = Math.abs(episodeDate.getTime() - today.getTime());
	const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7 * 4));
	const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
	const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

	if (format === 'until')
		return `${diffDays > 0 ? `${diffDays}d ` : ''}${diffHours > 0 ? `${diffHours}h ` : ''}${diffMinutes > 0 ? `${diffMinutes}m` : ''
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
	if (format === 'days') {
		return `${diffDays > 1 ? `${diffDays} days` : diffDays === 1 ? '1 day' : 'Soon'}`;
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
	}, [time]);

	return { timeUntil };
};

export const getFuzzytoDate = (value: FuzzyDate): Date => {
	if (!value.day || !value.month || !value.year) return null;
	const newDate = new Date(value.year, value.month - 1, value.day);
	return newDate;
};

export const getDatetoFuzzy = (value: Date): FuzzyDate => {
	const newDate = {
		day: value.getDate(),
		month: value.getMonth() + 1,
		year: value.getFullYear(),
	};
	return newDate;
};

export const getDatetoFuzzyInt = (value: Date): string => {
	return value.toISOString().split('T')[0].replaceAll('-', '');
};

export const getFuzzyInttoDate = (value: string): Date => {
	const year = value.slice(0, 4);
	const month = value.slice(4, 6);
	const day = value.slice(6, 8);
	const newDate = new Date(`${year}-${month}-${day}`);
	return newDate;
};

export const getFuzzyInttoString = (value: string): string => {
	const year = value.slice(0, 4);
	const month = value.slice(4, 6);
	const day = value.slice(6, 8);
	return `${month}-${day}-${year}`;
};

export const getDayStartEnd = (date?: number) => {
	const today = new Date(date);
	today.setHours(0, 0, 0, 0);
	const todayStart = Math.round(today.getTime() / 1000);
	today.setHours(23, 59, 59, 0);
	const todayEnd = Math.round(Math.round(today.getTime() / 1000));

	return { todayStart, todayEnd };
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

	return {
		start: Math.round(weekStart.getTime() / 1000),
		end: Math.round(weekEnd.getTime() / 1000),
	};
};
