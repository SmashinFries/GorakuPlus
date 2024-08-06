import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SauceNaoParams, SauceNaoResponse } from './types';

const BASE_URL = 'https://saucenao.com';
const SauceNaoClient = axios.create({ baseURL: BASE_URL });

export const useImageSearch = (params: SauceNaoParams) =>
	useQuery({
		queryKey: ['MangaImageSearch'],
		queryFn: async () => {
			let bodyFormData = new FormData();
			Object.keys(params).forEach((key) => bodyFormData.append(key, params[key]));
			[3, 8, 21, 22, 36, 37, 38].forEach((db) => {
				bodyFormData.append('dbs[]', `${db}`);
			});
			const { data } = await SauceNaoClient.post<SauceNaoResponse>(
				'/search.php',
				bodyFormData,
			);
			return data;
		},
	});
