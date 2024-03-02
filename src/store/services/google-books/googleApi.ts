import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BookResponse, GoogleQuery } from './types';

const GOOGLE_API_URL = 'https://www.googleapis.com/books/v1';

const googleBooksApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: GOOGLE_API_URL }),
	reducerPath: 'googleApi',
	endpoints: (build) => ({
		searchISBN: build.query<BookResponse, GoogleQuery>({
			query: (params) => ({
				url: `/volumes?q=isbn:${params.isbn}`,
			}),
		}),
	}),
});

export default googleBooksApi;
export const { useSearchISBNQuery, useLazySearchISBNQuery } = googleBooksApi;
