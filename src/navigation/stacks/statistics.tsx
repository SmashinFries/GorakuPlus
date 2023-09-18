import {
    MaterialTopTabScreenProps,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import AnimeStatTab from '../../features/statistics/anime';
import MangaStatTab from '../../features/statistics/manga';
import { useTheme } from 'react-native-paper';
import { RootStackProps, StatsTabProps } from '../types';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator<StatsTabProps>();

const StatisticsTabs = ({
    navigation,
    route,
}: MaterialTopTabScreenProps<RootStackProps, 'statistics'>) => {
    const { colors } = useTheme();
    const { userId } = route.params;

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: colors.surface },
                tabBarLabelStyle: { color: colors.onSurfaceVariant },
            }}
        >
            <Tab.Screen name="anime" component={AnimeStatTab} initialParams={{ userId: userId }} />
            <Tab.Screen name="manga" component={MangaStatTab} initialParams={{ userId: userId }} />
        </Tab.Navigator>
    );
};

export default StatisticsTabs;
