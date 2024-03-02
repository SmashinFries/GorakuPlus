import { useCallback, useState } from 'react';
import { useStaffListQuery } from '@/store/services/anilist/enhanced';

export const useStaffList = (id: number) => {
	const [page, setPage] = useState(1);
	const staffData = useStaffListQuery({
		id: id,
		page: page,
		perPage: 25,
	});

	const loadMore = useCallback(() => {
		if (staffData.data?.Media?.staff?.pageInfo?.hasNextPage && !staffData.isFetching) {
			setPage((prev) => prev + 1);
		}
	}, [staffData.data?.Media?.staff?.pageInfo?.hasNextPage, staffData.isFetching]);

	return { staffData, loadMore };
};
