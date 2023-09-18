import { MediaType } from '../../../app/services/anilist/generated-anilist';
import {
    GetAnimeNewsApiResponse,
    GetMangaNewsApiResponse,
    useGetAnimeNewsQuery,
    useGetMangaNewsQuery,
} from '../../../app/services/mal/malApi';

export const useNews = (type: MediaType, malId: number) => {
    const animeNews = useGetAnimeNewsQuery(
        { id: malId },
        { skip: !malId || type !== MediaType.Anime },
    );
    const mangaNews = useGetMangaNewsQuery(
        { id: malId },
        { skip: !malId || type !== MediaType.Manga },
    );

    return {
        news: type === MediaType.Anime ? animeNews : mangaNews,
    };
};
