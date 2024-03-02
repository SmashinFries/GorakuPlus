import { Image, ImageBackground } from 'expo-image';
import { DimensionValue, Pressable, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, IconButton, ProgressBar, Text, useTheme } from 'react-native-paper';
import {
	MediaList,
	MediaListStatus,
	MediaStatus,
	MediaTitle,
	ScoreDistribution,
} from '@/store/services/anilist/generated-anilist';
import { LinearGradient } from 'expo-linear-gradient';
import { listColor } from '@/utils';
import { useAppSelector } from '@/store/hooks';
import { DanPost } from '@/store/services/danbooru/types';
import { useNsfwBlur } from '@/hooks/useNSFWBlur';
import { NSFWLabel } from './labels';
import { ScoreVisual } from './explore/itemScore';
import { AiringBanner } from './explore/episodeBanner';
import { ScoreVisualType } from '@/store/slices/settingsSlice';
import useImageRotation from '@/hooks/useImageRotation';
import { useAppTheme } from '@/store/theme/theme';
import { useEffect } from 'react';

const BORDER_RADIUS = 12;

type MediaCardProps = {
    coverImg: string;
    titles: MediaTitle;
    mediaListEntry?: any;
    navigate?: () => void;
    meanScore?: number;
    averageScore?: number;
    imgBgColor?: string;
    scoreColors?: any;
    showBanner?: boolean;
    bannerText?: string;
    editMode?: boolean;
    disablePress?: boolean;
    scoreVisualType?: ScoreVisualType;
    scoreDistributions?: ScoreDistribution[];
    titleLang?: 'english' | 'romaji' | 'native';
    height?: number;
    width?: number;
    fitToParent?: boolean;
    isFavorite?: boolean;
};
export const MediaCard = (props: MediaCardProps) => {
	const card_height = props.height ?? 210;
	const { colors } = useAppTheme();
	const { scoreColors, mediaLanguage, defaultScore } = useAppSelector(
		(state) => state.persistedSettings,
	);
	return (
		<Pressable
			onPress={props.navigate && props.navigate}
			android_ripple={
				props.navigate ? { color: colors.primary, foreground: true } : undefined
			}
			// disabled={props.disablePress}
			style={{
				marginHorizontal: 10,
				overflow: 'hidden',
				height: !props.width && !props.fitToParent ? card_height : undefined,
				width: props.fitToParent ? '100%' : props.width ?? undefined,
				// aspectRatio: 115 / 163, // anilist cover image AR
				// aspectRatio: 1 / 1.55,
				aspectRatio: 2 / 3,
				borderRadius: BORDER_RADIUS,
				backgroundColor: 'transparent',
			}}
		>
			<Image
				contentFit="cover"
				recyclingKey={props.coverImg}
				transition={1200}
				source={{ uri: props.coverImg }}
				placeholder={colors.blurhash}
				placeholderContentFit='cover'
				style={{
					height: '100%',
					width: '100%',
					position: 'absolute',
					borderRadius: BORDER_RADIUS,
					backgroundColor: props.imgBgColor ?? undefined,
				}}
			/>
			<LinearGradient
				style={{
					// position: 'absolute',
					width: '100%',
					height: '100%',
					borderRadius: BORDER_RADIUS,
					overflow: 'hidden',
					justifyContent: 'flex-end',
				}}
				colors={[
					'transparent',
					'rgba(0,0,0,.4)',
					props.isFavorite ? 'rgba(79, 0, 0, 1)' : 'black',
				]}
			>
				{(props.meanScore || props.averageScore) && (
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
					/>
				)}
				<Text
					variant="labelMedium"
					style={{
						// position: 'absolute',
						alignSelf: 'center',
						// bottom: props.showBanner ? '15%' : 10,
						// fontWeight: 'bold',
						paddingHorizontal: 6,
						paddingVertical: 10,
						color: 'white',
					}}
					numberOfLines={2}
				>
					{props.titles[props.titleLang] ??
                        props.titles[mediaLanguage] ??
                        props.titles.romaji}
				</Text>
				{props.showBanner ? (
					<AiringBanner
						containerColor={colors.primaryContainer}
						textColor={colors.onPrimaryContainer}
						text={props.bannerText}
					/>
				) : null}
			</LinearGradient>
		</Pressable>
	);
};

type MediaCardRowProps = {
    coverImg: string;
    bannerImg: string;
    titles: MediaTitle;
    mediaListEntry?: any;
    navigate?: () => void;
    meanScore?: number;
    averageScore?: number;
    imgBgColor?: string;
    scoreColors?: any;
    showBanner?: boolean;
    bannerText?: string;
    editMode?: boolean;
    disablePress?: boolean;
    scoreVisualType?: ScoreVisualType;
    scoreDistributions?: ScoreDistribution[];
    titleLang?: 'english' | 'romaji' | 'native';
    height?: number;
    scoreWidth?: DimensionValue;
};
export const MediaCardRow = (props: MediaCardRowProps) => {
	const card_height = props.height ?? 110;
	const { colors } = useTheme();
	const { scoreColors, mediaLanguage, defaultScore } = useAppSelector(
		(state) => state.persistedSettings,
	);
	return (
		<Pressable
			onPress={props.navigate && props.navigate}
			style={{
				overflow: 'hidden',
				height: card_height,
				width: '100%',
				backgroundColor: 'transparent',
			}}
		>
			<Image
				contentFit="cover"
				transition={800}
				source={{ uri: props.bannerImg ?? props.coverImg }}
				style={{
					height: '100%',
					width: '100%',
					position: 'absolute',
					backgroundColor: props.imgBgColor ?? undefined,
				}}
			/>
			<LinearGradient
				style={{
					width: '100%',
					height: '100%',
					overflow: 'hidden',
				}}
				colors={['black', 'rgba(000,000,000, 0.1)', 'black']}
			>
				{(props.meanScore || props.averageScore) && (
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
				)}
				<Text
					variant="titleSmall"
					style={{
						position: 'absolute',
						alignSelf: 'center',
						textAlign: 'center',
						bottom: 5,
						fontWeight: 'bold',
						color: 'white',
						padding: 5,
					}}
					numberOfLines={1}
				>
					{props.titles[props.titleLang] ??
                        props.titles[mediaLanguage] ??
                        props.titles.romaji}
				</Text>
			</LinearGradient>
		</Pressable>
	);
};

type MediaProgressBarProps = {
    mediaListEntry?: MediaList;
    progress: number;
    showListStatus?: boolean;
    mediaStatus?: MediaStatus;
    total?: number;
};
export const MediaProgressBar = ({
	mediaListEntry,
	mediaStatus,
	total,
	progress,
	showListStatus,
}: MediaProgressBarProps) => {
	const { colors } = useTheme();
	const { showItemListStatus } = useAppSelector((state) => state.persistedSettings);

	return (
		<View
			style={[
				{
					alignSelf: 'center',
					paddingTop: 10,
					width: '90%',
				},
			]}
		>
			<ProgressBar
				progress={total && progress ? progress / total : progress === 0 && mediaListEntry?.status !== MediaListStatus.Planning ? 0 : 1}
				style={{
					alignSelf: 'center',
					height: 8,
					borderRadius: 4,
					display: mediaListEntry ? undefined : 'none',
				}}
				// color={getScoreColor(item.averageScore)}
				indeterminate={mediaListEntry?.status === MediaListStatus.Current && !total}
				color={mediaListEntry?.status ? listColor(mediaListEntry?.status) : undefined}
			/>
			<Text
				style={{
					textAlign: 'center',
					color: colors.onSurfaceVariant,
					textTransform: 'capitalize',
				}}
				variant="labelMedium"
			>
				{showListStatus ?? showItemListStatus ? mediaListEntry?.status : null}
				{mediaListEntry?.progress > 0 
					? `${showListStatus ?? showItemListStatus ? ' · ' : ''}` +
                        mediaListEntry?.progress +
                        (![MediaListStatus.Repeating, MediaListStatus.Planning].includes(mediaListEntry?.status) && total
                        	? '/' + `${total}`
                        	: '')
					: null}
			</Text>
		</View>
	);
};

type UserCardProps = {
    avatarImg: string;
    username: string;
    isFollowing?: boolean;
    isFollower?: boolean;
    status?: string;
    progress?: string;
    size?: number;
    onPress?: () => void;
};
export const UserCard = (props: UserCardProps) => {
	const { colors } = useTheme();

	return (
		<Pressable
			android_ripple={{ color: colors.primary, foreground: true }}
			onPress={props.onPress}
			style={{
				marginHorizontal: 10,
				overflow: 'hidden',
				borderRadius: BORDER_RADIUS,
				backgroundColor: 'transparent',
				alignItems: 'center',
				padding: 5,
			}}
		>
			<Avatar.Image source={{ uri: props.avatarImg }} size={props.size ?? 110} />
			<Text
				variant="titleSmall"
				style={{
					alignSelf: 'center',
					textAlign: 'center',
					padding: 5,
				}}
				numberOfLines={2}
			>
				{props.username}
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
	);
};

type CharacterCardProps = {
    onPress: () => void;
    imgUrl: string;
    name: string;
    nativeName: string;
    role?: string;
    isFavourite?: boolean;
};
export const CharacterCard = (props: CharacterCardProps) => {
	const { colors } = useTheme();
	const { mediaLanguage } = useAppSelector((state) => state.persistedSettings);
	return (
		<Pressable
			onPress={props.onPress}
			android_ripple={{ color: colors.primary, foreground: true }}
			style={{
				marginHorizontal: 5,
				alignItems: 'center',
				overflow: 'hidden',
				borderRadius: 12,
			}}
		>
			<Avatar.Image source={{ uri: props.imgUrl }} size={110} />
			<Text
				numberOfLines={2}
				style={{
					textAlign: 'center',
					color: props.isFavourite ? colors.primary : colors.onBackground,
				}}
			>
				{mediaLanguage === 'native' ? props.nativeName : props.name}
			</Text>
			{props.role ? (
				<Text
					numberOfLines={2}
					variant="labelMedium"
					style={{
						textTransform: 'capitalize',
						width: 110 + 10,
						textAlign: 'center',
						color: colors.onSurfaceVariant,
						paddingBottom: 10,
					}}
				>
					{props.role}
				</Text>
			) : null}
		</Pressable>
	);
};

export const StaffCard = CharacterCard;

type StudioCardProps = {
    onPress: () => void;
    name: string;
    isFavourite?: boolean;
    banners?: string[];
};
export const StudioCard = (props: StudioCardProps) => {
	const img_src = useImageRotation(props.banners[0], props.banners);
	return (
		<View
			style={{
				width: '100%',
				marginHorizontal: 10,
				alignItems: 'center',
				overflow: 'hidden',
				borderRadius: 20,
			}}
		>
			<ImageBackground
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
			</ImageBackground>
		</View>
	);
};

type DanbooruImageCardProps = {
    item: DanPost;
    disableAR?: boolean;
    onNavigate: (id: number) => void;
};
export const DanbooruImageCard = ({
	item,
	disableAR = false,
	onNavigate,
}: DanbooruImageCardProps) => {
	const { colors } = useAppTheme();
	const { width, height } = useWindowDimensions();
	// const { blurNSFW } = useAppSelector((state) => state.persistedSettings);
	const { blurAmount, toggleBlur } = useNsfwBlur(item.rating);
	// navigation.navigate('danbooruDetail', { id: item.id })
	const preview = item.media_asset.variants?.find((v) => v.type === '360x360');
	if (!preview) {
		return null;
	}
	return (
		<Pressable
			onLongPress={toggleBlur}
			onPress={() => onNavigate(item.id)}
			style={{
				borderRadius: 12,
				aspectRatio: disableAR ? undefined : preview?.width / preview?.height,
			}}
		>
			<Image
				blurRadius={blurAmount}
				transition={800}
				source={{ uri: preview.url }}
				contentFit="cover"
				placeholder={colors.blurhash}
				placeholderContentFit='cover'
				recyclingKey={preview.url}
				style={{
					aspectRatio: !disableAR ? undefined : preview?.width / preview?.height,
					borderRadius: 6,
					width: disableAR ? width / 2 - 8 : '100%',
					height:disableAR ? 200 : '100%',
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
	);
};
