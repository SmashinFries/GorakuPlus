import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
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

export const useQuoteQuery = () => {
	return useQuery({
		queryKey: ['WaifuitQuote'],
		queryFn: async () => {
			const response = await WaifuitClient.get<QuoteResponse>('/quote', {
				headers: getHeader(),
			});
			return response;
		},
		enabled: false,
	});
};

export const useFactQuery = () => {
	return useQuery({
		queryKey: ['WaifuitFact'],
		queryFn: async () => {
			const response = await WaifuitClient.get<FactResponse>('/fact', {
				headers: getHeader(),
			});
			return response;
		},
		enabled: false,
	});
};

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
		enabled: false,
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
		enabled: false,
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
		enabled: false,
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
		enabled: false,
	});
};
