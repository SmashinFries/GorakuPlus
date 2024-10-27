import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SauceNaoParams, SauceNaoResponse } from './types';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';

const BASE_URL = 'https://saucenao.com';
const SauceNaoClient = axios.create({ baseURL: BASE_URL });

export const useSauceNaoSearch = ({ file, enabled }: SauceNaoParams & { enabled?: boolean }) =>
	useQuery({
		queryKey: ['MangaImageSearch'],
		queryFn: async () => {
			const token = useAuthStore.getState().sauceNao.api_key;
			const showNSFW = useSettingsStore.getState().showNSFW;
			const bodyFormData = new FormData();
			const params = {
				'output_type': '2',
				'numres': '6',
				'hide': showNSFW ? '0' : '3',
				'db': '37'
			}
			token && (params['api_key'] = token);
			if (typeof file === 'string') {
				params['url'] = file;
			} else {
				bodyFormData.append('file', file as unknown as Blob);
			}
			// Object.keys(params).forEach((key) => bodyFormData.append(key, params[key]));
			// [3, 8, 21, 22, 36, 37, 38].forEach((db) => {
			// 	bodyFormData.append('dbs[]', `${db}`);
			// });
			// 37 = mangadex

			const { data, status, statusText } = await SauceNaoClient.post<SauceNaoResponse>(
				'/search.php',
				typeof file === 'string' ? undefined : bodyFormData,
				{
					params,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);
			return data;
		},
		enabled: enabled,
		// refetchOnMount: false
	});
