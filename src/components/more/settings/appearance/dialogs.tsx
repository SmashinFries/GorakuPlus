import {
	Dialog,
	Text,
	Button,
	useTheme,
	RadioButton,
	Divider,
	Checkbox,
	List,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScoreContainer } from '../../../score';
import {
	Media,
	MediaFormat,
	MediaListStatus,
	MediaStatus,
	MediaType,
	ScoreDistribution,
} from '@/store/services/anilist/generated-anilist';
import { MediaCard, MediaProgressBar } from '../../../cards';
import { rgbToRgba } from '@/utils';
import { ThemeOptions } from '@/store/theme/theme';
import {
	ScoreVisualType,
	ScoreVisualTypeEnum,
	mediaCardAppearanceActions,
} from '@/store/slices/settingsSlice';
import dummyData from '@/constants/dummyData';

type SliderViewProps = {
    title: string;
    score: number;
    setScore: (value: number) => void;
    trackColor: string;
    lowerLimit?: number;
    upperLimit?: number;
};
const SliderView = ({
	score,
	setScore,
	title,
	lowerLimit,
	upperLimit,
	trackColor,
}: SliderViewProps) => {
	return (
		<View style={{ paddingVertical: 10 }}>
			<Text>{title}</Text>
			<Slider
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
			/>
		</View>
	);
};

type DialogProps = {
    visible: boolean;
    onDismiss: () => void;
    red: number;
    yellow: number;
    updateScoreColor: (red: number, yellow: number) => any;
};
export const ScoreColorDialog = ({
	onDismiss,
	visible,
	red,
	yellow,
	updateScoreColor,
}: DialogProps) => {
	const [newRed, setRed] = useState(red);
	const [newYellow, setYellow] = useState(yellow ?? 74);
	const { colors } = useTheme();

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
			<Dialog.Title>Score Defaults</Dialog.Title>
			<Dialog.Content>
				<SliderView
					score={newRed}
					setScore={setRed}
					title="Max Red Score"
					upperLimit={newYellow - 1}
					trackColor={colors.primary}
				/>
				<SliderView
					score={newYellow}
					setScore={setYellow}
					title="Max Yellow Score"
					lowerLimit={newRed + 1}
					trackColor={colors.primary}
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
			<Dialog.Title>Score Defaults</Dialog.Title>
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
    scoreVisualType: ScoreVisualType;
    scoreColors: { red: number; yellow: number };
    themeMode: ThemeOptions;
    showItemListStatus: boolean;
    mediaLanguage: 'english' | 'romaji' | 'native';
    onSettingChange: (props: mediaCardAppearanceActions) => void;
    onDismiss: () => void;
};
export const MediaTileCustomizer = ({
	visible,
	onDismiss,
	onSettingChange,
	scoreColors,
	scoreVisualType,
	themeMode,
	showItemListStatus,
	mediaLanguage,
}: MediaTileCustomizerProps) => {
	const { colors } = useTheme();
	const [visualPreset, setVisualPreset] = useState<ScoreVisualType>(scoreVisualType);
	const [showStatus, setShowStatus] = useState(showItemListStatus);

	const onCancel = () => {
		onDismiss();
	};

	const onDone = () => {
		onSettingChange({
			scoreVisualType: visualPreset,
			showItemListStatus: showStatus,
		});
		onDismiss();
	};

	useEffect(() => {
		if (visible) {
			setVisualPreset(scoreVisualType);
			setShowStatus(showItemListStatus);
		}
	}, [visible]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>Tile Customization</Dialog.Title>
			<Dialog.Content>
				<View
					style={{
						alignSelf: 'center',
						marginVertical: 10,
					}}
				>
					<MediaCard
						coverImg={dummyData[themeMode].coverImage?.extraLarge}
						titles={dummyData[themeMode].title}
						meanScore={dummyData[themeMode].meanScore}
						averageScore={dummyData[themeMode].averageScore}
						scoreColors={scoreColors}
						scorebgColor={rgbToRgba(colors.primaryContainer, 0.75)}
						scoreVisualType={visualPreset}
						navigate={() => null}
						scoreDistributions={dummyData[themeMode].stats?.scoreDistribution}
					/>
					<MediaProgressBar
						progress={
							(dummyData[themeMode].episodes ??
                                dummyData[themeMode].mediaListEntry.progress) / 2
						}
						total={dummyData[themeMode].episodes ?? dummyData[themeMode].chapters}
						mediaStatus={dummyData[themeMode].status}
						mediaListEntry={dummyData[themeMode].mediaListEntry}
						showListStatus={showStatus}
					/>
				</View>
			</Dialog.Content>
			<Dialog.ScrollArea>
				<ScrollView showsVerticalScrollIndicator={false}>
					<List.Section title="Score Visual">
						{Object.keys(ScoreVisualTypeEnum).map((visual, idx) => (
							<List.Item
								key={idx}
								title={visual}
								right={(props) => (
									<RadioButton.Android
										style={[props.style]}
										value={ScoreVisualTypeEnum[visual]}
										status={
											visualPreset === ScoreVisualTypeEnum[visual]
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setVisualPreset(ScoreVisualTypeEnum[visual])}
									/>
								)}
							/>
						))}
					</List.Section>
					<List.Section title="List Visual">
						<Checkbox.Item
							label="List status / progress"
							onPress={() => setShowStatus(!showStatus)}
							status={showStatus ? 'checked' : 'unchecked'}
						/>
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
