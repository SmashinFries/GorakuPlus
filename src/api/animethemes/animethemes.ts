import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AnimeSongsParams, MainMusic } from './types';

const BASE_URL = 'https://api.animethemes.moe';
const AnimeThemesClient = axios.create({ baseURL: BASE_URL });

export const useAnimeSongs = (aniId: number) =>
	useQuery({
		queryKey: ['AnimeSongs'],
		queryFn: async () => {
			const params = {
				'filter[has]': 'resources',
				'filter[site]': 'AniList',
				'filter[external_id]': aniId,
				'fields[video]': 'id,basename,link,tags',
				'fields[audio]': 'id,basename,link,size',
				include:
					'animethemes.animethemeentries.videos,animethemes.animethemeentries.videos.audio,animethemes.song,animethemes.song.artists',
			};
			const { data } = await AnimeThemesClient.get<MainMusic>('/anime/', { params });
			return data;
		},
		enabled: !!aniId,
	});
