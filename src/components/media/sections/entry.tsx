import { ActivityIndicator, IconButton, List, Portal, Text } from 'react-native-paper';
import React, { useCallback, useMemo, useState } from 'react';
import { RemoveListItemDialog } from '@/components/media/dialogs';
import { Pressable, View, useWindowDimensions } from 'react-native';
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
	useDeleteMediaListItemMutation,
	useToggleFavMutation,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { AnimViewMem } from '@/components/animations';
import { useShallow } from 'zustand/react/shallow';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useListEntryStore } from '@/store/listEntryStore';
import { EntryNumberPickerSheetProps } from '@/app/(sheets)/numberPickerSheet';
import { useSaveMediaListItemInvalidatedMutation } from '@/api/anilist/extended';

const FAV_ICONS = ['heart-outline', 'heart'];
const LIST_ICONS = ['plus', 'playlist-edit'];

const ICON_SIZE = 24;

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
	children: React.ReactNode;
	icon?: string;
	onPress: () => void;
	onLongPress?: () => void;
};
export const ActionIcon = ({ children, icon, onPress, onLongPress }: ActionIconProps) => {
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
	media,
	refreshData,
	onShowReleases,
}: ListEntryViewProps) => {
	const queryClient = useQueryClient();
	const { isPending: favLoading, mutateAsync: toggleFav } = useToggleFavMutation();
	const { isPending: savedMediaLoading, mutateAsync: saveListItem } =
		useSaveMediaListItemInvalidatedMutation();
	const { isPending: deletedListItemLoading, mutateAsync: deleteListItem } =
		useDeleteMediaListItemMutation({ onSuccess: () => queryClient.invalidateQueries() });

	const { userID } = useAuthStore(useShallow((state) => state.anilist));
	const { colors } = useAppTheme();

	const [showRemListDlg, setShowRemListDlg] = useState(false);
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
		disabled: userID ? false : true,
	};

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
								{(splitReleaseMessage[0]?.length ?? 0) > 0
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
									icon={media?.isFavourite ? FAV_ICONS[1] : FAV_ICONS[0]}
									iconColor={media?.isFavourite ? colors.primary : undefined}
									disabled={!iconStates.disabled ? false : true}
									size={ICON_SIZE}
								/>
								<Text
									style={{
										textTransform: 'capitalize',
										color: media?.isFavourite
											? colors.primary
											: colors.onSurfaceVariant,
									}}
									variant="labelMedium"
								>
									{media?.isFavourite ? 'Favorited' : 'Favorite'}
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
						>
							{iconStates.list.isLoading ? (
								<ActivityIndicator animating size={ICON_SIZE} />
							) : (
								<IconButton
									disabled={!iconStates.disabled ? false : true}
									icon={isOnList ? LIST_ICONS[1] : LIST_ICONS[0]}
									iconColor={isOnList ? colors.primary : undefined}
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
								{data?.status
									? `${data.status?.replaceAll('_', ' ')}${data?.private ? '🔒' : ''}`
									: 'Add to List'}
								{data?.progress && data?.progress > 0 ? ` · ${data.progress}` : ''}
							</Text>
						</ActionIcon>
					</View>
				</AnimViewMem>
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

export default ListEntryView;
