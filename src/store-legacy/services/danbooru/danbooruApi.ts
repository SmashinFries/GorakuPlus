import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
	DanArtistCommentary,
	DanArtistCommentaryParams,
	DanPost,
	DanSearchQuery,
	DanTagParams,
	DanTags,
	DanWikiPage,
} from './types';

const DANBOORU_TEST_URL = 'https://testbooru.donmai.us';
const DANBOORU_URL = 'https://danbooru.donmai.us';

const removeNonImages = (posts: DanPost[]) => {
	return posts.filter((post) => {
		return post.file_ext !== 'mp4';
	});
};

const danbooruApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: DANBOORU_URL }),
	reducerPath: 'danbooruApi',
	tagTypes: ['DanbooruSearch', 'DanbooruPost', 'DanbooruTags'],
	endpoints: (build) => ({
		searchPosts: build.query<DanPost[], DanSearchQuery>({
			query: (params) => ({ url: '/posts.json', params: params }),
			transformResponse(baseQueryReturnValue, meta, arg) {
				// @ts-ignore
				return removeNonImages(baseQueryReturnValue);
			},
			providesTags: ['DanbooruSearch'],
		}),
		getPost: build.query<DanPost, number>({
			query: (id) => ({ url: `/posts/${id}.json` }),
			providesTags: ['DanbooruPost'],
		}),
		searchTags: build.query<DanTags[], DanTagParams>({
			query: (params) => ({
				url: '/autocomplete.json',
				params: params,
			}),
			providesTags: ['DanbooruTags'],
		}),
		getArtistCommentary: build.query<DanArtistCommentary, DanArtistCommentaryParams>({
			query: (params) => ({ url: '/artist_commentaries.json', params: params }),
		}),
		getTagWiki: build.query<DanWikiPage, string>({
			query: (tag) => ({ url: `/wiki_pages/${tag}.json` }),
		}),
	}),
});

export default danbooruApi;
export const {
	useSearchPostsQuery,
	useGetPostQuery,
	useLazySearchPostsQuery,
	useSearchTagsQuery,
	useGetArtistCommentaryQuery,
	useLazySearchTagsQuery,
	useGetTagWikiQuery,
	useLazyGetTagWikiQuery,
} = danbooruApi;
