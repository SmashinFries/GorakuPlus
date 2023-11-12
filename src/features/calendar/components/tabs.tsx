import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Appbar, Button, Text, useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getTimeUntil, getWeekStartEnd } from '../../../utils';
import { useCalendar } from '../hooks/useCalendar';
import { FlashList } from '@shopify/flash-list';
import { MediaType, WeeklyAnimeQuery } from '../../../app/services/anilist/generated-anilist';
import { MediaCard } from '../../../components/cards';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavPaths } from '../../../navigation/types';

type DayTabProps = {
    data: WeeklyAnimeQuery['Page']['airingSchedules'];
    navigation: NativeStackNavigationProp<RootNavPaths, 'calendarStack'>;
};
export const DayTab = ({ data, navigation }: DayTabProps) => {
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
                        navigate={() =>
                            // @ts-ignore
                            navigation.navigate('media', {
                                aniID: item.media?.id,
                                malID: item.media?.idMal,
                                type: MediaType.Anime,
                            })
                        }
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
