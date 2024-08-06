import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as Speech from 'expo-speech';

export type TTSVoice = {
	voice?: Speech.Voice | null;
	rate?: number;
	pitch?: number;
};

// Define a type for the slice state
export type TTSState = {
	english: TTSVoice;
	japanese: TTSVoice;
	korean: TTSVoice;
	chinese: TTSVoice;
	enabled: boolean;
};

// Define the initial state using that type
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

type TTSVoiceKeys = keyof TTSVoice;
export type TTSLanguages = 'english' | 'japanese' | 'korean' | 'chinese';
export type TTSActions = {
	entryType: TTSLanguages;
	value: { [key in TTSVoiceKeys]?: TTSVoice[key] };
};

export const ttsSlice = createSlice({
	name: 'tts',
	initialState,
	reducers: {
		enableTTS: (state, action: PayloadAction<boolean>) => {
			state.enabled = action.payload;
		},
		updateTTS: (state, action: PayloadAction<TTSActions>) => {
			state[action.payload.entryType] = action.payload.value;
		},
	},
});

export const { updateTTS, enableTTS } = ttsSlice.actions;

export default ttsSlice.reducer;
