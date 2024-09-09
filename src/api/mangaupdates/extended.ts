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
	const muDB = useMatchStore((state) => state.mangaUpdates);
	const addMangaUpdatesID = useMatchStore((state) => state.addMangaUpdatesID);
	const isMangaUpdatesEnabled = useMatchStore((state) => state.isMangaUpdatesEnabled);
	const { mutateAsync: searchSeries } = useSearchSeriesPost();

	useEffect(() => {
		if (muId && aniId) {
			if (muDB[aniId] !== muId) {
				console.log('Updating muID!');
				addMangaUpdatesID(aniId, muId);
			}
		}
	}, []);

	if (muId && aniId) {
		return useRetrieveSeries(muId, {}, { query: { enabled: isMangaUpdatesEnabled } });
	} else {
		return useQuery({
			queryKey: ['MangaUpdates'],
			queryFn: async () => {
				console.log('Running MangaUpdates lookup:', title);
				const searchResults = await searchSeries({
					data: { search: `${title}${isNovel ? ' (Novel)' : ''}`, stype: 'title' },
				});
				const muIdResponse = await queryClient.fetchQuery(
					getRetrieveSeriesQueryOptions(
						(searchResults.data as SeriesSearchResponseV1).results[0]?.record
							?.series_id,
					),
				);
				console.log('Logging muID:', muIdResponse.data.series_id);
				addMangaUpdatesID(aniId, muIdResponse.data.series_id);
				return muIdResponse;
			},
			enabled: isMangaUpdatesEnabled ? !!aniId && !!title : false,
		});
	}
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
