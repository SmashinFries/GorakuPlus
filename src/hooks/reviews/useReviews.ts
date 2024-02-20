import { useCallback, useState } from 'react';
import { useReviewsQuery } from '@/store/services/anilist/enhanced';

export const useReviewsList = (id: number) => {
    const [page, setPage] = useState(1);
    const reviewData = useReviewsQuery({
        mediaId: id,
        page: page,
        perPage: 25,
    });

    const loadMore = useCallback(() => {
        if (reviewData.data?.Page?.pageInfo?.hasNextPage && !reviewData.isFetching) {
            setPage((prev) => prev + 1);
        }
    }, [reviewData.data?.Page.pageInfo?.hasNextPage, reviewData.isFetching]);

    return { reviewData, loadMore };
};
