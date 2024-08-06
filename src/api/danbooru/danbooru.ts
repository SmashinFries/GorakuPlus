import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
	DanArtistCommentary,
	DanArtistCommentaryParams,
	DanPost,
	DanSearchQuery,
	DanTagParams,
	DanTags,
	DanWikiPage,
} from './types';
import { useSettingsStore } from '@/store/settings/settingsStore';

const BASE_URL = 'https://danbooru.donmai.us';
const DanbooruClient = axios.create({ baseURL: BASE_URL });

const removeNonImages = (posts: DanPost[]) => {
	return posts.filter((post) => {
		return post.file_ext !== 'mp4';
	});
};

export const usePostsSearch = (params: DanSearchQuery) => {
	const { showNSFW } = useSettingsStore();
	return useInfiniteQuery({
		queryKey: ['DanbooruSearch', params.tags],
		queryFn: async () => {
			const { data } = await DanbooruClient.get<DanPost[]>('/posts.json', {
				params: {
					...params,
					tags: showNSFW ? params.tags + ' solo' : params.tags + ' solo rating:g',
				},
			});
			if (data) {
				return removeNonImages(data);
			} else {
				return data;
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined;
			}
			return firstPageParam - 1;
		},
	});
};

export const usePostQuery = (id: number) =>
	useQuery({
		queryKey: ['DanbooruPost', id],
		queryFn: async () => {
			const { data } = await DanbooruClient.get<DanPost>(`/posts/${id}.json`);
			return data;
		},
		enabled: !!id,
	});

export const useTagsSearchQuery = (params: DanTagParams, enabled = false) =>
	useQuery({
		queryKey: ['DanbooruTags', params],
		queryFn: async () => {
			const { data } = await DanbooruClient.get<DanTags[]>('/autocomplete.json', { params });
			return data;
		},
		enabled: enabled,
	});

export const useArtistCommentaryQuery = (params: DanArtistCommentaryParams) =>
	useQuery({
		queryKey: ['DanbooruArtistCom'],
		queryFn: async () => {
			const { data } = await DanbooruClient.get<DanArtistCommentary>(
				'/artist_commentaries.json',
				{ params },
			);
			return data;
		},
		enabled: !!params['search[post_id]'],
	});

export const useTagWikiQuery = (tag: string) =>
	useQuery({
		queryKey: ['DanbooruWiki'],
		queryFn: async () => {
			const { data } = await DanbooruClient.get<DanWikiPage>(`/wiki_pages/${tag}.json`);
			return data;
		},
	});
