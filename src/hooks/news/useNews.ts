import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useGetAnimeNews, useGetMangaNews } from '@/api/jikan/jikan';

export const useNews = (type: MediaType, malId: number) => {
	if (type === MediaType.Anime) {
		return useGetAnimeNews(malId, { page: 1 }, { query: { enabled: !!malId && !!type } });
	} else {
		return useGetMangaNews(malId, { page: 1 }, { query: { enabled: !!malId && !!type } });
	}
};
