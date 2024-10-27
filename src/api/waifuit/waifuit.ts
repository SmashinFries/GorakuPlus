import { useAuthStore } from '@/store/authStore';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import {
	FactResponse,
	InteractionParams,
	InteractionResponse,
	QuoteResponse,
	TextGenResponse,
	WaifuItEmotions,
	WaifuResponse,
} from './types';

const baseURL = 'https://waifu.it/api/v4';
const WaifuitClient = axios.create({ baseURL });

const getHeader = (): RawAxiosRequestHeaders => {
	const token = useAuthStore.getState().waifuit.token;
	return {
		Authorization: `${token}`,
	};
};

const getQuoteOptions = (): UndefinedInitialDataOptions<AxiosResponse<QuoteResponse, any>, Error, AxiosResponse<any>, string[]> => ({
	queryKey: ['WaifuitQuote'],
		queryFn: async () => {
			const response = await WaifuitClient.get<QuoteResponse>('/quote', {
				headers: getHeader(),
			});
			return response;
		},
		enabled: true,
})

export const useQuoteQuery = () => {
	return useQuery({
		...getQuoteOptions()
	});
};

useQuoteQuery.options = getQuoteOptions;

const getFactOptions = (): UndefinedInitialDataOptions<AxiosResponse<FactResponse, any>, Error, AxiosResponse<any>, string[]> => ({
	queryKey: ['WaifuitFact'],
		queryFn: async () => {
			const response = await WaifuitClient.get<FactResponse>('/fact', {
				headers: getHeader(),
			});
			return response;
		},
		enabled: false,
})

export const useFactQuery = () => {
	return useQuery({
		...getFactOptions()
	});
};

useFactQuery.options = getFactOptions;

export const useWaifuQuery = () => {
	return useQuery({
		queryKey: ['WaifuitWaifu'],
		queryFn: async () => {
			const response = await WaifuitClient.get<WaifuResponse>('/waifu', {
				headers: getHeader(),
			});
			return response;
		},
		enabled: false,
	});
};

export const useEmotionQuery = (emotion?: WaifuItEmotions) => {
	return useQuery({
		queryKey: ['WaifuitEmotion', emotion],
		queryFn: async () => {
			const url = `/${emotion}`;
			const response = await WaifuitClient.get<InteractionResponse>(url, {
				headers: getHeader(),
			});
			return response;
		},
		enabled: !!emotion,
	});
};

export const useOwOQuery = (text?: string) => {
	return useQuery({
		queryKey: ['WaifuitOwO', text],
		queryFn: async () => {
			const response = await WaifuitClient.get<TextGenResponse>('/owoify', {
				headers: getHeader(),
				params: { text },
			});
			return response;
		},
		enabled: !!text,
	});
};

export const useUvUQuery = (text?: string) => {
	return useQuery({
		queryKey: ['WaifuitUvU', text],
		queryFn: async () => {
			const response = await WaifuitClient.get<TextGenResponse>('/uvuify', {
				headers: getHeader(),
				params: { text },
			});
			return response;
		},
		enabled: !!text,
	});
};

export const useUwUQuery = (text?: string) => {
	return useQuery({
		queryKey: ['WaifuitUwU', text],
		queryFn: async () => {
			const response = await WaifuitClient.get<TextGenResponse>('/uwuify', {
				headers: getHeader(),
				params: { text },
			});
			return response;
		},
		enabled: !!text,
	});
};
