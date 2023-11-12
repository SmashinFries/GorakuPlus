import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Appbar, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavPaths } from '../../navigation/types';
import { useCalendar } from './hooks/useCalendar';
import React, { useCallback, useState } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { DayTab } from './components/tabs';

const Days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

const CalendarScreen = ({
    navigation,
    route,
}: NativeStackScreenProps<RootNavPaths, 'calendarStack'>) => {
    const dayOfWeek = new Date().getDay();
    const layout = useWindowDimensions();
    const { colors } = useTheme();

    const { data, week, loading, refetch } = useCalendar();

    const [index, setIndex] = useState(dayOfWeek);

    const [routes] = useState<{ key: string; title: string }[]>(
        Days.map((day) => {
            return { key: day, title: day };
        }),
    );

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            tabStyle={{ paddingTop: 10 }}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{ backgroundColor: colors.surface }}
            labelStyle={{ textTransform: 'capitalize' }}
            scrollEnabled={true}
        />
    );

    const renderScene = useCallback(
        ({ route }: { route: { key: WeekDay; title: WeekDay } }) => {
            switch (route.key) {
                case 'sunday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start && ep.airingAt < week.start + 86400,
                            )}
                            navigation={navigation}
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
                            navigation={navigation}
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
                            navigation={navigation}
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
                            navigation={navigation}
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
                            navigation={navigation}
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
                            navigation={navigation}
                        />
                    );
                case 'saturday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) => ep.airingAt > week.end && ep.airingAt < week.end + 86400,
                            )}
                            navigation={navigation}
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
            <Appbar.Header>
                <Appbar.Content title="Calendar" />
                {/* <Appbar.Action icon="refresh" onPress={() => refetch()} /> */}
            </Appbar.Header>
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

export default CalendarScreen;
