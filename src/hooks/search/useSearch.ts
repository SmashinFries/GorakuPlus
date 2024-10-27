import { useState } from 'react';
import { selectImage } from '@/utils/images';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';
import {
	CharacterSearchQueryVariables,
	StaffSearchQueryVariables,
	StudioSearchQueryVariables,
	useInfiniteCharacterSearchQuery,
	useInfiniteStaffSearchQuery,
	useInfiniteStudioSearchQuery,
} from '@/api/anilist/__genereated__/gql';
import { SearchBody, SearchResult } from '@/api/tracemoe/models';
import { getGetSearchQueryOptions, usePostSearch } from '@/api/tracemoe/tracemoe';
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
