import { useMatchStore } from '@/store/matchStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
	getRetrieveSeriesQueryOptions,
	useRetrieveSeries,
	useSearchReleasesPost,
	useSearchSeriesPost,
} from './mangaupdates';
import { SeriesSearchResponseV1 } from './models';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

export const useMangaUpdatesQuery = (
	aniId: number | null,
	muId: number,
	title?: string,
	isNovel: boolean = false,
) => {
	const queryClient = useQueryClient();
	const { addMangaUpdatesID, isMangaUpdatesEnabled, muDB } = useMatchStore(useShallow((state) => ({ muDB: state.mangaUpdates, isMangaUpdatesEnabled: state.isMangaUpdatesEnabled, addMangaUpdatesID: state.addMangaUpdatesID })));
	const { mutateAsync: searchSeries, isPending, isError } = useSearchSeriesPost();

	const retrieveSeriesResult = useRetrieveSeries(muId || 0, {}, {
		query: {
			enabled: isMangaUpdatesEnabled && !!muId && !!aniId
		}
	});

	const searchQuery = useQuery({
		queryKey: ['MangaUpdates'],
		queryFn: async () => {
			const searchResults = await searchSeries({
				data: { search: `${title}${isNovel ? ' (Novel)' : ''}`, stype: 'title' },
			});
			if (aniId && (searchResults?.data?.total_hits ?? 0) > 0) {
				const seriesId = (searchResults.data as SeriesSearchResponseV1).results?.[0]?.record
					?.series_id
				if (seriesId) {
					const muIdResponse = await queryClient.fetchQuery(
						getRetrieveSeriesQueryOptions(seriesId),
					);
					muIdResponse.data?.series_id && addMangaUpdatesID(aniId, muIdResponse.data.series_id);
					return muIdResponse;
				}
			}
			return null;
		},
		enabled: isMangaUpdatesEnabled ? !!aniId && !!title && !muId : false,
	});

	useEffect(() => {
		if (muId && aniId) {
			if (muDB[aniId] !== muId && !isError && !isPending) {
				addMangaUpdatesID(aniId, muId);
			}
		}
	}, [isError, isPending, muId, aniId]);

	return muId && aniId ? retrieveSeriesResult : searchQuery;
};

export const useMuReleasesQuery = (muId: number) => {
	const { mutateAsync: searchReleases } = useSearchReleasesPost();
	const isMangaUpdatesEnabled = useMatchStore((state) => state.isMangaUpdatesEnabled);

	return useQuery({
		queryKey: ['MangaUpdatesReleases'],
		queryFn: async () => {
			const response = await searchReleases({
				data: {
					search_type: 'series',
					search: `${muId}`,
				},
			});
			return response.data;
		},
		enabled: isMangaUpdatesEnabled ? !!muId : false,
	});
};
