import { Image } from 'expo-image';
import { Pressable, View, useWindowDimensions, Image as RNImage, ViewStyle } from 'react-native';
import { Avatar, ProgressBar, Surface, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getScoreColor, getTimeUntil, ListColors } from '@/utils';
import { useNsfwBlur } from '@/hooks/useNSFWBlur';
import { NSFWLabel } from './labels';
import { ScoreVisual } from './explore/itemScore';
import { AiringBanner } from './explore/episodeBanner';
import useImageRotation from '@/hooks/useImageRotation';
import {
	MainMetaFragment,
	CharacterMetaDataFragment,
	MediaList,
	MediaListStatus,
	MediaStatus,
	MediaType,
	ScoreFormat,
	SearchAllQuery,
	StaffMetaDataFragment,
	StudioSearchQuery,
	UserSearchMetaFragment,
} from '@/api/anilist/__genereated__/gql';
import { ScoreVisualType } from '@/store/settings/types';
import { useAppTheme } from '@/store/theme/themes';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { DanPost } from '@/api/danbooru/types';
import { AnimViewMem } from './animations';
import { useRef, useState } from 'react';
import { MEDIA_FORMAT_ALT, MEDIA_STATUS_ALT } from '@/constants/anilist';
import { ListStatusMode, useCardVisualStore } from '@/store/cardVisualStore';
import { router } from 'expo-router';
import { SheetManager } from 'react-native-actions-sheet';
import { useAuthStore } from '@/store/authStore';
import { useShallow } from 'zustand/react/shallow';

const BORDER_RADIUS = 8;

type MediaCardProps = MainMetaFragment & {
	navigate?: () => void;
	scoreVisualType?: ScoreVisualType;
	titleLang?: 'english' | 'romaji' | 'native';
	height?: number;
	width?: number;
	fitToParent?: boolean;
	tempListStatusMode?: ListStatusMode;
	containerStyle?: ViewStyle;
	scoreFormat?: ScoreFormat;
	activityId?: number;
	followingUsername?: string;
	allowEntryEdit?: boolean;
	onLongPress?: () => void;
	isMangaDex?: boolean;
};
export const MediaCard = ({
	navigate = () => null,
	onLongPress = () => null,
	allowEntryEdit = true,
	...props
}: MediaCardProps) => {
	const card_height = props.height ?? 200;
	const { colors } = useAppTheme();
	const { scoreColors, mediaLanguage } = useSettingsStore(
		useShallow((state) => ({
			mediaLanguage: state.mediaLanguage,
			scoreColors: state.scoreColors,
		})),
	);
	const { defaultScore, listStatusMode } = useCardVisualStore(
		useShallow((state) => ({
			defaultScore: state.defaultScore,
			listStatusMode: state.listStatusMode,
			setCardVisual: state.setCardVisual,
		})),
	);
	const [width, setWidth] = useState(props.width ?? 1);

	const onNav = () => {
		router.navigate(`/${props.type === MediaType.Anime ? 'anime' : 'manga'}/${props.id}`);
		SheetManager.hideAll();
		SheetManager.hide('QuickActionAniTrendzSheet');
	};

	return (
		<AnimViewMem>
			<Surface
				onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
				style={[
					{
						marginHorizontal: 10,
						marginVertical: 10,
						overflow: 'hidden',
						height: !props.width && !props.fitToParent ? card_height : undefined,
						width: props.fitToParent ? '100%' : (props.width ?? undefined),
						aspectRatio: 2 / 3,
						borderRadius: BORDER_RADIUS,
						// backgroundColor: 'transparent',
					},
					props.containerStyle,
				]}
			>
				<Pressable
					onPress={() => {
						if (props.isMangaDex) {
							navigate();
						} else {
							navigate() ?? onNav();
						}
					}}
					onLongPress={() => {
						onLongPress() ??
							(!props.isMangaDex &&
								SheetManager.show('QuickActionSheet', {
									payload: {
										...props,
										scoreFormat: props.scoreFormat,
										activityId: props.activityId,
										followingUsername: props.followingUsername,
										allowEntryEdit: allowEntryEdit,
									},
								}));
					}}
					android_ripple={{ foreground: true, borderless: false, color: colors.primary }}
					style={{ height: '100%', width: '100%' }}
				>
					{/* expo-image causes tab swipe performance drop! 😢
				Alt solution is use lower res image or switch to stock image comp
			*/}
					{/* <Image
				contentFit="cover"
				recyclingKey={props.coverImg}
				cachePolicy="memory-disk"
				transition={1000}
				source={{ uri: props.coverImg }}
				placeholder={{ blurhash: colors.blurhash }}
				placeholderContentFit="cover"
				style={{
					height: '100%',
					width: '100%',
					position: 'absolute',
					borderRadius: BORDER_RADIUS,
					backgroundColor: props.imgBgColor ?? undefined,
				}}
			/> */}
					<RNImage
						source={{ uri: props.coverImage?.extraLarge }}
						resizeMode="cover"
						style={{
							height: '100%',
							width: '100%',
							position: 'absolute',
							backgroundColor: props.coverImage?.color ?? undefined,
							// borderBottomRightRadius: props.nextAiringEpisode
							// 	? BORDER_RADIUS + 4
							// 	: undefined,
							// borderBottomLeftRadius: props.nextAiringEpisode
							// 	? BORDER_RADIUS + 4
							// 	: undefined,
						}}
					/>
					<LinearGradient
						style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							justifyContent: 'flex-end',
							// weird visual bug where this is slightly visible on the edges. this is an attempt on hiding it
							// borderBottomRightRadius: props.nextAiringEpisode
							// 	? BORDER_RADIUS + 4
							// 	: undefined,
							// borderBottomLeftRadius: props.nextAiringEpisode
							// 	? BORDER_RADIUS + 4
							// 	: undefined,
						}}
						colors={[
							'rgba(0,0,0,0)',
							'rgba(0,0,0,.4)',
							props.isFavourite ? 'rgba(79, 0, 0, 1)' : 'black',
						]}
					></LinearGradient>
					<View style={{ flex: 1, justifyContent: 'flex-end' }}>
						{!props.isMangaDex && (props.meanScore || props.averageScore) && (
							<ScoreVisual
								score={
									defaultScore === 'average' && props.averageScore
										? props.averageScore
										: props.meanScore
								}
								scoreColors={scoreColors}
								scoreVisualType={props.scoreVisualType}
								scoreDistributions={props.stats?.scoreDistribution}
								height={card_height}
								borderRadius={BORDER_RADIUS}
							/>
						)}
						<Text
							variant="labelMedium"
							style={{
								alignSelf: 'center',
								paddingHorizontal: 4,
								paddingVertical: 10,
								color: 'white',
								alignItems: 'center',
							}}
							numberOfLines={props.isMangaDex ? 3 : 2}
						>
							{(props.tempListStatusMode ?? listStatusMode) === 'dot' &&
								props.mediaListEntry?.status && (
									<View
										style={{
											height: 10,
											width: 10,
											borderRadius: 100,
											backgroundColor:
												ListColors[props.mediaListEntry?.status],
										}}
									/>
								)}
							{(props.tempListStatusMode ?? listStatusMode) === 'dot' &&
							props.mediaListEntry?.status
								? ' '
								: ''}
							{(props.titleLang && props.title[props.titleLang]) ??
								(mediaLanguage && props?.title[mediaLanguage]) ??
								props?.title.romaji}
						</Text>
						{props.nextAiringEpisode?.airingAt ? (
							<AiringBanner
								containerColor={colors.primaryContainer}
								textColor={colors.onPrimaryContainer}
								airingAt={props.nextAiringEpisode?.airingAt}
								episode={props.nextAiringEpisode?.episode}
							/>
						) : null}
					</View>
				</Pressable>
			</Surface>
			{props.mediaListEntry && (props.tempListStatusMode ?? listStatusMode) === 'bar' && (
				<MediaProgressBar
					containerStyle={{ width: width }}
					progress={props.mediaListEntry?.progress}
					mediaListEntry={props.mediaListEntry as MediaList}
					total={props.episodes ?? props.chapters ?? props.volumes}
					barStyle={{ width: '90%' }}
				/>
			)}
		</AnimViewMem>
	);
};

export const MediaCardRow = ({
	navigate = () => null,
	onLongPress = () => null,
	...props
}: MediaCardProps) => {
	const card_height = props.height ?? 80;
	const { mediaLanguage } = useSettingsStore();
	const { colors } = useAppTheme();

	const onNav = () => {
		SheetManager.hideAll();
		SheetManager.hide('QuickActionAniTrendzSheet');
		router.push(`/${props.type === MediaType.Anime ? 'anime' : 'manga'}/${props.id}`);
	};
	return (
		<AnimViewMem>
			<Pressable
				onPress={() => {
					navigate() ?? onNav();
				}}
				onLongPress={() => {
					onLongPress() ?? SheetManager.show('QuickActionSheet', { payload: props });
				}}
				style={{
					overflow: 'hidden',
					height: card_height,
					marginVertical: 6,
					width: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: 10,
				}}
			>
				<View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
					<Image
						contentFit="cover"
						transition={800}
						source={{ uri: props.coverImage?.extraLarge }}
						style={{
							width: card_height - 12,
							aspectRatio: 1,
							borderRadius: 8,
							backgroundColor: props.coverImage?.color ?? undefined,
						}}
					/>
					<View
						style={{
							height: card_height - 16,
							borderRadius: 24,
							width: 1.5,
							backgroundColor: colors.elevation.level3,
							marginLeft: 4,
							overflow: 'hidden',
						}}
					>
						{props.averageScore && (
							<View
								style={{
									position: 'absolute',
									height: `${props.averageScore}%`,
									bottom: 0,
									width: 1.5,
									backgroundColor: getScoreColor(props.averageScore),
								}}
							/>
						)}
					</View>
				</View>
				{/* {(props.meanScore || props.averageScore) && (
				<ScoreVisual
					score={
						defaultScore === 'average' && props.averageScore
							? props.averageScore
							: props.meanScore
					}
					scoreColors={scoreColors}
					scoreVisualType={props.scoreVisualType}
					scoreDistributions={props.scoreDistributions}
					height={card_height}
					width={props.scoreWidth}
					horizontal
				/>
			)} */}
				<View
					style={{
						flex: 1,
						height: '100%',
						justifyContent: 'space-between',
						padding: 5,
						paddingHorizontal: 10,
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<Text
							variant="titleSmall"
							style={{
								textAlign: 'left',
							}}
							numberOfLines={2}
						>
							{props.mediaListEntry?.status && (
								<View
									style={{
										height: 10,
										width: 10,
										borderRadius: 100,
										backgroundColor: ListColors[props.mediaListEntry?.status],
									}}
								/>
							)}
							{props.mediaListEntry?.status ? ' ' : ''}
							{props.title[props.titleLang] ??
								props.title[mediaLanguage] ??
								props.title.romaji}
						</Text>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
							{props.averageScore ? `${props.averageScore}%` : '--%'}
						</Text>
						<Text> ・ </Text>
						<Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
							{MEDIA_FORMAT_ALT[props.format]}
						</Text>
						<Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
							{' ・ '}
							{props?.nextAiringEpisode?.airingAt
								? `EP ${props.nextAiringEpisode.episode.toLocaleString()}: ${getTimeUntil(Number(props.nextAiringEpisode.airingAt))}`
								: `${MEDIA_STATUS_ALT[props.status]}`}
						</Text>
					</View>
					{/* <ProgressBar progress={0.5} style={{ marginHorizontal: 8, borderRadius: 12 }} /> */}
				</View>
			</Pressable>
		</AnimViewMem>
	);
};

type MediaProgressBarProps = {
	mediaListEntry?: MediaList;
	progress: number;
	mediaStatus?: MediaStatus;
	total?: number;
	containerStyle?: ViewStyle;
	barStyle?: ViewStyle;
};
export const MediaProgressBar = ({
	mediaListEntry,
	total,
	progress,
	containerStyle,
	barStyle,
}: MediaProgressBarProps) => {
	const { colors } = useAppTheme();

	return (
		<View
			style={[
				{
					alignSelf: 'center',
					paddingTop: 2,
					width: '95%',
				},
				containerStyle,
			]}
		>
			<ProgressBar
				progress={
					total && progress
						? progress / total
						: progress === 0 && mediaListEntry?.status !== MediaListStatus.Planning
							? 0
							: 1
				}
				style={[
					{
						alignSelf: 'center',
						height: 8,
						borderRadius: 4,
						display: mediaListEntry ? undefined : 'none',
					},
					barStyle,
				]}
				indeterminate={mediaListEntry?.status === MediaListStatus.Current && !total}
				color={mediaListEntry?.status ? ListColors[mediaListEntry?.status] : undefined}
			/>
			<Text
				style={{
					textAlign: 'center',
					color: colors.onSurfaceVariant,
					textTransform: 'capitalize',
				}}
				variant="labelSmall"
			>
				{mediaListEntry?.status}
				{mediaListEntry?.progress > 0
					? `${' · '}` +
						mediaListEntry?.progress +
						(![MediaListStatus.Repeating, MediaListStatus.Planning].includes(
							mediaListEntry?.status,
						) && total
							? '/' + `${total}`
							: '')
					: null}
			</Text>
		</View>
	);
};

type UserCardProps = UserSearchMetaFragment & {
	status?: string;
	progress?: string;
	size?: number;
	onPress?: () => void;
	onLongPress?: () => void;
};
export const UserCard = ({
	onPress = () => null,
	onLongPress = () => null,
	...props
}: UserCardProps) => {
	const { colors } = useAppTheme();
	const viewerName = useAuthStore(useShallow((state) => state.anilist.username));

	const onNav = () => {
		SheetManager.hideAll();
		viewerName !== props.name && router.navigate(`/user/${props.name}`); // dont nav if user is viewer
	};

	return (
		<AnimViewMem>
			<Pressable
				android_ripple={{ color: colors.primary, foreground: true }}
				onPress={() => onPress() ?? onNav()}
				onLongPress={() => {
					onLongPress() ??
						(viewerName !== props.name &&
							SheetManager.show('QuickActionUserSheet', { payload: props }));
				}}
				style={{
					// marginHorizontal: 10,
					overflow: 'hidden',
					borderRadius: BORDER_RADIUS,
					backgroundColor: 'transparent',
					alignItems: 'center',
					padding: 5,
				}}
			>
				<Avatar.Image source={{ uri: props.avatar?.large }} />
				<Text
					variant="titleSmall"
					style={{
						alignSelf: 'center',
						textAlign: 'center',
						padding: 5,
					}}
					numberOfLines={2}
				>
					{props.name}
				</Text>
				{props.isFollower || props.isFollowing ? (
					<Text
						variant="labelMedium"
						style={{
							textTransform: 'capitalize',
							textAlign: 'center',
							color: colors.onSurfaceVariant,
						}}
					>
						{props.isFollowing ? 'Following' : props.isFollower ? 'Follower' : null}
					</Text>
				) : null}
				{props.status ? (
					<Text
						variant="labelMedium"
						style={{
							textTransform: 'capitalize',
							textAlign: 'center',
							color: colors.onSurfaceVariant,
						}}
					>
						{props.status}
						{props.progress ? ` ${props.progress}` : ''}
					</Text>
				) : null}
			</Pressable>
		</AnimViewMem>
	);
};

type CharacterCardProps = (CharacterMetaDataFragment | StaffMetaDataFragment) & {
	role?: string;
	isStaff?: boolean;
	onPress?: () => void;
	onLongSelect?: () => void;
};
export const CharacterCard = ({
	onPress = () => null,
	onLongSelect = () => null,
	...props
}: CharacterCardProps) => {
	const { colors } = useAppTheme();
	const { mediaLanguage } = useSettingsStore();
	const onNav = () => {
		SheetManager.hideAll();
		SheetManager.hide('QuickActionAniTrendzSheet');
		router.navigate(props.isStaff ? `/staff/${props.id}` : `/character/${props.id}`);
	};

	return (
		<AnimViewMem>
			<Pressable
				onPress={() => onPress() ?? onNav()}
				onLongPress={() => {
					onLongSelect() ??
						SheetManager.show('QuickActionCharStaffSheet', {
							payload: { ...props, type: props.isStaff ? 'staff' : 'character' },
						});
				}}
				android_ripple={{ color: colors.primary, foreground: true }}
				style={{
					alignItems: 'center',
					overflow: 'hidden',
					borderRadius: 12,
					padding: 4,
				}}
			>
				<Avatar.Image source={{ uri: props.image?.large }} />
				<View>
					<Text
						numberOfLines={2}
						style={{
							textAlign: 'center',
							color: props.isFavourite ? colors.primary : colors.onBackground,
							paddingHorizontal: 4,
						}}
					>
						{mediaLanguage === 'native' ? props.name?.native : props.name?.full}
					</Text>
					{props.role ? (
						<Text
							numberOfLines={2}
							variant="labelMedium"
							style={{
								textTransform: 'capitalize',
								// width: 110 + 10,
								textAlign: 'center',
								color: colors.onSurfaceVariant,
								paddingBottom: 10,
							}}
						>
							{props.role}
						</Text>
					) : null}
				</View>
			</Pressable>
		</AnimViewMem>
	);
};

export const StaffCard = CharacterCard;

type StudioCardProps = StudioSearchQuery['Page']['studios'][0] & {
	onPress: () => void;
	onLongPress: () => void;
};
export const StudioCard = ({
	onPress = () => null,
	onLongPress = () => null,
	...props
}: StudioCardProps) => {
	const { colors } = useAppTheme();
	const img_src = useImageRotation(
		props.media
			? [
					...(props as SearchAllQuery['Studios']['studios'][0]).media?.edges?.map(
						(media) => media.node?.bannerImage ?? media.node?.coverImage?.extraLarge,
					),
				]
			: [],
	);
	return (
		<AnimViewMem style={{ width: '100%' }}>
			<Surface
				mode="elevated"
				style={{
					padding: 4,
					overflow: 'hidden',
					width: '100%',
					borderRadius: 6,
					alignSelf: 'center',
				}}
			>
				<Pressable
					onPress={() => onPress() ?? router.navigate(`/studio/${props.id}`)}
					onLongPress={() => {
						onLongPress() ??
							SheetManager.show('QuickActionStudioSheet', { payload: props });
					}}
					style={{ width: '100%', height: '100%' }}
					android_ripple={{ foreground: true, borderless: false, color: colors.primary }}
				>
					<Image
						source={{ uri: img_src }}
						transition={400}
						style={{ width: '100%', height: 60, borderRadius: 6 }}
						contentFit="cover"
					/>
					<Text variant="titleMedium">{props.name}</Text>
					{/* <ImageBackground
				source={{ uri: img_src }}
				transition={2000}
				style={{ flex: 1, width: '100%' }}
			>
				<LinearGradient
					end={{ x: 1, y: 0.5 }}
					start={{ x: 0, y: 0.5 }}
					colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,0.3)']}
					style={{ position: 'absolute', width: '100%', height: '100%' }}
				/>
				<Button
					icon={props.isFavourite ? 'heart' : undefined}
					onPress={props.onPress}
					style={{ flex: 1, width: '100%' }}
					mode="outlined"
				>
					{props.name}
				</Button>
			</ImageBackground> */}
				</Pressable>
			</Surface>
		</AnimViewMem>
	);
};

type DanbooruImageCardProps = {
	item: DanPost;
	disableAR?: boolean;
	blurAmount?: number;
	toggleBlur?: () => void;
	onNavigate: (id: number) => void;
};
export const DanbooruImageCard = ({
	item,
	disableAR = false,
	onNavigate,
}: DanbooruImageCardProps) => {
	const lastItemId = useRef(item.id);
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	const preview = item.media_asset.variants?.find((v) => v.type === '360x360');
	const { blurAmount, toggleBlur, resetBlur } = useNsfwBlur(item.rating);

	if (lastItemId.current !== item.id) {
		lastItemId.current = item.id;
		resetBlur();
	}

	if (!preview) {
		return null;
	}
	return (
		<AnimViewMem>
			<Pressable
				onLongPress={toggleBlur}
				onPress={() => onNavigate(item.id)}
				style={{
					borderRadius: 12,
					aspectRatio: disableAR ? undefined : preview?.width / preview?.height,
					overflow: 'hidden',
				}}
			>
				<Image
					blurRadius={blurAmount}
					transition={800}
					source={{ uri: preview.url }}
					contentFit="cover"
					placeholder={colors.blurhash}
					placeholderContentFit="cover"
					recyclingKey={preview.url}
					style={{
						aspectRatio: !disableAR ? undefined : preview?.width / preview?.height,
						borderRadius: 6,
						width: disableAR ? width / 2 - 8 : '100%',
						height: disableAR ? 200 : '100%',
						maxHeight: disableAR ? 200 : undefined,
					}}
				/>
				<NSFWLabel level={item.rating} />
				{/* <IconButton
                icon={item.file_ext === 'gif' ? 'file-gif-box' : 'image-area'}
                style={{
                    position: 'absolute',
                    backgroundColor: rgbToRgba(colors.surface, 0.5),
                    top: 0,
                    alignSelf: 'flex-end',
                    transform: [{ rotate: `${preview.height > preview.width ? 90 : 0} deg` }],
                }}
            /> */}
			</Pressable>
		</AnimViewMem>
	);
};
