import { useUserAnimeStatsQuery, useUserMangaStatsQuery } from '@/api/anilist/__genereated__/gql';

export const useUserAnimeStats = (userId: number) => {
	const stats = useUserAnimeStatsQuery({ userId: userId }, { enabled: !!userId });
	return stats;
};

export const useUserMangaStats = (userId: number) => {
	const stats = useUserMangaStatsQuery({ userId: userId }, { enabled: !!userId });
	return stats;
};
