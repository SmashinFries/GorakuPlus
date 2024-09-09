import React, { useEffect, useState } from 'react';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';
import {
	CharacterSort,
	MediaFormat,
	MediaType,
	useAniMediaQuery,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useMatchStore } from '@/store/matchStore';
import { useMangaUpdatesQuery, useMuReleasesQuery } from '@/api/mangaupdates/extended';
import { useMalQuery } from '@/api/jikan/extended';

export const useMedia = (aniId: number | null, type: MediaType) => {
	// const { data } = useAnilistMalQuery(id, type);
	const [isReady, setIsReady] = useState(false);
	const userID = useAuthStore((state) => state.anilist.userID);
	const malDB = useMatchStore((state) => state.mal);
	const muDB = useMatchStore((state) => state.mangaUpdates);
	const { isMalEnabled, isMangaUpdatesEnabled } = useMatchStore((state) => ({
		isMalEnabled: state.isMalEnabled,
		isMangaUpdatesEnabled: state.isMangaDexEnabled,
	}));
	const addMalID = useMatchStore((state) => state.addMalID);

	const anilist = useAniMediaQuery({
		id: aniId,
		skipUser: !userID,
		userId: userID ?? undefined,
		perPage_c: 25,
		perPage_rec: 25,
		sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
	});

	const jikan = useMalQuery(malDB[aniId], type);
	const muSeries = useMangaUpdatesQuery(
		type === MediaType.Manga ? aniId : null,
		muDB[aniId],
		anilist.data?.Media?.type === MediaType.Manga
			? (anilist.data?.Media?.countryOfOrigin === 'KR'
					? anilist.data?.Media?.title?.english ?? anilist.data?.Media?.title?.romaji
					: anilist.data?.Media?.title?.romaji
				)
					?.replace('[', '')
					.replace(']', '')
			: anilist.data?.Media?.title?.romaji,
		anilist.data?.Media?.format === MediaFormat.Novel,
	);
	const muReleases = useMuReleasesQuery(type === MediaType.Manga ? muDB[aniId] : null);

	useEffect(() => {
		if (anilist?.isFetched && anilist?.data) {
			if (malDB && malDB[aniId]) {
				if (type === MediaType.Anime) {
					(isMalEnabled ? jikan?.isFetched : true) && setIsReady(true);
				} else {
					if (muDB[aniId]) {
						(isMalEnabled ? jikan?.isFetched : true) &&
							(isMangaUpdatesEnabled ? muSeries?.isFetched : true) &&
							(isMangaUpdatesEnabled ? muReleases?.isFetched : true) &&
							setIsReady(true);
					}
				}
			} else if (anilist?.data?.Media?.idMal) {
				addMalID(aniId, anilist?.data?.Media?.idMal);
			} else if (!anilist?.data?.Media?.idMal) {
				if (type === MediaType.Anime) {
					setIsReady(true);
				} else {
					(isMangaUpdatesEnabled ? muSeries?.isFetched && muReleases?.isFetched : true) &&
						setIsReady(true);
				}
			}
		}
	}, [type, malDB, anilist.isFetched, jikan.isFetched, muSeries.isFetched, muReleases.isFetched]);

	return { anilist, jikan, muSeries, muReleases, isReady };
};

// export const useOldMedia = (
// 	id: number | null,
// 	type: MediaType | 'MANHWA' | 'MANHUA' | 'NOVEL' | null,
// 	muID?: number,
// ) => {
// 	const [isAniLoading, setIsAniLoading] = useState(true);
// 	const [isMalLoading, setIsMalLoading] = useState(true);
// 	const [isMuLoading, setIsMuLoading] = useState(true);
// 	const { userID } = useAuthStore().anilist;

// 	const [getAniMedia, aniData] = useLazyAniMediaQuery();
// 	const [getMalManga, malMangaData] = useLazyGetMangaFullByIdQuery();
// 	const [getMalAnime, malAnimeData] = useLazyGetAnimeFullByIdQuery();
// 	const [getAnimeVideos, videoData] = useLazyGetAnimeVideosQuery();

// 	// MU
// 	const [getMuSearchSeries] = useSearchSeriesPostMutation();
// 	const [getMuSeries, muData] = useLazyRetrieveSeriesQuery();
// 	const [getMuReleases, muReleases] = useSearchReleasesPostMutation();
// 	const [estimatedChapterTime, setEstimatedChapterTime] = useState('');

// 	const fetchAniContent = async () => {
// 		if (!id) return null;
// 		setIsAniLoading(true);
// 		const aniRes = await getAniMedia({
// 			id: id,
// 			perPage_c: 25,
// 			perPage_rec: 25,
// 			sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
// 			skipUser: !userID,
// 			userId: userID,
// 		}).unwrap();
// 		console.log('Fetching:', id);
// 		setIsAniLoading(false);
// 		return aniRes;
// 	};

// 	const fetchMalContent = async (idMal: number | null) => {
// 		setIsMalLoading(true);
// 		idMal
// 			? type === MediaType.Anime
// 				? await getMalAnime({ id: idMal }).unwrap()
// 				: await getMalManga({ id: idMal }).unwrap()
// 			: null;
// 		idMal && type === MediaType.Anime ? await getAnimeVideos({ id: idMal }).unwrap() : null;
// 		setIsMalLoading(false);
// 	};

// 	const fetchMUContent = async (title: string, type: MediaFormat, muId?: number) => {
// 		setIsMuLoading(true);
// 		if (!muId) {
// 			const fixed_title = title?.replace('[', '').replace(']', '');
// 			try {
// 				const searchResults = await getMuSearchSeries({
// 					seriesSearchRequestV1: {
// 						search: `${fixed_title}${type === 'NOVEL' ? ' (Novel)' : ''}`,
// 						stype: 'title',
// 					},
// 				}).unwrap();
// 				await getMuSeries({
// 					id: searchResults?.results[0]?.record?.series_id,
// 				}).unwrap();
// 				const releases = await getMuReleases({
// 					releaseSearchRequestV1: {
// 						search_type: 'series',
// 						search: `${searchResults?.results[0]?.record?.series_id}`,
// 					},
// 				}).unwrap();
// 				if (releases?.results?.length > 1) {
// 					const latestDate = new Date(releases?.results[0]?.record?.release_date);
// 					const freq = getChapterFrequency(
// 						releases.results?.map((r) => r.record.release_date),
// 					);
// 					const timeleft = getEstimatedChapterTime(latestDate, freq);
// 					setEstimatedChapterTime(timeleft);
// 				}
// 			} catch (e) {
// 				Burnt.toast({ title: `Manga Updates - Error ${e?.status}`, duration: TOAST.LONG });
// 			}
// 			setIsMuLoading(false);
// 		} else {
// 			await getMuSeries({ id: muId }).unwrap();
// 			const releases = await getMuReleases({
// 				releaseSearchRequestV1: {
// 					search_type: 'series',
// 					search: `${muId}`,
// 				},
// 			}).unwrap();
// 			if (releases?.results?.length > 1) {
// 				const latestDate = new Date(releases?.results[0]?.record?.release_date);
// 				const freq = getChapterFrequency(
// 					releases.results?.map((r) => r.record.release_date),
// 				);
// 				const timeleft = getEstimatedChapterTime(latestDate, freq);
// 				setEstimatedChapterTime(timeleft);
// 			}
// 			setIsMuLoading(false);
// 		}
// 	};

// 	const refetchMUContent = async (id: number) => {
// 		await getMuSeries({
// 			id: id,
// 		}).unwrap();
// 	};

// 	const refetchAniData = async () => {
// 		await getAniMedia({
// 			id: id,
// 			perPage_c: 25,
// 			perPage_rec: 25,
// 			sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
// 			skipUser: !userID,
// 			userId: userID,
// 		}).unwrap();
// 	};

// 	const fetchAll = async () => {
// 		const aniData = await fetchAniContent();
// 		await fetchMalContent(aniData?.Media?.idMal ?? null);
// 		if (type === MediaType.Manga) {
// 			// Manhwa english title gives better accuracy
// 			await fetchMUContent(
// 				aniData?.Media?.countryOfOrigin === 'KR'
// 					? aniData?.Media?.title?.english ?? aniData?.Media?.title?.romaji
// 					: aniData?.Media?.title.romaji,
// 				aniData?.Media?.format,
// 				muID,
// 			);
// 		} else {
// 			setIsMuLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		if (muData?.data?.series_id) {
// 			if (!muID) {
// 				dispatch(updateDB({ aniId: id, muId: muData?.data?.series_id }));
// 			}
// 		}
// 	}, [muData]);

// 	useEffect(() => {
// 		if (aniData?.isUninitialized) {
// 			fetchAll();
// 		}
// 	}, []);

// 	return {
// 		aniData: aniData,
// 		malData: type === MediaType.Anime ? malAnimeData : malMangaData,
// 		videoData: videoData,
// 		mangaUpdates: muData,
// 		mangaReleases: muReleases,
// 		estimatedChapterTime,
// 		refetchMUContent,
// 		refetchAniData,
// 		isAniLoading,
// 		isMalLoading,
// 		isMuLoading,
// 	};
// };
