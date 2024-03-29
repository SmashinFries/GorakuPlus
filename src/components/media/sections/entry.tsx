import { MotiView } from 'moti';
import {
	ActivityIndicator,
	Button,
	Checkbox,
	IconButton,
	List,
	Portal,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper';
import {
	AniMediaQuery,
	FuzzyDate,
	MediaList,
	MediaListStatus,
	MediaStatus,
	MediaType,
	SaveMediaListItemMutation,
	SaveMediaListItemMutationVariables,
	ScoreFormat,
} from '@/store/services/anilist/generated-anilist';
import { useListEntry } from '@/hooks/media/useMutations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RemoveListItemDialog } from '@/components/media/dialogs';
import { Pressable, StyleProp, View, ViewStyle, useWindowDimensions } from 'react-native';
import { NumberPickDialog } from '@/components/dialogs';
import useFilterSheet from '@/hooks/search/useSheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { DatePopup, StatusDropDown } from '../entryActions';
import { NumberPickerMode } from '@/components/picker';
import { useAppTheme } from '@/store/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { compareArrays } from '@/utils/compare';
import { scoreValues } from '@/utils/scores';

const FAV_ICONS = ['heart-outline', 'heart'];
const LIST_ICONS = ['plus', 'playlist-edit'];

const ICON_SIZE = 24;

type ListEntryViewProps = {
	id: number;
	type: MediaType;
	status: MediaStatus;
	releaseMessage?: string;
	data: AniMediaQuery['Media']['mediaListEntry'];
	scoreFormat?: ScoreFormat;
	isFav: boolean;
	customLists: string[];
	onShowReleases: () => void;
	refreshData: () => void;
};

type ActionIconProps = {
	children: React.ReactNode;
	icon?: string;
	onPress: () => void;
	onLongPress?: () => void;
};
export const ActionIcon = ({ children, icon, onPress, onLongPress }: ActionIconProps) => {
	const { colors } = useTheme();
	return (
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			android_ripple={{
				borderless: false,
				foreground: true,
				color: colors.primary,
			}}
			style={{
				paddingHorizontal: 10,
				paddingVertical: 5,
				borderRadius: 12,
				overflow: 'hidden',
				alignItems: 'center',
			}}
		>
			{icon && <IconButton icon={icon} size={ICON_SIZE} />}
			{children}
		</Pressable>
	);
};

const ListEntryView = ({
	id,
	type,
	status,
	releaseMessage,
	data,
	scoreFormat,
	isFav,
	customLists,
	refreshData,
	onShowReleases,
}: ListEntryViewProps) => {
	const {
		deleteListItem,
		saveListItem,
		toggleFav,
		deletedListItemLoading,
		favLoading,
		savedMediaLoading,
	} = useListEntry();

	const { userID } = useSelector((state: RootState) => state.persistedAniLogin);
	const { colors } = useTheme();

	const sheetRef = useRef<BottomSheetModalMethods>(null);
	const { isFilterOpen, openSheet } = useFilterSheet(sheetRef);

	const [showRemListDlg, setShowRemListDlg] = useState(false);
	const [listStatus, setListStatus] = useState<MediaListStatus | string>(data?.status ?? '');
	const [listProgress, setListProgress] = useState<number | null>(data?.progress ?? 0);
	const [isOnList, setIsOnList] = useState(data ? true : false);

	const { width } = useWindowDimensions();

	const containerWidth = width / 3;
	const splitReleaseMessage = releaseMessage?.includes('\n')
		? releaseMessage?.split('\n')
		: [releaseMessage];

	const updateListEntry = useCallback(
		(variables?: SaveMediaListItemMutationVariables) => {
			saveListItem({ mediaId: id, status: MediaListStatus.Planning, ...variables }).then(
				(res) => {
					if (res) {
						setListStatus(
							(res as { data: SaveMediaListItemMutation })?.data?.SaveMediaListEntry
								?.status ?? null,
						);
						setListProgress(
							(res as { data: SaveMediaListItemMutation })?.data?.SaveMediaListEntry
								?.progress ?? null,
						);
						setIsOnList(true);
						refreshData();
					}
				},
			);
		},
		[id],
	);

	const iconStates = {
		list: {
			icon: isOnList ? LIST_ICONS[1] : LIST_ICONS[0],
			isLoading: savedMediaLoading || deletedListItemLoading,
			color: isOnList ? 'green' : null,
		},
		fav: {
			icon: isFav ? FAV_ICONS[1] : FAV_ICONS[0],
			isLoading: favLoading,
			color: isFav ? 'red' : null,
		},
		disabled: userID ? false : true,
	};

	return (
		<>
			<View>
				<MotiView
					style={{
						flexDirection: 'row',
						marginTop: 15,
						alignItems: 'flex-start',
					}}
				>
					<View
						style={{
							width: containerWidth,
							borderRadius: 12,
							alignItems: 'center',
						}}
					>
						<ActionIcon
							icon={
								status === MediaStatus.Finished ? 'timer-sand-full' : 'timer-sand'
							}
							onPress={onShowReleases}
						>
							<Text
								style={{
									textTransform: 'capitalize',
									color: colors.onSurfaceVariant,
									textAlign: 'center',
								}}
								variant="labelMedium"
							>
								{splitReleaseMessage[0]?.length > 0
									? splitReleaseMessage[0]
									: 'Unknown'}
							</Text>
							{splitReleaseMessage?.length > 1 ? (
								<Text
									style={{
										color: colors.onSurfaceVariant,
										textAlign: 'center',
									}}
									variant="labelSmall"
								>
									{splitReleaseMessage?.at(-1)}
								</Text>
							) : null}
						</ActionIcon>
					</View>

					<View style={{ width: containerWidth, borderRadius: 12, alignItems: 'center' }}>
						{iconStates.fav.isLoading ? (
							<ActivityIndicator
								animating
								size={'small'}
								style={{ transform: [{ scale: 0.9 }] }}
							/>
						) : (
							<ActionIcon
								onPress={() =>
									toggleFav(
										type === MediaType.Anime
											? { animeId: id }
											: { mangaId: id },
									)
								}
							>
								<IconButton
									icon={isFav ? FAV_ICONS[1] : FAV_ICONS[0]}
									iconColor={isFav ? colors.primary : null}
									disabled={!iconStates.disabled ? false : true}
									size={ICON_SIZE}
								/>
								<Text
									style={{
										textTransform: 'capitalize',
										color: isFav ? colors.primary : colors.onSurfaceVariant,
									}}
									variant="labelMedium"
								>
									{isFav ? 'Favorited' : 'Favorite'}
								</Text>
							</ActionIcon>
						)}
					</View>
					<View
						style={{
							justifyContent: 'flex-start',
							alignItems: 'center',
							width: containerWidth,
						}}
					>
						<ActionIcon
							onPress={() => (isOnList ? openSheet() : updateListEntry())}
							onLongPress={() => (isOnList ? setShowRemListDlg(true) : null)}
						>
							{iconStates.list.isLoading ? (
								<ActivityIndicator animating size={ICON_SIZE} />
							) : (
								<IconButton
									disabled={!iconStates.disabled ? false : true}
									icon={isOnList ? LIST_ICONS[1] : LIST_ICONS[0]}
									iconColor={isOnList ? colors.primary : null}
									size={ICON_SIZE}
								/>
							)}
							<Text
								style={{
									textTransform: 'capitalize',
									color: isOnList ? colors.primary : colors.onSurfaceVariant,
								}}
								variant="labelMedium"
							>
								{listStatus
									? `${listStatus?.replaceAll('_', ' ')}${data?.private ? '🔒' : ''}`
									: 'Add to List'}
								{listProgress && listProgress > 0 ? ` · ${listProgress}` : ''}
							</Text>
						</ActionIcon>
					</View>
				</MotiView>
			</View>
			<Portal>
				<RemoveListItemDialog
					visible={showRemListDlg}
					onDismiss={() => setShowRemListDlg(false)}
					onConfirm={() => {
						deleteListItem({ id: data.id });
						setIsOnList(false);
						setListStatus('');
						setListProgress(null);
					}}
				/>
				{/* <ListEntryEditDialog
                    visible={showListEntryDlg}
                    entryData={data}
                    scoreFormat={scoreFormat}
                    status={listStatus}
                    updateEntry={updateListEntry}
                    onDismiss={() => setShowListEntryDlg(false)}
                /> */}
			</Portal>
			{data && (
				<ListEntrySheet
					ref={sheetRef}
					entryData={data}
					scoreFormat={scoreFormat}
					status={listStatus}
					updateEntry={updateListEntry}
					customLists={customLists}
				/>
			)}
		</>
	);
};

type ScoreInputProps = {
	value: number;
	scoreFormat: ScoreFormat;
	onChange: (value: number) => void;
	disabled?: boolean;
};
const ScoreInput = ({ value, scoreFormat, onChange, disabled }: ScoreInputProps) => {
	const [showNumPick, setShowNumPick] = useState(false);
	const [containerHeight, setContainerHeight] = useState(0);
	const { colors } = useAppTheme();

	const blankScore = {
		[ScoreFormat.Point_100]: 0,
		[ScoreFormat.Point_10]: 0,
		[ScoreFormat.Point_10Decimal]: 0.0,
		[ScoreFormat.Point_5]: '❌',
		[ScoreFormat.Point_3]: '❌',
	};

	const formattedScore = useMemo(() => {
		switch (scoreFormat) {
			case ScoreFormat.Point_10:
				return value;
			case ScoreFormat.Point_10Decimal:
				return value;
			case ScoreFormat.Point_5:
				return scoreValues.POINT_5[value];
			case ScoreFormat.Point_3:
				return scoreValues.POINT_3[value];
			case ScoreFormat.Point_100:
				return value;
			default:
				break;
		}
	}, [value, scoreFormat]);

	return (
		<>
			<Pressable
				onLayout={({ nativeEvent }) =>
					setContainerHeight(Math.floor(nativeEvent.layout.height - 10))
				}
				android_ripple={{
					color: colors.primary,
					borderless: true,
					foreground: true,
					radius: containerHeight ?? 40,
				}}
				onPress={() => setShowNumPick(true)}
				disabled={disabled}
			>
				<List.Subheader style={{ textAlign: 'center' }}>{'Score'}</List.Subheader>
				<Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
					{formattedScore && value > 0 ? formattedScore : blankScore[scoreFormat]}
				</Text>
			</Pressable>
			<Portal>
				<NumberPickDialog
					title={'Set Score'}
					mode={scoreFormat}
					onChange={onChange}
					visible={showNumPick}
					onDismiss={() => setShowNumPick(false)}
					defaultValue={value ?? 0}
				/>
			</Portal>
		</>
	);
};

type ProgressInputProps = {
	value: number | null | undefined;
	maxValue?: number;
	onChange: (value: number) => void;
	onCancel: () => void;
	disabled?: boolean;
};
const ProgressInput = ({ value, maxValue, onChange, onCancel, disabled }: ProgressInputProps) => {
	const [showNumPick, setShowNumPick] = useState(false);
	const [containerHeight, setContainerHeight] = useState(0);
	const { colors } = useAppTheme();

	return (
		<>
			<Pressable
				onLayout={({ nativeEvent }) =>
					setContainerHeight(Math.floor(nativeEvent.layout.height - 10))
				}
				android_ripple={{
					color: colors.primary,
					borderless: true,
					foreground: true,
					radius: containerHeight ?? 40,
				}}
				onPress={() => setShowNumPick(true)}
				disabled={disabled}
			>
				<List.Subheader style={{ textAlign: 'center' }}>{'Progress'}</List.Subheader>
				<Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{value}</Text>
			</Pressable>
			<Portal>
				<NumberPickDialog
					title={'Set Progress'}
					onChange={onChange}
					visible={showNumPick}
					onDismiss={() => setShowNumPick(false)}
					defaultValue={value}
					mode={!maxValue ? 'unknown_chapters' : null}
					options={
						maxValue ? Array.from(Array(maxValue + 1).keys()).map((i) => `${i}`) : null
					}
					onCancel={onCancel}
				/>
			</Portal>
		</>
	);
};

type EntryNumInputProps = {
	value: any | null | undefined;
	title: string;
	inputType: 'number' | 'date' | 'string';
	onChange: (value: any) => void;
	style?: StyleProp<ViewStyle>;
};

type ListEntrySheetProps = {
	entryData: AniMediaQuery['Media']['mediaListEntry'];
	status: MediaListStatus | string;
	scoreFormat: ScoreFormat;
	customLists: string[];
	updateEntry: (variables: SaveMediaListItemMutationVariables) => void;
};
export const ListEntrySheet = React.forwardRef<BottomSheetModalMethods, ListEntrySheetProps>(
	(props, ref) => {
		const { height } = useWindowDimensions();
		const { colors } = useTheme();
		const [mainEntryHeight, setMainEntryHeight] = useState(0);
		const snapPoints = useMemo(
			() => [
				`${(
					(mainEntryHeight / height > 0 ? (mainEntryHeight + 20) / height : 0.3) * 100
				).toFixed(4)}%`,
				'50%',
				'100%',
			],
			[mainEntryHeight, height],
		);

		const [tempParams, setTempParams] = useState<SaveMediaListItemMutationVariables>({
			status: props?.status as MediaListStatus,
			score: props.entryData?.score,
			progress: props.entryData?.progress,
			startedAt: props.entryData?.startedAt as FuzzyDate,
			completedAt: props.entryData?.completedAt as FuzzyDate,
			repeat: props.entryData?.repeat,
			notes: props.entryData?.notes,
			private: props.entryData?.private,
			hideFromStatusList: props.entryData?.hiddenFromStatusLists,
			customLists: props.entryData?.customLists
				? Object.keys(props.entryData?.customLists as { [key: string]: boolean })?.filter(
						(val, _idx) => props.entryData?.customLists[val] === true,
					)
				: [],
		});

		const submitNewEntry = () => {
			if (
				tempParams.status === props.status &&
				tempParams.progress === props.entryData?.progress &&
				tempParams.score === props.entryData?.score &&
				tempParams.startedAt === props.entryData?.startedAt &&
				tempParams.completedAt === props.entryData?.completedAt &&
				tempParams.repeat === props.entryData?.repeat &&
				tempParams.notes === props.entryData?.notes &&
				tempParams.private === props.entryData?.private &&
				tempParams.hideFromStatusList === props.entryData?.hiddenFromStatusLists &&
				compareArrays(
					tempParams.customLists ?? [],
					props.entryData?.customLists
						? Object.keys(
								props.entryData?.customLists as { [key: string]: boolean },
							)?.filter((val, _idx) => props.entryData?.customLists[val] === true)
						: [],
				)
			)
				return;
			props.updateEntry({
				status: tempParams.status as MediaListStatus,
				progress: tempParams.progress,
				score: tempParams.score,
				startedAt: tempParams.startedAt,
				completedAt: tempParams.completedAt,
				repeat:
					tempParams.status === MediaListStatus.Repeating && tempParams.repeat === 0
						? 1
						: tempParams.repeat,
				notes: tempParams.notes,
				private: tempParams.private,
				hideFromStatusList: tempParams.hideFromStatusList,
				customLists: tempParams.customLists,
			});
		};

		const updateParams = (
			key:
				| 'status'
				| 'score'
				| 'progress'
				| 'startedAt'
				| 'completedAt'
				| 'repeat'
				| 'notes'
				| 'private'
				| 'hideFromStatusList'
				| 'customLists',
			value: MediaListStatus | number | FuzzyDate | string | boolean,
		) => {
			switch (key) {
				case 'score':
					// switch (ScoreFormat) {
					// 	case ScoreFormat.Point_3:
					// 		console.log('3 score:', value);
					// 		setTempParams((prev) => ({ ...prev, [key]: value }));
					// 		return;
					// 	case ScoreFormat.Point_5:
					// 		console.log('5 score:', value);
					// 		return;
					// 	default:
					// 		setTempParams((prev) => ({ ...prev, ['score']: value as number }));
					// }
					// break;
					setTempParams((prev) => ({ ...prev, ['score']: value as number }));
					return;

				case 'customLists':
					setTempParams((prev) => ({
						...prev,
						customLists: prev.customLists?.includes(value as string)
							? (prev.customLists as string[])?.filter(
									(val) => val !== (value as string),
								)
							: [...prev.customLists, value as string],
					}));
					return;
				// case 'status':
				//     if (value as MediaListStatus === MediaListStatus.Repeating && tempParams.repeat === 0) {
				//         setTempParams((prev) => ({ ...prev, repeat: 1 }));
				//     } else {
				//         setTempParams((prev) => ({ ...prev, [key]: value }));
				//     }
				default:
					setTempParams((prev) => ({ ...prev, [key]: value }));
					return;
			}
		};

		const EntryNumInput = ({
			title,
			style,
			value,
			inputType,
			onChange,
		}: EntryNumInputProps) => {
			const [showNumPick, setShowNumPick] = useState(false);
			const [containerHeight, setContainerHeight] = useState(0);
			const totalProgress =
				props.entryData?.media?.episodes ??
				props.entryData?.media?.chapters ??
				props.entryData?.media?.volumes ??
				0;

			if (props.entryData?.media?.status === MediaStatus.NotYetReleased) return null;
			return (
				<>
					<Pressable
						onLayout={({ nativeEvent }) =>
							setContainerHeight(Math.floor(nativeEvent.layout.height - 10))
						}
						android_ripple={{
							color: colors.primary,
							borderless: true,
							foreground: true,
							radius: containerHeight ?? 40,
						}}
						onPress={() => {
							inputType !== 'date' && setShowNumPick(true);
						}}
						style={[style]}
					>
						{inputType === 'number' || inputType === 'string' ? (
							<>
								<List.Subheader style={{ textAlign: 'center' }}>
									{title}
								</List.Subheader>
								<Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
									{value}
								</Text>
							</>
						) : null}
						{inputType === 'date' && (
							<DatePopup
								value={value}
								title={title}
								containerHeight={containerHeight}
								onSelect={(item) =>
									updateParams(
										title.includes('Start') ? 'startedAt' : 'completedAt',
										item,
									)
								}
							/>
						)}
					</Pressable>
					<Portal>
						<NumberPickDialog
							title={'Set ' + title}
							onChange={onChange}
							visible={showNumPick}
							onDismiss={() => setShowNumPick(false)}
							defaultValue={value}
							options={
								totalProgress && title === 'Progress'
									? Array.from(Array(totalProgress + 1).keys()).map((i) => `${i}`)
									: null
							}
							mode={
								!totalProgress && title === 'Progress' ? 'unknown_chapters' : null
							}
						/>
					</Portal>
				</>
			);
		};

		return (
			<>
				<BottomSheetModal
					ref={ref}
					index={0}
					snapPoints={snapPoints}
					backgroundStyle={{ backgroundColor: colors.elevation.level5 }}
					backdropComponent={(props) => (
						<BottomSheetBackdrop
							{...props}
							pressBehavior={'close'}
							disappearsOnIndex={-1}
						/>
					)}
					onDismiss={() => submitNewEntry()}

					// onChange={handleSheetChange}
				>
					<BottomSheetScrollView style={{ flex: 1 }} nestedScrollEnabled>
						<View
							onLayout={({ nativeEvent }) =>
								setMainEntryHeight(nativeEvent.layout.height)
							}
						>
							<View
								style={{
									justifyContent: 'space-evenly',
									paddingVertical: 10,
									marginHorizontal: 20,
								}}
							>
								<StatusDropDown
									value={tempParams.status}
									isUnreleased={
										props.entryData.media?.status === MediaStatus.NotYetReleased
									}
									onSelect={(item) => updateParams('status', item)}
								/>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									alignItems: 'center',
								}}
							>
								<Checkbox.Item
									label="Private"
									status={tempParams.private ? 'checked' : 'unchecked'}
									labelVariant="labelMedium"
									mode="android"
									onPress={() =>
										updateParams('private', !tempParams.private as boolean)
									}
								/>
								<Checkbox.Item
									label="Hide from status lists"
									status={tempParams.hideFromStatusList ? 'checked' : 'unchecked'}
									labelVariant="labelMedium"
									mode="android"
									onPress={() =>
										updateParams(
											'hideFromStatusList',
											!tempParams.hideFromStatusList as boolean,
										)
									}
								/>
							</View>
							{props.entryData.media?.status !== MediaStatus.NotYetReleased && (
								<>
									<View
										style={{
											height: 0.5,
											width: '90%',
											alignSelf: 'center',
											backgroundColor: '#000',
										}}
									/>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-evenly',
											alignItems: 'center',
											paddingVertical: 10,
											overflow: 'hidden',
										}}
									>
										<ProgressInput
											value={tempParams.progress ?? 0}
											onChange={(val) => updateParams('progress', val)}
											onCancel={() =>
												updateParams('progress', props.entryData?.progress)
											}
											maxValue={
												props.entryData?.media?.nextAiringEpisode
													?.episode ??
												props.entryData?.media?.episodes ??
												props.entryData?.media?.chapters ??
												props.entryData?.media?.volumes ??
												null
											}
										/>
										{/* <EntryNumInput
                                            title="Progress"
                                            inputType="number"
                                            value={tempParams.progress}
                                            onChange={(val) => updateParams('progress', val)}
                                        /> */}
										<View
											style={{
												height: '100%',
												width: 0.5,
												backgroundColor: '#000',
											}}
										/>
										<ScoreInput
											value={tempParams.score ?? 0}
											onChange={(val) => updateParams('score', val)}
											scoreFormat={props.scoreFormat}
										/>
										{/* <EntryNumInput
                                            title="Score"
                                            inputType="number"
                                            value={tempParams.score}
                                            onChange={(val) => updateParams('score', val)}
                                        /> */}
										<View
											style={{
												height: '100%',
												width: 0.5,
												backgroundColor: '#000',
											}}
										/>
										<EntryNumInput
											title="Repeats"
											inputType="number"
											value={tempParams.repeat}
											onChange={(val) => updateParams('repeat', val)}
										/>
									</View>
									<View
										style={{
											height: 0.5,
											width: '90%',
											alignSelf: 'center',
											backgroundColor: '#000',
										}}
									/>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-evenly',
											alignItems: 'center',
											paddingVertical: 10,
											overflow: 'hidden',
										}}
									>
										<EntryNumInput
											title="Start Date"
											inputType="date"
											value={tempParams.startedAt}
											onChange={(_val) => null}
										/>
										<View
											style={{
												height: '100%',
												width: 0.5,
												backgroundColor: '#000',
											}}
										/>
										<EntryNumInput
											title="End Date"
											inputType="date"
											value={tempParams.completedAt}
											onChange={(_val) => null}
										/>
									</View>
								</>
							)}
							{props.customLists?.length > 0 && (
								<List.Section title="Custom Lists">
									<ScrollView horizontal showsHorizontalScrollIndicator={false}>
										{props.customLists?.map((list, idx) => (
											<Checkbox.Item
												key={idx}
												label={list}
												status={
													tempParams.customLists?.includes(list)
														? 'checked'
														: 'unchecked'
												}
												labelVariant="labelMedium"
												mode="android"
												onPress={() => updateParams('customLists', list)}
											/>
										))}
									</ScrollView>
								</List.Section>
							)}
							<List.Section title="Notes">
								<BottomSheetTextInput
									multiline
									value={tempParams.notes}
									clearButtonMode="while-editing"
									onChangeText={(text) => updateParams('notes', text)}
									style={{
										alignSelf: 'stretch',
										marginHorizontal: 12,
										marginBottom: 12,
										padding: 12,
										borderRadius: 12,
										backgroundColor: colors.elevation.level1,
										color: colors.onSurface,
										fontSize: 14,
									}}
								/>
							</List.Section>
						</View>
					</BottomSheetScrollView>
				</BottomSheetModal>
			</>
		);
	},
);

export const ListEntryViewMem = memo(ListEntryView);
export default ListEntryView;
