import { Image } from 'expo-image';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, IconButton, ProgressBar, Text, useTheme } from 'react-native-paper';
import {
    MediaListStatus,
    MediaStatus,
    MediaTitle,
} from '@/store/services/anilist/generated-anilist';
import { LinearGradient } from 'expo-linear-gradient';
import { listColor, rgbToRgba } from '@/utils';
import { useAppSelector } from '@/store/hooks';
import { DanPost } from '@/store/services/danbooru/types';
import { useNsfwBlur } from '@/hooks/useNSFWBlur';
import { NSFWLabel } from './labels';
import { ScoreHealthBar, ScoreIconText } from './explore/itemScore';
import { AiringBanner } from './explore/episodeBanner';

const BORDER_RADIUS = 12;

type MediaCardProps = {
    coverImg: string;
    titles: MediaTitle;
    mediaListEntry?: any;
    navigate?: () => void;
    meanScore?: number;
    averageScore?: number;
    imgBgColor?: string;
    scorebgColor?: string;
    scoreColors?: any;
    scoreNumber?: boolean;
    showHealthBar?: boolean;
    showBanner?: boolean;
    bannerText?: string;
    editMode?: boolean;
    disablePress?: boolean;
};
export const MediaCard = (props: MediaCardProps) => {
    const { colors } = useTheme();
    const { scoreColors, scoreHealthBar, mediaLanguage, scoreNumber, defaultScore } =
        useAppSelector((state) => state.persistedSettings);
    return (
        <Pressable
            onPress={props.navigate && props.navigate}
            android_ripple={{ color: colors.primary, foreground: true }}
            // disabled={props.disablePress}
            style={{
                marginHorizontal: 10,
                overflow: 'hidden',
                height: 230,
                width: 150,
                borderRadius: BORDER_RADIUS,
                backgroundColor: 'transparent',
            }}
        >
            <Image
                contentFit="cover"
                transition={800}
                source={{ uri: props.coverImg }}
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
                colors={['transparent', 'black']}
            >
                {(props.meanScore || props.averageScore) && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '45%',
                            padding: 3,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            borderBottomLeftRadius: BORDER_RADIUS,
                            borderTopRightRadius: BORDER_RADIUS,
                            backgroundColor: rgbToRgba(colors.primaryContainer, 0.75),
                            flexDirection: 'row',
                        }}
                    >
                        {(props.meanScore || props.averageScore) &&
                        (scoreHealthBar || props.showHealthBar) ? (
                            <ScoreHealthBar
                                score={
                                    defaultScore === 'average' && props.averageScore
                                        ? props.averageScore
                                        : props.meanScore
                                }
                                scoreColors={scoreColors}
                                showScore={props.scoreNumber ?? scoreNumber}
                                textColor={colors.onPrimaryContainer}
                                heartColor={colors.onPrimaryContainer}
                            />
                        ) : (
                            <ScoreIconText
                                showScore={props.scoreNumber}
                                score={
                                    defaultScore === 'average' && props.averageScore
                                        ? props.averageScore
                                        : props.meanScore
                                }
                                scoreColors={scoreColors}
                                textColor={colors.onPrimaryContainer}
                            />
                        )}
                    </View>
                )}
                <Text
                    variant="titleSmall"
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        textAlign: 'center',
                        bottom: props.showBanner ? '15%' : 5,
                        fontWeight: 'bold',
                        color: 'white',
                        padding: 5,
                    }}
                    numberOfLines={2}
                >
                    {props.titles[mediaLanguage] ?? props.titles.romaji}
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

type MediaProgressBarProps = {
    mediaListEntry?: any;
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
    return (
        <View
            style={[
                {
                    alignSelf: 'center',
                    width: 150,
                    paddingVertical: 10,
                },
            ]}
        >
            <ProgressBar
                progress={total && progress ? progress / total : 1}
                style={{
                    width: '90%',
                    alignSelf: 'center',
                    height: 8,
                    borderRadius: 4,
                    display: mediaListEntry ? undefined : 'none',
                }}
                // color={getScoreColor(item.averageScore)}
                indeterminate={mediaListEntry?.status === MediaListStatus.Current && !total}
                color={mediaListEntry?.status ? listColor(mediaListEntry?.status) : undefined}
            />
            {showListStatus ? (
                <Text
                    style={{
                        textAlign: 'center',
                        color: colors.onSurfaceVariant,
                        textTransform: 'capitalize',
                    }}
                    variant="labelLarge"
                >
                    {mediaListEntry?.status}
                    {mediaListEntry?.progress && mediaStatus !== MediaStatus.Finished
                        ? ' · ' +
                          mediaListEntry?.progress +
                          (mediaListEntry?.status !== MediaListStatus.Repeating
                              ? '/' + (total && total !== 0 ? total : '??')
                              : '')
                        : null}
                </Text>
            ) : null}
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
            <Text numberOfLines={2} style={{ textAlign: 'center' }}>
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
            {props.isFavourite && (
                <IconButton
                    icon="heart"
                    iconColor="red"
                    mode="contained"
                    size={16}
                    style={{ position: 'absolute', top: -5, left: -5 }}
                />
            )}
        </Pressable>
    );
};

export const StaffCard = CharacterCard;

type StudioCardProps = {
    onPress: () => void;
    name: string;
    isFavourite?: boolean;
};
export const StudioCard = (props: StudioCardProps) => {
    return (
        <View
            style={{
                width: '100%',
                marginHorizontal: 10,
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: 12,
            }}
        >
            <Button
                icon={props.isFavourite ? 'heart' : undefined}
                onPress={props.onPress}
                style={{ flex: 1, width: '100%' }}
                mode="outlined"
            >
                {props.name}
            </Button>
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
            }}
        >
            <Image
                blurRadius={blurAmount}
                transition={800}
                source={{ uri: preview.url }}
                contentFit="cover"
                style={{
                    aspectRatio: disableAR ? undefined : preview?.width / preview?.height,
                    borderRadius: 12,
                    width: width / 2 - 8,
                    height: disableAR ? preview?.height : undefined,
                    maxHeight: height / 2,
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
