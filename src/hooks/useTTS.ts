import { TTSVoice } from '@/store/tts/types';
import * as Speech from 'expo-speech';

const useTTS = () => {
	const speak = async (text: string, voice: TTSVoice) => {
		if (!voice?.voice) return;
		const isSpeaking = await Speech.isSpeakingAsync();
		if (isSpeaking) {
			await Speech.stop();
		} else {
			Speech.speak(text, {
				voice: voice.voice.identifier,
				pitch: voice.pitch,
				rate: voice.rate,
			});
		}
	};

	return { speak };
};

export default useTTS;
