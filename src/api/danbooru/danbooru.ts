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
import { useMatchStore } from '@/store/matchStore';
import { useShallow } from 'zustand/react/shallow';

const BASE_URL = 'https://danbooru.donmai.us';
const DanbooruClient = axios.create({ baseURL: BASE_URL });

const removeNonImages = (posts: DanPost[]) => {
	return posts.filter((post) => {
		return post.file_ext !== 'mp4';
	});
};

export const usePostsSearch = (params: DanSearchQuery) => {
	const isEnabled = useMatchStore(useShallow((state) => state.isBooruEnabled));
	const showNSFW = useSettingsStore(useShallow((state) => state.showNSFW));
	return useInfiniteQuery({
		queryKey: ['DanbooruSearch', params.tags, params.rating],
		queryFn: async (props) => {
			const { data } = await DanbooruClient.get<DanPost[]>('/posts.json', {
				params: {
					...params,
					page: props.pageParam,
					tags: params.tags + ` rating:${showNSFW ? params.rating : 'g'}`,
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
			if (lastPage.length === 30) {
				return lastPageParam + 1;
			}
			
		},
		enabled: !!params.tags && isEnabled,
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

export const useTagsSearchQuery = (params: DanTagParams, enabled = false) => {
	const isEnabled = useMatchStore((state) => state.isBooruEnabled);

	return useQuery({
		queryKey: ['DanbooruTags', params],
		queryFn: async () => {
			const { data } = await DanbooruClient.get<DanTags[]>('/autocomplete.json', { params });
			return data;
		},
		enabled: enabled && isEnabled,
	});
}


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
		enabled: !!tag,
	});
