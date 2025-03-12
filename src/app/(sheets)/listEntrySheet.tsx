import {
	MainMetaFragment,
	MediaListEntryMetaFragment,
	MediaListStatus,
	MediaStatus,
	MediaType,
	ScoreFormat,
} from '@/api/anilist/__genereated__/gql';
import { useSaveMediaListItemInvalidatedMutation } from '@/api/anilist/extended';
import { DatePopup } from '@/components/media/entryActions';
import { ProgressInput, ScoreInput } from '@/components/media/sections/entry';
import { BottomSheetParent, GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useListEntryStore } from '@/store/listEntryStore';
import { useAppTheme } from '@/store/theme/themes';
import { compareArrays } from '@/utils/compare';
import { sendErrorMessage, sendToast } from '@/utils/toast';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import {
	Button,
	Checkbox,
	Divider,
	List,
	RadioButton,
	RadioButtonItemProps,
	Text,
	TextInput,
} from 'react-native-paper';
import { EntryNumberPickerSheetProps } from './numberPickerSheet';

const SheetRadioButton = (props: RadioButtonItemProps) => {
	return (
		<Pressable
			onPress={props.onPress}
			style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingVertical: 8,
			}}
		>
			<RadioButton.Android {...props} />
			<Text variant="titleMedium" style={[props.labelStyle, { paddingHorizontal: 16 }]}>
				{props.label}
			</Text>
		</Pressable>
	);
};

const StatusSelectSheet = ({
	sheetRef,
	initialStatus,
	onConfirm,
}: {
	sheetRef: RefObject<TrueSheet>;
	initialStatus?: MediaListStatus;
	onConfirm: (status: MediaListStatus) => void;
}) => {
	const [selectedStatus, setSelectedStatus] = useState(initialStatus ?? MediaListStatus.Planning);

	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			grabber={false}
			dismissible={false}
			sizes={['auto']}
			header={
				<View style={{ width: '100%', padding: 16 }}>
					<Text variant="titleLarge">Status</Text>
				</View>
			}
		>
			<View style={{ paddingHorizontal: 8 }}>
				{Object.values(MediaListStatus).map((status, idx) => (
					// <RadioButton.Item
					// 	label={status}
					// 	value={status}
					// 	labelStyle={{ textTransform: 'capitalize' }}
					// 	status={selectedStatus === status ? 'checked' : 'unchecked'}
					// 	onPress={() => setSelectedStatus(status)}
					// 	position="leading"
					// 	mode="android"
					// />
					<SheetRadioButton
						key={idx}
						label={status}
						value={status}
						status={selectedStatus === status ? 'checked' : 'unchecked'}
						onPress={() => setSelectedStatus(status)}
						labelStyle={{ textTransform: 'capitalize' }}
					/>
				))}
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12 }}>
				<Button
					onPress={() => {
						sheetRef.current?.dismiss();
					}}
				>
					Cancel
				</Button>
				<Button
					onPress={() => {
						onConfirm(selectedStatus);
						sheetRef.current?.dismiss();
					}}
				>
					Confirm
				</Button>
			</View>
		</BottomSheetParent>
	);
};

type EntryNumInputProps = {
	value: any | null | undefined;
	title: string;
	inputType: 'number' | 'date' | 'string';
	type: EntryNumberPickerSheetProps['type'];
	style?: StyleProp<ViewStyle>;
};

export type ListEntrySheetProps = {
	entryData: MediaListEntryMetaFragment;
	scoreFormat: ScoreFormat;
	media?: MainMetaFragment;
};
const ListEntrySheet = () => {
	const { params } = useLocalSearchParams<{ params: string }>();
	const payload = JSON.parse(params) as ListEntrySheetProps;
	const { colors } = useAppTheme();
	const sheet = useRef<TrueSheet>(null);
	const statusSheet = useRef<TrueSheet>(null);

	const { mutateAsync: addEntry } = useSaveMediaListItemInvalidatedMutation({
		meta: { mediaId: payload?.entryData?.id },
	});

	const allCustomLists =
		payload?.entryData?.user?.mediaListOptions?.[
			payload?.media?.type === MediaType.Anime ? 'animeList' : 'mangaList'
		]?.customLists;

	const currentLists =
		payload?.entryData?.customLists?.length > 0
			? (payload?.entryData?.customLists as { enabled: boolean; name: string }[])
					?.map((list) => {
						if (list.enabled) {
							return list.name;
						}
					})
					?.filter((list) => list !== undefined)
			: [];

	const {
		setValue,
		onReset,
		onDismiss: _onDismiss,
		initialize,
		...tempParams
	} = useListEntryStore();

	const submitNewEntry = async () => {
		if (
			tempParams.status === payload?.entryData?.status &&
			tempParams.progress === payload?.entryData?.progress &&
			tempParams.score === payload?.entryData?.score &&
			tempParams.startedAt === payload?.entryData?.startedAt &&
			tempParams.completedAt === payload?.entryData?.completedAt &&
			tempParams.repeat === payload?.entryData?.repeat &&
			tempParams.notes === payload?.entryData?.notes &&
			tempParams.private === payload?.entryData?.private &&
			tempParams.hideFromStatusList === payload?.entryData?.hiddenFromStatusLists &&
			compareArrays(
				tempParams.customLists ?? [],
				currentLists,
				// ? Object.keys(entryData?.customLists as { [key: string]: boolean })?.filter(
				// 		(val, _idx) => entryData?.customLists[val] === true,
				// 	)
				// : [],
			)
		) {
			return;
		}
		try {
			const result = await addEntry({
				id: tempParams.id,
				mediaId: tempParams.mediaId,
				status: tempParams.status as MediaListStatus,
				progress: tempParams.progress ?? undefined,
				score: tempParams.score ?? undefined,
				startedAt: tempParams.startedAt,
				completedAt: tempParams.completedAt,
				repeat:
					tempParams.status === MediaListStatus.Repeating && tempParams.repeat === 0
						? 1
						: tempParams.repeat,
				notes: tempParams.notes ?? undefined,
				private: tempParams.private,
				hideFromStatusList: tempParams.hideFromStatusList,
				customLists:
					(tempParams.customLists?.length ?? 0) > 0 ? tempParams.customLists : undefined,
			});
			result?.SaveMediaListEntry && initialize(result.SaveMediaListEntry);
			void (result?.SaveMediaListEntry
				? sendToast('Updated Entry')
				: sendErrorMessage('Failed to update'));
		} catch (e) {
			console.log(e);
		}
		sheet.current?.dismiss();
	};

	const EntryNumInput = ({ title, style, value, inputType, type }: EntryNumInputProps) => {
		// const [showNumPick, setShowNumPick] = useState(false);
		const [containerHeight, setContainerHeight] = useState(0);
		const totalProgress =
			payload?.media?.episodes ?? payload?.media?.chapters ?? payload?.media?.volumes ?? 0;

		if (payload?.media?.status === MediaStatus.NotYetReleased) return null;
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
						inputType !== 'date' &&
							router.push({
								pathname: '/(sheets)/numberPickerSheet',
								params: {
									params: JSON.stringify({
										title: title,
										defaultValue: value,
										options:
											totalProgress && title === 'Progress'
												? Array.from(Array(totalProgress + 1).keys()).map(
														(i) => `${i}`,
													)
												: null,
										mode:
											!totalProgress && title === 'Progress'
												? 'unknown_chapters'
												: null,
										type,
									}),
								},
							});
					}}
					style={[style]}
				>
					{inputType === 'number' || inputType === 'string' ? (
						<>
							<List.Subheader style={{ textAlign: 'center' }}>{title}</List.Subheader>
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
								setValue(
									title.includes('Start') ? 'startedAt' : 'completedAt',
									item,
								)
							}
						/>
					)}
				</Pressable>
				{/* <Portal>
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
						mode={!totalProgress && title === 'Progress' ? 'unknown_chapters' : null}
					/>
				</Portal> */}
			</>
		);
	};

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', Keyboard.dismiss);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	return (
		<>
			<GlobalBottomSheetParent
				sheetRef={sheet}
				grabber={false}
				name="ListEntrySheet"
				onPresent={() => {
					initialize(payload?.entryData);
				}}
				header={
					<View style={{ width: '100%' }}>
						<View
							style={{
								padding: 8,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Button onPress={() => onReset(payload?.entryData, currentLists)}>
								Reset
							</Button>
							<Button mode="contained" onPress={submitNewEntry}>
								Confirm
							</Button>
						</View>
						<Divider />
					</View>
				}
			>
				<View>
					<View
						style={{
							justifyContent: 'space-evenly',
							paddingVertical: 10,
							marginHorizontal: 20,
						}}
					>
						<Button
							mode="elevated"
							labelStyle={{ textTransform: 'capitalize' }}
							onPress={() => statusSheet.current?.present()}
						>
							{tempParams.status}
						</Button>
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
							onPress={() => setValue('private', !tempParams.private as boolean)}
						/>
						<Checkbox.Item
							label="Hide from status lists"
							status={tempParams.hideFromStatusList ? 'checked' : 'unchecked'}
							labelVariant="labelMedium"
							mode="android"
							onPress={() =>
								setValue(
									'hideFromStatusList',
									!tempParams.hideFromStatusList as boolean,
								)
							}
						/>
					</View>
					{payload?.media?.status !== MediaStatus.NotYetReleased && (
						<>
							<View
								style={{
									height: 0.5,
									width: '90%',
									alignSelf: 'center',
									backgroundColor: colors.outline,
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
									// onCancel={() =>
									// 	setValue('progress', payload?.entryData?.progress)
									// }
									totalContent={
										payload?.media?.episodes ??
										payload?.media?.chapters ??
										payload?.media?.volumes
									}
									maxValue={
										(payload?.media?.nextAiringEpisode?.episode
											? payload?.media?.nextAiringEpisode?.episode - 1
											: null) ??
										payload?.media?.episodes ??
										payload?.media?.chapters ??
										payload?.media?.volumes ??
										null
									}
								/>
								<View
									style={{
										height: '100%',
										width: 0.5,
										backgroundColor: colors.outline,
									}}
								/>
								<ScoreInput
									value={tempParams.score ?? 0}
									onChange={(val) => setValue('score', val)}
									scoreFormat={payload?.scoreFormat}
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
										backgroundColor: colors.outline,
									}}
								/>
								<EntryNumInput
									title="Repeats"
									inputType="number"
									value={tempParams.repeat}
									type={'repeat'}
									// onChange={(val) => setValue('repeat', val)}
								/>
							</View>
							<View
								style={{
									height: 0.5,
									width: '90%',
									alignSelf: 'center',
									backgroundColor: colors.outline,
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
									type="startedAt"
								/>
								<View
									style={{
										height: '100%',
										width: 0.5,
										backgroundColor: colors.outline,
									}}
								/>
								<EntryNumInput
									title="End Date"
									inputType="date"
									value={tempParams.completedAt}
									type="completedAt"
								/>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									alignItems: 'center',
								}}
							>
								<Button
									style={{ width: '50%' }}
									onPress={() =>
										setValue(
											'startedAt',
											payload?.media?.startDate?.year &&
												!tempParams.startedAt?.year
												? payload?.media.startDate
												: undefined,
										)
									}
								>
									{payload?.media?.startDate?.year && !tempParams.startedAt?.year
										? 'Use release date'
										: 'Clear'}
								</Button>
								<Button
									style={{ width: '50%' }}
									onPress={() =>
										setValue(
											'completedAt',
											payload?.media?.endDate?.year &&
												!tempParams.completedAt?.year
												? payload?.media.endDate
												: undefined,
										)
									}
								>
									{payload?.media?.endDate?.year && !tempParams.completedAt?.year
										? 'Use completed date'
										: 'Clear'}
								</Button>
							</View>
						</>
					)}
					{(allCustomLists?.length ?? 0) > 0 && (
						<List.Section title="Custom Lists">
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{allCustomLists?.map(
									(list, idx) =>
										list && (
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
												onPress={() => setValue('customLists', list)}
											/>
										),
								)}
							</ScrollView>
						</List.Section>
					)}
					<List.Section title="Notes">
						<TextInput
							multiline
							value={tempParams.notes ?? ''}
							clearButtonMode="while-editing"
							onChangeText={(text) => setValue('notes', text)}
							style={{
								alignSelf: 'stretch',
								marginHorizontal: 12,
								marginBottom: 12,
								padding: 6,
								borderRadius: 12,
								backgroundColor: colors.elevation.level2,
								color: colors.onSurface,
								fontSize: 14,
							}}
						/>
					</List.Section>
				</View>
			</GlobalBottomSheetParent>
			<StatusSelectSheet
				sheetRef={statusSheet}
				initialStatus={tempParams.status ?? undefined}
				onConfirm={(status) => setValue('status', status)}
			/>
		</>
	);
};

export default ListEntrySheet;
