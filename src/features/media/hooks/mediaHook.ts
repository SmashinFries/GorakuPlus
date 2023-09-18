import React, { useEffect } from 'react';
import {
    CharacterSort,
    MediaType,
    useAniMediaQuery,
    useMediaFollowingQuery,
} from '../../../app/services/anilist/generated-anilist';
import {
    useGetAnimeFullByIdQuery,
    useGetAnimePicturesQuery,
    useGetAnimeVideosQuery,
    useGetMangaByIdQuery,
    useGetMangaPicturesQuery,
} from '../../../app/services/mal/malApi';
import {
    mangaUpdatesApi,
    useSearchSeriesPostMutation,
} from '../../../app/services/mangaupdates/mangaUpdatesApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useMangaUpdates from './useMangaUpdates';
import { updateDB } from '../muSlice';

export const useMedia = (
    id: number,
    type: MediaType | 'MANHWA' | 'NOVEL',
    malID?: number,
    muID?: number,
) => {
    const dispatch = useAppDispatch();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const aniData = useAniMediaQuery({
        id: id,
        userId: userID,
        skipUser: userID ? false : true,
        perPage_c: 10,
        perPage_rec: 10,
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
        { id: malID },
        { skip: type !== MediaType.Anime && !malID },
    );

    const animeImages = useGetAnimePicturesQuery(
        { id: malID },
        { skip: type !== MediaType.Anime && !malID },
    );

    const mangaImages = useGetMangaPicturesQuery(
        { id: malID },
        { skip: type === MediaType.Anime && !malID },
    );

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

    // useEffect(() => {
    //     console.log('checking');
    //     if (type !== MediaType.Anime && aniData.data?.Media && !mangaUpdates.data) {
    //         console.log('searching mangaupdates');
    //         getMangaUpdates(aniData?.data?.Media?.title.romaji);
    //     }
    // }, [aniData, mangaUpdates]);

    return {
        aniData: aniData,
        malData: malData ?? null,
        videoData: videoData,
        mangaUpdates: seriesData,
        animeImages: animeImages,
        mangaImages: mangaImages,
    };
};
