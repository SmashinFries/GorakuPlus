import { QueryClient, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	AiringRangeQuery,
	AiringRangeQueryVariables,
	AniMediaQuery,
	CharacterSort,
	DeleteActMutation,
	DeleteActMutationVariables,
	DeleteMediaListItemMutation,
	DeleteMediaListItemMutationVariables,
	MediaFormat,
	MediaSeason,
	MediaType,
	SaveMediaListItemMutation,
	SaveMediaListItemMutationVariables,
	SeasonalAnimeQuery,
	ToggleFavMutation,
	ToggleFavMutationVariables,
	useAiringRangeQuery,
	useAniMediaQuery,
	useAnimeExploreQuery,
	useDeleteActMutation,
	useDeleteMediaListItemMutation,
	useInfiniteUserActivityQuery,
	useMangaExploreQuery,
	useManhuaExploreQuery,
	useManhwaExploreQuery,
	useNovelExploreQuery,
	useSaveMediaListItemMutation,
	useSeasonalAnimeQuery,
	useToggleFavMutation,
	useUserActivityQuery,
	useUserOverviewQuery,
} from './__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import {
	GetAnimeFullByIdQueryResult,
	getGetAnimeFullByIdQueryOptions,
	getGetMangaFullByIdQueryOptions,
	GetMangaFullByIdQueryResult,
} from '../jikan/jikan';
import { useMatchStore } from '@/store/matchStore';
import {
	getRetrieveSeriesQueryOptions,
	useSearchReleasesPost,
	useSearchSeriesPost,
} from '../mangaupdates/mangaupdates';
import {
	ReleaseSearchResponseV1ResultsItem,
	SeriesModelV1,
	SeriesSearchResponseV1,
} from '../mangaupdates/models';
import { AnimeFull, MangaFull } from '../jikan/models';
import { updateAniMediaCache, updateExploreCache, updateMediaSearchCache, updateSearchAllCache } from './queryUpdates';

const invalidateExploreQueries = (queryClient: QueryClient) => {
	queryClient.invalidateQueries({ queryKey: useAnimeExploreQuery.getKey({ includeViewer: true }) });
	queryClient.invalidateQueries({ queryKey: useMangaExploreQuery.getKey({ includeViewer: true }) });
	queryClient.invalidateQueries({ queryKey: useManhwaExploreQuery.getKey({ includeViewer: true }) });
	queryClient.invalidateQueries({ queryKey: useManhuaExploreQuery.getKey({ includeViewer: true }) });
	queryClient.invalidateQueries({ queryKey: useNovelExploreQuery.getKey({ includeViewer: true }) });
};

export const useAnilistMalQuery = (aniId: number, type: MediaType) => {
	const queryClient = useQueryClient();
	const { userID } = useAuthStore().anilist;
	const { mangaUpdates: muDB, mal: malDB } = useMatchStore();
	const { mutateAsync: searchSeries } = useSearchSeriesPost();
	const { mutateAsync: searchReleases } = useSearchReleasesPost();

	const fetchAniData = async () => {
		const anilistParams = {
			id: aniId,
			userId: userID,
			skipUser: !!userID,
			perPage_c: 25,
			perPage_rec: 25,
			sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
		};
		return queryClient.fetchQuery<AniMediaQuery>({
			queryKey: useAniMediaQuery.getKey(anilistParams),
			queryFn: useAniMediaQuery.fetcher(anilistParams),
		});
	};

	const fetchMalData = (malId: number | undefined) => {
		if (malId) {
			if (type === MediaType.Anime) {
				return queryClient.fetchQuery<GetAnimeFullByIdQueryResult>(
					getGetAnimeFullByIdQueryOptions(malId),
				);
			} else {
				return queryClient.fetchQuery<GetMangaFullByIdQueryResult>(
					getGetMangaFullByIdQueryOptions(malId),
				);
			}
		}
		return;
	};

	const fetchMangaUpdates = (muId?: number, title?: string, isNovel?: boolean) => {
		if (muId) {
			return queryClient.fetchQuery(getRetrieveSeriesQueryOptions(muId));
		} else if (title) {
			return searchSeries({
				data: {
					search: `${title}${isNovel ? ' (Novel)' : ''}`,
					stype: 'title',
				},
			});
		}
		return;
	};

	const fetchMangaReleases = (muId?: number) => {
		if (muId) {
			return searchReleases({ data: { search_type: 'series', search: `${muId}` } });
		}
		return;
	};

	return useQuery({
		queryKey: ['AniMedia', aniId, type],
		queryFn: async () => {
			const results: {
				aniResults: AniMediaQuery | null;
				malAnimeResults: AnimeFull | null;
				malMangaResults: MangaFull | null;
				mangaUpdatesResults: SeriesModelV1 | null;
				mangaReleases: ReleaseSearchResponseV1ResultsItem[] | null;
			} = {
				aniResults: null,
				malAnimeResults: null,
				malMangaResults: null,
				mangaUpdatesResults: null,
				mangaReleases: null,
			};
			const allResponses = await Promise.all([
				fetchAniData(),
				fetchMalData(malDB[aniId]),
				fetchMangaUpdates(muDB[aniId]),
				fetchMangaReleases(muDB[aniId]),
			]);

			allResponses[0] && (results.aniResults = allResponses[0]);
			if (allResponses[1]?.data) {
				type === MediaType.Anime
					? (results.malAnimeResults = allResponses[1].data.data as AnimeFull)
					: (results.malMangaResults = allResponses[1].data.data as MangaFull);
			} else {
				const response = await fetchMalData(allResponses[0]?.Media?.idMal ?? undefined);
				type === MediaType.Anime
					? (results.malAnimeResults = response?.data.data as AnimeFull)
					: (results.malMangaResults = response?.data.data as MangaFull);
			}
			if (allResponses[2]?.data) {
				results.mangaUpdatesResults = allResponses[2].data as SeriesModelV1;
			} else {
				const title = (
					allResponses[0].Media?.countryOfOrigin === 'KR'
						? allResponses[0].Media?.title?.english ??
						allResponses[0].Media?.title?.romaji
						: allResponses[0].Media?.title?.romaji
				)
					?.replace('[', '')
					.replace(']', '');
				const response = await fetchMangaUpdates(
					undefined,
					title,
					allResponses[0].Media?.format === MediaFormat['Novel'],
				);
				if (((response?.data as SeriesSearchResponseV1).results?.length ?? 0) > 0) {
					const muIdResponse = await queryClient.fetchQuery(
						getRetrieveSeriesQueryOptions(
							(response.data as SeriesSearchResponseV1).results[0]?.record?.series_id,
						),
					);
					results.mangaUpdatesResults = muIdResponse.data;
				}
				if (allResponses[3]?.data) {
					results.mangaReleases = allResponses[3].data.results ?? null;
				} else {
					const response = await searchReleases({
						data: {
							search_type: 'series',
							search: `${results.mangaUpdatesResults?.series_id}`,
						},
					});
					results.mangaReleases = response.data.results ?? null;
				}
			}
			return results;
		},
		enabled: !!aniId,
	});
};

export const useSaveMediaListItemInvalidatedMutation = (
	options?: UseMutationOptions<
		SaveMediaListItemMutation,
		unknown,
		SaveMediaListItemMutationVariables,
		unknown
	>,
) => {
	const queryClient = useQueryClient();
	return useSaveMediaListItemMutation({
		...options,

		onSuccess(newData, variables) {
			if (variables.mediaId) {
				updateAniMediaCache(queryClient, newData);
				updateExploreCache(queryClient, newData);
				updateMediaSearchCache(queryClient, newData);
				updateSearchAllCache(queryClient, newData);
			}

		},
	});
};

export const useDeleteMediaListItemInvalidatedMutation = (
	options?: UseMutationOptions<
		DeleteMediaListItemMutation,
		unknown,
		DeleteMediaListItemMutationVariables,
		unknown
	>,
) => {
	const queryClient = useQueryClient();
	return useDeleteMediaListItemMutation({
		...options,
		onSuccess(data, variables, context) {
			invalidateExploreQueries(queryClient);
			queryClient.invalidateQueries();
			// queryClient.setQueriesData(
			// 	{ queryKey: [useAnimeExploreQuery.getKey(), useMangaExploreQuery.getKey()] },
			// 	(
			// 		oldData:
			// 			| AnimeExploreQuery
			// 			| MangaExploreQuery
			// 			| ManhwaExploreQuery
			// 			| ManhuaExploreQuery
			// 			| NovelExploreQuery,
			// 	) => {
			// 		if (oldData) {
			// 			const newData = updateExploreOldEntriesDelete(oldData, variables.id);
			// 			return {
			// 				...oldData,
			// 				...newData,
			// 			};
			// 		} else {
			// 			return oldData;
			// 		}
			// 	},
			// );
		},
	});
};

export const useDeleteActivityItemInvalidateMutation = (
	options?: UseMutationOptions<DeleteActMutation, unknown, DeleteActMutationVariables, unknown>,
) => {
	const queryClient = useQueryClient();
	return useDeleteActMutation({
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({
				queryKey: useUserActivityQuery.getKey(),
			});
			queryClient.invalidateQueries({
				queryKey: useInfiniteUserActivityQuery.getKey(),
			})
		},
	});
};

// export const useToggleFavInvalidateMutation = (
// 	options?: UseMutationOptions<
// 		ToggleFavMutation,
// 		unknown,
// 		ToggleFavMutationVariables,
// 		unknown
// 	>,
// ) => {
// 	const queryClient = useQueryClient();
// 	return useToggleFavMutation({...options, onSuccess(newData, variables) {

// 	}});
// };

export const useAiringRangeMonthQuery = (params: Omit<AiringRangeQueryVariables, 'page'>) => {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: ['AiringRangeMonth', params.end, params.start],
		queryFn: async () => {
			const tempData: NonNullable<AiringRangeQuery['Page']>['airingSchedules'] = [];
			let page = 1;
			let fetchMore = true;
			while (fetchMore === true && !!params.start && !!params.end) {
				try {

					const resp = await queryClient.fetchQuery<AiringRangeQuery>({
						queryKey: ['AiringRangeMonthPage'],
						queryFn: useAiringRangeQuery.fetcher({ ...params, page }),
					});
					if (resp?.Page?.airingSchedules) tempData.push(...(resp?.Page?.airingSchedules ?? []));
					// setData((prev) => [...prev, ...resp.Page?.airingSchedules]);

					if (resp.Page?.pageInfo?.hasNextPage) {
						page = page + 1;
					} else {
						fetchMore = false;
					}
				} catch (e) {
					console.log(e);
					fetchMore = false;
				}
			}
			return tempData;
		},
		enabled: !!params.start && !!params.end
	});
};

export const useSeasonalAnimeAllQuery = ({ season, year }: { season: MediaSeason, year: number }) => {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: ['SeasonalAnimeAll', season, year],
		queryFn: async () => {
			const tempData: NonNullable<SeasonalAnimeQuery['Page']>['media'] = [];
			let page = 1;
			let fetchMore = true;
			while (fetchMore === true) {
				try {
					const resp = await queryClient.fetchQuery<SeasonalAnimeQuery>({
						queryKey: ['SeasonalAnimeAllPage'],
						queryFn: useSeasonalAnimeQuery.fetcher({
							season,
							seasonYear: year,
							page,
							onList: true,
						}),
					});
					if (resp?.Page?.media) tempData.push(...(resp?.Page?.media ?? []));

					if (resp.Page?.pageInfo?.hasNextPage) {
						page = page + 1;
					} else {
						fetchMore = false;
					}
				} catch (e) {
					console.log(e);
					fetchMore = false;
				}
			}
			return tempData;
		},
		enabled: !!season && !!year
	});
};