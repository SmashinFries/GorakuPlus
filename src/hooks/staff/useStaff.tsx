import { useInfiniteStaffListQuery } from '@/api/anilist/__genereated__/gql';

export const useStaffList = (id: number) => {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteStaffListQuery(
		{
			id: id,
			page: 1,
			perPage: 25,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Media?.staff?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage.Media.staff.pageInfo.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);

	const mergedData = data?.pages?.flatMap((page) => page.Media?.staff?.edges);

	return {
		data: mergedData,
		isLoading,
		isFetching,
		hasNextPage,
		fetchNextPage,
	};
};
