import { Dialog, Button, RadioButton, List, Chip } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MediaCard } from '../../../cards';
import dummyData from '@/constants/dummyData';
import { ScoreVisualType, ScoreVisualTypeEnum } from '@/store/settings/types';
import { ThemeOptions, useAppTheme } from '@/store/theme/themes';
import { Slider } from '@/components/slider';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ListStatusMode, useCardVisualStore } from '@/store/cardVisualStore';
import { useShallow } from 'zustand/react/shallow';
import { ScoreView } from '@/components/media/sections/scores';

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
	const [newRed, setRed] = useState(red ?? 64);
	const [newYellow, setYellow] = useState(yellow ?? 74);

	const onCancel = () => {
		red && setRed(red);
		yellow && setYellow(yellow);
		onDismiss();
	};

	const onDone = () => {
		updateScoreColor(newRed, newYellow);
		onDismiss();
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>{'Score Colors'}</Dialog.Title>
			<Dialog.Content>
				<Slider
					title="Max Low Score"
					initialValue={newRed}
					onValueUpdate={(val) => val && setRed(Math.round(val))}
					maxValue={newYellow - 1}
					minValue={0}
				/>
				<Slider
					initialValue={newYellow}
					onValueUpdate={(val) => val && setYellow(Math.round(val))}
					maxValue={99}
					minValue={newRed + 1}
					title="Max Mid Score"
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						alignItems: 'center',
					}}
				>
					{/* <ScoreContainer score={newRed} color="red" opacity={0.35} animate={false} />
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
					/> */}
					<ScoreView score={newRed} type="average" barColor="red" />
					<ScoreView score={newYellow} type="average" barColor="yellow" />
					<ScoreView score={newYellow + 1} type="average" />
				</View>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>Cancel</Button>
				<Button
					onPress={() => {
						red && setRed(red ?? 64);
						setYellow(yellow ?? 74);
					}}
				>
					Reset
				</Button>
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
			<Dialog.Title>{'Score Defaults'}</Dialog.Title>
			<Dialog.Content>
				<RadioButton.Group
					onValueChange={(value) =>
						setScoreType(value as ScoreDialogProps['defaultScore'])
					}
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
	const [tempScoreVisualType, setTempScoreVisualType] = useState<ScoreVisualType>(
		scoreVisualType ?? 'healthbar-full',
	);
	const [tempListStatusMode, setTempListStatusMode] = useState<ListStatusMode>(
		listStatusMode ?? 'dot',
	);

	const onCancel = () => {
		onDismiss();
	};

	const onDone = () => {
		setCardVisual({ scoreVisualType: tempScoreVisualType, listStatusMode: tempListStatusMode });
		onDismiss();
	};

	useEffect(() => {
		if (visible) {
			scoreVisualType && setTempScoreVisualType(scoreVisualType);
			listStatusMode && setTempListStatusMode(listStatusMode);
		}
	}, [visible]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>{'Tile Customization'}</Dialog.Title>
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
					<List.Section title={'Score Visual'}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ flex: 1 }}
							fadingEdgeLength={24}
						>
							{Object.keys(ScoreVisualTypeEnum).map((visual, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									selected={
										tempScoreVisualType ===
										ScoreVisualTypeEnum[
											visual as keyof typeof ScoreVisualTypeEnum
										]
									}
									onPress={() =>
										setTempScoreVisualType(
											ScoreVisualTypeEnum[
												visual as keyof typeof ScoreVisualTypeEnum
											],
										)
									}
									textStyle={{
										textTransform: 'capitalize',
										color:
											tempScoreVisualType ===
											ScoreVisualTypeEnum[
												visual as keyof typeof ScoreVisualTypeEnum
											]
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
							))}
						</ScrollView>
					</List.Section>
					<List.Section title={'List Visual'}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							// contentContainerStyle={{ paddingHorizontal: 10 }}
							fadingEdgeLength={24}
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
