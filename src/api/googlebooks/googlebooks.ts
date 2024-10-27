import { useQuery, useInfiniteQuery, UndefinedInitialDataOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { BookResponse } from './types';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const GBookClient = axios.create({ baseURL: BASE_URL });

const getIsbnSearchOptions = (isbn?: string): UndefinedInitialDataOptions<AxiosResponse<BookResponse, any>, Error, BookResponse, string[]> => ({
	queryKey: ['IsbnSearch', isbn],
	queryFn: async () => {
		const result = await GBookClient.get<BookResponse>(`/volumes?q=isbn:${isbn}`);
		return result;
	},
})

export const useIsbnSearch = (isbn: string) =>
	useQuery({
		...getIsbnSearchOptions(isbn)
	});

useIsbnSearch.options = getIsbnSearchOptions;
