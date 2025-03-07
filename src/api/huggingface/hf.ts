import { useQuery, useInfiniteQuery, QueryOptions, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { WdTaggerInput, WdTaggerOutput } from './types';

const BASE_URL = 'https://john6666-wd-tagger-transformers.hf.space/call/';

const WDTaggerClient = axios.create({ baseURL: BASE_URL });

export const fetchPredictWaifu = async (url: string) => {
	const response = await WDTaggerClient.post<{ event_id: string }>('/predict_tags', { data: [{ path: url }, 0.35, 0.85, 'danbooru'] }, { headers: { 'Content-Type': 'application/json' } });
	if (response.data?.event_id) {
		const result = await WDTaggerClient.get<string>('predict/' + response.data?.event_id);
		const realData: WdTaggerOutput = JSON.parse(
			result.data.split('data: ').at(-1) ?? '[]',
		)
		return realData;
	}
	return [];
};

// export const fetchPredictWaifu = async (url: string) => {
// 	const response_0 = await fetch(url);
// 	const image = await response_0.blob();
// 	const client = await Client.connect("SmilingWolf/wd-tagger");
// 	const result = await client.predict("/predict", {
// 		image,
// 		model_repo: "SmilingWolf/wd-swinv2-tagger-v3",
// 		general_thresh: 0.35,
// 		general_mcut_enabled: false,
// 		character_thresh: 0.85,
// 		character_mcut_enabled: false,
// 	});
// 	return result
// };

export const usePredictWaifu = (url: string | undefined, { enabled }: { enabled?: boolean }) =>
	useQuery({
		queryKey: ['WDPredict', url],
		queryFn: async () => await fetchPredictWaifu(url as string),
		enabled: !!url && enabled,
		refetchOnReconnect: false
	});