import {
	AniMediaQuery,
	MainMetaFragment,
	CharacterMetaDataFragment,
	FuzzyDate,
	MediaFormat,
	MediaListEntryMetaFragment,
	MediaListStatus,
	MediaSearchQuery,
	MediaSort,
	MediaStatus,
	MediaType,
	ReviewsQuery,
	SaveMediaListItemMutationVariables,
	ScoreFormat,
	StaffMetaDataFragment,
	StudioSearchQuery,
	ThreadsOverviewQuery,
	useInfiniteCharacterSearchQuery,
	useInfiniteMediaSearchQuery,
	UserSearchMetaFragment,
	useToggleFavMutation,
	useToggleFollowMutation,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { LegacyRef, useEffect, useState } from 'react';
import {
	Keyboard,
	ListRenderItemInfo,
	Pressable,
	Share,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';
import {
	ActivityIndicator,
	Avatar,
	Button,
	Checkbox,
	Chip,
	Divider,
	Icon,
	List,
	Portal,
	Surface,
	Text,
	TextInput,
} from 'react-native-paper';
import {
	convertDate,
	copyToClipboard,
	getCompactNumberForm,
	getMovieDuration,
	getTimeUntil,
} from '@/utils';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { MEDIA_FORMAT_ALT } from '@/constants/anilist';
import { ScoreView } from '../media/sections/scores';
import AniListMarkdownViewer from '../markdown/renderer';
import {
	useDeleteActivityItemInvalidateMutation,
	useDeleteMediaListItemInvalidatedMutation,
	useSaveMediaListItemInvalidatedMutation,
} from '@/api/anilist/extended';
import { CharacterCard, MediaCard, MediaCardRow } from '../cards';
import { GorakuActivityIndicator } from '../loading';
import ActionSheet, {
	ActionSheetProps,
	ActionSheetRef,
	FlatList,
	ScrollView,
	SheetManager,
	SheetProps,
	useSheetRef,
} from 'react-native-actions-sheet';
import { Accordion, AccordionProps } from '../animations';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { DisplayMode, DisplayState, useDisplayStore } from '@/store/displayStore';
import { MaterialSwitchListItem } from '../switch';
import { Slider } from '../slider';
import { useListFilterStore } from '@/store/listStore';
import { useQueryClient } from '@tanstack/react-query';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { useColumns } from '@/hooks/useColumns';
import { useGetSearch, usePostSearch } from '@/api/tracemoe/tracemoe';
import { Result, SearchBody } from '@/api/tracemoe/models';
import { ImageSearchItem } from '../search/media';
import { usePredictWaifu } from '@/api/huggingface/hf';
import { useSauceNaoSearch } from '@/api/saucenao/saucenao';
import { SauceNaoResponse } from '@/api/saucenao/types';
import { useSearchStore } from '@/store/search/searchStore';
import { SearchReleasesPostMutationResult } from '@/api/mangaupdates/mangaupdates';
import { AnimeFull } from '@/api/jikan/models';
import { useShallow } from 'zustand/react/shallow';
import { compareArrays } from '@/utils/compare';
import { DatePopup, StatusDropDown } from '../media/entryActions';
import { ProgressInput, ScoreInput } from '../media/sections/entry';
import { NumberPickDialog } from '../dialogs';
import { sendToast } from '@/utils/toast';
import * as Haptics from 'expo-haptics';
import { openWebBrowser } from '@/utils/webBrowser';
import { useGetSearchManga } from '@/api/mangadex/mangadexExtended';
import { Manga } from '@/api/mangadex/models';
import { getGetChapterQueryOptions } from '@/api/mangadex/mangadex';
import { useMatchStore } from '@/store/matchStore';

export const BottomSheetParent = (
	props: ActionSheetProps & { sheetRef?: LegacyRef<ActionSheetRef> },
) => {
	const { colors } = useAppTheme();

	useEffect(() => {
		Haptics.selectionAsync();
	}, []);
	return (
		<ActionSheet
			ref={props.sheetRef}
			gestureEnabled
			{...props}
			containerStyle={{
				backgroundColor: colors.elevation.level1,
				...props.containerStyle,
			}}
			indicatorStyle={{
				backgroundColor: colors.onSurfaceVariant,
				marginVertical: 22,
				width: 32,
				height: 4,
			}}
		>
			{props.children}
		</ActionSheet>
	);
};

export const BottomSheetAccordion = (props: AccordionProps & { icon?: IconSource }) => {
	const { colors } = useAppTheme();
	return (
		<Accordion
			titleVariant="titleMedium"
			left={
				<List.Icon
					icon={props.icon ?? 'eye-outline'}
					color={colors.onSurfaceVariant}
					style={{ paddingLeft: 16 }}
				/>
			}
			{...props}
		>
			{props.children}
		</Accordion>
	);
};

export type QuickActionProps = MainMetaFragment & {
	scoreFormat?: ScoreFormat;
	activityId?: number;
	followingUsername?: string;
	allowEntryEdit?: boolean;
};
export const QuickActionSheet = ({ payload }: SheetProps<'QuickActionSheet'>) => {
	const { colors } = useAppTheme();
	const ref = useSheetRef();
	const queryClient = useQueryClient();
	const isAnime = payload.type === MediaType.Anime;
	const userId = useAuthStore(useShallow((state) => state.anilist.userID));
	const mediaLanguage = useSettingsStore(useShallow((state) => state.mediaLanguage));
	const {
		mutateAsync: addEntry,
		data: savedMediaListItemData,
		isPending: isAddEntryPending,
	} = useSaveMediaListItemInvalidatedMutation({
		meta: { mediaId: payload.id },
		onSuccess: () => queryClient.invalidateQueries(),
	});
	const { mutateAsync: removeEntry, isPending: isRemoveEntryPending } =
		useDeleteMediaListItemInvalidatedMutation({
			meta: { mediaId: payload.id },
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
	const [listEntryState, setListEntryState] = useState<MediaListEntryMetaFragment>({
		...payload.mediaListEntry,
	});
	const [isFav, setIsFav] = useState(payload.isFavourite);

	// const [showStatusOptions, setShowStatusOptions] = useState(false);

	const titlesArray: string[] = !!payload.title
		? [
				...new Set([
					payload.title[mediaLanguage],
					payload.title?.english,
					payload.title?.romaji,
					payload.title?.native,
				]),
			].filter((title) => title !== null)
		: [];

	const viewAnime = () => {
		ref.current?.hide();
		router.navigate(`/${isAnime ? 'anime' : 'manga'}/${payload.id}`);
	};

	const shareLink = async () => {
		await Share.share({ url: payload.siteUrl, message: payload.siteUrl });
		ref.current?.hide();
	};

	const onAdd = async (status: MediaListStatus = MediaListStatus.Planning) => {
		const res = await addEntry({ status: status, mediaId: payload.id });
		setListEntryState({ ...res?.SaveMediaListEntry });
	};

	const onRemove = async () => {
		const res = await removeEntry({ id: listEntryState.id });
		res.DeleteMediaListEntry?.deleted && setListEntryState(null);
	};

	const deleteActivity = async () => {
		await removeActivity({ id: payload.activityId });
		ref.current?.hide();
	};

	const onFavorite = async () => {
		try {
			await toggleFav(isAnime ? { animeId: payload.id } : { mangaId: payload.id });
			setIsFav((prev) => !prev);
		} catch (e) {
			sendToast(e);
		}
	};

	const onViewUser = () => {
		router.navigate(`/user/${payload.followingUsername}`);
		ref.current?.hide();
	};

	const onAniCard = () => {
		router.navigate({
			pathname: '/anicard',
			params: {
				cardType: 'media',
				mediaType: payload.type,
				id: payload.id,
				idMal: payload.idMal,
			},
		});
		ref.current?.hide();
	};

	const openEntryEditor = () => {
		SheetManager.show('ListEntrySheet', {
			payload: {
				entryData: listEntryState,
				media: { ...payload },
				scoreFormat:
					payload.scoreFormat ??
					payload.mediaListEntry?.user?.mediaListOptions?.scoreFormat,
				updateEntry: (tempState) => addEntry({ mediaId: payload.id, ...tempState }),
			},
		});
	};

	useEffect(() => {
		if (savedMediaListItemData) {
			setListEntryState(savedMediaListItemData.SaveMediaListEntry);
		}
	}, [savedMediaListItemData]);

	useEffect(() => {
		// listen for when media changes
		setListEntryState(payload.mediaListEntry);
	}, [payload.id, payload.mediaListEntry]);

	// useEffect(() => {
	// 	console.warn(payload.status, payload.mediaListEntry);
	// }, []);

	return (
		<BottomSheetParent backgroundInteractionEnabled>
			<ScrollView>
				<View>
					{payload.activityId && (
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
					{payload.followingUsername && (
						<List.Item
							title={'View User'}
							description={payload.followingUsername}
							onPress={onViewUser}
							left={(props) => <List.Icon {...props} icon={'account-outline'} />}
						/>
					)}
					{!!userId && payload.allowEntryEdit && (
						<List.Item
							title={listEntryState ? 'Edit Entry' : 'Add to Planning'}
							description={
								listEntryState
									? `${listEntryState?.status}${listEntryState?.progress ? ' | ' + listEntryState?.progress + ' / ' + (payload.episodes ?? payload.chapters ?? payload.volumes ?? '~') : ''}`
									: 'Hold down for more options'
							}
							left={(props) => (
								<List.Icon
									{...props}
									icon={
										isAddEntryPending
											? () => <ActivityIndicator />
											: listEntryState
												? 'playlist-edit'
												: 'playlist-plus'
									}
								/>
							)}
							onLongPress={openEntryEditor}
							onPress={() => (listEntryState ? openEntryEditor() : onAdd())}
						/>
					)}
					{!!userId && listEntryState && (
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
				<BottomSheetAccordion title="Preview">
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
							{payload.nextAiringEpisode ? (
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
								{` ${MEDIA_FORMAT_ALT[payload.format]}`}
								{payload.format === MediaFormat.Movie &&
								payload.duration &&
								payload.episodes < 2
									? ` ・ ${getMovieDuration(payload.duration)}`
									: payload.status === MediaStatus.NotYetReleased
										? ` ・ Unreleased`
										: (payload.episodes ?? payload.chapters ?? payload.volumes)
											? ` ・ ${payload.episodes ?? payload.chapters ?? payload.volumes} ${
													payload.type === MediaType.Anime
														? 'Episodes'
														: payload.format === MediaFormat.Novel
															? 'Volumes'
															: 'Chapters'
												}`
											: ''}
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
					<View style={{ paddingTop: 18 }}>
						{/* <TagView genres={genres} /> */}
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 6 }}>
							{payload.genres?.map((genre, idx) => (
								<Chip key={idx} style={{ marginHorizontal: 8, marginVertical: 4 }}>
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
			</ScrollView>
		</BottomSheetParent>
	);
};

export type ThreadOverviewSheetProps = {
	data: ThreadsOverviewQuery['Page']['threads'][0];
};
export const ThreadOverviewSheet = ({ payload: { data } }: SheetProps<'ThreadOverviewSheet'>) => {
	const ref = useSheetRef();
	const onUserNav = () => {
		router.navigate({
			// @ts-ignore it works tho...
			pathname: `/user/${data?.user?.name}`,
		});
		ref.current?.hide();
	};

	return (
		<BottomSheetParent>
			<List.Item
				title={'View Thread'}
				left={(props) => <List.Icon {...props} icon={'forum-outline'} />}
			/>
			<List.Item
				title={'View Creator'}
				onPress={onUserNav}
				left={(props) => (
					<Avatar.Image
						source={{ uri: data?.user?.avatar?.large }}
						size={24}
						style={[props.style]}
					/>
				)}
			/>
		</BottomSheetParent>
	);
};

export type ReviewOverviewSheetProps = {
	data: AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0] | null;
};
export const ReviewOverviewSheet = ({ payload: { data } }: SheetProps<'ReviewOverviewSheet'>) => {
	const ref = useSheetRef();

	const review =
		(data as AniMediaQuery['Media']['reviews']['edges'][0])?.node ??
		(data as ReviewsQuery['Page']['reviews'][0]);

	const onUserNav = () => {
		router.navigate({
			// @ts-ignore it works tho...
			pathname: `/user/${review?.user?.id}/${review?.user?.name}`,
			params: {
				avatar: review?.user?.avatar?.large,
				// banner: data?.node?.user?.bannerImage,
			},
		});
		ref.current?.hide();
	};

	return (
		<BottomSheetParent>
			<List.Item
				title={'Read Review'}
				left={(props) => <List.Icon {...props} icon={'forum-outline'} />}
			/>
			<List.Item
				title={'View Creator'}
				onPress={onUserNav}
				left={(props) => (
					<Avatar.Image
						source={{ uri: review?.user?.avatar?.large }}
						size={24}
						style={[props.style]}
					/>
				)}
			/>
		</BottomSheetParent>
	);
};

export type QuickActionCharStaffProps = (StaffMetaDataFragment | CharacterMetaDataFragment) & {
	type: 'character' | 'staff';
};
export const QuickActionCharStaffSheet = ({
	payload: {
		type,
		id,
		name,
		descriptionHTML,
		favourites,
		dateOfBirth,
		gender,
		image,
		isFavourite,
		siteUrl,
	},
}: SheetProps<'QuickActionCharStaffSheet'>) => {
	const ref = useSheetRef();
	const userId = useAuthStore(useShallow((state) => state.anilist.userID));
	const [titleIdx, setTitleIdx] = useState(0);
	const [isFav, setIsFav] = useState(isFavourite);

	const queryClient = useQueryClient();
	const { mutateAsync: toggleFav, isPending } = useToggleFavMutation({
		onSuccess: () => queryClient.invalidateQueries(),
	});

	const onFavorite = async () => {
		try {
			await toggleFav(type === 'character' ? { characterId: id } : { staffId: id });
			setIsFav((prev) => !prev);
		} catch (e) {
			sendToast(e);
		}
	};

	const titlesArray: string[] = !!name
		? [...new Set([name['full'], name['native']])].filter((title) => title !== null)
		: [];

	const dob = convertDate(dateOfBirth, true);

	const viewCharStaff = () => {
		ref.current?.hide();
		router.navigate(`/${type}/${id}`);
	};

	const shareLink = async () => {
		await Share.share({ url: siteUrl, message: siteUrl });
		ref.current?.hide();
	};

	return (
		<BottomSheetParent>
			<ScrollView>
				<View>
					{!!userId && (
						<List.Item
							title={
								(isFav ? 'Unfavorite' : 'Favorite') +
								` (${getCompactNumberForm(favourites)})`
							}
							left={(props) => (
								<List.Icon
									{...props}
									icon={
										isPending
											? () => <ActivityIndicator />
											: !isFav
												? 'heart-outline'
												: 'heart-remove'
									}
									color={isFav && 'red'}
								/>
							)}
							onPress={onFavorite}
						/>
					)}
					<List.Item
						title={`View ${type}`}
						titleStyle={{ textTransform: 'capitalize' }}
						onPress={viewCharStaff}
						left={(props) => <List.Icon {...props} icon={'account-outline'} />}
					/>
					<List.Item
						title={'Share'}
						left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
						onPress={shareLink}
					/>
				</View>
				<BottomSheetAccordion title="Preview">
					<Divider />
					<View
						style={{
							flexDirection: 'row',
							paddingTop: 12,
							paddingLeft: 12,
							alignItems: 'flex-start',
						}}
					>
						<Avatar.Image
							source={{
								uri: image?.large,
							}}
							size={100}
						/>
						<View style={{ flex: 1, paddingHorizontal: 12 }}>
							<Text
								variant="titleLarge"
								numberOfLines={3}
								onPress={() =>
									setTitleIdx((prev) => (prev + 1) % titlesArray.length)
								}
								onLongPress={() => copyToClipboard(titlesArray[titleIdx])}
							>
								{titlesArray[titleIdx]}
							</Text>
							{dateOfBirth && (dateOfBirth.day || dateOfBirth.month) ? (
								<Text>
									<Icon source={'cake-variant-outline'} size={undefined} />
									{' ' + dob}
								</Text>
							) : null}
							{gender ? (
								<Text>
									<Icon
										size={undefined}
										source={
											gender.toLowerCase() === 'male'
												? 'gender-male'
												: gender.toLowerCase() === 'female'
													? 'gender-female'
													: 'gender-male-female-variant'
										}
									/>
									{' ' + gender}
								</Text>
							) : null}
						</View>
					</View>
					{descriptionHTML ? (
						<View style={{ paddingTop: 18, paddingHorizontal: 10 }}>
							<AniListMarkdownViewer body={descriptionHTML} />
						</View>
					) : null}
				</BottomSheetAccordion>
			</ScrollView>
		</BottomSheetParent>
	);
};

export type QuickActionUserProps = UserSearchMetaFragment;
export const QuickActionUserSheet = ({
	payload: { id, name, avatar, aboutHTML, isFollowing, isFollower, siteUrl },
}: SheetProps<'QuickActionUserSheet'>) => {
	const ref = useSheetRef();
	const [isFollowingState, setIsFollowingState] = useState(isFollowing);
	const { mutateAsync, isPending } = useToggleFollowMutation();

	const onToggleFollow = async () => {
		const res = await mutateAsync({ userId: id });
		setIsFollowingState(res.ToggleFollow?.isFollowing);
	};

	const viewUser = () => {
		ref.current?.hide();
		router.navigate(`/user/${name}`);
	};

	const shareLink = async () => {
		await Share.share({ url: siteUrl, message: siteUrl });
		ref.current?.hide();
	};

	return (
		<BottomSheetParent snapPoints={[60, 80]}>
			<View style={{ paddingVertical: 12 }}>
				<List.Item
					title={isFollowingState ? 'Unfollow' : 'Follow'}
					onPress={onToggleFollow}
					left={(props) => (
						<List.Icon
							{...props}
							icon={
								isPending
									? () => <ActivityIndicator />
									: isFollowingState
										? 'account-minus-outline'
										: 'account-plus-outline'
							}
						/>
					)}
				/>
				<List.Item
					title={`View User`}
					titleStyle={{ textTransform: 'capitalize' }}
					onPress={viewUser}
					left={(props) => <List.Icon {...props} icon={'account-outline'} />}
				/>
				<List.Item
					title={'Share'}
					left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
					onPress={shareLink}
				/>
			</View>
			<BottomSheetAccordion title="Preview">
				<Divider />
				<ScrollView>
					<View
						style={{
							flexDirection: 'row',
							paddingTop: 12,
							paddingLeft: 12,
							alignItems: 'flex-start',
						}}
					>
						<Avatar.Image
							source={{
								uri: avatar?.large,
							}}
							size={100}
						/>
						<View style={{ flex: 1, paddingHorizontal: 12 }}>
							<Text variant="titleLarge" onLongPress={() => copyToClipboard(name)}>
								{name}
							</Text>
							{isFollower ? (
								<Text>
									<Icon source={'account-eye-outline'} size={undefined} />
									{' Follows you'}
								</Text>
							) : null}
						</View>
					</View>
					<View style={{ paddingTop: 18, paddingHorizontal: 10 }}>
						<AniListMarkdownViewer body={aboutHTML} />
					</View>
				</ScrollView>
			</BottomSheetAccordion>
		</BottomSheetParent>
	);
};

export type QuickActionAniTrendzProps = {
	link: string;
	names: string[];
	anime?: string;
	onCharacterSearch?: (name: string) => void;
	onAnimeSearch?: (anime: string) => void;
};
export const QuickActionAniTrendzSheet = ({
	payload: { names, anime, link, onAnimeSearch, onCharacterSearch },
}: SheetProps<'QuickActionAniTrendzSheet'>) => {
	const ref = useSheetRef('QuickActionAniTrendzSheet');

	const searchCharacter = (name: string) => {
		onCharacterSearch(name);
	};

	const searchAnime = () => {
		onAnimeSearch(anime);
	};

	const shareLink = async () => {
		await Share.share({ url: link, message: link });
		ref.current?.hide();
	};

	return (
		<BottomSheetParent>
			<View style={{ paddingVertical: 12 }}>
				{names?.map((name, idx) => (
					<List.Item
						key={idx}
						title={`Search ${name.replace(',', '')}`}
						onPress={() => searchCharacter(name)}
						left={(props) => <List.Icon {...props} icon={'account-search-outline'} />}
					/>
				))}
				{anime && (
					<List.Item
						title={'Search Anime'}
						onPress={searchAnime}
						left={(props) => <List.Icon {...props} icon={'movie-search-outline'} />}
					/>
				)}
				<List.Item
					title={'Share Site'}
					onPress={shareLink}
					left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
				/>
			</View>
		</BottomSheetParent>
	);
};

export type CharacterSearchProps = {
	name?: string;
	image?:
		| {
				path: string;
		  }
		| Blob;
};
export const CharacterSearchSheet = ({
	payload: { name, image },
}: SheetProps<'CharacterSearchSheet'>) => {
	const predictionQuery = usePredictWaifu(
		{
			data: [image ?? '', 'SmilingWolf/wd-swinv2-tagger-v3', 1, false, 0.85, true],
		},
		{
			enabled: image ? true : false,
		},
	);
	const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteCharacterSearchQuery(
		{
			search:
				image && predictionQuery ? predictionQuery?.data[2]?.label?.split('(')[0] : name,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.Page?.pageInfo?.hasNextPage) {
					return {
						page: lastPage?.Page?.pageInfo?.currentPage + 1,
					};
				}
			},
			enabled: (image && !!predictionQuery?.data[2]?.label) || !!name,
		},
	);

	const { columns, itemWidth } = useColumns('search');

	const flatData = data?.pages?.flatMap((chars) => chars?.Page?.characters);

	return (
		<BottomSheetParent containerStyle={{ minHeight: '20%' }}>
			{isFetching ? (
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<GorakuActivityIndicator />
					<Text>
						{predictionQuery && predictionQuery?.isFetching
							? 'Running predictions'
							: 'Searching the character'}
					</Text>
				</View>
			) : (
				<FlatList
					data={flatData}
					keyExtractor={(item, idx) => idx.toString()}
					numColumns={columns}
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10 }}>
							<Text variant="headlineMedium">Character Search</Text>
							<Divider />
						</View>
					)}
					contentContainerStyle={{ padding: 10 }}
					centerContent
					renderItem={({ item }) => (
						<View
							style={{
								alignItems: 'center',
								width: itemWidth,
							}}
						>
							<CharacterCard {...item} />
						</View>
					)}
					onEndReached={() => hasNextPage && fetchNextPage()}
				/>
			)}
		</BottomSheetParent>
	);
};

export type MediaSearchProps = {
	type: MediaType;
	search: string;
	isbn?: string;
	onRescan?: () => void;
};
export const MediaSearchSheet = ({
	payload: { search, type, isbn, onRescan },
}: SheetProps<'MediaSearchSheet'>) => {
	const ref = useSheetRef('MediaSearchSheet');
	const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteMediaSearchQuery(
		{ search: search, type: type, sort: MediaSort.SearchMatch, page: 1 },
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.Page?.pageInfo.hasNextPage) {
					return {
						page: lastPage?.Page?.pageInfo.currentPage + 1,
					};
				}
			},
			enabled: !!(search && type),
		},
	);

	const { columns, itemWidth } = useColumns('search');

	const flatData = data?.pages?.flatMap((chars) => chars?.Page?.media) ?? [];

	const MediaRenderItem = ({ item }: { item: MediaSearchQuery['Page']['media'][0] }) => {
		return (
			<View style={{ width: itemWidth }}>
				<View
					style={{
						// flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
						marginHorizontal: 5,
					}}
				>
					<MediaCard {...item} fitToParent navigate={() => ref.current?.hide()} />
				</View>
			</View>
		);
	};

	return (
		<BottomSheetParent>
			{isFetching ? (
				<View
					style={{
						minHeight: 100,
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					key={columns}
					data={flatData}
					keyExtractor={(_item, idx) => idx.toString()}
					numColumns={columns}
					centerContent
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								{type} Search
							</Text>
							{isbn && (
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text>ISBN: </Text>
										<Button
											icon={'content-copy'}
											onPress={() => copyToClipboard(isbn)}
										>
											{isbn}
										</Button>
									</View>
									<Button
										onPress={() => {
											ref.current?.hide();
											onRescan();
										}}
									>
										Rescan
									</Button>
								</View>
							)}

							<Divider />
						</View>
					)}
					renderItem={(props) => <MediaRenderItem {...props} />}
					onEndReached={() => hasNextPage && fetchNextPage()}
				/>
			)}
		</BottomSheetParent>
	);
};

export type CalendarFilterProps = {
	updateAllTitles: (onList: boolean) => void;
};
export const CalendarFilterSheet = ({
	payload: { updateAllTitles },
}: SheetProps<'CalendarFilterSheet'>) => {
	const { userID } = useAuthStore().anilist;
	const { calendar, updateCalendarDisplay } = useDisplayStore(
		useShallow((state) => ({
			calendar: state.calendar,
			updateCalendarDisplay: state.updateCalendarDisplay,
		})),
	);

	const updateOnlyShowList = (val: boolean) => {
		updateCalendarDisplay({ list_only: val });
		updateAllTitles(val);
	};

	return (
		<BottomSheetParent>
			{userID && (
				<MaterialSwitchListItem
					title="Show List Only"
					selected={calendar.list_only}
					onPress={() => updateOnlyShowList(!calendar.list_only)}
				/>
			)}
			{/* <List.Subheader>Grid Size: {calendar.grid_size ?? 2} per row</List.Subheader>
                <Slider value={calendar.grid_size ?? 2} onValueChange={val => updateGridSize(val)} step={1} minimumValue={1} maximumValue={3} thumbTintColor={colors.primary}/> */}
		</BottomSheetParent>
	);
};

export type DisplayConfigProps = {
	type: keyof DisplayState;
};
export const DisplayConfigSheet = ({ payload: { type } }: SheetProps<'DisplayConfigSheet'>) => {
	const { search, list, calendar } = useDisplayStore(
		useShallow((state) => ({
			search: state.search,
			list: state.list,
			calendar: state.calendar,
		})),
	);
	const { updateCalendar, updateList, updateSearch } = useDisplayStore(
		useShallow((state) => ({
			updateSearch: state.updateSearchDisplay,
			updateList: state.updateListDisplay,
			updateCalendar: state.updateCalendarDisplay,
		})),
	);

	const onModeChange = (mode: DisplayMode) => {
		switch (type) {
			case 'calendar':
				updateCalendar({ mode });
			case 'list':
				updateList({ mode });
			case 'search':
				updateSearch({ mode });
		}
	};

	const onGridSizeChange = (grid_size: number) => {
		switch (type) {
			case 'calendar':
				updateCalendar({ grid_size });
			case 'list':
				updateList({ grid_size });
			case 'search':
				updateSearch({ grid_size });
		}
	};

	return (
		<BottomSheetParent>
			<ScrollView>
				<List.Item
					title={'Display Mode'}
					description={() => (
						<View style={{ flexDirection: 'row', gap: 6, paddingTop: 6 }}>
							{(['COMPACT', 'LIST'] as DisplayMode[]).map((displayMode, idx) => (
								<Chip
									mode="outlined"
									selected={
										(type === 'calendar'
											? calendar
											: type === 'list'
												? list
												: search
										)?.mode?.toUpperCase() === displayMode.toUpperCase()
									}
									key={idx}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => onModeChange(displayMode)}
								>
									{displayMode}
								</Chip>
							))}
						</View>
					)}
				/>
				{(type === 'calendar' ? calendar : type === 'list' ? list : search)?.mode ===
					'COMPACT' && (
					<Slider
						title="Grid Size"
						description={`${
							(type === 'calendar' ? calendar : type === 'list' ? list : search)
								?.grid_size
						} columns`}
						initialValue={
							(type === 'calendar' ? calendar : type === 'list' ? list : search)
								?.grid_size
						}
						steps={1}
						// initialScore={tempFilter.averageScore_greater}
						maxValue={6}
						minValue={2}
						onValueUpdate={(size) => onGridSizeChange(size)}
					/>
				)}
			</ScrollView>
		</BottomSheetParent>
	);
};

// export type AnilistAccountProps = {};
export const AnilistAccountSheet = () => {
	const { userID } = useAuthStore(useShallow((state) => state.anilist));
	const clearAuth = useAuthStore(useShallow((state) => state.clearAuth));
	const updateListFilter = useListFilterStore(useShallow((state) => state.updateListFilter));
	const queryClient = useQueryClient();
	const aniAuth = useAnilistAuth();

	const onLogout = () => {
		clearAuth('anilist');
		updateListFilter({
			animeTabOrder: ['Watching', 'Planning', 'Completed', 'Rewatching', 'Paused', 'Dropped'],
			mangaTabOrder: ['Reading', 'Planning', 'Completed', 'Rereading', 'Paused', 'Dropped'],
		});
		queryClient.invalidateQueries();
	};

	const onLogin = () => {
		aniAuth.promptAsync();
	};

	return (
		<BottomSheetParent>
			{userID && <List.Item title={'Logout'} onPress={onLogout} />}
			<List.Item title={userID ? 'Relogin' : 'Login'} onPress={onLogin} />
		</BottomSheetParent>
	);
};

export type QuickActionStudioProps = StudioSearchQuery['Page']['studios'][0];
export const QuickActionStudioSheet = ({
	payload: { id, name, media, siteUrl, isFavourite },
}: SheetProps<'QuickActionStudioSheet'>) => {
	const ref = useSheetRef();
	const isAuthed = useAuthStore(useShallow((state) => !!state.anilist.userID));
	const [isFav, setIsFav] = useState(isFavourite);

	const { columns, displayMode, itemWidth } = useColumns('search');

	const { mutateAsync: toggleFav, isPending } = useToggleFavMutation();

	const viewStudio = () => {
		ref.current?.hide();
		router.navigate(`/studio/${id}`);
	};

	const onFavorite = async () => {
		const result = await toggleFav({ studioId: id });
		setIsFav(result.ToggleFavourite?.studios?.edges[0]?.node?.isFavourite);
	};

	const shareLink = async () => {
		await Share.share({ url: siteUrl, message: siteUrl });
	};

	return (
		<BottomSheetParent>
			<ScrollView>
				<View>
					{isAuthed && (
						<List.Item
							title={
								isPending
									? () => <ActivityIndicator />
									: isFav
										? 'Unfavorite'
										: 'Favorite'
							}
							onPress={onFavorite}
							left={(props) => (
								<List.Icon {...props} icon={isFav ? 'heart' : 'heart-outline'} />
							)}
						/>
					)}
					<List.Item
						title={`View ${name}`}
						onPress={viewStudio}
						left={(props) => <List.Icon {...props} icon={'office-building-outline'} />}
					/>
					<List.Item
						title={'Share'}
						left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
						onPress={shareLink}
					/>
					<List.Item
						title={'Copy to Clipboard'}
						left={(props) => <List.Icon {...props} icon="content-copy" />}
						onPress={() => copyToClipboard(name)}
					/>
				</View>
				{media?.edges && (
					<BottomSheetAccordion title="Preview">
						<Divider />
						<FlatList
							key={columns}
							data={media?.edges}
							numColumns={columns}
							scrollEnabled={false}
							keyExtractor={(item, idx) => idx.toString()}
							renderItem={({ item: { node } }) =>
								displayMode === 'COMPACT' ? (
									<View style={{ width: '100%' }}>
										<View
											style={{
												// flex: 1,
												alignItems: 'center',
												justifyContent: 'flex-start',
												// marginVertical: 10,
												// marginHorizontal: 5,
												width: itemWidth,
											}}
										>
											<MediaCard {...node} fitToParent />
										</View>
									</View>
								) : (
									<MediaCardRow {...node} />
								)
							}
						/>
					</BottomSheetAccordion>
				)}
			</ScrollView>
		</BottomSheetParent>
	);
};

export type TraceMoeSheetProps = {
	url?: string;
	image?: {
		uri: string;
		type: string;
		name: string;
	};
};
export const TraceMoeSheet = ({ payload: { url, image } }: SheetProps<'TraceMoeSheet'>) => {
	const urlImageQuery = useGetSearch(
		{ url, anilistInfo: 'true', cutBorders: 'true' },
		{ query: { enabled: !!url } },
	);
	const localImageMutation = usePostSearch({
		axios: { headers: { 'Content-Type': 'multipart/form-data' } },
	}); // not really mutation but...

	const RenderItem = ({ item }: ListRenderItemInfo<Result>) => {
		return <ImageSearchItem item={item} />;
	};

	useEffect(() => {
		if (image) {
			localImageMutation.mutate({
				data: { image } as unknown as SearchBody,
				params: { anilistInfo: 'true', cutBorders: 'true' },
			});
		}
	}, []);

	return (
		<BottomSheetParent containerStyle={{ minHeight: '20%' }}>
			{(url ? urlImageQuery?.isFetching : localImageMutation?.isPending) ? (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					data={
						url
							? urlImageQuery?.data?.data?.result
							: localImageMutation?.data?.data?.result
					}
					keyExtractor={(item, idx) => idx.toString()}
					numColumns={1}
					centerContent
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10 }}>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								Image Search
							</Text>
							<Divider />
						</View>
					)}
					contentContainerStyle={{ padding: 10 }}
					renderItem={RenderItem}
					windowSize={5}
				/>
			)}
		</BottomSheetParent>
	);
};

export type SauceNaoSheetProps = {
	file:
		| string
		| {
				uri: string;
				type: string;
				name: string;
		  };
};

export const SauceNaoSheet = ({ payload: { file } }: SheetProps<'SauceNaoSheet'>) => {
	const ref = useSheetRef();
	const { colors } = useAppTheme();
	const { updateQuery } = useSearchStore(
		useShallow((state) => ({
			query: state.query,
			updateQuery: state.updateQuery,
		})),
	);
	const sauceNaoQuery = useSauceNaoSearch({
		file,
		enabled: !!file,
	});

	const RenderItem = ({ item }: ListRenderItemInfo<SauceNaoResponse['results'][0]>) => {
		const onSearch = () => {
			updateQuery(item.data.source);
			ref.current?.hide();
		};
		return (
			<Surface style={{ marginVertical: 8, borderRadius: 6, overflow: 'hidden' }}>
				<View style={{ flexDirection: 'row' }}>
					<Image
						source={{ uri: item.header.thumbnail }}
						style={{ height: 140, width: 90 }}
						contentFit="cover"
					/>
					<View style={{ flex: 1, paddingHorizontal: 10, height: '100%' }}>
						<Text variant="titleMedium">
							{item.data?.source} {item.data.mal_id}
						</Text>
						<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
							Similarity: {item.header?.similarity}
						</Text>
						<View
							style={{
								justifyContent: 'flex-end',
								alignItems: 'flex-end',
								height: '100%',
								flex: 1,
								padding: 6,
							}}
						>
							<Button mode="contained" icon={'magnify'} onPress={onSearch}>
								Search
							</Button>
						</View>
					</View>
					{parseFloat(item.header.similarity) > 90 && (
						<Icon source={'check'} size={undefined} />
					)}
				</View>
			</Surface>
		);
	};

	return (
		<BottomSheetParent containerStyle={{ minHeight: '20%' }}>
			{sauceNaoQuery?.isFetching ? (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					data={sauceNaoQuery?.data?.results}
					keyExtractor={(item, idx) => idx.toString()}
					numColumns={1}
					centerContent
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10 }}>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								Image Search
							</Text>
							<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
								Long Remaining: {sauceNaoQuery?.data?.header?.long_remaining} /{' '}
								{sauceNaoQuery?.data?.header?.long_limit} {'(per day)'}
							</Text>
							<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
								Short Remaining: {sauceNaoQuery?.data?.header?.short_remaining} /{' '}
								{sauceNaoQuery?.data?.header?.short_limit} {'(per 30s)'}
							</Text>
							<Divider />
						</View>
					)}
					contentContainerStyle={{ padding: 10 }}
					renderItem={RenderItem}
					windowSize={5}
				/>
			)}
		</BottomSheetParent>
	);
};

export type MediaReleasesSheetProps = {
	releases: SearchReleasesPostMutationResult['data']['results'] | undefined;
	animeReleases: AniMediaQuery['Media']['airingSchedule']['nodes'] | undefined;
	streamingSites: AnimeFull['streaming'];
	status: MediaStatus;
	streamingEpisodes: AniMediaQuery['Media']['streamingEpisodes'];
};
export const MediaReleasesSheet = ({
	payload: { releases, animeReleases, status, streamingEpisodes },
}: SheetProps<'MediaReleasesSheet'>) => {
	const sortedStreamingSites = streamingEpisodes?.length > 0 ? streamingEpisodes.sort() : null;

	const MangaRenderItem = ({
		item,
	}: ListRenderItemInfo<SearchReleasesPostMutationResult['data']['results'][0]>) => {
		return (
			<List.Item
				title={
					item.record.chapter?.length > 0 ? item.record.chapter : `v${item.record.volume}`
				}
				description={item.record?.groups[0]?.name}
				right={(props) => <Text style={[props.style]}>{item.record?.release_date}</Text>}
			/>
		);
	};

	const AnilistAnimeRenderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery['Media']['streamingEpisodes'][0]>) => {
		return (
			<Surface
				elevation={2}
				style={{
					flex: 1,
					borderRadius: 8,
					marginVertical: 6,
					padding: 6,
				}}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
					}}
				>
					{/* <CrunchyRollIcon fontColor={colors.onSurface} /> */}
					<Text variant="titleMedium" style={{ flexShrink: 1 }}>
						{item.title}
					</Text>
				</View>
				<Image
					source={{ uri: item.thumbnail }}
					contentFit="cover"
					style={{
						width: '100%',
						aspectRatio: 32 / 9,
						borderRadius: 8,
						marginTop: 4,
					}}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<Button onPress={() => openWebBrowser(item.url, true)}>{item.site}</Button>
				</View>
			</Surface>
		);
	};

	const MalAnimeRenderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery['Media']['airingSchedule']['nodes'][0]>) => {
		return (
			<List.Item
				title={`EP ${item.episode}`}
				right={(props) => (
					<Text style={[props.style]}>
						{new Date(item.airingAt * 1000).toLocaleString()}
					</Text>
				)}
			/>
		);
	};

	return (
		<BottomSheetParent>
			{/* @ts-ignore */}
			<FlatList
				data={releases ?? sortedStreamingSites ?? animeReleases}
				keyExtractor={(item, idx) => idx.toString()}
				numColumns={1}
				centerContent
				ListHeaderComponent={() => (
					<View style={{ marginBottom: 10 }}>
						<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
							Release Guide
						</Text>
						<Text>
							This series is currently{' '}
							<Text style={{ fontWeight: 'bold' }}>
								{status.toLowerCase().replaceAll('_', ' ')}.{'\n'}
							</Text>
						</Text>
						{![
							MediaStatus.Cancelled,
							MediaStatus.Hiatus,
							MediaStatus.Finished,
						].includes(status) ? (
							<Text style={{ fontStyle: 'italic' }}>
								{releases
									? 'The estimated chapter release is based on the releases recorded on MangaUpdates.\n'
									: 'The episode release time is a direct reflection of the data provided by AniList.\n'}
							</Text>
						) : null}
						<Divider />
					</View>
				)}
				contentContainerStyle={{ padding: 10 }}
				renderItem={
					releases
						? MangaRenderItem
						: sortedStreamingSites
							? AnilistAnimeRenderItem
							: MalAnimeRenderItem
				}
			/>
		</BottomSheetParent>
	);
};

type EntryNumInputProps = {
	value: any | null | undefined;
	title: string;
	inputType: 'number' | 'date' | 'string';
	onChange: (value: any) => void;
	style?: StyleProp<ViewStyle>;
};

export type ListEntrySheetProps = {
	entryData: MediaListEntryMetaFragment;
	scoreFormat: ScoreFormat;
	updateEntry: (variables: SaveMediaListItemMutationVariables) => void;
	media?: MainMetaFragment;
};
export const ListEntrySheet = ({
	payload: { entryData, scoreFormat, media, updateEntry },
}: SheetProps<'ListEntrySheet'>) => {
	const { colors } = useAppTheme();
	const ref = useSheetRef();

	const allCustomLists =
		entryData?.user?.mediaListOptions[
			media?.type === MediaType.Anime ? 'animeList' : 'mangaList'
		]?.customLists;

	const currentLists =
		entryData?.customLists?.length > 0
			? (entryData?.customLists as { enabled: boolean; name: string }[])
					?.map((list) => {
						if (list.enabled) {
							return list.name;
						}
					})
					?.filter((list) => list !== undefined)
			: [];

	const [tempParams, setTempParams] = useState<SaveMediaListItemMutationVariables>({
		...entryData,
		status: entryData?.status ?? MediaListStatus.Planning,
		// status: status as MediaListStatus,
		score: entryData?.score ?? 0,
		repeat: entryData?.repeat ?? 0,
		// progress: entryData?.progress,
		// startedAt: entryData?.startedAt as FuzzyDate,
		// completedAt: entryData?.completedAt as FuzzyDate,
		// repeat: entryData?.repeat,
		// notes: entryData?.notes,
		// private: entryData?.private,
		// hideFromStatusList: entryData?.hiddenFromStatusLists,
		customLists: currentLists,
		// ? Object.keys(entryData?.customLists as { [key: string]: boolean })?.filter(
		// 		(val, _idx) => entryData?.customLists[val] === true,
		// 	)
		// : [],
	});

	const onReset = () => {
		setTempParams({
			...entryData,
			// status: status as MediaListStatus,
			// score: entryData?.score,
			// progress: entryData?.progress,
			// startedAt: entryData?.startedAt as FuzzyDate,
			// completedAt: entryData?.completedAt as FuzzyDate,
			// repeat: entryData?.repeat,
			// notes: entryData?.notes,
			// private: entryData?.private,
			// hideFromStatusList: entryData?.hiddenFromStatusLists,
			customLists: currentLists,
			// ? Object.keys(entryData?.customLists as { [key: string]: boolean })?.filter(
			// 		(val, _idx) => entryData?.customLists[val] === true,
			// 	)
			// : [],
		});
	};

	const submitNewEntry = () => {
		if (
			tempParams.status === entryData?.status &&
			tempParams.progress === entryData?.progress &&
			tempParams.score === entryData?.score &&
			tempParams.startedAt === entryData?.startedAt &&
			tempParams.completedAt === entryData?.completedAt &&
			tempParams.repeat === entryData?.repeat &&
			tempParams.notes === entryData?.notes &&
			tempParams.private === entryData?.private &&
			tempParams.hideFromStatusList === entryData?.hiddenFromStatusLists &&
			compareArrays(
				tempParams.customLists ?? [],
				currentLists,
				// ? Object.keys(entryData?.customLists as { [key: string]: boolean })?.filter(
				// 		(val, _idx) => entryData?.customLists[val] === true,
				// 	)
				// : [],
			)
		)
			return;
		updateEntry({
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
			customLists: tempParams.customLists?.length > 0 ? tempParams.customLists : undefined,
		});
		sendToast('Updated Entry');
		ref.current.hide();
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
				setTempParams((prev) => ({ ...prev, ['score']: value as number }));
				return;

			case 'customLists':
				setTempParams((prev) => ({
					...prev,
					customLists: (prev.customLists as string[])?.includes(value as string)
						? (prev.customLists as string[])?.filter((val) => val !== (value as string))
						: [...prev.customLists, value as string],
				}));
				return;
			default:
				setTempParams((prev) => ({ ...prev, [key]: value }));
				return;
		}
	};

	const EntryNumInput = ({ title, style, value, inputType, onChange }: EntryNumInputProps) => {
		const [showNumPick, setShowNumPick] = useState(false);
		const [containerHeight, setContainerHeight] = useState(0);
		const totalProgress = media?.episodes ?? media?.chapters ?? media?.volumes ?? 0;

		if (media?.status === MediaStatus.NotYetReleased) return null;
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
						mode={!totalProgress && title === 'Progress' ? 'unknown_chapters' : null}
					/>
				</Portal>
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
		<BottomSheetParent
			backgroundInteractionEnabled
			CustomHeaderComponent={
				<View style={{ width: '100%' }}>
					<View
						style={{
							padding: 8,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Button onPress={onReset}>Reset</Button>
						<Button mode="contained" onPress={submitNewEntry}>
							Confirm
						</Button>
					</View>
					<Divider />
				</View>
			}
		>
			<ScrollView nestedScrollEnabled>
				<View>
					<View
						style={{
							justifyContent: 'space-evenly',
							paddingVertical: 10,
							marginHorizontal: 20,
						}}
					>
						<StatusDropDown
							value={tempParams.status}
							isUnreleased={media?.status === MediaStatus.NotYetReleased}
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
							onPress={() => updateParams('private', !tempParams.private as boolean)}
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
					{media?.status !== MediaStatus.NotYetReleased && (
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
									value={tempParams.progress ?? 0}
									onChange={(val) => {
										if (tempParams.status === MediaListStatus.Planning) {
											if (
												(media?.episodes ??
													media?.chapters ??
													media?.volumes) === val
											) {
												updateParams('status', MediaListStatus.Completed);
											} else if (val > 0) {
												updateParams('status', MediaListStatus.Current);
											} else if (val === 0) {
												updateParams('status', MediaListStatus.Planning);
											}
										}
										updateParams('progress', val);
									}}
									onCancel={() => updateParams('progress', entryData?.progress)}
									maxValue={
										(media?.nextAiringEpisode?.episode
											? media?.nextAiringEpisode?.episode - 1
											: null) ??
										media?.episodes ??
										media?.chapters ??
										media?.volumes ??
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
										backgroundColor: colors.outline,
									}}
								/>
								<ScoreInput
									value={tempParams.score ?? 0}
									onChange={(val) => updateParams('score', val)}
									scoreFormat={scoreFormat}
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
									onChange={(val) => updateParams('repeat', val)}
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
									onChange={(_val) => null}
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
									onChange={(_val) => null}
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
										updateParams(
											'startedAt',
											media.startDate.year && !tempParams.startedAt?.year
												? media.startDate
												: undefined,
										)
									}
								>
									{media.startDate.year && !tempParams.startedAt?.year
										? 'Use release date'
										: 'Clear'}
								</Button>
								<Button
									style={{ width: '50%' }}
									onPress={() =>
										updateParams(
											'completedAt',
											media.endDate.year && !tempParams.completedAt?.year
												? media.endDate
												: undefined,
										)
									}
								>
									{media.endDate.year && !tempParams.completedAt?.year
										? 'Use completed date'
										: 'Clear'}
								</Button>
							</View>
						</>
					)}
					{allCustomLists?.length > 0 && (
						<List.Section title="Custom Lists">
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{allCustomLists?.map((list, idx) => (
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
						<TextInput
							multiline
							value={tempParams.notes}
							clearButtonMode="while-editing"
							onChangeText={(text) => updateParams('notes', text)}
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
			</ScrollView>
		</BottomSheetParent>
	);
};

export type MangaDexSearchProps = {
	aniId: number;
	search: string;
};
export const MangaDexSearchSheet = ({
	payload: { aniId, search },
}: SheetProps<'MangaDexSearchSheet'>) => {
	const ref = useSheetRef();
	const { addMangaDexID } = useMatchStore(
		useShallow((state) => ({ addMangaDexID: state.addMangaDexID })),
	);
	const queryClient = useQueryClient();
	const { data, isFetching } = useGetSearchManga(
		{
			title: search,
			limit: 10,
			'includes[]': ['cover_art'],
			order: { relevance: 'desc' },
		},
		{ enabled: !!search },
	);

	const { columns, itemWidth } = useColumns('search');

	const onSelection = async (mangaId: string) => {
		const result = await queryClient.fetchQuery({
			...getGetChapterQueryOptions({
				manga: mangaId,
				'translatedLanguage[]': ['en'],
				limit: 1,
				order: { chapter: 'asc' },
			}),
		});
		addMangaDexID(aniId, mangaId, result?.data?.data[0]?.id);
		ref.current?.hide();
	};

	const MediaRenderItem = ({ item }: { item: Manga }) => {
		const englishTitle = item?.attributes?.title?.en;
		const nativeTitle =
			item?.attributes?.altTitles?.find(
				(title) => title?.[item?.attributes?.originalLanguage],
			)?.[item?.attributes?.originalLanguage] ?? englishTitle;
		// `${item?.attributes?.originalLanguage}-ro`
		const romajiTitle =
			item?.attributes?.altTitles?.find(
				(title) => title?.[`${item?.attributes?.originalLanguage}-ro`],
			)?.[`${item?.attributes?.originalLanguage}-ro`] ?? englishTitle;

		const coverFilename = item?.relationships?.find((relation) => relation.type === 'cover_art')
			?.attributes?.fileName;

		return (
			<View style={{ width: itemWidth }}>
				<View
					style={{
						// flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
						marginHorizontal: 5,
					}}
				>
					<MediaCard
						id={item.id as any}
						type={MediaType.Manga}
						isFavourite={false}
						title={{
							english: englishTitle,
							romaji: romajiTitle,
							native: nativeTitle,
						}}
						coverImage={{
							// extraLarge: `https://uploads.mangadex.org/covers/${item?.id}/${coverFilename}`,
							extraLarge: coverFilename
								? `https://uploads.mangadex.org/covers/${item?.id}/${coverFilename}`
								: 'https://mangadex.org/covers/f1aa643f-6921-4eeb-b1c9-a1619e7f07c0/a34a2ff4-309c-4de6-ad42-ef08583ad3e5.jpg',
						}}
						fitToParent
						isMangaDex
						navigate={() => onSelection(item.id)}
					/>
				</View>
			</View>
		);
	};

	return (
		<BottomSheetParent>
			{isFetching ? (
				<View
					style={{
						height: 100,
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					key={columns}
					data={data?.data?.data}
					keyExtractor={(_item, idx) => idx.toString()}
					numColumns={columns}
					centerContent
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								MangaDex Search
							</Text>
							<Divider />
						</View>
					)}
					renderItem={(props) => <MediaRenderItem {...props} />}
				/>
			)}
		</BottomSheetParent>
	);
};
