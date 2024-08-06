import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BookResponse } from './types';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const GBookClient = axios.create({ baseURL: BASE_URL });

export const useIsbnSearch = (isbn: string) =>
	useQuery({
		queryKey: ['IsbnSearch'],
		queryFn: async () => {
			const { data } = await GBookClient.get<BookResponse>(`/volumes?q=isbn:${isbn}`);
			return data;
		},
	});
