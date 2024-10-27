import { Dialog, Text, Button, RadioButton, List, Chip } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScoreContainer } from '../../../score';
import { MediaCard } from '../../../cards';
import dummyData from '@/constants/dummyData';
import { useTranslation } from 'react-i18next';
import { ScoreVisualType, ScoreVisualTypeEnum } from '@/store/settings/types';
import { ThemeOptions, useAppTheme } from '@/store/theme/themes';
import { MUISlider } from '@/components/slider';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ListStatusMode, useCardVisualStore } from '@/store/cardVisualStore';
import { useShallow } from 'zustand/react/shallow';

type SliderViewProps = {
	title: string;
	score: number;
	setScore: (value: number) => void;
	trackColor: string;
	lowerLimit?: number;
	upperLimit?: number;
};
const SliderView = ({ title }: SliderViewProps) => {
	return (
		<View style={{ paddingVertical: 10 }}>
			<Text>{title}</Text>
			{/* <MUISlider
				initialValue={score}
				minValue={0}
				maxValue={100}
				onValueChange={(value) => setScore(value)}
				snap={false}
			/> */}
			{/* <Slider
				value={score}
				onValueChange={(value) => setScore(value)}
				minimumTrackTintColor={trackColor}
				maximumTrackTintColor={trackColor}
				step={1}
				minimumValue={0}
				maximumValue={100}
				thumbTintColor={trackColor}
				lowerLimit={lowerLimit ?? null}
				upperLimit={upperLimit ?? null}
			/> */}
		</View>
	);
};

type DialogProps = {
	visible: boolean;
	onDismiss: () => void;
	updateScoreColor: (red: number, yellow: number) => any;
};
export const ScoreColorDialog = ({ onDismiss, visible, updateScoreColor }: DialogProps) => {
	const { red, yellow } = useSettingsStore(
		useShallow((state) => ({
			red: state.scoreColors?.red,
			yellow: state.scoreColors?.yellow,
		})),
	);
	const [newRed, setRed] = useState(red);
	const [newYellow, setYellow] = useState(yellow ?? 74);
	const { colors } = useAppTheme();
	const [t, i18n] = useTranslation('dialogs');

	const onCancel = () => {
		setRed(red);
		setYellow(yellow);
		onDismiss();
	};

	const onDone = () => {
		updateScoreColor(newRed, newYellow);
		onDismiss();
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>{t('Score Colors')}</Dialog.Title>
			<Dialog.Content>
				<List.Item title={'Max Red Score'} />
				<MUISlider
					mode="continuous"
					value={newRed}
					onValueChange={(val) => setRed(Math.round(val[0]))}
					maxValue={newYellow - 1}
					minValue={0}
					thumbBackgroundColor={colors.elevation.level3}
				/>
				{/* <SliderView
					score={newRed}
					setScore={setRed}
					title="Max Red Score"
					upperLimit={newYellow - 1}
					trackColor={colors.primary}
				/> */}
				<List.Item title={'Max Yellow Score'} />
				{/* <SliderView
					score={newYellow}
					setScore={setYellow}
					title="Max Yellow Score"
					lowerLimit={newRed + 1}
					trackColor={colors.primary}
				/> */}
				<MUISlider
					mode="continuous"
					value={newYellow}
					onValueChange={(val) => setYellow(Math.round(val[0]))}
					maxValue={100}
					minValue={newRed + 1}
					thumbBackgroundColor={colors.elevation.level3}
					startFromZero={false}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						alignItems: 'center',
					}}
				>
					<ScoreContainer score={newRed} color="red" opacity={0.35} animate={false} />
					<Button
						onPress={() => {
							setRed(red);
							setYellow(yellow ?? 74);
						}}
					>
						Reset
					</Button>
					<ScoreContainer
						score={newYellow}
						color="yellow"
						opacity={0.35}
						animate={false}
					/>
				</View>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>Cancel</Button>
				<Button onPress={onDone}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

// {
//     "score": 10,
//     "amount": 64
// },
// {
//     "score": 20,
//     "amount": 47
// },
// {
//     "score": 30,
//     "amount": 60
// },
// {
//     "score": 40,
//     "amount": 101
// },
// {
//     "score": 50,
//     "amount": 152
// },
// {
//     "score": 60,
//     "amount": 234
// },
// {
//     "score": 70,
//     "amount": 278
// },
// {
//     "score": 80,
//     "amount": 162
// },
// {
//     "score": 90,
//     "amount": 147
// },
// {
//     "score": 100,
//     "amount": 97
// }

type ScoreDialogProps = {
	visible: boolean;
	defaultScore: 'average' | 'mean';
	updateDefaultScore: (defaultScore: 'average' | 'mean') => void;
	onDismiss: () => void;
};
export const DefaultScoreDialog = ({
	visible,
	defaultScore,
	updateDefaultScore,
	onDismiss,
}: ScoreDialogProps) => {
	const [scoreType, setScoreType] = useState<ScoreDialogProps['defaultScore']>(defaultScore);
	const [t, i18n] = useTranslation('dialogs');

	const onCancel = () => {
		setScoreType(defaultScore);
		onDismiss();
	};

	const onDone = () => {
		updateDefaultScore(scoreType);
		onDismiss();
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>{t('Score Defaults')}</Dialog.Title>
			<Dialog.Content>
				<RadioButton.Group
					onValueChange={(value: ScoreDialogProps['defaultScore']) => setScoreType(value)}
					value={scoreType}
				>
					{['average', 'mean'].map((stype, idx) => (
						<RadioButton.Item
							key={idx}
							label={stype}
							labelStyle={{ textTransform: 'capitalize' }}
							value={stype}
							// status={langOption === lang ? 'checked' : 'unchecked'}
						/>
					))}
				</RadioButton.Group>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>Cancel</Button>
				<Button onPress={onDone}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

type MediaTileCustomizerProps = {
	visible: boolean;
	themeMode: ThemeOptions;
	onDismiss: () => void;
};
export const MediaTileCustomizer = ({
	visible,
	onDismiss,
	themeMode,
}: MediaTileCustomizerProps) => {
	const { colors } = useAppTheme();
	const { scoreVisualType, listStatusMode, setCardVisual } = useCardVisualStore(
		useShallow((state) => ({
			listStatusMode: state.listStatusMode,
			scoreVisualType: state.scoreVisualType,
			setCardVisual: state.setCardVisual,
		})),
	);
	const [tempScoreVisualType, setTempScoreVisualType] =
		useState<ScoreVisualType>(scoreVisualType);
	const [tempListStatusMode, setTempListStatusMode] = useState<ListStatusMode>(listStatusMode);
	const [t, i18n] = useTranslation('dialogs');

	const onCancel = () => {
		onDismiss();
	};

	const onDone = () => {
		setCardVisual({ scoreVisualType: tempScoreVisualType, listStatusMode: tempListStatusMode });
		onDismiss();
	};

	useEffect(() => {
		if (visible) {
			setTempScoreVisualType(scoreVisualType);
			setTempListStatusMode(listStatusMode);
		}
	}, [visible]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>{t('Tile Customization')}</Dialog.Title>
			<Dialog.Content>
				<View
					style={{
						alignSelf: 'center',
						marginVertical: 10,
					}}
				>
					<MediaCard
						{...dummyData[themeMode]}
						tempListStatusMode={tempListStatusMode}
						scoreVisualType={tempScoreVisualType}
					/>
					{/* <MediaProgressBar
						progress={
							(dummyData[themeMode].episodes ??
								dummyData[themeMode].mediaListEntry.progress) / 2
						}
						total={dummyData[themeMode].episodes ?? dummyData[themeMode].chapters}
						mediaStatus={dummyData[themeMode].status}
						mediaListEntry={dummyData[themeMode].mediaListEntry}
					/> */}
				</View>
			</Dialog.Content>
			<Dialog.ScrollArea>
				<ScrollView showsVerticalScrollIndicator={false}>
					<List.Section title={t('Score Visual')}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ flex: 1 }}
							contentContainerStyle={{ paddingHorizontal: 10 }}
						>
							{Object.keys(ScoreVisualTypeEnum).map(
								(visual: ScoreVisualType, idx) => (
									<Chip
										key={idx}
										mode="outlined"
										selected={
											tempScoreVisualType === ScoreVisualTypeEnum[visual]
										}
										onPress={() =>
											setTempScoreVisualType(ScoreVisualTypeEnum[visual])
										}
										textStyle={{
											textTransform: 'capitalize',
											color:
												tempScoreVisualType === ScoreVisualTypeEnum[visual]
													? colors.primary
													: colors.onBackground,
										}}
										selectedColor={colors.primary}
										style={{
											marginHorizontal: 5,
											justifyContent: 'center',
											// borderColor:
											//     visualPreset === ScoreVisualTypeEnum[visual]
											//         ? colors.primary
											//         : undefined,
										}}
									>
										{visual}
									</Chip>
								),
							)}
						</ScrollView>
					</List.Section>
					<List.Section title={t('List Visual')}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ paddingHorizontal: 10 }}
						>
							{(['dot', 'bar'] as ListStatusMode[]).map(
								(statusMode: ListStatusMode, idx) => (
									<Chip
										key={idx}
										mode="outlined"
										selected={tempListStatusMode === statusMode}
										onPress={() => setTempListStatusMode(statusMode)}
										textStyle={{
											textTransform: 'capitalize',
											color:
												tempListStatusMode === statusMode
													? colors.primary
													: colors.onBackground,
										}}
										selectedColor={colors.primary}
										style={{
											marginHorizontal: 5,
											justifyContent: 'center',
											// borderColor:
											//     visualPreset === ScoreVisualTypeEnum[visual]
											//         ? colors.primary
											//         : undefined,
										}}
									>
										{statusMode}
									</Chip>
								),
							)}
						</ScrollView>
					</List.Section>
				</ScrollView>
			</Dialog.ScrollArea>
			<Dialog.Actions>
				<Button onPress={onCancel}>Cancel</Button>
				<Button onPress={onDone}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
