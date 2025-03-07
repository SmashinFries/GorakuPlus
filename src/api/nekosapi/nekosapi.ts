import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NekosApiImageSearchParams, NekosApiImageResponse, NekosApiImageSearchResponse } from "./types";

const BASE_URL = "https://api.nekosapi.com/v4";
const NekosAPI = axios.create({ baseURL: BASE_URL, paramsSerializer: { indexes: null } });

/**
 * This endpoint allows you to search for an image, filtering by tags, characters, artists, etc.
 * @param rating The (age) rating of the image.
 * @param artist The artist's ID.
 * @param tags The tags names, comma-delimited.
 * @param without_tags The tags to exclude's names, comma-delimited.
 * @param limit The amount of images to return.
 * @param offset The amount of images to skip.
 */
export const useNekosApiImageSearchQuery = (params: NekosApiImageSearchParams) => useQuery({
	queryKey: ['nekosapi_image_search', params],
	queryFn: async () => NekosAPI.get<NekosApiImageSearchResponse>('/images', { params })
})

/**
 * This endpoint allows you to get x random images, filtering by tags, characters, artists, etc.
 * @param rating The (age) rating of the image.
 * @param artist The artist's ID.
 * @param tags The tags names, comma-delimited.
 * @param without_tags The tags to exclude's names, comma-delimited.
 * @param limit The amount of images to return.
 */
export const useNekosApiRandomImageQuery = (params: Omit<NekosApiImageSearchParams, 'offset'>) => useQuery({
	queryKey: ['nekosapi_random_image', params],
	queryFn: async () => NekosAPI.get<NekosApiImageResponse[]>('/images/random', { params })
})

/**
 * This endpoint allows you to get an image by its ID.
 * @param id The image's ID
 */
export const useNekosApiImageIdQuery = (id: string | number) => useQuery({
	queryKey: ['nekosapi_image_id', id],
	queryFn: async () => NekosAPI.get<NekosApiImageResponse>(`/images/${id}`),
	enabled: !!id
})