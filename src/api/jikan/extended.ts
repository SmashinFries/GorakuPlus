import { useMatchStore } from '@/store/matchStore';
import { MediaType } from '../anilist/__genereated__/gql';
import { useGetAnimeFullById, useGetMangaFullById } from './jikan';
import { useShallow } from 'zustand/react/shallow';

export const useMalQuery = (malId: number | undefined, type: MediaType | undefined) => {
	const isMalEnabled = useMatchStore(useShallow((state) => state.isMalEnabled));
	if (type === MediaType.Anime) {
		return useGetAnimeFullById(malId as number, { query: { enabled: isMalEnabled ? !!malId : false } });
	} else {
		return useGetMangaFullById(malId as number, { query: { enabled: isMalEnabled ? !!malId : false } });
	}
};
