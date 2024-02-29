import * as React from 'react';
import { View } from 'react-native';
import { getTimeUntil, useColumns } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { MediaList, MediaType, WeeklyAnimeQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';
import { MediaCard, MediaCardRow, MediaProgressBar } from '../cards';
import { useAppSelector } from '@/store/hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { ProgressBar, Text } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const RenderEmpty = ({ message }: { message: string }) => {
    const rotate = useSharedValue(0);
    const animStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: rotate.value }],
        };
    });

    React.useEffect(() => {
        rotate.value = withRepeat(
            withSequence(withTiming(-30, { duration: 1500 }), withTiming(0, { duration: 1500 })),
            -1,
        );
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Animated.View style={[{ flexDirection: 'row' }]}>
                <Text variant="titleLarge">{message} </Text>
                <Animated.View>
                    <Text variant="titleLarge">🥲</Text>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

type DayTabProps = {
    data: WeeklyAnimeQuery['Page']['airingSchedules'];
};
export const DayTab = ({ data }: DayTabProps) => {
    const { width } = useWindowDimensions();
    const { showItemListStatus, showNSFW } = useAppSelector((state) => state.persistedSettings);
    const { calendar } = useAppSelector((state) => state.persistedDisplaySettings);

    const { dismissAll: dismissAllModals } = useBottomSheetModal();

    const RenderItem = React.useCallback(
        ({ item }: { item: WeeklyAnimeQuery['Page']['airingSchedules'][0] }) => {
            const bannerText = item.timeUntilAiring as unknown as string;

            if (!showNSFW && item.media?.isAdult) return null;
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginVertical: 10,
                        marginHorizontal: 5,
                        maxWidth: width / 3 - 10,
                    }}
                >
                    <MediaCard
                        titles={item.media?.title}
                        coverImg={item.media.coverImage.extraLarge}
                        imgBgColor={item.media.coverImage.color}
                        averageScore={item.media?.averageScore}
                        meanScore={item.media?.meanScore}
                        showBanner
                        bannerText={bannerText}
                        scoreDistributions={item.media.stats?.scoreDistribution}
                        navigate={() => {
                            dismissAllModals();
                            router.push(
                                `/(media)/${MediaType.Anime.toLowerCase()}/${item.media?.id}`,
                            );
                        }}
                        fitToParent
                        isFavorite={item.media.isFavourite}
                    />
                    <MediaProgressBar
                        progress={item.media.mediaListEntry?.progress}
                        mediaListEntry={item.media.mediaListEntry as MediaList}
                        mediaStatus={item.media.status}
                        total={item.media.episodes ?? 0}
                    />
                </View>
            );
        },
        [data, showItemListStatus, showNSFW],
    );

    const RenderItemTest = React.useCallback(
        ({ item }: { item: WeeklyAnimeQuery['Page']['airingSchedules'][0] }) => {
            const bannerText = item.timeUntilAiring as unknown as string;

            if (!showNSFW && item.media?.isAdult) return null;
            return (
                <View>
                    <MediaCardRow
                        titles={item.media?.title}
                        coverImg={item.media.coverImage.extraLarge}
                        bannerImg={item.media.bannerImage}
                        imgBgColor={item.media.coverImage.color}
                        averageScore={item.media?.averageScore}
                        meanScore={item.media?.meanScore}
                        showBanner
                        bannerText={bannerText}
                        scoreDistributions={item.media.stats?.scoreDistribution}
                        navigate={() => {
                            dismissAllModals();
                            router.push(
                                `/(media)/${MediaType.Anime.toLowerCase()}/${item.media?.id}`,
                            );
                        }}
                        scoreWidth={'20%'}
                    />
                    {item.media.mediaListEntry?.progress && (
                        <ProgressBar
                            style={{ width: '100%' }}
                            progress={
                                item.media.episodes && item.media.mediaListEntry?.progress
                                    ? item.media.mediaListEntry?.progress / item.media.episodes
                                    : 1
                            }
                        />
                    )}
                </View>
            );
        },
        [data, showItemListStatus, showNSFW],
    );

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <FlashList
                key={3}
                data={data?.filter((ep) => (calendar.list_only ? ep.media?.mediaListEntry : true))}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                // columnWrapperStyle={{
                //     flex:1,
                //     justifyContent: 'flex-start',
                // }}
                estimatedItemSize={211}
                centerContent
                contentContainerStyle={{ paddingVertical: 10 }}
                ListEmptyComponent={() => (
                    <View style={{ paddingVertical: 50 }}>
                        <RenderEmpty message={'Nothing to watch'} />
                    </View>
                )}
            />
        </View>
    );
};

export const DayTabMemo = React.memo(DayTab);