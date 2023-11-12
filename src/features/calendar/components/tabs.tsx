import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getTimeUntil, getWeekStartEnd } from '../../../utils';
import { useCalendar } from '../hooks/useCalendar';
import { FlashList } from '@shopify/flash-list';
import { MediaType, WeeklyAnimeQuery } from '../../../app/services/anilist/generated-anilist';
import { MediaCard } from '../../../components/cards';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavPaths } from '../../../navigation/types';

const Days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

type DayTabProps = {
    data: WeeklyAnimeQuery['Page']['airingSchedules'];
    navigation: NativeStackNavigationProp<RootNavPaths, 'calendarStack'>;
};
const DayTab = ({ data, navigation }: DayTabProps) => {
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

export const CalendarTabs = () => {
    const nav = useNavigation<NativeStackNavigationProp<RootNavPaths, 'calendarStack'>>();
    const dayOfWeek = new Date().getDay();
    const layout = useWindowDimensions();
    const { colors } = useTheme();

    const { data, week, loading, refetch } = useCalendar();

    const [index, setIndex] = React.useState(dayOfWeek);

    const [routes] = React.useState<{ key: string; title: string }[]>(
        Days.map((day) => {
            return { key: day, title: day };
        }),
    );

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            tabStyle={{ paddingTop: 30 }}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{ backgroundColor: colors.surface }}
            labelStyle={{ textTransform: 'capitalize' }}
            scrollEnabled={true}
        />
    );

    const renderScene = React.useCallback(
        ({ route }: { route: { key: WeekDay; title: WeekDay } }) => {
            switch (route.key) {
                case 'sunday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start && ep.airingAt < week.start + 86400,
                            )}
                            navigation={nav}
                        />
                    );
                // return <DayTab data={null} />;
                case 'monday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start + 86400 &&
                                    ep.airingAt < week.start + 86400 * 2,
                            )}
                            navigation={nav}
                        />
                    );
                case 'tuesday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start + 86400 * 2 &&
                                    ep.airingAt < week.start + 86400 * 3,
                            )}
                            navigation={nav}
                        />
                    );
                case 'wednesday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start + 86400 * 3 &&
                                    ep.airingAt < week.start + 86400 * 4,
                            )}
                            navigation={nav}
                        />
                    );
                case 'thursday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start + 86400 * 4 &&
                                    ep.airingAt < week.start + 86400 * 5,
                            )}
                            navigation={nav}
                        />
                    );
                case 'friday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start + 86400 * 5 &&
                                    ep.airingAt < week.start + 86400 * 6,
                            )}
                            navigation={nav}
                        />
                    );
                case 'saturday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) => ep.airingAt > week.end && ep.airingAt < week.end + 86400,
                            )}
                            navigation={nav}
                        />
                    );
                default:
                    return null;
            }
        },
        [data],
    );

    return (
        <>
            {/* <Button onPress={() => console.log(new Date(getWeekStartEnd().start).toDateString())}>
                time
            </Button>
            <Button onPress={() => console.log(data.length)}>AMOUNT</Button> */}
            {!loading ? (
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                    swipeEnabled={true}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            )}
        </>
    );
};
