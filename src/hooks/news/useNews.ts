import { MediaType } from '@/store/services/anilist/generated-anilist';
import { useGetAnimeNewsQuery, useGetMangaNewsQuery } from '@/store/services/mal/malApi';
import { useEffect } from 'react';

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
