import {
	AiringSchedule,
	AniMediaQuery,
	AnimeMetaFragment,
	Character,
	CharacterMetaDataFragment,
	CharacterSort,
	FuzzyDate,
	MangaMetaFragment,
	Media,
	MediaCoverImage,
	MediaFormat,
	MediaList,
	MediaListEntryFragment,
	MediaListStatus,
	MediaSearchQuery,
	MediaSeason,
	MediaSort,
	MediaStatus,
	MediaTag,
	MediaTitle,
	MediaType,
	ReviewsQuery,
	Staff,
	StaffMetaDataFragment,
	ThreadsOverviewQuery,
	useDeleteMediaListItemMutation,
	useInfiniteCharacterSearchQuery,
	useInfiniteMediaSearchQuery,
	UserFragment,
	useSaveMediaListItemMutation,
	useToggleFollowMutation,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import {
	BottomSheetBackdrop,
	BottomSheetFlatList,
	BottomSheetModal,
	BottomSheetModalProps,
	BottomSheetScrollView,
	BottomSheetView,
	useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Share, View } from 'react-native';
import {
	Avatar,
	Button,
	Chip,
	Dialog,
	Divider,
	Icon,
	List,
	Portal,
	RadioButton,
	Text,
} from 'react-native-paper';
import { MarkdownViewer } from './markdown';
import { convertDate, copyToClipboard, getMovieDuration, getTimeUntil } from '@/utils';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { media_format_alt } from '@/constants/anilist';
import { ScoreView } from './media/sections/scores';
import AniListMarkdownViewer from './markdown/renderer';
import { ScrollView } from 'react-native-gesture-handler';
import { useListFilterStore } from '@/store/listStore';
import {
	useDeleteMediaListItemInvalidatedMutation,
	useSaveMediaListItemInvalidatedMutation,
} from '@/api/anilist/extended';
import { useCharacterSearch } from '@/hooks/search/useSearch';
import { CharacterCard, MediaCard, MediaProgressBar } from './cards';
import { GorakuActivityIndicator } from './loading';
import { MediaRenderItem } from './search/lists';
import { AniTrendzChartTypes } from '@/api/anitrendz/types';

const BottomSheetModalParent = React.forwardRef<
	BottomSheetModalMethods,
	{ children: ReactNode } & BottomSheetModalProps
>(({ children, ...props }, ref) => {
	const { colors } = useAppTheme();
	return (
		<BottomSheetModal
			ref={ref}
			backgroundStyle={[{ backgroundColor: colors.surface }]}
			handleIndicatorStyle={{ backgroundColor: colors.onSurfaceVariant }}
			enableDismissOnClose
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					pressBehavior={'close'}
					disappearsOnIndex={-1}
					opacity={0.4}
				/>
			)}
			{...props}
		>
			{children}
		</BottomSheetModal>
	);
});

export type QuickActionProps = AnimeMetaFragment & MangaMetaFragment;
export const QuickActionBottomSheet = React.forwardRef<BottomSheetModalMethods, QuickActionProps>(
	(
		{
			id,
			type,
			format,
			title,
			coverImage,
			status,
			episodes,
			chapters,
			volumes,
			description,
			descriptionHTML,
			averageScore,
			meanScore,
			genres,
			mediaListEntry,
			startDate,
			endDate,
			duration,
			nextAiringEpisode,
			season,
			siteUrl,
			isFavourite,
		},
		ref,
	) => {
		const { colors } = useAppTheme();
		const { dismiss } = useBottomSheetModal();
		const userId = useAuthStore((state) => state.anilist.userID);
		const mediaLanguage = useSettingsStore((state) => state.mediaLanguage);
		const { animeTabOrder, mangaTabOrder } = useListFilterStore((state) => ({
			animeTabOrder: state.animeTabOrder,
			mangaTabOrder: state.mangaTabOrder,
		}));
		const { mutateAsync: addEntry } = useSaveMediaListItemInvalidatedMutation({
			meta: { mediaId: id },
		});
		const { mutateAsync: removeEntry } = useDeleteMediaListItemInvalidatedMutation({
			meta: { mediaId: id },
		});
		const [actionsHeight, setActionsHeight] = useState(0);
		const [titleIdx, setTitleIdx] = useState(0);
		const [mediaListEntryState, setMediaListEntryState] = useState(mediaListEntry);
		const [showStatusOptions, setShowStatusOptions] = useState(false);
		const [tempStatus, setTempStatus] = useState(
			mediaListEntry?.status ?? MediaListStatus.Planning,
		);

		const titlesArray: string[] = !!title
			? [
					...new Set([
						title[mediaLanguage],
						title?.english,
						title?.romaji,
						title?.native,
					]),
				].filter((title) => title !== null)
			: [];

		const viewAnime = () => {
			dismiss();
			router.navigate(`/media/${type.toLowerCase()}/${id}`);
		};

		const shareLink = async () => {
			await Share.share({ url: siteUrl, message: siteUrl });
			dismiss();
		};

		const onAdd = async (status: MediaListStatus = MediaListStatus.Planning) => {
			const res = await addEntry({ mediaId: id, status: status });
			setMediaListEntryState({ ...res.SaveMediaListEntry, mediaId: id });
		};

		const onRemove = async () => {
			const res = await removeEntry({ id: mediaListEntryState.id });
			res.DeleteMediaListEntry?.deleted && setMediaListEntryState(null);
		};

		const snapPoints = useMemo(() => ['60%', '80%'], [actionsHeight]);

		useEffect(() => {
			// listen for when media changes
			setMediaListEntryState(mediaListEntry);
		}, [id, mediaListEntry]);

		return (
			<>
				<BottomSheetModalParent
					ref={ref}
					enableDynamicSizing
					maxDynamicContentSize={actionsHeight + 26}
					snapPoints={snapPoints}
				>
					<BottomSheetView
						style={{ paddingVertical: 12 }}
						onLayout={(e) => setActionsHeight(e.nativeEvent.layout.height)}
					>
						{!!userId && (
							<List.Item
								title={mediaListEntryState ? 'Edit Status' : 'Add to Planning'}
								description={
									mediaListEntryState
										? `In ${mediaListEntryState?.status}`
										: 'Hold down to change status'
								}
								left={(props) => (
									<List.Icon
										{...props}
										icon={
											mediaListEntryState ? 'playlist-edit' : 'playlist-plus'
										}
									/>
								)}
								onLongPress={() => setShowStatusOptions(true)}
								onPress={() =>
									mediaListEntryState ? setShowStatusOptions(true) : onAdd()
								}
							/>
						)}
						{!!userId && mediaListEntryState && (
							<List.Item
								title={'Remove from list'}
								left={(props) => <List.Icon {...props} icon={'playlist-remove'} />}
								onPress={onRemove}
							/>
						)}
						{!!userId && (
							<List.Item
								title={isFavourite ? 'Unfavorite' : 'Favorite'}
								left={(props) => (
									<List.Icon
										{...props}
										icon={
											!isFavourite ? 'heart-outline' : 'heart-remove-outline'
										}
									/>
								)}
							/>
						)}
						<List.Item
							title={`View ${type}`}
							titleStyle={{ textTransform: 'capitalize' }}
							onPress={viewAnime}
							left={(props) => (
								<List.Icon
									{...props}
									icon={
										type === MediaType.Anime
											? 'television'
											: 'book-open-page-variant-outline'
									}
								/>
							)}
						/>
						<List.Item
							title={'Share'}
							left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
							onPress={shareLink}
						/>
					</BottomSheetView>
					<Divider />
					<BottomSheetScrollView>
						<BottomSheetView
							style={{
								flexDirection: 'row',
								paddingTop: 12,
								paddingLeft: 12,
								alignItems: 'flex-start',
							}}
						>
							<Image
								source={{
									uri: coverImage?.extraLarge,
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
									numberOfLines={3}
									onPress={() =>
										setTitleIdx((prev) => (prev + 1) % titlesArray.length)
									}
									onLongPress={() => copyToClipboard(titlesArray[titleIdx])}
								>
									{titlesArray[titleIdx]}
								</Text>
								{nextAiringEpisode ? (
									<Text style={{ color: colors.onSurfaceVariant }}>
										<Icon size={undefined} source={'timer-outline'} />
										{` EP ${nextAiringEpisode.episode} - ${getTimeUntil(nextAiringEpisode?.airingAt)}`}
									</Text>
								) : null}
								{type === MediaType.Manga ? (
									<Text style={{ color: colors.onSurfaceVariant }}>
										<Icon size={undefined} source={'timer-outline'} />
										{status === MediaStatus.Releasing ||
										status === MediaStatus.Hiatus
											? ` Publishing since ${startDate?.year}`
											: ` ${startDate.year} - ${endDate.year}`}
									</Text>
								) : null}
								<Text style={{ color: colors.onSurfaceVariant }}>
									<Icon
										size={undefined}
										source={
											type === MediaType.Anime ? 'television' : 'book-outline'
										}
									/>
									{` ${media_format_alt[format]}`}
									{format === MediaFormat.Movie && duration && episodes < 2
										? ` ・ ${getMovieDuration(duration)}`
										: status === MediaStatus.NotYetReleased
											? ` ・ Unreleased`
											: episodes ?? chapters ?? volumes
												? ` ・ ${episodes ?? chapters ?? volumes} ${
														type === MediaType.Anime
															? 'Episodes'
															: format === MediaFormat.Novel
																? 'Volumes'
																: 'Chapters'
													}`
												: ''}
								</Text>
								{averageScore || meanScore ? (
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
										<ScoreView type="average" score={averageScore} />
										<ScoreView type="mean" score={meanScore} />
									</View>
								) : null}
							</View>
						</BottomSheetView>
						<BottomSheetView style={{ paddingTop: 18 }}>
							{/* <TagView genres={genres} /> */}
							<View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 6 }}>
								{genres?.map((genre, idx) => (
									<Chip
										key={idx}
										style={{ marginHorizontal: 8, marginVertical: 4 }}
									>
										{genre}
									</Chip>
								))}
							</View>
							<View style={{ paddingHorizontal: 12 }}>
								<AniListMarkdownViewer body={descriptionHTML} />
							</View>
						</BottomSheetView>
					</BottomSheetScrollView>
				</BottomSheetModalParent>
				<Portal>
					<Dialog
						visible={showStatusOptions}
						onDismiss={() => setShowStatusOptions(false)}
						style={{ maxHeight: '90%' }}
					>
						<Dialog.Title>Select Status</Dialog.Title>
						<Dialog.ScrollArea>
							<ScrollView>
								<RadioButton.Group
									onValueChange={(val) => setTempStatus(val as MediaListStatus)}
									value={tempStatus}
								>
									{[
										MediaListStatus.Planning,
										MediaListStatus.Current,
										MediaListStatus.Completed,
										MediaListStatus.Paused,
										MediaListStatus.Dropped,
										MediaListStatus.Repeating,
									].map((statusType, idx) => (
										<RadioButton.Item
											key={idx}
											label={statusType}
											value={statusType}
											position="leading"
											labelStyle={{
												textAlign: 'left',
												paddingLeft: 8,
												textTransform: 'capitalize',
											}}
										/>
									))}
								</RadioButton.Group>
							</ScrollView>
						</Dialog.ScrollArea>
						<Dialog.Actions>
							<Button onPress={() => setShowStatusOptions(false)}>Cancel</Button>
							<Button
								onPress={() => {
									onAdd(tempStatus);
									setShowStatusOptions(false);
								}}
							>
								Save
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</>
		);
	},
);

type ThreadOverviewBottomSheetProps = {
	data: ThreadsOverviewQuery['Page']['threads'][0];
};
export const ThreadOverviewBottomSheet = React.forwardRef<
	BottomSheetModalMethods,
	ThreadOverviewBottomSheetProps
>(({ data }, ref) => {
	const { dismiss } = useBottomSheetModal();

	const onUserNav = () => {
		router.navigate({
			// @ts-ignore it works tho...
			pathname: `/user/${data?.user?.id}/${data?.user?.name}`,
			params: {
				avatar: data?.user?.avatar?.large,
				banner: data?.user?.bannerImage,
			},
		});
		dismiss();
	};

	return (
		<BottomSheetModalParent ref={ref} enableDynamicSizing>
			<BottomSheetView>
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
			</BottomSheetView>
		</BottomSheetModalParent>
	);
});

type ReviewOverviewBottomSheetProps = {
	data: AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0] | null;
};
export const ReviewOverviewBottomSheet = React.forwardRef<
	BottomSheetModalMethods,
	ReviewOverviewBottomSheetProps
>(({ data }, ref) => {
	const { dismiss } = useBottomSheetModal();

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
		dismiss();
	};

	return (
		<BottomSheetModalParent ref={ref} enableDynamicSizing>
			<BottomSheetView>
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
			</BottomSheetView>
		</BottomSheetModalParent>
	);
});

export type QuickActionCharStaffProps = (StaffMetaDataFragment | CharacterMetaDataFragment) & {
	type: 'character' | 'staff';
};
export const QuickActionCharStaffBottomSheet = React.forwardRef<
	BottomSheetModalMethods,
	QuickActionCharStaffProps
>(
	(
		{
			type,
			id,
			name,
			descriptionHTML,
			description,
			dateOfBirth,
			gender,
			image,
			isFavourite,
			siteUrl,
		},
		ref,
	) => {
		const { colors } = useAppTheme();
		const { dismiss } = useBottomSheetModal();
		const userId = useAuthStore((state) => state.anilist.userID);
		const [actionsHeight, setActionsHeight] = useState(0);
		const [titleIdx, setTitleIdx] = useState(0);

		const titlesArray: string[] = !!name
			? [...new Set([name['full'], name['native']])].filter((title) => title !== null)
			: [];

		const dob = convertDate(dateOfBirth, true);

		const viewCharStaff = () => {
			dismiss();
			router.navigate(`/${type}/${id}`);
		};

		const shareLink = async () => {
			await Share.share({ url: siteUrl, message: siteUrl });
			dismiss();
		};

		const snapPoints = useMemo(() => [actionsHeight + 26, '60%', '80%'], [actionsHeight]);

		return (
			<BottomSheetModalParent
				ref={ref}
				// enableDynamicSizing
				maxDynamicContentSize={actionsHeight + 26}
				snapPoints={snapPoints}
			>
				<BottomSheetView
					style={{ paddingVertical: 12 }}
					onLayout={(e) => setActionsHeight(e.nativeEvent.layout.height)}
				>
					{!!userId && (
						<List.Item
							title={isFavourite ? 'Unfavorite' : 'Favorite'}
							left={(props) => (
								<List.Icon
									{...props}
									icon={!isFavourite ? 'heart-outline' : 'heart-remove-outline'}
								/>
							)}
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
				</BottomSheetView>
				<Divider />
				<BottomSheetScrollView>
					<BottomSheetView
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
					</BottomSheetView>
					<BottomSheetView style={{ paddingTop: 18, paddingHorizontal: 10 }}>
						<AniListMarkdownViewer body={descriptionHTML} />
					</BottomSheetView>
				</BottomSheetScrollView>
			</BottomSheetModalParent>
		);
	},
);

export type QuickActionUserProps = AniMediaQuery['Following']['mediaList'][0]['user'];
export const QuickActionUserBottomSheet = React.forwardRef<
	BottomSheetModalMethods,
	QuickActionUserProps
>(({ id, name, avatar, aboutHTML, isFollowing, isFollower, siteUrl }, ref) => {
	const { dismiss } = useBottomSheetModal();
	const [actionsHeight, setActionsHeight] = useState(25);
	const [isFollowingState, setIsFollowingState] = useState(isFollowing);
	const { mutateAsync } = useToggleFollowMutation();

	const onToggleFollow = async () => {
		const res = await mutateAsync({ userId: id });
		setIsFollowingState(res.ToggleFollow?.isFollowing);
	};

	const viewUser = () => {
		dismiss();
		router.navigate(`/user/${id}`);
	};

	const shareLink = async () => {
		await Share.share({ url: siteUrl, message: siteUrl });
		dismiss();
	};

	const snapPoints = useMemo(() => [actionsHeight + 26, '60%', '80%'], [actionsHeight]);

	return (
		<BottomSheetModalParent
			ref={ref}
			// enableDynamicSizing
			maxDynamicContentSize={actionsHeight + 26}
			snapPoints={snapPoints}
		>
			<BottomSheetView
				style={{ paddingVertical: 12 }}
				onLayout={(e) => setActionsHeight(e.nativeEvent.layout.height)}
			>
				<List.Item
					title={isFollowingState ? 'Unfollow' : 'Follow'}
					onPress={onToggleFollow}
					left={(props) => (
						<List.Icon
							{...props}
							icon={
								isFollowingState ? 'account-minus-outline' : 'account-plus-outline'
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
			</BottomSheetView>
			<Divider />
			<BottomSheetScrollView>
				<BottomSheetView
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
				</BottomSheetView>
				<BottomSheetView style={{ paddingTop: 18, paddingHorizontal: 10 }}>
					<AniListMarkdownViewer body={aboutHTML} />
				</BottomSheetView>
			</BottomSheetScrollView>
		</BottomSheetModalParent>
	);
});

export type QuickActionAniTrendzProps = {
	link: string;
	names: string[];
	anime?: string;
	onCharacterSearch?: (name: string) => void;
	onAnimeSearch?: (anime: string) => void;
};
export const QuickActionAniTrendzBottomSheet = React.forwardRef<
	BottomSheetModalMethods,
	QuickActionAniTrendzProps
>(({ names, anime, link, onAnimeSearch, onCharacterSearch }, ref) => {
	const { dismiss } = useBottomSheetModal();

	const searchCharacter = (name: string) => {
		dismiss();
		onCharacterSearch(name);
	};

	const searchAnime = () => {
		dismiss();
		onAnimeSearch(anime);
	};

	const shareLink = async () => {
		await Share.share({ url: link, message: link });
		dismiss();
	};

	return (
		<BottomSheetModalParent ref={ref} enableDynamicSizing>
			<BottomSheetView style={{ paddingVertical: 12 }}>
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
			</BottomSheetView>
		</BottomSheetModalParent>
	);
});

export type CharacterSearchProps = {
	name: string;
};
export const CharacterSearchBottomSheet = React.forwardRef<
	BottomSheetModalMethods,
	CharacterSearchProps
>(({ name }, ref) => {
	const { dismiss } = useBottomSheetModal();
	const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteCharacterSearchQuery(
		{ name: name },
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page.pageInfo.hasNextPage) {
					return {
						page: lastPage.Page.pageInfo.currentPage + 1,
					};
				}
			},
			enabled: !!name,
		},
	);

	const snapPoints = useMemo(() => ['60%', '80%'], []);

	const flatData = data?.pages?.flatMap((chars) => chars.Page?.characters);

	const onNav = (id: number) => {
		dismiss();
		router.push(`/character/${id}`);
	};

	return (
		<BottomSheetModalParent ref={ref} snapPoints={snapPoints}>
			{isFetching ? (
				<BottomSheetView
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<GorakuActivityIndicator />
				</BottomSheetView>
			) : (
				<BottomSheetFlatList
					data={flatData}
					keyExtractor={(item, idx) => idx.toString()}
					numColumns={3}
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10 }}>
							<Text variant="headlineMedium">Character Search</Text>
							<Divider />
						</View>
					)}
					contentContainerStyle={{ padding: 10 }}
					centerContent
					renderItem={({ item }) => (
						// <CharacterCard
						// 	name={item.name.full}
						// 	imgUrl={item.image?.large}
						// 	nativeName={item.name.native}
						// 	onPress={() => onNav(item.id)}
						// 	isFavourite={item.isFavourite}
						// />
						<View
							style={{
								alignItems: 'center',
								marginVertical: 15,
								marginHorizontal: 4,
							}}
						>
							<CharacterCard
								name={item.name.full}
								imgUrl={item.image?.large}
								nativeName={item.name.native}
								onPress={() => onNav(item.id)}
								isFavourite={item.isFavourite}
							/>
						</View>
					)}
					onEndReached={() => hasNextPage && fetchNextPage()}
				/>
			)}
		</BottomSheetModalParent>
	);
});

export type MediaSearchProps = {
	type: MediaType;
	search: string;
};
export const MediaSearchBottomSheet = React.forwardRef<BottomSheetModalMethods, MediaSearchProps>(
	({ search, type }, ref) => {
		const { dismiss } = useBottomSheetModal();
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

		const snapPoints = useMemo(() => ['60%', '80%'], []);

		const flatData = data?.pages?.flatMap((chars) => chars?.Page?.media) ?? [];

		const onNav = (type: MediaType, id: number) => {
			dismiss();
			router.push(`/(media)/${type}/${id}`);
		};

		const MediaRenderItem = ({ item }: { item: MediaSearchQuery['Page']['media'][0] }) => {
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
					}}
				>
					<MediaCard
						coverImg={item.coverImage.extraLarge}
						titles={item.title}
						navigate={() => {
							onNav(item.type, item.id);
						}}
						imgBgColor={item.coverImage.color}
						scoreDistributions={item.stats?.scoreDistribution}
						bannerText={item.nextAiringEpisode?.airingAt}
						showBanner={item.nextAiringEpisode ? true : false}
						averageScore={item.averageScore}
						meanScore={item.meanScore}
						mediaListEntry={item.mediaListEntry}
						// containerStyle={{ flex: 1 }}
						// fitToParent
					/>
				</View>
			);
		};

		return (
			<BottomSheetModalParent ref={ref} snapPoints={snapPoints}>
				{isFetching ? (
					<BottomSheetView
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
						<GorakuActivityIndicator />
					</BottomSheetView>
				) : (
					<BottomSheetFlatList
						data={flatData}
						keyExtractor={(item, idx) => idx.toString()}
						numColumns={2}
						centerContent
						ListHeaderComponent={() => (
							<View style={{ marginBottom: 10 }}>
								<Text
									variant="headlineMedium"
									style={{ textTransform: 'capitalize' }}
								>
									{type} Search
								</Text>
								<Divider />
							</View>
						)}
						contentContainerStyle={{ padding: 10 }}
						renderItem={(props) => <MediaRenderItem {...props} />}
						onEndReached={() => hasNextPage && fetchNextPage()}
					/>
				)}
			</BottomSheetModalParent>
		);
	},
);
