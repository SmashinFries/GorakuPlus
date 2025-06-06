import { useStudioListQuery } from '@/api/anilist/__genereated__/gql';
import { useCallback, useState } from 'react';

export const useStudioList = (studioId: number) => {
	const [page, setPage] = useState(1);
	const studioData = useStudioListQuery(
		{
			studioId: studioId,
			page: page,
			perPage: 25,
		},
		{ enabled: !!studioId },
	);

	const loadMore = useCallback(() => {
		if (studioData.data?.Studio?.media?.pageInfo?.hasNextPage && !studioData.isFetching) {
			setPage((prev) => prev + 1);
		}
	}, [studioData.data?.Studio?.media?.pageInfo?.hasNextPage, studioData.isFetching]);

	return { studioData, loadMore };
};

export default useStudioList;
