import { useEffect } from 'react';
import {
    useRetrieveSeriesQuery,
    useSearchSeriesPostMutation,
} from '../../../app/services/mangaupdates/mangaUpdatesApi';
import { MediaFormat } from '../../../app/services/anilist/generated-anilist';

const useMangaUpdates = (title: string, type: MediaFormat, skip: boolean, muId?: number) => {
    if (skip) {
        return { seriesData: null };
    }

    const [search, searchResults] = useSearchSeriesPostMutation();
    const seriesData = useRetrieveSeriesQuery(
        { id: muId ? muId : searchResults?.data?.results[0]?.record?.series_id },
        { skip: muId ? false : !searchResults?.isSuccess },
    );

    useEffect(() => {
        // only search if no id
        if (title && type && !seriesData.data && !muId) {
            const fixed_title = title?.replace('[', '').replace(']', '');
            search({
                seriesSearchRequestV1: {
                    search: `${fixed_title}${type === 'NOVEL' ? ' (Novel)' : ''}`,
                    stype: 'title',
                },
            });
        }
    }, [title, type]);

    return { seriesData };
};

export default useMangaUpdates;
