import React, { useEffect } from 'react';
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
    useGetMangaPicturesQuery,
} from '@/store/services/mal/malApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useMangaUpdates from './useMangaUpdates';
import { updateDB } from '@/store/slices/muSlice';

export const useMedia = (id: number, type: MediaType | 'MANHWA' | 'NOVEL', muID?: number) => {
    const dispatch = useAppDispatch();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const aniData = useAniMediaQuery({
        id: id,
        userId: userID,
        skipUser: userID ? false : true,
        perPage_c: 15,
        perPage_rec: 15,
        sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
    });

    const malData =
        type === MediaType.Anime
            ? useGetAnimeFullByIdQuery(
                  { id: aniData.data?.Media?.idMal },
                  { skip: !aniData.data?.Media?.idMal },
              )
            : useGetMangaByIdQuery(
                  { id: aniData.data?.Media?.idMal },
                  { skip: !aniData.data?.Media?.idMal },
              );
    const videoData = useGetAnimeVideosQuery(
        { id: aniData.data?.Media?.idMal },
        { skip: type !== MediaType.Anime && !aniData.data?.Media?.idMal },
    );

    const animeImages = useGetAnimePicturesQuery(
        { id: aniData.data?.Media?.idMal },
        { skip: type !== MediaType.Anime && !aniData.data?.Media?.idMal },
    );

    const mangaImages = useGetMangaPicturesQuery(
        { id: aniData.data?.Media?.idMal },
        { skip: type === MediaType.Anime && !aniData.data?.Media?.idMal },
    );

    const { seriesData } = useMangaUpdates(
        aniData?.data?.Media?.title.romaji,
        aniData?.data?.Media?.format,
        type === MediaType.Anime,
        muID,
    );

    useEffect(() => {
        if (seriesData?.data?.series_id) {
            console.log('updating mu id:', seriesData?.data?.series_id);
            if (!muID) {
                dispatch(updateDB({ aniId: id, muId: seriesData?.data?.series_id }));
            }
        }
    }, [seriesData]);

    // useEffect(() => {
    //     console.log('checking');
    //     if (type !== MediaType.Anime && aniData.data?.Media && !mangaUpdates.data) {
    //         console.log('searching mangaupdates');
    //         getMangaUpdates(aniData?.data?.Media?.title.romaji);
    //     }
    // }, [aniData, mangaUpdates]);

    useEffect(() => {
        console.log('using hook!');
    }, []);

    return {
        aniData: aniData,
        malData: malData,
        videoData: videoData,
        mangaUpdates: seriesData,
        animeImages: animeImages,
        mangaImages: mangaImages,
    };
};
