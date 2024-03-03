import * as Speech from 'expo-speech';

const useTTS = () => {
	const speak = async (text: string, config?: Speech.SpeechOptions) => {
		if (!config?.voice) return;
		const isSpeaking = await Speech.isSpeakingAsync();
		if (isSpeaking) {
			await Speech.stop();
		} else {
			Speech.speak(text, config);
		}
	};

	return { speak };
};

export default useTTS;
