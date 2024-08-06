import { useAuthStore } from '@/store/authStore';
import axios, { AxiosError, isAxiosError } from 'axios';

interface GraphQLResponse<T> {
	data: T;
	errors?: { message: string }[];
}

export const fetchAnilistData = <TData, TVariables>(
	query: string,
): ((variables?: TVariables) => Promise<TData>) => {
	const token = useAuthStore.getState().anilist.token;
	const url = 'https://graphql.anilist.co'; // Replace this with your GraphQL API URL

	return async (variables?: TVariables) => {
		try {
			const response = await axios.post<GraphQLResponse<TData>>(
				url,
				{
					query,
					variables,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: token ? `Bearer ${token}` : '',
					},
				},
			);

			if (response.data.errors) {
				throw new Error(response.data.errors[0].message);
			}

			return response.data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				const serverError = error as AxiosError<GraphQLResponse<unknown>>;
				if (serverError && serverError.response) {
					const errorMessage =
						serverError.response.data.errors?.[0]?.message ||
						'Error in GraphQL request';
					throw new Error(errorMessage);
				}
			}
			throw error;
		}
	};
};
