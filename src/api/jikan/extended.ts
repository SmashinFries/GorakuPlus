import { useMatchStore } from '@/store/matchStore';
import { MediaType } from '../anilist/__genereated__/gql';
import { useGetAnimeFullById, useGetMangaFullById } from './jikan';

export const useMalQuery = (malId: number, type: MediaType) => {
	const isMalEnabled = useMatchStore((state) => state.isMalEnabled);
	if (type === MediaType.Anime) {
		return useGetAnimeFullById(malId, { query: { enabled: isMalEnabled ? !!malId : false } });
	} else {
		return useGetMangaFullById(malId, { query: { enabled: isMalEnabled ? !!malId : false } });
	}
};
