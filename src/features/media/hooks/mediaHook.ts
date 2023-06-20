import React, { useEffect } from 'react';
import { MediaType, useAniMediaQuery } from '../../../app/services/anilist/generated-anilist';
import {
    useGetAnimeFullByIdQuery,
    useGetAnimeVideosQuery,
    useGetMangaByIdQuery,
} from '../../../app/services/mal/malApi';

export const useMedia = (id: number, type: MediaType | 'MANHWA' | 'NOVEL', malID?: number) => {
    const aniData = useAniMediaQuery({ id: id });
    const malData =
        type === MediaType.Anime
            ? useGetAnimeFullByIdQuery({ id: malID }, {})
            : useGetMangaByIdQuery({ id: malID }, {});
    const videoData = useGetAnimeVideosQuery(
        { id: malID },
        { skip: type !== MediaType.Anime && !malID },
    );

    return { aniData: aniData, malData: malData ?? null, videoData: videoData };
};
