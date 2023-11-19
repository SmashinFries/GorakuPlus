import { useEffect } from 'react';
import {
    useRetrieveSeriesQuery,
    useSearchSeriesPostMutation,
} from '@/store/services/mangaupdates/mangaUpdatesApi';
import { MediaFormat } from '@/store/services/anilist/generated-anilist';

const useMangaUpdates = (title: string, type: MediaFormat, skip: boolean, muId?: number) => {
    const [search, searchResults] = useSearchSeriesPostMutation();
    const seriesData = useRetrieveSeriesQuery(
        { id: muId ? muId : searchResults?.data?.results[0]?.record?.series_id },
        { skip: muId || !skip ? false : !searchResults?.isSuccess },
    );

    useEffect(() => {
        // only search if no id
        if (title && type && !seriesData.data && !muId) {
            console.log('searching mu');
            const fixed_title = title?.replace('[', '').replace(']', '');
            search({
                seriesSearchRequestV1: {
                    search: `${fixed_title}${type === 'NOVEL' ? ' (Novel)' : ''}`,
                    stype: 'title',
                },
            });
        }
    }, [title, type]);

    if (skip) {
        return { seriesData: null };
    }

    return { seriesData };
};

export default useMangaUpdates;
