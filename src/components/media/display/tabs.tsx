import { CalendarFilterSheet } from '@/components/calendar/bottomsheet';
import { DayTab } from '@/components/calendar/tabs';
import { RenderTabBar } from '@/components/tab';
import { useCalendar } from '@/hooks/calendar/useCalendar';
import { useAppSelector } from '@/store/hooks';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Appbar, useTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';

const Tabs = [
    { key: 'overview', title: 'Overview' },
    { key: 'characters', title: 'Characters' },
    { key: 'staff', title: 'Staff' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'stats', title: 'Stats' },
];

const MediaTabs = () => {
    const layout = useWindowDimensions();
    const { colors } = useTheme();

    const [index, setIndex] = useState(0);

    const [routes] = useState<{ key: string; title: string }[]>(Tabs);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return null;
            case 'characters':
                return null;
            case 'staff':
                return null;
            case 'reviews':
                return null;
            case 'stats':
                return null;
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

    return (
        <>
            {/* <Button onPress={() => console.log(new Date(getWeekStartEnd().start).toDateString())}>
        time
    </Button>
    <Button onPress={() => console.log(data.length)}>AMOUNT</Button> */}
            {/* <Appbar.Header>
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
                    renderTabBar={RenderTabBar}
                    swipeEnabled={true}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            )}
            <CalendarFilterSheet ref={filterSheetRef} /> */}
        </>
    );
};

export default MediaTabs;
