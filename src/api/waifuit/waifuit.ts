import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

export const useQuoteQuery = () => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitQuote'],
		queryFn: async () => {
			const response = await WaifuitClient.get<QuoteResponse>('/quote', {
				headers: header,
			});
			return response;
		},
		enabled: false,
	});
};

export const useFactQuery = () => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitFact'],
		queryFn: async () => {
			const response = await WaifuitClient.get<FactResponse>('/fact', {
				headers: header,
			});
			return response;
		},
		enabled: false,
	});
};

export const useWaifuQuery = () => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitWaifu'],
		queryFn: async () => {
			const response = await WaifuitClient.get<WaifuResponse>('/waifu', {
				headers: header,
			});
			return response;
		},
		enabled: false,
	});
};

export const useEmotionQuery = (emotion?: WaifuItEmotions) => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitEmotion', emotion],
		queryFn: async () => {
			const url = `/${emotion}`;
			const response = await WaifuitClient.get<InteractionResponse>(url, {
				headers: header,
			});
			return response;
		},
		enabled: false,
	});
};

export const useOwOQuery = (text?: string) => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitOwO', text],
		queryFn: async () => {
			const response = await WaifuitClient.get<TextGenResponse>('/owoify', {
				headers: header,
				params: { text },
			});
			return response;
		},
		enabled: false,
	});
};

export const useUvUQuery = (text?: string) => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitUvU', text],
		queryFn: async () => {
			const response = await WaifuitClient.get<TextGenResponse>('/uvuify', {
				headers: header,
				params: { text },
			});
			return response;
		},
		enabled: false,
	});
};

export const useUwUQuery = (text?: string) => {
	const { header } = useAuthStore().waifuit;
	return useQuery({
		queryKey: ['WaifuitUwU', text],
		queryFn: async () => {
			const response = await WaifuitClient.get<TextGenResponse>('/uwuify', {
				headers: header,
				params: { text },
			});
			return response;
		},
		enabled: false,
	});
};
