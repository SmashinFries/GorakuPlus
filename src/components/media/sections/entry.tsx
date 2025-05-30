import { ActivityIndicator, Icon, List, Portal, Text } from 'react-native-paper';
import React, { useCallback, useMemo, useState } from 'react';
import { RemoveListItemDialog } from '@/components/media/dialogs';
import { DimensionValue, Pressable, TextStyle, View, useWindowDimensions } from 'react-native';
import { NumberPickDialog } from '@/components/dialogs';
import { scoreValues } from '@/utils/scores';
import {
	AniMediaQuery,
	AniMediaQuery_Media_Media_mediaListEntry_MediaList,
	MediaFragment,
	MediaListStatus,
	MediaStatus,
	MediaType,
	SaveMediaListItemMutationVariables,
	ScoreFormat,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { AnimViewMem } from '@/components/animations';
import { router } from 'expo-router';
import { useListEntryStore } from '@/store/listEntryStore';
import { EntryNumberPickerSheetProps } from '@/app/(sheets)/numberPickerSheet';
import {
	useDeleteMediaListItemInvalidatedMutation,
	useSaveMediaListItemInvalidatedMutation,
	useToggleFavInvalidateMutation,
} from '@/api/anilist/extended';
import { ToggleFavMetaData } from '@/api/anilist/queryUpdates';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

const FAV_ICONS = ['heart-outline', 'heart'];
const LIST_ICONS = ['plus', 'playlist-edit'];

const ICON_SIZE = 26;

type ListEntryViewProps = {
	id: number;
	type: MediaType;
	status: MediaFragment['status'];
	releaseMessage?: string;
	data: AniMediaQuery_Media_Media_mediaListEntry_MediaList | null | undefined;
	scoreFormat?: ScoreFormat | null;
	media?: AniMediaQuery['Media'];
	customLists: string[] | null | undefined;
	onShowReleases: () => void;
	refreshData: () => void;
};

type ActionIconProps = {
	isLoading: boolean;
	icon: string;
	iconColor?: string;
	iconSize?: number;
	disabled?: boolean;
	label?: string;
	labelVariant?: VariantProp<never>;
	labelStyle?: TextStyle;
	description?: string;
	onPress: () => void;
	onLongPress?: () => void;
};
export const ActionIcon = ({
	isLoading,
	icon,
	iconColor,
	iconSize,
	disabled,
	label,
	labelVariant,
	labelStyle,
	description,
	onPress,
	onLongPress,
}: ActionIconProps) => {
	const { colors } = useAppTheme();
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
			disabled={disabled}
		>
			<View
				style={{
					height: (iconSize !== undefined ? iconSize : ICON_SIZE) + 18,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{isLoading ? (
					<ActivityIndicator
						animating
						size={'small'}
						style={{ transform: [{ scale: 0.9 }] }}
					/>
				) : (
					<Icon
						source={icon}
						size={iconSize !== undefined ? iconSize : ICON_SIZE}
						color={disabled ? colors.onSurfaceDisabled : (iconColor ?? undefined)}
					/>
				)}
			</View>
			{label ? (
				<Text
					style={[
						{
							textTransform: 'capitalize',
							textAlign: 'center',
						},
						labelStyle,
					]}
					variant={labelVariant ?? 'labelMedium'}
				>
					{label}
				</Text>
			) : null}
			{description ? (
				<Text
					style={{
						color: colors.onSurfaceVariant,
						textAlign: 'center',
					}}
					variant="labelSmall"
				>
					{description}
				</Text>
			) : null}
		</Pressable>
	);
};

const AnilistListAction = ({
	id,
	type,
	data,
	media,
	scoreFormat,
	refreshData,
	containerWidth = `${100 / 3}%`,
}: {
	id: ListEntryViewProps['id'];
	type: ListEntryViewProps['type'];
	data: ListEntryViewProps['data'];
	media: ListEntryViewProps['media'];
	scoreFormat: ListEntryViewProps['scoreFormat'];
	refreshData: ListEntryViewProps['refreshData'];
	containerWidth?: DimensionValue;
}) => {
	const { colors } = useAppTheme();
	const userId = useAuthStore((state) => state.anilist.userID);

	const [showRemListDlg, setShowRemListDlg] = useState(false);
	const [isOnList, setIsOnList] = useState(data ? true : false);

	const { isPending: favLoading, mutateAsync: toggleFav } = useToggleFavInvalidateMutation({
		meta: {
			id: id,
			type: type,
			countryOfOrigin: media?.countryOfOrigin,
		} as ToggleFavMetaData,
	});
	const { isPending: savedMediaLoading, mutateAsync: saveListItem } =
		useSaveMediaListItemInvalidatedMutation({
			meta: {
				type: media?.type,
				mediaId: media?.id,
				parentMediaId: undefined,
				countryOfOrigin: media?.countryOfOrigin,
			},
		});
	const { isPending: deletedListItemLoading, mutateAsync: deleteListItem } =
		useDeleteMediaListItemInvalidatedMutation({
			meta: {
				type: media?.type,
				mediaId: media?.id,
				parentMediaId: undefined,
				countryOfOrigin: media?.countryOfOrigin,
			},
		});

	const updateListEntry = useCallback(
		(variables?: SaveMediaListItemMutationVariables) => {
			saveListItem({ mediaId: id, status: MediaListStatus.Planning, ...variables }).then(
				(res) => {
					if (res) {
						setIsOnList(true);
						refreshData();
					}
				},
			);
		},
		[id],
	);

	const serializedParams = useMemo(
		() =>
			JSON.stringify({
				entryData: data,
				scoreFormat: scoreFormat,
				media: {
					id: id,
					type: type,
					status: media?.status,
					episodes: media?.episodes,
					chapters: media?.chapters,
					volumes: media?.volumes,
					nextAiringEpisode: media?.nextAiringEpisode,
					startDate: media?.startDate,
					endDate: media?.endDate,
				},
			}),
		[data, scoreFormat, media],
	);

	const iconStates = {
		list: {
			icon: isOnList ? LIST_ICONS[1] : LIST_ICONS[0],
			isLoading: savedMediaLoading || deletedListItemLoading,
			color: isOnList ? 'green' : null,
		},
		fav: {
			icon: media?.isFavourite ? FAV_ICONS[1] : FAV_ICONS[0],
			isLoading: favLoading,
			color: media?.isFavourite ? 'red' : null,
		},
		disabled: userId ? false : true,
	};

	return (
		<>
			<View style={{ width: containerWidth, borderRadius: 12, alignItems: 'center' }}>
				<ActionIcon
					icon={media?.isFavourite ? FAV_ICONS[1] : FAV_ICONS[0]}
					iconColor={media?.isFavourite ? colors.primary : undefined}
					isLoading={iconStates.fav.isLoading}
					disabled={!iconStates.disabled ? false : true}
					onPress={() =>
						toggleFav(type === MediaType.Anime ? { animeId: id } : { mangaId: id })
					}
					label={media?.isFavourite ? 'Favorited' : 'Favorite'}
					labelStyle={{
						color: media?.isFavourite ? colors.primary : colors.onSurfaceVariant,
					}}
				/>
			</View>

			<View
				style={{
					justifyContent: 'flex-start',
					alignItems: 'center',
					width: containerWidth,
				}}
			>
				<ActionIcon
					isLoading={iconStates.list.isLoading}
					onPress={() =>
						isOnList
							? router.navigate({
									pathname: '/(sheets)/listEntrySheet',
									params: {
										params: serializedParams,
									},
								})
							: updateListEntry()
					}
					onLongPress={() => (isOnList ? setShowRemListDlg(true) : null)}
					disabled={!iconStates.disabled ? false : true}
					icon={isOnList ? LIST_ICONS[1] : LIST_ICONS[0]}
					iconColor={isOnList ? colors.primary : undefined}
					label={`${
						data?.status
							? `${data.status?.replaceAll('_', ' ')}${data?.private ? '🔒' : ''}`
							: 'Add to List'
					}${data?.progress && data?.progress > 0 ? ` · ${data.progress}` : ''}`}
					labelStyle={{
						color: isOnList ? colors.primary : colors.onSurfaceVariant,
					}}
				/>
			</View>
			<Portal>
				<RemoveListItemDialog
					visible={showRemListDlg}
					onDismiss={() => setShowRemListDlg(false)}
					onConfirm={() => {
						deleteListItem({ id: data?.id });
						setIsOnList(false);
					}}
				/>
			</Portal>
		</>
	);
};

export const MediaInteractionBar = ({
	id,
	type,
	status,
	releaseMessage,
	data,
	scoreFormat,
	media,
	refreshData,
	onShowReleases,
}: ListEntryViewProps) => {
	const { colors } = useAppTheme();
	const isSuwayomiEnabled = useAuthStore(
		(state) => !!(state.suwayomi.serverUrl && state.suwayomi.info && type === MediaType.Manga),
	);

	const containerWidth = useMemo(
		() => `${100 / (isSuwayomiEnabled ? 4 : 3)}%` as DimensionValue,
		[isSuwayomiEnabled],
	);
	const splitReleaseMessage = releaseMessage?.includes('\n')
		? releaseMessage?.split('\n')
		: [releaseMessage];

	return (
		<>
			<View>
				<AnimViewMem
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
							isLoading={false}
							icon={
								status === MediaStatus.Finished
									? 'timer-sand-complete'
									: status === MediaStatus.Hiatus
										? 'timer-sand-paused'
										: status === MediaStatus.Cancelled
											? 'timer-sand-empty'
											: 'timer-sand'
							}
							onPress={onShowReleases}
							label={
								(splitReleaseMessage[0]?.length ?? 0) > 0
									? splitReleaseMessage[0]
									: 'Unknown'
							}
							description={
								splitReleaseMessage?.length > 1
									? splitReleaseMessage?.at(-1)
									: undefined
							}
						/>
					</View>
					{isSuwayomiEnabled && type === MediaType.Manga && (
						<View
							style={{
								width: containerWidth,
								borderRadius: 12,
								alignItems: 'center',
							}}
						>
							<ActionIcon
								icon={'magnify'}
								isLoading={false}
								disabled={false}
								onPress={() =>
									router.navigate({
										pathname: '/(dialogs)/(suwayomi)/search',
										params: {
											query: media?.title?.english ?? media?.title?.romaji,
											altTitles: JSON.stringify(
												[
													media?.title?.english,
													media?.title?.romaji,
													media?.title?.native,
													...(media?.synonyms ?? []),
												]?.filter(
													(title) =>
														title !== null && title !== undefined,
												),
											),
										},
									})
								}
								label={'Suwayomi'}
								// labelVariant="labelSmall"
								labelStyle={{
									textAlign: 'center',
									color: colors.onSurfaceVariant,
								}}
							/>
						</View>
					)}
					<AnilistListAction
						data={data}
						id={id}
						media={media}
						refreshData={refreshData}
						scoreFormat={scoreFormat}
						type={type}
						containerWidth={`${100 / (isSuwayomiEnabled ? 4 : 3)}%`}
					/>
				</AnimViewMem>
			</View>
		</>
	);
};

type ScoreInputProps = {
	value: number;
	scoreFormat: ScoreFormat;
	onChange: (value: number) => void;
	disabled?: boolean;
};
export const ScoreInput = ({ value, scoreFormat, onChange, disabled }: ScoreInputProps) => {
	const [showNumPick, setShowNumPick] = useState(false);
	const [containerHeight, setContainerHeight] = useState(0);
	const { colors } = useAppTheme();
	// const {} = useListEntryStore();

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
				onPress={() =>
					router.push({
						pathname: '/(sheets)/numberPickerSheet',
						params: {
							params: JSON.stringify({
								title: 'Score',
								mode: scoreFormat,
								options: undefined,
								// onDismiss: () => setShowNumPick(false)
								defaultValue: value ?? 0,
								type: 'score',
							} as EntryNumberPickerSheetProps),
						},
					})
				}
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
	maxValue: number | null | undefined;
	disabled?: boolean;
	totalContent?: number | null;
};
export const ProgressInput = ({ maxValue, totalContent, disabled }: ProgressInputProps) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const { colors } = useAppTheme();
	const { progress } = useListEntryStore();

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
					router.push({
						pathname: '/(sheets)/numberPickerSheet',
						params: {
							params: JSON.stringify({
								title: 'Set Progress',
								defaultValue: progress ?? 0,
								mode: !maxValue ? 'unknown_chapters' : null,
								options: maxValue
									? Array.from(Array(maxValue + 1).keys()).map((i) => `${i}`)
									: null,
								type: 'progress',
								totalContent,
							} as EntryNumberPickerSheetProps),
						},
					});
				}}
				disabled={disabled}
			>
				<List.Subheader style={{ textAlign: 'center' }}>{'Progress'}</List.Subheader>
				<Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
					{progress ?? 0}
				</Text>
			</Pressable>
		</>
	);
};
