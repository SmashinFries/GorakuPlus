import * as Speech from 'expo-speech';

export type TTSVoice = {
	voice?: Speech.Voice | null;
	rate?: number;
	pitch?: number;
};

type TTSVoiceKeys = keyof TTSVoice;
export type TTSLanguages = 'english' | 'japanese' | 'korean' | 'chinese';
