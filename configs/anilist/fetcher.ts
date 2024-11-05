import { useAuthStore } from '@/store/authStore';
import { sendErrorMessage } from '@/utils/toast';
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';

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
			// console.error(error);
			if (error instanceof AxiosError) {
				sendErrorMessage(`Error ${error.status}: ${error.message}`);
			} else {
				sendErrorMessage(`${error.message}`);
			}
		}
	};

	// return async () => {
	// 	const res = await fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			...headers,
	// 			...options,
	// 		},
	// 		body: JSON.stringify({
	// 			query,
	// 			variables,
	// 		}),
	// 	});

	// 	const json = await res.json();

	// 	if (json.errors) {
	// 		const { message } = json.errors[0] || {};
	// 		throw new Error(message || 'Error…');
	// 	}

	// 	return json.data;
	// };
};
