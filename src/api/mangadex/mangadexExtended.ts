import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetSearchMangaParams } from "./models";
import { GetSearchMangaInfiniteQueryResult } from "./mangadex";

export const useGetSearchManga = ({...params}: GetSearchMangaParams, {enabled}:{enabled?: boolean}) => {
	return useQuery({
		queryKey: [`https://api.mangadex.org/manga`, params.title],
		queryFn: async () => {
			const result = await axios.get<GetSearchMangaInfiniteQueryResult['data']>('https://api.mangadex.org/manga', {params: params});
			return result
		},
		enabled,
		gcTime: 0,
	})
};