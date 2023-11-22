import { useCallback, useEffect, useState } from 'react';
import { useCharacterListQuery } from '@/store/services/anilist/enhanced';
import {
    CharacterDetailsQuery,
    CharacterSort,
    MediaType,
} from '@/store/services/anilist/generated-anilist';

export const useCharactersList = (id: number, type: MediaType) => {
    const [page, setPage] = useState(1);
    const charData = useCharacterListQuery({
        id: id,
        type: type,
        page: page,
        perPage: 25,
        sort: CharacterSort.Relevance,
    });

    const loadMore = useCallback(() => {
        if (charData.data?.Media?.characters?.pageInfo?.hasNextPage && !charData.isFetching) {
            setPage((prev) => prev + 1);
        }
    }, [charData.data?.Media?.characters?.pageInfo?.hasNextPage, charData.isFetching]);

    return {
        charData,
        loadMore,
    };
};
