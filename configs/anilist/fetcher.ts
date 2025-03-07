import { useAuthStore } from '@/store/authStore';
import axios, { AxiosRequestConfig } from 'axios';

const url = 'https://graphql.anilist.co';

export const fetchAnilistData = <TData, TVariables>(
	query: string,
	variables?: TVariables,
	options?: AxiosRequestConfig['headers'],
): (() => Promise<TData>) => {
	const token = useAuthStore.getState().anilist.token;
	const headers: AxiosRequestConfig['headers'] = {
		'Content-Type': 'application/json',
		...options,
	};
	!!token && (headers['Authorization'] = `Bearer ${token}`);

	return async () => {
		try {
			const res = await axios.post(
				url,
				{ query, variables },
				{ headers: { ...headers, ...options } },
			);
			return res.data.data ?? null;
		} catch (error) {
			console.error(error);
		}
	};
};
