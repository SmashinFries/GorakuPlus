import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
	AniMediaQuery,
	CharacterSort,
	MediaFormat,
	MediaType,
	useAniMediaQuery,
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

export const useAnilistMalQuery = (aniId: number, type: MediaType) => {
	const queryClient = useQueryClient();
	const { userID } = useAuthStore().anilist;
	const { mangaUpdates: muDB, mal: malDB } = useMatchStore();
	const { mutateAsync: searchSeries } = useSearchSeriesPost();
	const { mutateAsync: searchReleases } = useSearchReleasesPost();

	const fetchAniData = () => {
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

export const useMalQuery = (malId: number, type: MediaType) => {
	if (type === MediaType.Anime) {
		return useGetAnimeFullById(malId, { query: { enabled: !!malId } });
	} else {
		return useGetMangaFullById(malId, { query: { enabled: !!malId } });
	}
};

export const useMangaUpdatesQuery = (
	aniId: number,
	muId: number,
	title?: string,
	isNovel: boolean = false,
) => {
	const queryClient = useQueryClient();
	const { mangaUpdates: muDB, addMangaUpdatesID } = useMatchStore();
	const { mutateAsync: searchSeries } = useSearchSeriesPost();
	if (muId) {
		if (muDB[aniId] !== muId) {
			addMangaUpdatesID(aniId, muId);
		}
		return useRetrieveSeries(muId);
	} else {
		return useQuery({
			queryKey: ['MangaUpdates'],
			queryFn: async () => {
				const searchResults = await searchSeries({
					data: { search: `${title}${isNovel ? ' (Novel)' : ''}`, stype: 'title' },
				});
				const muIdResponse = await queryClient.fetchQuery(
					getRetrieveSeriesQueryOptions(
						(searchResults.data as SeriesSearchResponseV1).results[0]?.record
							?.series_id,
					),
				);
				addMangaUpdatesID(aniId, muIdResponse.data.series_id);
				return muIdResponse;
			},
			enabled: !!muId || !!title,
		});
	}
};

export const useMuReleasesQuery = (muId: number) => {
	const { mutateAsync: searchReleases } = useSearchReleasesPost();

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
		enabled: !!muId,
	});
};
