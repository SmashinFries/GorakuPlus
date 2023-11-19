import * as React from 'react';
import { View } from 'react-native';
import { getTimeUntil } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { MediaType, WeeklyAnimeQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';
import { MediaCard } from '../cards';

type DayTabProps = {
    data: WeeklyAnimeQuery['Page']['airingSchedules'];
};
export const DayTab = ({ data }: DayTabProps) => {
    const today = new Date().getTime() / 1000; // seconds
    const RenderItem = React.useCallback(
        ({ item }: { item: WeeklyAnimeQuery['Page']['airingSchedules'][0] }) => {
            return (
                <View style={{ padding: 15 }}>
                    <MediaCard
                        titles={item.media?.title}
                        coverImg={item.media.coverImage.extraLarge}
                        averageScore={item.media?.averageScore}
                        meanScore={item.media?.meanScore}
                        showBanner
                        bannerText={item.airingAt < today ? 'Aired' : getTimeUntil(item.airingAt)}
                        navigate={() => {
                            console.log(
                                `/(media)/${MediaType.Anime.toLowerCase()}/${item.media?.id}`,
                            );
                            router.push(
                                `/(media)/${MediaType.Anime.toLowerCase()}/${item.media?.id}`,
                            );
                        }}
                    />
                </View>
            );
        },
        [data],
    );

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <FlashList
                data={data}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                estimatedItemSize={211}
                centerContent
            />
            {/* <Button onPress={() => console.log(data?.length)}>Print Amount</Button> */}
        </View>
    );
};
