import { useQuery, useInfiniteQuery, QueryOptions, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { WdTaggerInput, WdTaggerOutput } from './types';
// import { Client } from "@gradio/client/dist";

const BASE_URL = 'https://smashinfries-wd-tagger.hf.space/call';

const WDTaggerClient = axios.create({ baseURL: BASE_URL });

export const fetchPredictWaifu = async (params?: WdTaggerInput) => {
	const response = await WDTaggerClient.post<{ event_id: string }>('/predict', params, { headers: { 'Content-Type': 'application/json' } });
	if (response.data?.event_id) {
		const result = await WDTaggerClient.get<string>('predict/' + response.data?.event_id);
		const realData: WdTaggerOutput = JSON.parse(
			result.data.split('data: ').at(-1),
		)
		return realData;
	}
	return [];
};

export const usePredictWaifu = (params: WdTaggerInput, { enabled }: { enabled?: boolean }) =>
	useQuery({
		queryKey: ['WDPredict'],
		queryFn: async () => await fetchPredictWaifu(params),
		enabled: enabled,
		refetchOnReconnect: false
	});