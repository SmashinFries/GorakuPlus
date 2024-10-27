import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AniTrendsCharacterResponse, AniTrendzChartTypes } from './types';

const AniTrendzClient = axios.create({
	baseURL: 'https://us-central1-anitrendz-prod.cloudfunctions.net/animeTrendingAPI/charts',
});

export const fetchAniTrendzFemaleChart = async () => {
	const result = await AniTrendzClient.get<AniTrendsCharacterResponse>('/female-characters');
	return result;
};

export const fetchAniTrendzMaleChart = async () => {
	const result = await AniTrendzClient.get<AniTrendsCharacterResponse>('/male-characters');
	return result;
};

export const fetchAniTrendzCoupleShipChart = async () => {
	const result = await AniTrendzClient.get<AniTrendsCharacterResponse>('/couple-ship');
	return result;
};

// top-anime
export const fetchAniTrendzTopAnimeChart = async () => {
	const result = await AniTrendzClient.get<AniTrendsCharacterResponse>('/top-anime');
	return result;
};

export const useAniTrendzCharts = (type: AniTrendzChartTypes) =>
	useQuery({
		queryKey: ['AniTrendz', type],
		queryFn: () =>
			type === 'anime'
				? fetchAniTrendzTopAnimeChart()
				: type === 'female'
					? fetchAniTrendzFemaleChart()
					: type === 'male'
						? fetchAniTrendzMaleChart()
						: fetchAniTrendzCoupleShipChart(),
		enabled: !!type,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
