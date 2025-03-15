import {
	MainMetaFragment,
	MediaFormat,
	MediaListStatus,
	MediaStatus,
	MediaType,
	ScoreFormat,
	useToggleFavMutation,
} from '@/api/anilist/__genereated__/gql';
import {
	useDeleteActivityItemInvalidateMutation,
	useDeleteMediaListItemInvalidatedMutation,
	useSaveMediaListItemInvalidatedMutation,
} from '@/api/anilist/extended';
import AniListMarkdownViewer from '@/components/markdown/renderer';
import { ScoreView } from '@/components/media/sections/scores';
import { BottomSheetAccordion, GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { MEDIA_FORMAT_ALT } from '@/constants/anilist';
import { useAuthStore } from '@/store/authStore';
import { useListEntryStore } from '@/store/listEntryStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { copyToClipboard, getMovieDuration, getTimeUntil } from '@/utils';
import { sendToast } from '@/utils/toast';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Share, View } from 'react-native';
import { ActivityIndicator, Chip, Divider, Icon, List, Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

export type MediaQuickActionProps = MainMetaFragment & {
	scoreFormat?: ScoreFormat;
	activityId?: number;
	followingUsername?: string;
	allowEntryEdit?: boolean;
};
const MediaQuickActionSheet = () => {
	const { params } = useLocalSearchParams<{ params: string }>();
	const payload = JSON.parse(params) as MediaQuickActionProps;
	const sheet = useRef<TrueSheet>(null);

	const { colors } = useAppTheme();
	const queryClient = useQueryClient();
	const isAnime = payload?.type === MediaType?.Anime;
	const userId = useAuthStore(useShallow((state) => state.anilist.userID));
	const mediaLanguage = useSettingsStore(useShallow((state) => state.mediaLanguage));
	const {
		mutateAsync: addEntry,
		data: _savedMediaListItemData,
		isPending: isAddEntryPending,
	} = useSaveMediaListItemInvalidatedMutation({
		meta: { mediaId: payload?.id },
	});
	const { mutateAsync: removeEntry, isPending: isRemoveEntryPending } =
		useDeleteMediaListItemInvalidatedMutation({
			meta: { mediaId: payload?.id },
			onSuccess: () => queryClient.invalidateQueries(),
		});
	const { mutateAsync: removeActivity, isPending: isRemoveActivityPending } =
		useDeleteActivityItemInvalidateMutation({
			onSuccess: () => queryClient.invalidateQueries(),
		});
	const { mutateAsync: toggleFav, isPending: isFavPending } = useToggleFavMutation({
		onSuccess: () => queryClient.invalidateQueries(),
	});
	const [titleIdx, setTitleIdx] = useState(0);
	const { initialize, onDismiss, onReset: _onReset, ...currentEntry } = useListEntryStore();
	// const [listEntryState, setListEntryState] = useState<MediaListEntryMetaFragment>({
	// 	// ...payload?.mediaListEntry,
	// 	...currentEntry,
	// });
	const [isFav, setIsFav] = useState(payload?.isFavourite);

	// const [showStatusOptions, setShowStatusOptions] = useState(false);

	const titlesArray: string[] = !!payload?.title
		? [
				...new Set([
					payload?.title[mediaLanguage ?? 'romaji'],
					payload?.title?.english,
					payload?.title?.romaji,
					payload?.title?.native,
				]),
			].filter((title): title is string => title !== null && title !== undefined)
		: [];

	const viewAnime = () => {
		// sheet.current?.dismiss();
		router.back();
		router.navigate(`/${isAnime ? 'anime' : 'manga'}/${payload?.id}`);
	};

	const shareLink = async () => {
		if (!payload?.siteUrl) return null;
		await Share.share({ url: payload?.siteUrl, message: payload?.siteUrl });
		sheet.current?.dismiss();
	};

	const onAdd = async (status: MediaListStatus = MediaListStatus.Planning) => {
		const res = await addEntry({ status: status, mediaId: payload?.id });
		if (res?.SaveMediaListEntry) initialize(res.SaveMediaListEntry);
		// setListEntryState({ ...res?.SaveMediaListEntry });
	};

	const onRemove = async () => {
		const res = await removeEntry({ id: currentEntry.id });
		res?.DeleteMediaListEntry?.deleted && onDismiss();
		// res.DeleteMediaListEntry?.deleted && setListEntryState(null);
	};

	const deleteActivity = async () => {
		await removeActivity({ id: payload?.activityId });
		sheet.current?.dismiss();
	};

	const onFavorite = async () => {
		try {
			await toggleFav(isAnime ? { animeId: payload?.id } : { mangaId: payload?.id });
			setIsFav((prev) => !prev);
		} catch (e) {
			sendToast(`${e}`);
		}
	};

	const onViewUser = () => {
		router.back();
		router.navigate(`/user/${payload?.followingUsername}`);
		// sheet.current?.dismiss();
	};

	const onAniCard = () => {
		router.back();
		router.navigate({
			pathname: '/anicard',
			params: {
				cardType: 'media',
				mediaType: payload?.type,
				id: payload?.id,
				idMal: payload?.idMal,
			},
		});
		// sheet.current?.dismiss();
	};

	const openEntryEditor = () => {
		router.push({
			pathname: '/(sheets)/listEntrySheet',
			params: {
				params: JSON.stringify({
					entryData: { ...currentEntry, user: payload?.mediaListEntry?.user },
					media: { ...payload },
					scoreFormat:
						payload?.scoreFormat ??
						payload?.mediaListEntry?.user?.mediaListOptions?.scoreFormat,
					// updateEntry: (tempState) => addEntry({ mediaId: payload?.id, ...tempState }),
				}),
			},
		});
		// openListEntrySheet({
		// 	entryData: listEntryState,
		// 	media: { ...payload },
		// 	scoreFormat:
		// 		payload?.scoreFormat ??
		// 		payload?.mediaListEntry?.user?.mediaListOptions?.scoreFormat,
		// 	updateEntry: (tempState) => addEntry({ mediaId: payload?.id, ...tempState }),
		// });
	};

	// useEffect(() => {
	// 	if (savedMediaListItemData) {
	// 		setListEntryState(savedMediaListItemData.SaveMediaListEntry);
	// 	}
	// }, [savedMediaListItemData]);

	// useEffect(() => {
	// 	// listen for when media changes
	// 	setListEntryState(payload?.mediaListEntry);
	// }, [payload?.id, payload?.mediaListEntry]);

	return (
		<GlobalBottomSheetParent
			sheetRef={sheet}
			grabber
			onDismiss={() => {
				onDismiss();
				router.back();
			}}
			scrollable
			sizes={['auto', 'large']}
		>
			{payload && (
				<View>
					<View>
						{payload?.activityId && (
							<List.Item
								title={'Delete Activity'}
								onPress={() => deleteActivity()}
								left={(props) => (
									<List.Icon
										{...props}
										icon={
											isRemoveActivityPending
												? () => <ActivityIndicator />
												: 'trash-can-outline'
										}
									/>
								)}
							/>
						)}
						{payload?.followingUsername && (
							<List.Item
								title={'View User'}
								description={payload.followingUsername}
								onPress={onViewUser}
								left={(props) => <List.Icon {...props} icon={'account-outline'} />}
							/>
						)}
						{!!userId && payload?.allowEntryEdit && (
							<List.Item
								title={!!currentEntry?.id ? 'Edit Entry' : 'Add to Planning'}
								description={
									!!currentEntry?.id
										? `${currentEntry?.status}${currentEntry?.progress ? ' | ' + currentEntry?.progress + ' / ' + (payload.episodes ?? payload.chapters ?? payload.volumes ?? '~') : ''}`
										: 'Hold down for more options'
								}
								left={(props) => (
									<List.Icon
										{...props}
										icon={
											isAddEntryPending
												? () => <ActivityIndicator />
												: !!currentEntry?.id
													? 'playlist-edit'
													: 'playlist-plus'
										}
									/>
								)}
								onLongPress={openEntryEditor}
								onPress={() => (!!currentEntry?.id ? openEntryEditor() : onAdd())}
							/>
						)}
						{!!userId && !!currentEntry?.id && (
							<List.Item
								title={'Remove from list'}
								left={(props) => (
									<List.Icon
										{...props}
										icon={
											isRemoveEntryPending
												? () => <ActivityIndicator />
												: 'playlist-remove'
										}
									/>
								)}
								onPress={onRemove}
							/>
						)}
						{!!userId && (
							<List.Item
								title={isFav || !payload.allowEntryEdit ? 'Unfavorite' : 'Favorite'}
								left={(props) => (
									<List.Icon
										{...props}
										icon={
											isFavPending
												? () => <ActivityIndicator />
												: payload.allowEntryEdit
													? !isFav
														? 'heart-outline'
														: 'heart-remove-outline'
													: 'heart-remove-outline'
										}
									/>
								)}
								onPress={onFavorite}
							/>
						)}
						<List.Item
							title={`View ${payload.format === MediaFormat.Novel ? 'Novel' : payload.format === MediaFormat.OneShot ? 'Oneshot' : payload.type}`}
							titleStyle={{ textTransform: 'capitalize' }}
							onPress={viewAnime}
							left={(props) => (
								<List.Icon
									{...props}
									icon={
										payload.type === MediaType.Anime
											? 'television'
											: 'book-open-page-variant-outline'
									}
								/>
							)}
						/>
						<List.Item
							title={'AniCard'}
							left={(props) => <List.Icon {...props} icon="card-text-outline" />}
							onPress={onAniCard}
						/>
						<List.Item
							title={'Share'}
							left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
							onPress={shareLink}
						/>
					</View>
					<BottomSheetAccordion key={payload.id} title="Preview">
						<Divider />
						<View
							style={{
								flexDirection: 'row',
								paddingTop: 12,
								paddingLeft: 12,
								alignItems: 'flex-start',
							}}
						>
							<Image
								source={{
									uri: payload.coverImage?.extraLarge,
								}}
								style={{
									height: 160,
									width: undefined,
									aspectRatio: 2 / 3,
									borderRadius: 8,
								}}
							/>
							<View style={{ flex: 1, paddingHorizontal: 12 }}>
								<Text
									variant="titleLarge"
									// numberOfLines={3}
									onPress={() =>
										setTitleIdx((prev) => (prev + 1) % titlesArray.length)
									}
									onLongPress={() => copyToClipboard(titlesArray[titleIdx])}
								>
									{titlesArray[titleIdx]}
								</Text>
								{payload.nextAiringEpisode?.airingAt ? (
									<Text style={{ color: colors.onSurfaceVariant }}>
										<Icon size={undefined} source={'timer-outline'} />
										{` EP ${payload.nextAiringEpisode.episode} - ${getTimeUntil(payload.nextAiringEpisode?.airingAt)}`}
									</Text>
								) : null}
								{payload.type === MediaType.Manga ? (
									<Text style={{ color: colors.onSurfaceVariant }}>
										<Icon size={undefined} source={'timer-outline'} />
										{payload.status === MediaStatus.Releasing ||
										payload.status === MediaStatus.Hiatus
											? ` Publishing since ${payload.startDate?.year}`
											: ` ${payload.startDate?.year} - ${payload.endDate?.year}`}
									</Text>
								) : null}
								<Text style={{ color: colors.onSurfaceVariant }}>
									<Icon
										size={undefined}
										source={
											payload.type === MediaType.Anime
												? 'television'
												: 'book-outline'
										}
									/>
									{` ${payload.format ? MEDIA_FORMAT_ALT[payload.format] : ''}`}
									{payload.format === MediaFormat.Movie &&
									payload.duration &&
									(payload.episodes ?? 0) < 2
										? ` ・ ${getMovieDuration(payload.duration)}`
										: payload.status === MediaStatus.NotYetReleased
											? ``
											: (payload.episodes ??
												  payload.chapters ??
												  payload.volumes)
												? ` ・ ${payload.episodes ?? payload.chapters ?? payload.volumes} ${
														payload.type === MediaType.Anime
															? 'Episodes'
															: payload.format === MediaFormat.Novel
																? 'Volumes'
																: 'Chapters'
													}`
												: ''}
								</Text>
								<Text
									style={{
										color: colors.onSurfaceVariant,
										textTransform: 'capitalize',
									}}
								>
									<Icon size={undefined} source={'card-text-outline'} />
									{` ${payload.status?.replaceAll('_', ' ')}`}
								</Text>
								{payload.averageScore || payload.meanScore ? (
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'flex-start',
											gap: 24,
											paddingTop: 6,
										}}
									>
										{/* <Text>
										<Text style={{ fontWeight: '900' }}>Avg: </Text>
										<Text>{averageScore}%</Text> ・
										<Text style={{ fontWeight: '900' }}> Mean: </Text>
										<Text>{meanScore}%</Text>
									</Text> */}
										<ScoreView type="average" score={payload.averageScore} />
										<ScoreView type="mean" score={payload.meanScore} />
									</View>
								) : null}
							</View>
						</View>
						<View style={{ paddingVertical: 18 }}>
							{/* <TagView genres={genres} /> */}
							<View
								style={{
									flexDirection: 'row',
									flexWrap: 'wrap',
									paddingTop: 6,
								}}
							>
								{payload.genres?.map((genre, idx) => (
									<Chip
										key={idx}
										style={{ marginHorizontal: 8, marginVertical: 4 }}
									>
										{genre}
									</Chip>
								))}
							</View>
							<View style={{ paddingHorizontal: 12 }}>
								{payload.descriptionHTML ? (
									<AniListMarkdownViewer body={payload.descriptionHTML} />
								) : (
									<Text style={{ paddingVertical: 6 }}>
										No description available.
									</Text>
								)}
							</View>
						</View>
					</BottomSheetAccordion>
				</View>
			)}
		</GlobalBottomSheetParent>
	);
};

export default MediaQuickActionSheet;
