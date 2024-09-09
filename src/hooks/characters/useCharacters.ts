import {
	CharacterSort,
	MediaType,
	useInfiniteCharacterListQuery,
} from '@/api/anilist/__genereated__/gql';
import { useMemo } from 'react';

export const useCharactersList = (id: number) => {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteCharacterListQuery(
			{
				id: id,
				page: 1,
				perPage: 25,
				sort: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Media.characters.pageInfo.hasNextPage) {
						return {
							page: lastPage.Media.characters.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);

	const allItems = useMemo(
		() => data.pages.flatMap((page) => page.Media.characters.edges),
		[data],
	);

	return {
		data: allItems,
		isLoading,
		isFetching,
		hasNextPage,
		fetchNextPage,
	};
};
