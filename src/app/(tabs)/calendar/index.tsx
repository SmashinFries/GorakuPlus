import { CalendarFilterSheet } from '@/components/calendar/bottomsheet';
import { DayTab } from '@/components/calendar/tabs';
import { useCalendar } from '@/hooks/calendar/useCalendar';
import { useAppSelector } from '@/store/hooks';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Appbar, useTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';

const Days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

const CalendarPage = () => {
    const dayOfWeek = new Date().getDay();
    const layout = useWindowDimensions();
    const { colors } = useTheme();
    const filterSheetRef = useRef<BottomSheetModalMethods>(null);

    const { data, loading, refetch, week } = useCalendar();

    const [index, setIndex] = useState(dayOfWeek);
    const [headerHeight, setHeaderHeight] = useState(0);

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
            labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
            scrollEnabled={true}
            android_ripple={{ color: colors.primary, borderless: true }}
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
                            headerHeight={headerHeight}
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
                            headerHeight={headerHeight}
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
                            headerHeight={headerHeight}
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
                            headerHeight={headerHeight}
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
                            headerHeight={headerHeight}
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
                            headerHeight={headerHeight}
                        />
                    );
                case 'saturday':
                    return (
                        <DayTab
                            data={data.filter(
                                (ep) =>
                                    ep.airingAt > week.start + 86400 * 6 && ep.airingAt < week.end,
                            )}
                            headerHeight={headerHeight}
                        />
                    );
                default:
                    return null;
            }
        },
        [data, headerHeight],
    );

    return (
        <>
            {/* <Button onPress={() => console.log(new Date(getWeekStartEnd().start).toDateString())}>
        time
    </Button>
    <Button onPress={() => console.log(data.length)}>AMOUNT</Button> */}
            <Appbar.Header onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
                <Appbar.Content title="Calendar" />
                <Appbar.Action
                    icon="filter-outline"
                    onPress={() => filterSheetRef.current.present()}
                />
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
            <CalendarFilterSheet ref={filterSheetRef} />
        </>
    );
};

export default CalendarPage;
