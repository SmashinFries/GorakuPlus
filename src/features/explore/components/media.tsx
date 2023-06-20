import React, { useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProgressBar, Text, Tooltip } from 'react-native-paper';
import { Media, MediaStatus } from '../../../app/services/anilist/generated-anilist';
import { ExploreStackProps } from '../../../navigation/types';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Platform, StyleSheet, View, Image as RNimage } from 'react-native';
import { getScoreColor, listColor } from '../../../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const IMAGE_BORDER_RADIUS = 12;

type MediaItemProps = {
    item: Media;
    disabled: boolean;
};
export const MediaItem = ({ item, disabled }: MediaItemProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<ExploreStackProps, 'search'>>();
    const { mediaLanguage, scoreColors } = useSelector(
        (state: RootState) => state.persistedSettings,
    );
    const fadeIn = useAnimationState({
        from: {
            opacity: 0,
        },
        hovered: {
            opacity: 0.5,
        },
    });

    return (
        <MotiPressable
            onPress={() => {
                // @ts-ignore
                navigation?.navigate('media', {
                    aniID: item.id,
                    malID: item.idMal,
                    type: item.type,
                });
            }}
            onHoverIn={() => {
                console.log('hovered');
                fadeIn.transitionTo('hovered');
            }}
            onHoverOut={() => {
                fadeIn.transitionTo('from');
            }}
            animate={useMemo(
                () =>
                    ({ hovered, pressed }) => {
                        'worklet';
                        return {
                            // transform: [{ translateY: hovered ? -20 : 0 }],
                        };
                    },
                [],
            )}
            style={[
                MediaStyles.container,
                MediaStyles.imgSize,
                {
                    elevation: 8,
                    shadowColor:
                        item.status === MediaStatus.NotYetReleased || !item.averageScore
                            ? '#000'
                            : getScoreColor(item.averageScore ?? 0, scoreColors),
                    shadowRadius: item.mediaListEntry?.status ? 20 : 10,
                    shadowOpacity: item.mediaListEntry?.status ? 1 : 0.5,
                },
            ]}
        >
            <MotiView style={[MediaStyles.imgSize, MediaStyles.innerContainer]}>
                <Image
                    source={{ uri: item.coverImage?.extraLarge ?? undefined }}
                    style={[
                        MediaStyles.imgSize,
                        {
                            borderRadius: IMAGE_BORDER_RADIUS,
                        },
                    ]}
                    tintColor="grey"
                    contentFit="cover"
                />
                <MotiView
                    state={fadeIn}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: '#000',
                        borderRadius: IMAGE_BORDER_RADIUS,
                    }}
                />
                <LinearGradient
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: IMAGE_BORDER_RADIUS,
                    }}
                    colors={['transparent', 'black']}
                />
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
                    numberOfLines={2}
                >
                    {item.title[mediaLanguage] ?? item.title.userPreferred}
                </Text>
            </MotiView>
        </MotiPressable>
    );
};

export const RenderMediaItem = ({ item, index }: { item: Media; index: number }) => {
    const progress = item.mediaListEntry?.progress ?? item.mediaListEntry?.progressVolumes ?? 0;
    const total = item.episodes ?? item.chapters ?? item.volumes ?? 1;
    const startDate =
        item.startDate && item.status === MediaStatus.NotYetReleased
            ? `${item.startDate.month ?? '??'}/${item.startDate.day ?? '??'}/${
                  item.startDate.year ?? '????'
              }`
            : null;
    const isIndeterminate = (): boolean => {
        if (item.mediaListEntry?.status === 'CURRENT') {
            if (item.type === 'ANIME' && item.episodes) {
                return false;
            }
            if (item.type === 'MANGA' && item.format !== 'NOVEL' && item.chapters) {
                return false;
            }
            if (item.type === 'MANGA' && item.format === 'NOVEL' && item.volumes) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    };

    const getProgress = () => {
        if (item.mediaListEntry?.status === 'CURRENT') {
            return progress / total;
        } else {
            return 1;
        }
    };

    return (
        <AnimatePresence>
            <Tooltip
                title={`Status: ${
                    item.mediaListEntry?.status ?? 'None'
                } | Progress: ${progress}/${total}`}
            >
                <MotiView
                    key={index}
                    from={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{ maxHeight: Platform.OS === 'web' ? 415 : 250 }}
                >
                    <MediaItem
                        key={index}
                        item={item}
                        disabled={true}
                        // navigation={navigation}
                        // baseOptions={getBaseOptions()}
                    />
                    <View style={[MediaStyles.imgSize, { paddingTop: 10 }]}>
                        {startDate ? (
                            <View>
                                <Text variant="bodyLarge" style={{ alignSelf: 'center' }}>
                                    {startDate}
                                </Text>
                            </View>
                        ) : (
                            <ProgressBar
                                // progress={
                                //     (item.mediaListEntry?.progress ?? 0) /
                                //     (item.episodes ?? item.chapters ?? 1)
                                // }
                                progress={getProgress()}
                                style={{
                                    width: '90%',
                                    alignSelf: 'center',
                                    height: 8,
                                    borderRadius: 4,
                                    display: item.mediaListEntry ? undefined : 'none',
                                }}
                                // color={getScoreColor(item.averageScore)}
                                indeterminate={isIndeterminate()}
                                color={
                                    item.mediaListEntry?.status
                                        ? listColor(item.mediaListEntry?.status)
                                        : undefined
                                }
                            />
                        )}
                    </View>
                </MotiView>
            </Tooltip>
        </AnimatePresence>
    );
};

const MediaStyles = StyleSheet.create({
    container: {
        borderRadius: IMAGE_BORDER_RADIUS,
    },
    innerContainer: {
        borderRadius: IMAGE_BORDER_RADIUS,
        justifyContent: 'center',
    },
    imgSize: {
        height: Platform.OS === 'web' ? 400 : 230,
        width: Platform.OS === 'web' ? 300 : 150,
    },
});
