import React, { useEffect, useState } from 'react';
import {
    CharacterSort,
    MediaType,
    useAniMediaQuery,
} from '@/store/services/anilist/generated-anilist';
import {
    useGetAnimeFullByIdQuery,
    useGetAnimePicturesQuery,
    useGetAnimeVideosQuery,
    useGetMangaByIdQuery,
    useGetMangaFullByIdQuery,
    useGetMangaPicturesQuery,
} from '@/store/services/mal/malApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useMangaUpdates from './useMangaUpdates';
import { updateDB } from '@/store/slices/muSlice';

export const useMedia = (id: number, type: MediaType | 'MANHWA' | 'NOVEL', muID?: number) => {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const aniData = useAniMediaQuery({
        id: id,
        userId: userID,
        skipUser: userID ? false : true,
        perPage_c: 25,
        perPage_rec: 25,
        sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
    });

    const malData =
        type === MediaType.Anime
            ? useGetAnimeFullByIdQuery(
                  { id: aniData.data?.Media?.idMal },
                  { skip: !aniData.data?.Media?.idMal },
              )
            : useGetMangaFullByIdQuery(
                  { id: aniData.data?.Media?.idMal },
                  { skip: !aniData.data?.Media?.idMal },
              );
    const videoData = useGetAnimeVideosQuery(
        { id: aniData.data?.Media?.idMal },
        { skip: type !== MediaType.Anime && !aniData.data?.Media?.idMal },
    );

    // const animeImages = useGetAnimePicturesQuery(
    //     { id: aniData.data?.Media?.idMal },
    //     { skip: type !== MediaType.Anime && !aniData.data?.Media?.idMal },
    // );

    // const mangaImages = useGetMangaPicturesQuery(
    //     { id: aniData.data?.Media?.idMal },
    //     { skip: type === MediaType.Anime && !aniData.data?.Media?.idMal },
    // );

    const { seriesData } = useMangaUpdates(
        aniData?.data?.Media?.title.romaji,
        aniData?.data?.Media?.format,
        type === MediaType.Anime,
        muID,
    );

    useEffect(() => {
        if (seriesData?.data?.series_id) {
            if (!muID) {
                dispatch(updateDB({ aniId: id, muId: seriesData?.data?.series_id }));
            }
        }
    }, [seriesData]);

    useEffect(() => {
        if (aniData.isSuccess && aniData.data) {
            if (aniData.data?.Media?.idMal && malData.isSuccess) {
                if (type !== MediaType.Anime) {
                    if (seriesData.isSuccess) {
                        setIsLoaded(true);
                    }
                } else if (type === MediaType.Anime && videoData.isSuccess) {
                    setIsLoaded(true);
                }
                // setIsLoaded(true);
            } else if (!aniData.data?.Media?.idMal) {
                if (type !== MediaType.Anime) {
                    if (seriesData.isSuccess) {
                        setIsLoaded(true);
                    }
                } else if (type === MediaType.Anime) {
                    setIsLoaded(true);
                }
            }
        }
    }, [aniData, malData, videoData, seriesData]);

    // useEffect(() => {
    //     console.log('checking');
    //     if (type !== MediaType.Anime && aniData.data?.Media && !mangaUpdates.data) {
    //         console.log('searching mangaupdates');
    //         getMangaUpdates(aniData?.data?.Media?.title.romaji);
    //     }
    // }, [aniData, mangaUpdates]);

    return {
        aniData: aniData,
        malData: malData,
        videoData: videoData,
        mangaUpdates: seriesData,
        isLoaded: isLoaded,
    };
};
