import { useState } from 'react';
import {
    ExploreMediaQueryVariables,
    useLazyExploreMediaQuery,
} from '../../../app/services/anilist/generated-anilist';

const useSearch = () => {
    const [searchMedia, searchResults] = useLazyExploreMediaQuery();
    const [page, setPage] = useState(1);

    const searchNextPage = (filter: ExploreMediaQueryVariables) => {
        searchMedia({
            ...filter,
            page: page + 1,
        });
        setPage(page + 1);
    };

    return { searchMedia, searchNextPage, searchResults, page };
};

export default useSearch;
