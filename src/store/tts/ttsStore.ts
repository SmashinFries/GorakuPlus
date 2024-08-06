import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { TTSLanguages, TTSVoice } from './types';

const storage = new MMKV({
	id: 'tts-store',
});
const TTSStorage = getZustandStorage(storage);

type TTSState = {
	english: TTSVoice;
	japanese: TTSVoice;
	korean: TTSVoice;
	chinese: TTSVoice;
	enabled: boolean;
};

type TTSActions = {
	updateTTS: (language: TTSLanguages, settings: TTSVoice) => void;
	enableTTS: (isEnabled: boolean) => void;
};

const initialState: TTSState = {
	english: {
		voice: null,
		rate: 1.0,
		pitch: 1.0,
	},
	japanese: {
		voice: null,
		rate: 1.0,
		pitch: 1.0,
	},
	korean: {
		voice: null,
		rate: 1.0,
		pitch: 1.0,
	},
	chinese: {
		voice: null,
		rate: 1.0,
		pitch: 1.0,
	},
	enabled: false,
};

export const useTTSStore = create<TTSState & TTSActions>()(
	persist(
		(set, get) => ({
			...initialState,
			updateTTS(language, settings) {
				set((state) => ({ [language]: { ...state[language], ...settings } }));
			},
			enableTTS(isEnabled) {
				set({ enabled: isEnabled });
			},
		}),
		{
			name: 'tts-store',
			storage: createJSONStorage(() => TTSStorage),
		},
	),
);
