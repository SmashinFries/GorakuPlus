import {
	useUserAnimeStatsQuery,
	useUserMangaStatsQuery,
} from '@/store/services/anilist/generated-anilist';

export const useUserAnimeStats = (userId: number) => {
	const stats = useUserAnimeStatsQuery({ userId: userId }, { skip: !userId });
	return stats;
};

export const useUserMangaStats = (userId: number) => {
	const stats = useUserMangaStatsQuery({ userId: userId }, { skip: !userId });
	return stats;
};
