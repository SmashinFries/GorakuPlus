import * as React from 'react';
import { View } from 'react-native';
import { getTimeUntil, useColumns } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { MediaType, WeeklyAnimeQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';
import { MediaCard, MediaProgressBar } from '../cards';
import { useAppSelector } from '@/store/hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';

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
    headerHeight: number;
};
export const DayTab = ({ data, headerHeight }: DayTabProps) => {
    const today = new Date().getTime() / 1000; // seconds
    const { columns, listKey } = useColumns(150);
    const { showItemListStatus } = useAppSelector((state) => state.persistedSettings);
    const { showListOnly } = useAppSelector((state) => state.calendarFilter);
    const { height } = useWindowDimensions();

    const { dismissAll: dismissAllModals } = useBottomSheetModal();

    const RenderItem = React.useCallback(
        ({ item }: { item: WeeklyAnimeQuery['Page']['airingSchedules'][0] }) => {
            return (
                <View style={{ padding: 15 }}>
                    <MediaCard
                        titles={item.media?.title}
                        coverImg={item.media.coverImage.extraLarge}
                        imgBgColor={item.media.coverImage.color}
                        averageScore={item.media?.averageScore}
                        meanScore={item.media?.meanScore}
                        showBanner
                        bannerText={item.airingAt < today ? 'Aired' : getTimeUntil(item.airingAt)}
                        navigate={() => {
                            // console.log(
                            //     `/(media)/${MediaType.Anime.toLowerCase()}/${item.media?.id}`,
                            // );
                            dismissAllModals();
                            router.push(
                                `/(media)/${MediaType.Anime.toLowerCase()}/${item.media?.id}`,
                            );
                        }}
                    />
                    <MediaProgressBar
                        progress={item.media.mediaListEntry?.progress}
                        mediaListEntry={item.media.mediaListEntry}
                        mediaStatus={item.media.status}
                        total={item.media.episodes ?? 0}
                        showListStatus={showItemListStatus}
                    />
                </View>
            );
        },
        [data, showItemListStatus],
    );

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <FlashList
                key={listKey}
                data={data?.filter((ep) => (showListOnly ? ep.media?.mediaListEntry : true))}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={columns}
                estimatedItemSize={211}
                centerContent
                ListEmptyComponent={() => (
                    <View style={{ height: height - headerHeight * 2 }}>
                        <RenderEmpty message={'Nothing to watch'} />
                    </View>
                )}
            />
            {/* <Button onPress={() => console.log(data?.length)}>Print Amount</Button> */}
        </View>
    );
};
