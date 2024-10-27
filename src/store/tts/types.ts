import * as Speech from 'expo-speech';

export type TTSVoice = {
	voice?: Speech.Voice | null;
	rate?: number;
	pitch?: number;
};

export type TTSLanguages = 'english' | 'japanese' | 'korean' | 'chinese';
