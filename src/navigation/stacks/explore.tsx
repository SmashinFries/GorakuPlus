import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { ExploreHeader } from '../../components/headers';
import { ExploreStackProps, ExploreTabsProps } from '../types';
import {
    MaterialTopTabScreenProps,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { AnimeTab, MangaTab, ManhwaTab, NovelsTab } from '../../features/explore';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SearchScreen from '../../features/search';

const ExploreStackNav = createNativeStackNavigator<ExploreStackProps>();
const ExploreTabs = createMaterialTopTabNavigator<ExploreTabsProps>();

export const ExploreStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <ExploreStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <ExploreStackNav.Screen
                name="explore"
                component={ExploreTabScreen}
                options={{ title: 'Explore', header: (props) => <ExploreHeader {...props} /> }}
            />
            <ExploreStackNav.Screen
                name="search"
                component={SearchScreen}
                options={{ title: 'Search' }}
            />
        </ExploreStackNav.Navigator>
    );
};

type ExploreTabItemsType = {
    anime: ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'anime'>) => JSX.Element;
    manga: ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'manga'>) => JSX.Element;
    manhwa: ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'manhwa'>) => JSX.Element;
    novels: ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'novels'>) => JSX.Element;
};
const ExploreTabItems: ExploreTabItemsType = {
    anime: AnimeTab,
    manga: MangaTab,
    manhwa: ManhwaTab,
    novels: NovelsTab,
};

export const ExploreTabScreen = ({}: MaterialTopTabScreenProps<ExploreStackProps, 'explore'>) => {
    const { colors } = useTheme();
    const { exploreTabs, exploreTabOrder } = useSelector(
        (state: RootState) => state.persistedSettings,
    );

    return (
        <ExploreTabs.Navigator
            screenOptions={{
                swipeEnabled: false,
                tabBarStyle: { backgroundColor: colors.surface },
                tabBarLabelStyle: { color: colors.onSurfaceVariant },
            }}
        >
            {exploreTabOrder.map(
                (tab, idx) =>
                    exploreTabs.includes(tab) && (
                        <ExploreTabs.Screen key={idx} name={tab} component={ExploreTabItems[tab]} />
                    ),
            )}
            {/* {exploreTabs.includes('anime') && (
                <ExploreTabs.Screen name="anime" component={AnimeTab} />
            )}
            {exploreTabs.includes('manga') && (
                <ExploreTabs.Screen name="manga" component={MangaTab} />
            )}
            {exploreTabs.includes('manhwa') && (
                <ExploreTabs.Screen name="manhwa" component={ManhwaTab} />
            )}
            {exploreTabs.includes('novels') && (
                <ExploreTabs.Screen name="novels" component={NovelsTab} />
            )} */}
        </ExploreTabs.Navigator>
    );
};

export default ExploreTabScreen;
