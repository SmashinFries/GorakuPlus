import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NekosRandomImagesQueryParams, NekosRandomImagesQueryResponse } from './types';

const NekosClient = axios.create({ baseURL: 'https://api.nekosapi.com/v3' });

export const fetchRandomImages = async (params?: NekosRandomImagesQueryParams) => {
	const urlParams = new URLSearchParams();
	Object.keys(params).forEach((key: keyof NekosRandomImagesQueryParams) => {
		if (key === 'character') {
			params.character?.length > 0 &&
				params.character.forEach((val) => urlParams.append('character', `${val}`));
		} else if (key === 'rating') {
			params.rating?.length > 0 &&
				params.rating.forEach((val) => urlParams.append('rating', `${val}`));
		} else {
			urlParams.append(key, `${params[key]}`);
		}
	});
	console.log('og:', params);
	console.log('urlParams:', urlParams.toString());
	const response = await NekosClient.get<NekosRandomImagesQueryResponse>('/images/random', {
		params: urlParams,
	});
	console.log(response.status, response.statusText);
	console.log(response.config.url);
	return response;
};

export const useNekosRandomImagesQuery = (params?: NekosRandomImagesQueryParams) => {
	return useQuery({
		queryKey: ['NekosRandomImages', params],
		queryFn: () => fetchRandomImages(params),
		refetchOnWindowFocus: false,
	});
};
