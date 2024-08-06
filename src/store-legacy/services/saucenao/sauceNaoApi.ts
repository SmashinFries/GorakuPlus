import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SauceNaoParams, SauceNaoResponse } from './types';

const API_URL = 'https://saucenao.com';

const sauceNaoApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	reducerPath: 'sauceNaoApi',
	endpoints: (build) => ({
		searchImage: build.mutation<SauceNaoResponse, SauceNaoParams>({
			query: (params) => {
				let bodyFormData = new FormData();
				Object.keys(params).forEach((key) => 
					bodyFormData.append(key, params[key])
				);
				[3, 8, 21, 22, 36, 37, 38].forEach((db) => {
					bodyFormData.append('dbs[]', `${db}`);
				});
				return {
					url: '/search.php',
					method: 'POST',
					body: bodyFormData
				};
			},
		}),
	}),
});

export default sauceNaoApi;
export const { useSearchImageMutation } = sauceNaoApi;
