import { CalendarFilterSheet } from '@/components/calendar/bottomsheet';
import { DayTabMemo as DayTab } from '@/components/calendar/tabs';
import { GorakuActivityIndicator } from '@/components/loading';
import { RenderTabBar, TabBarWithChip } from '@/components/tab';
import { useCalendar } from '@/hooks/calendar/useCalendar';
import { useAppSelector } from '@/store/hooks';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Appbar, useTheme } from 'react-native-paper';
import { TabBar, TabView, SceneRendererProps } from 'react-native-tab-view';

type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
const Days: WeekDay[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

type CalendarRenderSceneProps = SceneRendererProps & {
    route: { key: WeekDay; title: WeekDay | string };
};

const CalendarPage = () => {
    const dayOfWeek = new Date().getDay();
    const layout = useWindowDimensions();
    const { colors } = useTheme();
    const filterSheetRef = useRef<BottomSheetModalMethods>(null);

    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const { calendar } = useAppSelector((state) => state.persistedDisplaySettings);

    const { data, loading, refetch, week } = useCalendar();

    const [index, setIndex] = useState(dayOfWeek);

    const [routes, setRoutes] = useState<{ key: string; title: string }[]>(
        Days.map((day) => {
            return { key: day, title: day };
        }),
    );

    const updateAllTitles = (listOnly = false) => {
        let newRouteTitles = [];
        if (listOnly) {
            for (const day of Days) {
                newRouteTitles.push({
                    key: day,
                    title: `${day} (${data[day].filter((media) => showNSFW || !media.media.isAdult).filter((ep) => ep.media?.mediaListEntry).length})`,
                });
            }
        } else {
            for (const day of Days) {
                newRouteTitles.push({
                    key: day,
                    title: `${day} (${data[day].filter((media) => showNSFW || !media.media.isAdult).length})`,
                });
            }
        }
        setRoutes(newRouteTitles);
    };

    const renderScene = ({ route }: CalendarRenderSceneProps) => {
        switch (route.key) {
            case 'sunday':
                return (
                    <DayTab
                        data={data.sunday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            case 'monday':
                return (
                    <DayTab
                        data={data.monday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            case 'tuesday':
                return (
                    <DayTab
                        data={data.tuesday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            case 'wednesday':
                return (
                    <DayTab
                        data={data.wednesday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            case 'thursday':
                return (
                    <DayTab
                        data={data.thursday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            case 'friday':
                return (
                    <DayTab
                        data={data.friday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            case 'saturday':
                return (
                    <DayTab
                        data={data.saturday.filter((media) => showNSFW || !media.media.isAdult)}
                    />
                );
            default:
                return null;
        }
    };

    // const Tabs = useCallback(() => {
    //     return (
    //         <TabView
    //             navigationState={{ index, routes }}
    //             renderScene={renderScene}
    //             onIndexChange={setIndex}
    //             initialLayout={{ width: layout.width }}
    //             renderTabBar={RenderTabBar}
    //             swipeEnabled={true}
    //         />
    //     );
    // }, [colors, data]);

    useEffect(() => {
        if (data) {
            updateAllTitles(calendar.list_only);
        }
    }, [data, showNSFW]);

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Calendar" />
                {userID && (
                    <Appbar.Action
                        icon="filter-outline"
                        onPress={() => filterSheetRef.current.present()}
                    />
                )}
            </Appbar.Header>
            {!loading ? (
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={TabBarWithChip}
                    swipeEnabled={true}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <ActivityIndicator size={'small'} /> */}
                    <GorakuActivityIndicator size='large' />
                </View>
            )}
            <CalendarFilterSheet
                ref={filterSheetRef}
                updateAllTitles={(onList: boolean) => updateAllTitles(onList)}
            />
        </>
    );
};

export default CalendarPage;
