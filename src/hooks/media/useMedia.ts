import React, { useEffect, useState } from 'react';
import {
    AniMediaQuery,
    CharacterSort,
    MediaFormat,
    MediaType,
    useAniMediaQuery,
    useLazyAniMediaQuery,
} from '@/store/services/anilist/generated-anilist';
import {
    useGetAnimeFullByIdQuery,
    useGetAnimePicturesQuery,
    useGetAnimeVideosQuery,
    useGetMangaByIdQuery,
    useGetMangaFullByIdQuery,
    useGetMangaPicturesQuery,
    useLazyGetAnimeFullByIdQuery,
    useLazyGetAnimeVideosQuery,
    useLazyGetMangaFullByIdQuery,
} from '@/store/services/mal/malApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateDB } from '@/store/slices/muSlice';
import {
    useLazyRetrieveReleaseQuery,
    useLazyRetrieveSeriesQuery,
    useSearchReleasesPostMutation,
    useSearchSeriesPostMutation,
} from '@/store/services/mangaupdates/mangaUpdatesApi';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';
import { getChapterFrequency, getEstimatedChapterTime } from '@/utils';

export const useMedia = (id: number, type: MediaType | 'MANHWA' | 'NOVEL', muID?: number) => {
    const dispatch = useAppDispatch();
    const [isAniLoading, setIsAniLoading] = useState(true);
    const [isMalLoading, setIsMalLoading] = useState(true);
    const [isMuLoading, setIsMuLoading] = useState(true);
    const { userID } = useAppSelector((state) => state.persistedAniLogin);

    const [getAniMedia, aniData] = useLazyAniMediaQuery();
    const [getMalManga, malMangaData] = useLazyGetMangaFullByIdQuery();
    const [getMalAnime, malAnimeData] = useLazyGetAnimeFullByIdQuery();
    const [getAnimeVideos, videoData] = useLazyGetAnimeVideosQuery();

    // MU
    const [getMuSearchSeries] = useSearchSeriesPostMutation();
    const [getMuSeries, muData] = useLazyRetrieveSeriesQuery();
    const [getMuReleases, muReleases] = useSearchReleasesPostMutation();
    const [estimatedChapterTime, setEstimatedChapterTime] = useState('');

    const fetchAniContent = async () => {
        setIsAniLoading(true);
        const aniRes = await getAniMedia({
            id: id,
            userId: userID,
            skipUser: userID ? false : true,
            perPage_c: 25,
            perPage_rec: 25,
            sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
        }).unwrap();
        setIsAniLoading(false);
        return aniRes;
    };

    const fetchMalContent = async (idMal: number | null) => {
        setIsMalLoading(true);
        idMal
            ? type === MediaType.Anime
                ? await getMalAnime({ id: idMal }).unwrap()
                : await getMalManga({ id: idMal }).unwrap()
            : null;
        idMal && type === MediaType.Anime ? await getAnimeVideos({ id: idMal }).unwrap() : null;
        setIsMalLoading(false);
    };

    const fetchMUContent = async (title: string, type: MediaFormat, muId?: number) => {
        setIsMuLoading(true);
        if (!muId) {
            const fixed_title = title?.replace('[', '').replace(']', '');
            try {
                const searchResults = await getMuSearchSeries({
                    seriesSearchRequestV1: {
                        search: `${fixed_title}${type === 'NOVEL' ? ' (Novel)' : ''}`,
                        stype: 'title',
                    },
                }).unwrap();
                await getMuSeries({
                    id: searchResults?.results[0]?.record?.series_id,
                }).unwrap();
                const releases = await getMuReleases({
                    releaseSearchRequestV1: {
                        search_type: 'series',
                        search: `${searchResults?.results[0]?.record?.series_id}`,
                    },
                }).unwrap();
                if (releases?.results?.length > 1) {
                    const latestDate = new Date(releases?.results[0]?.record?.release_date);
                    const freq = getChapterFrequency(
                        releases.results?.map((r) => r.record.release_date),
                    );
                    const timeleft = getEstimatedChapterTime(latestDate, freq);
                    setEstimatedChapterTime(timeleft);
                }
            } catch (e) {
                Burnt.toast({ title: `Manga Updates - Error ${e?.status}`, duration: TOAST.LONG });
            }
            setIsMuLoading(false);
        } else {
            await getMuSeries({ id: muId }).unwrap();
            const releases = await getMuReleases({
                releaseSearchRequestV1: {
                    search_type: 'series',
                    search: `${muId}`,
                },
            }).unwrap();
            if (releases?.results?.length > 1) {
                const latestDate = new Date(releases?.results[0]?.record?.release_date);
                const freq = getChapterFrequency(
                    releases.results?.map((r) => r.record.release_date),
                );
                const timeleft = getEstimatedChapterTime(latestDate, freq);
                setEstimatedChapterTime(timeleft);
            }
            setIsMuLoading(false);
        }
    };

    const refetchMUContent = async (id: number) => {
        await getMuSeries({
            id: id,
        }).unwrap();
    };

    const refetchAniData = async () => {
        await getAniMedia({
            id: id,
            userId: userID,
            skipUser: userID ? false : true,
            perPage_c: 25,
            perPage_rec: 25,
            sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
        }).unwrap();
    };

    const fetchAll = async () => {
        const aniData = await fetchAniContent();
        await fetchMalContent(aniData?.Media?.idMal ?? null);
        if (type === MediaType.Manga) {
            // Manhwa english title gives better accuracy
            await fetchMUContent(
                aniData?.Media?.countryOfOrigin === 'KR'
                    ? aniData?.Media?.title?.english ?? aniData?.Media?.title?.romaji
                    : aniData?.Media?.title.romaji,
                aniData?.Media?.format,
                muID,
            );
        } else {
            setIsMuLoading(false);
        }
    };

    useEffect(() => {
        if (muData?.data?.series_id) {
            if (!muID) {
                dispatch(updateDB({ aniId: id, muId: muData?.data?.series_id }));
            }
        }
    }, [muData]);

    useEffect(() => {
        fetchAll();
    }, []);

    return {
        aniData: aniData,
        malData: type === MediaType.Anime ? malAnimeData : malMangaData,
        videoData: videoData,
        mangaUpdates: muData,
        mangaReleases: muReleases,
        estimatedChapterTime,
        refetchMUContent,
        refetchAniData,
        isAniLoading,
        isMalLoading,
        isMuLoading,
    };
};
