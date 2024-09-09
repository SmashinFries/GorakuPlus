import { useState } from 'react';
import { getImageB64, selectImage } from '@/utils/images';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';
import {
	CharacterSearchQuery,
	CharacterSearchQueryVariables,
	StaffSearchQueryVariables,
	StudioSearchQueryVariables,
	useCharacterSearchQuery,
	useInfiniteCharacterSearchQuery,
	useInfiniteStaffSearchQuery,
	useInfiniteStudioSearchQuery,
} from '@/api/anilist/__genereated__/gql';
import { SearchBody, SearchResult } from '@/api/tracemoe/models';
import { getGetSearchQueryOptions, usePostSearch } from '@/api/tracemoe/tracemoe';
import { fetchPredictWaifu } from '@/api/huggingface/hf';
import { useQueryClient } from '@tanstack/react-query';

export const useCharacterSearch = (
	params: CharacterSearchQueryVariables,
	enabled: boolean = true,
) => {
	const characterSearchQuery = useInfiniteCharacterSearchQuery(params, {
		initialPageParam: 1,
		getNextPageParam(lastPage) {
			if (lastPage.Page.pageInfo.hasNextPage) {
				return {
					page: lastPage.Page.pageInfo.currentPage + 1,
				};
			}
		},
		enabled: enabled,
	});

	return { characterSearchQuery };
};

export const useSearchWaifuImage = () => {
	const [waifuImageResults, setWaifuImageResults] = useState<
		CharacterSearchQuery['Page']['characters'] & { confidence: number }[]
	>([]);
	// const {} = usePredictWaifu();
	const queryClient = useQueryClient();

	const searchWaifu = async (url?: string, camera?: boolean) => {
		setWaifuImageResults([]);
		const imageBase64 = await getImageB64(camera, url);
		if (imageBase64) {
			try {
				const response = await queryClient.fetchQuery({
					queryKey: ['WDPredict'],
					queryFn: async () =>
						await fetchPredictWaifu({ data: [imageBase64, 'MOAT', 0.35, 0.35] }),
				});
				// const response = await searchWaifuImage({
				// 	data: [imageBase64, 'MOAT', 0.35, 0.35],
				// }).unwrap();
				if (response?.data?.[3].confidences) {
					for (const predictResult of response.data[3].confidences) {
						if (predictResult.label) {
							const searchResult: CharacterSearchQuery = await queryClient.fetchQuery(
								{
									queryKey: useCharacterSearchQuery.getKey(),
									queryFn: () =>
										useCharacterSearchQuery.fetcher({
											name: predictResult.label
												.replaceAll('_', ' ')
												.split('(')[0],
										}),
								},
							);
							setWaifuImageResults((prev) => [
								...prev,
								{
									...searchResult?.Page?.characters[0],
									confidence: predictResult.confidence,
								},
							]);
						}
					}
				}
			} catch (e) {
				Burnt.toast({ title: 'Something went wrong... 😅', duration: TOAST.LONG });
			}
		} else {
			Burnt.toast({ title: 'Could not process image', duration: TOAST.LONG });
		}
	};

	return { waifuImageResults, searchWaifu };
};

export const useStaffSearch = (params: StaffSearchQueryVariables) => {
	const staffSearchQuery = useInfiniteStaffSearchQuery(params, {
		initialPageParam: 1,
		getNextPageParam(lastPage) {
			if (lastPage.Page.pageInfo.hasNextPage) {
				return {
					page: lastPage.Page.pageInfo.currentPage + 1,
				};
			}
		},
		enabled: false,
	});

	return staffSearchQuery;
};

export const useStudioSearch = (params: StudioSearchQueryVariables) => {
	const studioSearchQuery = useInfiniteStudioSearchQuery(params, {
		initialPageParam: 1,
		getNextPageParam(lastPage) {
			if (lastPage.Page.pageInfo.hasNextPage) {
				return {
					page: lastPage.Page.pageInfo.currentPage + 1,
				};
			}
		},
		enabled: false,
	});

	return { studioSearchQuery };
};

export const useTraceMoeSearch = () => {
	const [imageSearchResults, setImageSearchResults] = useState<SearchResult>();
	const { mutateAsync: mutatePostSearch } = usePostSearch();
	const queryClient = useQueryClient();

	const searchImage = async (url?: string, camera?: boolean) => {
		if (url) {
			try {
				const response = await queryClient.fetchQuery(
					getGetSearchQueryOptions({ url, anilistInfo: 'true' }),
				);
				if (response.data) {
					setImageSearchResults(response.data);
				}
			} catch (e) {
				Burnt.toast({
					title: `Error ${e?.status} - ${e?.data?.error?.split('http')[0]}`,
					duration: TOAST.LONG,
				});
			}
		} else {
			const imageFormData = await selectImage(camera);
			if (imageFormData) {
				try {
					const response = await mutatePostSearch({
						data: imageFormData as SearchBody,
						params: {
							anilistInfo: 'true',
							cutBorders: 'true',
						},
					});
					setImageSearchResults(response?.data);
				} catch (e) {
					Burnt.toast({
						title: `Error ${e?.status} - ${e?.data?.error?.split('http')[0]}`,
						duration: TOAST.LONG,
					});
				}
			} else {
				Burnt.toast({ title: 'Could not process image', duration: TOAST.LONG });
			}
		}
	};

	return { imageSearchResults, searchImage };
};
