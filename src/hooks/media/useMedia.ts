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
import useMangaUpdates from './useMangaUpdates';
import { updateDB } from '@/store/slices/muSlice';
import {
    useLazyRetrieveSeriesQuery,
    useSearchSeriesPostMutation,
} from '@/store/services/mangaupdates/mangaUpdatesApi';

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
            const searchResults = await getMuSearchSeries({
                seriesSearchRequestV1: {
                    search: `${fixed_title}${type === 'NOVEL' ? ' (Novel)' : ''}`,
                    stype: 'title',
                },
            }).unwrap();
            await getMuSeries({
                id: muId ? muId : searchResults?.results[0]?.record?.series_id,
            }).unwrap();
            setIsMuLoading(false);
        } else {
            await getMuSeries({ id: muId }).unwrap();
            setIsMuLoading(false);
        }
    };

    const refetchMUContent = async (id: number) => {
        await getMuSeries({
            id: id,
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
    // const aniData = useAniMediaQuery({
    //     id: id,
    //     userId: userID,
    //     skipUser: userID ? false : true,
    //     perPage_c: 25,
    //     perPage_rec: 25,
    //     sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
    // });

    // const malData =
    //     type === MediaType.Anime
    //         ? useGetAnimeFullByIdQuery(
    //               { id: aniData.data?.Media?.idMal },
    //               { skip: !aniData.data?.Media?.idMal },
    //           )
    //         : useGetMangaFullByIdQuery(
    //               { id: aniData.data?.Media?.idMal },
    //               { skip: !aniData.data?.Media?.idMal },
    //           );
    // const videoData = useGetAnimeVideosQuery(
    //     { id: aniData.data?.Media?.idMal },
    //     { skip: type !== MediaType.Anime && !aniData.data?.Media?.idMal },
    // );

    // const animeImages = useGetAnimePicturesQuery(
    //     { id: aniData.data?.Media?.idMal },
    //     { skip: type !== MediaType.Anime && !aniData.data?.Media?.idMal },
    // );

    // const mangaImages = useGetMangaPicturesQuery(
    //     { id: aniData.data?.Media?.idMal },
    //     { skip: type === MediaType.Anime && !aniData.data?.Media?.idMal },
    // );

    // const { seriesData } = useMangaUpdates(
    //     aniData?.data?.Media?.title.romaji,
    //     aniData?.data?.Media?.format,
    //     type === MediaType.Anime,
    //     muID,
    // );

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

    // useEffect(() => {
    //     console.log('checking');
    //     if (type !== MediaType.Anime && aniData.data?.Media && !mangaUpdates.data) {
    //         console.log('searching mangaupdates');
    //         getMangaUpdates(aniData?.data?.Media?.title.romaji);
    //     }
    // }, [aniData, mangaUpdates]);

    return {
        aniData: aniData,
        malData: type === MediaType.Anime ? malAnimeData : malMangaData,
        videoData: videoData,
        mangaUpdates: muData,
        refetchMUContent,
        isAniLoading,
        isMalLoading,
        isMuLoading,
    };
};
