import { QueryClient, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	AniMediaQuery,
	AnimeExploreQuery,
	CharacterSort,
	DeleteActMutation,
	DeleteActMutationVariables,
	DeleteMediaListItemMutation,
	DeleteMediaListItemMutationVariables,
	MangaExploreQuery,
	ManhuaExploreQuery,
	ManhwaExploreQuery,
	MediaFormat,
	MediaType,
	NovelExploreQuery,
	SaveMediaListItemMutation,
	SaveMediaListItemMutationVariables,
	useAniMediaQuery,
	useAnimeExploreQuery,
	useDeleteActMutation,
	useDeleteMediaListItemMutation,
	useMangaExploreQuery,
	useManhuaExploreQuery,
	useManhwaExploreQuery,
	useNovelExploreQuery,
	useSaveMediaListItemMutation,
	useUserOverviewQuery,
} from './__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import {
	GetAnimeFullByIdQueryResult,
	getGetAnimeFullByIdQueryOptions,
	getGetMangaFullByIdQueryOptions,
	GetMangaFullByIdQueryResult,
	useGetAnimeFullById,
	useGetMangaFullById,
} from '../jikan/jikan';
import { useMatchStore } from '@/store/matchStore';
import {
	getRetrieveSeriesQueryOptions,
	useRetrieveSeries,
	useSearchReleasesPost,
	useSearchSeriesPost,
} from '../mangaupdates/mangaupdates';
import {
	ReleaseSearchResponseV1ResultsItem,
	SeriesModelV1,
	SeriesSearchResponseV1,
} from '../mangaupdates/models';
import { AnimeFull, MangaFull } from '../jikan/models';

// Not sure how to update cache correctly - will come back
//
// const updateExploreOldEntriesSave = (
// 	data:
// 		| AnimeExploreQuery
// 		| MangaExploreQuery
// 		| ManhwaExploreQuery
// 		| ManhuaExploreQuery
// 		| NovelExploreQuery,
// 	newData: SaveMediaListItemMutation,
// ) => {
// 	const tempData = { ...data };
// 	console.log('OldData:', Object.keys(data).join(', '));
// 	console.log('NewData:', Object.keys(newData).join(', '));
// 	Object.keys(data).forEach((rootKey) => {
// 		const foundIdx = tempData[rootKey]?.media?.findIndex(
// 			(media) => media?.id === newData.SaveMediaListEntry?.mediaId,
// 		);
// 		if (foundIdx > -1) {
// 			tempData[rootKey].media[foundIdx].mediaListEntry = {
// 				...tempData[rootKey].media[foundIdx].mediaListEntry,
// 				...newData.SaveMediaListEntry,
// 			};
// 		}
// 	});
// 	return tempData;
// };

// const updateExploreOldEntriesDelete = (
// 	data:
// 		| AnimeExploreQuery
// 		| MangaExploreQuery
// 		| ManhwaExploreQuery
// 		| ManhuaExploreQuery
// 		| NovelExploreQuery,
// 	entryId: number,
// ) => {
// 	const tempData = { ...data };
// 	Object.keys(data).forEach((rootKey) => {
// 		const foundIdx = data[rootKey]?.media?.findIndex(
// 			(media) => media.mediaListEntry.id === entryId,
// 		);
// 		if (foundIdx > -1) {
// 			tempData[rootKey].media[foundIdx].mediaListEntry = null;
// 		}
// 	});
// 	return tempData;
// };

const invalidateExploreQueries = (queryClient: QueryClient) => {
	queryClient.invalidateQueries({ queryKey: useAnimeExploreQuery.getKey() });
	queryClient.invalidateQueries({ queryKey: useMangaExploreQuery.getKey() });
	queryClient.invalidateQueries({ queryKey: useManhwaExploreQuery.getKey() });
	queryClient.invalidateQueries({ queryKey: useManhuaExploreQuery.getKey() });
	queryClient.invalidateQueries({ queryKey: useNovelExploreQuery.getKey() });
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
		queryKey: ['AniMedia'],
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
			if (allResponses[1].data) {
				type === MediaType.Anime
					? (results.malAnimeResults = allResponses[1].data.data as AnimeFull)
					: (results.malMangaResults = allResponses[1].data.data as MangaFull);
			} else {
				const response = await fetchMalData(allResponses[0].Media.idMal);
				type === MediaType.Anime
					? (results.malAnimeResults = response.data.data as AnimeFull)
					: (results.malMangaResults = response.data.data as MangaFull);
			}
			if (allResponses[2].data) {
				results.mangaUpdatesResults = allResponses[2].data as SeriesModelV1;
			} else {
				const title = (
					allResponses[0].Media?.countryOfOrigin === 'KR'
						? allResponses[0].Media?.title?.english ??
							allResponses[0].Media?.title?.romaji
						: allResponses[0].Media?.title.romaji
				)
					?.replace('[', '')
					.replace(']', '');
				const response = await fetchMangaUpdates(
					undefined,
					title,
					allResponses[0].Media?.format === MediaFormat['Novel'],
				);
				if ((response.data as SeriesSearchResponseV1).results?.length > 0) {
					const muIdResponse = await queryClient.fetchQuery(
						getRetrieveSeriesQueryOptions(
							(response.data as SeriesSearchResponseV1).results[0]?.record?.series_id,
						),
					);
					results.mangaUpdatesResults = muIdResponse.data;
				}
				if (allResponses[3].data) {
					results.mangaReleases = allResponses[3].data.results;
				} else {
					const response = await searchReleases({
						data: {
							search_type: 'series',
							search: `${results.mangaUpdatesResults.series_id}`,
						},
					});
					results.mangaReleases = response.data.results;
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

		onSuccess(data, variables, context) {
			invalidateExploreQueries(queryClient);
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
			// 			const newData = updateExploreOldEntriesSave(oldData, data);
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
			queryClient.invalidateQueries({
				queryKey: useAniMediaQuery.getKey({
					id: options.meta?.mediaId as number,
					skipUser: false,
				}),
			});
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
				queryKey: useUserOverviewQuery.getKey({
					userId: useAuthStore.getState().anilist.userID,
				}),
			});
		},
	});
};
