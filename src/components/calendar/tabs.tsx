import * as React from 'react';
import { View } from 'react-native';
import { getTimeUntil, useColumns } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import { MediaType, WeeklyAnimeQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';
import { MediaCard, MediaProgressBar } from '../cards';
import { useAppSelector } from '@/store/hooks';

type DayTabProps = {
    data: WeeklyAnimeQuery['Page']['airingSchedules'];
};
export const DayTab = ({ data }: DayTabProps) => {
    const today = new Date().getTime() / 1000; // seconds
    const { columns, listKey } = useColumns(150);
    const { showItemListStatus } = useAppSelector((state) => state.persistedSettings);

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
        <View style={{ width: '100%', flex: 1 }}>
            <FlashList
                key={listKey}
                data={data}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={columns}
                estimatedItemSize={211}
                centerContent
            />
            {/* <Button onPress={() => console.log(data?.length)}>Print Amount</Button> */}
        </View>
    );
};
