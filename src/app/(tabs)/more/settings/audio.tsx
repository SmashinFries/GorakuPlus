import { Accordion } from '@/components/animations';
import { GorakuSlider } from '@/components/slider';
import { ListSubheader } from '@/components/titles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TTSVoice, enableTTS, updateTTS } from '@/store/slices/ttsSlice';
import { useAppTheme } from '@/store/theme/theme';
import { BasicDialogProps } from '@/types';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
	Button,
	Dialog,
	Icon,
	IconButton,
	List,
	Portal,
	RadioButton,
	Switch,
	Text,
} from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { GorakuSwitch } from '@/components/switch';

type VoiceDialogProps = BasicDialogProps & {
	title: string;
	voices: Speech.Voice[];
	currentVoice: TTSVoice;
	voiceMessage: string;
	onConfirm: (voice: Speech.Voice, rate: number, pitch: number) => void;
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
	const [newVoice, setNewVoice] = useState<Speech.Voice | null>(currentVoice?.voice);
	const [newRate, setNewRate] = useState(currentVoice?.rate ?? 1.0);
	const [newPitch, setNewPitch] = useState(currentVoice?.pitch ?? 1.0);

	const speak = (text: string, rate?: number, pitch?: number) => {
		Speech.speak(text, {
			voice: newVoice?.identifier,
			rate: rate ?? currentVoice.rate,
			pitch: pitch ?? currentVoice.pitch,
		});
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Content>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
					<ListSubheader title="Pitch" />
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
					<Text>{newPitch.toFixed(1)}</Text>

					<GorakuSlider
						value={newPitch}
						step={0.1}
						maxValue={5.0}
						minValue={0.1}
						updateValue={(val) => setNewPitch(val)}
						style={{ flexGrow: 1 }}
					/>
					<Pressable
						style={{ justifyContent: 'center' }}
						onPress={() => {
							setNewPitch(1.0);
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
						}}
					>
						<Icon source="restart" size={22} />
					</Pressable>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
					<ListSubheader title="Rate" />
				</View>
				<View style={{ flexDirection: 'row', width: '100%' }}>
					<Text>{newRate.toFixed(1)}</Text>
					<GorakuSlider
						value={newRate}
						step={0.1}
						maxValue={5.0}
						minValue={0.1}
						updateValue={(val) => setNewRate(val)}
						style={{ flexGrow: 1 }}
					/>
					<Pressable
						style={{ justifyContent: 'center' }}
						onPress={() => {
							setNewRate(1.0);
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
						}}
					>
						<Icon source="restart" size={22} />
					</Pressable>
				</View>

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
	const { colors, dark } = useAppTheme();
	const { enabled, english, japanese, korean, chinese } = useAppSelector(
		(state) => state.ttsSettings,
	);
	const dispatch = useAppDispatch();

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
			dispatch(updateTTS({ entryType: 'english', value: { voice: english_voices[0] } }));
		}
		if (!japanese.voice && japanese_voices?.length > 0) {
			dispatch(updateTTS({ entryType: 'japanese', value: { voice: japanese_voices[0] } }));
		}
		if (!korean.voice && korean_voices?.length > 0) {
			dispatch(updateTTS({ entryType: 'korean', value: { voice: korean_voices[0] } }));
		}
		if (!chinese.voice && chinese_voices?.length > 0) {
			dispatch(updateTTS({ entryType: 'chinese', value: { voice: chinese_voices[0] } }));
		}
		setAvailableVoices(speakers);
	};

	const toggleTTS = (val: boolean) => {
		dispatch(enableTTS(val));
	};

	const onVoiceEdit = (
		lang: 'english' | 'japanese' | 'korean' | 'chinese',
		voice: Speech.Voice,
		rate: number,
		pitch: number,
	) => {
		dispatch(
			updateTTS({
				entryType: lang,
				value: { voice, rate, pitch },
			}),
		);
		lang === 'english'
			? setVoiceEngDialogVis(false)
			: lang === 'japanese'
				? setVoiceJpnDialogVis(false)
				: lang === 'korean'
					? setVoiceKorDialogVis(false)
					: setVoiceChnDialogVis(false);
	};

	useEffect(() => {
		getSpeakers();
	}, []);

	return (
		<ScrollView>
			<List.Item
				title="Text-to-Speech"
				description={'Used for media titles and descriptions'}
				right={(props) => (
					<GorakuSwitch
						{...props}
						value={enabled}
						onValueChange={(val) => toggleTTS(val)}
					/>
				)}
			/>
			<Accordion
				title="TTS Configuration"
				description="You can download more voices by finding text-to-speech in system settings (if available)"
				titleStyle={{ fontSize: 16 }}
				initialExpand
			>
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
					voiceMessage="Test"
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
