import { Accordion } from '@/components/animations';
import { ListSubheader } from '@/components/titles';
import { BasicDialogProps } from '@/types';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, List, Portal, RadioButton } from 'react-native-paper';
import { MaterialSwitchListItem } from '@/components/switch';
import { TTSVoice } from '@/store/tts/types';
import { useTTSStore } from '@/store/tts/ttsStore';
import { Slider } from '@/components/slider';

type VoiceDialogProps = BasicDialogProps & {
	title: string;
	voices: Speech.Voice[];
	currentVoice: TTSVoice;
	voiceMessage: string;
	onConfirm: (voice: Speech.Voice | null, rate: number, pitch: number) => void;
};
const VoiceDialog = ({
	visible,
	onDismiss,
	onConfirm,
	title,
	voiceMessage,
	currentVoice,
	voices,
}: VoiceDialogProps) => {
	const [newVoice, setNewVoice] = useState<Speech.Voice | null>(currentVoice?.voice ?? null);
	const [newRate, setNewRate] = useState(currentVoice?.rate ?? 1.0);
	const [newPitch, setNewPitch] = useState(currentVoice?.pitch ?? 1.0);

	const speak = (text: string, rate?: number, pitch?: number) => {
		Speech.speak(text, {
			voice: newVoice?.identifier,
			rate: rate ?? currentVoice.rate,
			pitch: pitch ?? currentVoice.pitch,
		});
	};

	useEffect(() => {
		setNewVoice(currentVoice?.voice ?? null);
	}, [currentVoice]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Content>
				{/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
					<ListSubheader title="Pitch" />
				</View> */}
				<Slider
					title="Pitch"
					description={newPitch.toString()}
					initialValue={newPitch}
					onValueUpdate={(val) => val && setNewPitch(val)}
					steps={0.1}
					maxValue={5.0}
					minValue={0.1}
				/>
				{/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
					<ListSubheader title="Rate" />
				</View> */}
				<Slider
					title="Rate"
					initialValue={newRate}
					onValueUpdate={(val) => val && setNewRate(val)}
					steps={0.1}
					maxValue={5.0}
					minValue={0.1}
					description={newRate.toString()}
				/>
				{/* <Pressable
						style={{ justifyContent: 'center' }}
						onPress={() => {
							setNewRate(1.0);
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
						}}
					>
						<Icon source="restart" size={22} />
					</Pressable> */}

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<Button
						mode="contained-tonal"
						icon={'text-to-speech'}
						onPress={() => speak(voiceMessage, newRate, newPitch)}
					>
						Play Voice
					</Button>
				</View>
			</Dialog.Content>
			<Dialog.ScrollArea>
				<ListSubheader title="Voices" />
				<ScrollView>
					{voices.map((voice, index) => (
						<RadioButton.Item
							key={index}
							label={
								voice.name +
								`${voice.quality === Speech.VoiceQuality.Enhanced ? ' (Enhanced) ' : ''}`
							}
							value={voice.identifier}
							onPress={() => setNewVoice(voice)}
							status={
								newVoice?.identifier === voice.identifier ? 'checked' : 'unchecked'
							}
						/>
					))}
				</ScrollView>
			</Dialog.ScrollArea>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={() => onConfirm(newVoice, newRate, newPitch)}>Update</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

const AudioPage = () => {
	const { enabled, english, japanese, korean, chinese, enableTTS, updateTTS } = useTTSStore();

	const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
	const [voiceEngDialogVis, setVoiceEngDialogVis] = useState(false);
	const [voiceJpnDialogVis, setVoiceJpnDialogVis] = useState(false);
	const [voiceKorDialogVis, setVoiceKorDialogVis] = useState(false);
	const [voiceChnDialogVis, setVoiceChnDialogVis] = useState(false);

	const getSpeakers = async () => {
		const speakers = await Speech.getAvailableVoicesAsync();
		const english_voices = speakers.filter((s) => s.language.includes('en'));
		const japanese_voices = speakers.filter((s) => s.language.includes('ja'));
		const korean_voices = speakers.filter((s) => s.language.includes('ko'));
		const chinese_voices = speakers.filter((s) => s.language.includes('zh'));
		if (!english.voice && english_voices?.length > 0) {
			updateTTS('english', { voice: english_voices[0] });
		}
		if (!japanese.voice && japanese_voices?.length > 0) {
			updateTTS('japanese', { voice: japanese_voices[0] });
		}
		if (!korean.voice && korean_voices?.length > 0) {
			updateTTS('korean', { voice: korean_voices[0] });
		}
		if (!chinese.voice && chinese_voices?.length > 0) {
			updateTTS('chinese', { voice: chinese_voices[0] });
		}
		setAvailableVoices(speakers);
	};

	const toggleTTS = () => {
		enableTTS(!enabled);
	};

	const onVoiceEdit = (
		lang: 'english' | 'japanese' | 'korean' | 'chinese',
		voice: Speech.Voice | null,
		rate: number,
		pitch: number,
	) => {
		updateTTS(lang, { voice, rate, pitch });
		switch (lang) {
			case 'english':
				setVoiceEngDialogVis(false);
				break;
			case 'japanese':
				setVoiceJpnDialogVis(false);
				break;
			case 'korean':
				setVoiceKorDialogVis(false);
				break;
			case 'chinese':
				setVoiceChnDialogVis(false);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		getSpeakers();
	}, []);

	return (
		<ScrollView>
			<MaterialSwitchListItem
				title="Text-to-Speech"
				description={'Used for media titles and descriptions'}
				selected={enabled}
				onPress={toggleTTS}
			/>
			<Accordion
				title="TTS Configuration"
				description="You can download more voices by finding text-to-speech in system settings (if available)"
				titleStyle={{ fontSize: 16 }}
				initialExpand
			>
				<List.Item
					title="Refresh Voices"
					description={'Use this when no lists show up'}
					onPress={getSpeakers}
					right={(props) => <List.Icon {...props} icon={'refresh'} />}
				/>
				<List.Item
					title="English"
					description={english.voice?.name ?? 'No voice available'}
					onPress={() => setVoiceEngDialogVis(true)}
					disabled={english.voice === null}
				/>
				<List.Item
					title="Japanese"
					description={japanese.voice?.name ?? 'No voice available'}
					onPress={() => setVoiceJpnDialogVis(true)}
					disabled={japanese.voice === null}
				/>
				<List.Item
					title="Korean"
					description={korean.voice?.name ?? 'No voice available'}
					onPress={() => setVoiceKorDialogVis(true)}
					disabled={korean.voice === null}
				/>
				<List.Item
					title="Chinese Simplified"
					description={chinese.voice?.name ?? 'No voice available'}
					onPress={() => setVoiceChnDialogVis(true)}
					disabled={chinese.voice === null}
				/>
			</Accordion>
			<Portal>
				<VoiceDialog
					title="English TTS"
					voiceMessage="Goraku is the best app!"
					visible={voiceEngDialogVis}
					onDismiss={() => setVoiceEngDialogVis(false)}
					currentVoice={english}
					voices={availableVoices.filter((s) => s.language === 'en-US')}
					onConfirm={(voice, rate, pitch) => onVoiceEdit('english', voice, rate, pitch)}
				/>
				<VoiceDialog
					title="Japanese TTS"
					voiceMessage="これは日本語です！"
					visible={voiceJpnDialogVis}
					onDismiss={() => setVoiceJpnDialogVis(false)}
					currentVoice={japanese}
					voices={availableVoices.filter((s) => s.language === 'ja-JP')}
					onConfirm={(voice, rate, pitch) => onVoiceEdit('japanese', voice, rate, pitch)}
				/>
				<VoiceDialog
					title="Korean TTS"
					voiceMessage="이것은 한국어입니다"
					visible={voiceKorDialogVis}
					onDismiss={() => setVoiceKorDialogVis(false)}
					currentVoice={korean}
					voices={availableVoices.filter((s) => s.language === 'ko-KR')}
					onConfirm={(voice, rate, pitch) => onVoiceEdit('korean', voice, rate, pitch)}
				/>
				<VoiceDialog
					title="Chinese TTS"
					voiceMessage="这是中文"
					visible={voiceChnDialogVis}
					onDismiss={() => setVoiceChnDialogVis(false)}
					currentVoice={chinese}
					voices={availableVoices.filter((s) => s.language === 'zh-CN')}
					onConfirm={(voice, rate, pitch) => onVoiceEdit('chinese', voice, rate, pitch)}
				/>
			</Portal>
		</ScrollView>
	);
};

export default AudioPage;
