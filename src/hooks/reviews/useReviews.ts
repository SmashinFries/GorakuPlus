import { useInfiniteReviewsQuery, useReviewsQuery } from '@/api/anilist/__genereated__/gql';
import { useCallback, useState } from 'react';

export const useReviewsList = (id: number) => {
	const reviewData = useInfiniteReviewsQuery(
		{
			mediaId: id,
			page: 1,
			perPage: 25,
		},
		{
			enabled: !!id,
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page.pageInfo.hasNextPage) {
					return {
						page: lastPage.Page.pageInfo.currentPage + 1,
					};
				}
			},
		},
	);

	return { reviewData };
};
