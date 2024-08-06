import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { WdTaggerInput, WdTaggerOutput } from './types';

const BASE_URL = 'https://smashinfries-wd-v1-4-tags.hf.space/run';

const WDTaggerClient = axios.create({ baseURL: BASE_URL });

export const fetchPredictWaifu = async (params?: WdTaggerInput) => {
	const { data } = await WDTaggerClient.post<WdTaggerOutput>('/predict', params);
	return data;
};

export const usePredictWaifu = (params?: WdTaggerInput) =>
	useQuery({
		queryKey: ['WDPredict'],
		queryFn: async () => await fetchPredictWaifu(),
		enabled: !!params?.data,
	});
