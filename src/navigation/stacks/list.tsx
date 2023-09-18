import {
    MaterialTopTabScreenProps,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { ListStackProps, ListTabsProps, RootNavPaths } from '../types';
import { MediaType, useUserCustomListsQuery } from '../../app/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { setSettings } from '../../features/more/settings/settingsSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, useTheme } from 'react-native-paper';
import ListScreen from '../../features/list';

const ListStack = createNativeStackNavigator();
const ListTabs = createMaterialTopTabNavigator<ListStackProps>();
const ListStatusTabs = createMaterialTopTabNavigator<ListTabsProps>();

const Test = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button>Print</Button>
        </View>
    );
};

export const ListStackNav = () => {
    const { colors } = useTheme();
    return (
        <ListStack.Navigator
            screenOptions={{
                headerTintColor: colors.onSurfaceVariant,
                headerStyle: { backgroundColor: colors.surface },
            }}
        >
            <ListStack.Screen name="Lists" options={{ title: 'Lists' }} component={ListTabsNav} />
        </ListStack.Navigator>
    );
};

export const ListTabsNav = () => {
    // const { userID } = useAppSelector((state) => state.persistedAniLogin);
    // const { data } = useUserCustomListsQuery({ type: MediaType.Anime, userId: userID });
    const { colors } = useTheme();

    return (
        <ListTabs.Navigator
            screenOptions={{
                swipeEnabled: false,
                tabBarStyle: { backgroundColor: colors.surface },
                tabBarLabelStyle: { color: colors.onSurfaceVariant },
            }}
        >
            <ListTabs.Screen
                name="animeList"
                options={{ title: 'Anime' }}
                component={AnimeListTabsNav}
            />
            <ListTabs.Screen
                name="mangaList"
                options={{ title: 'Manga' }}
                component={MangaListTabsNav}
            />
        </ListTabs.Navigator>
    );
};

export const AnimeListTabsNav = ({
    route,
}: MaterialTopTabScreenProps<ListTabsProps, 'animeList'>) => {
    const { listATabOrder } = useAppSelector((state) => state.persistedSettings);
    const { colors } = useTheme();

    return (
        <ListStatusTabs.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: colors.surface },
                tabBarLabelStyle: { color: colors.onSurfaceVariant },
            }}
        >
            {listATabOrder.map((list, idx) => (
                <ListStatusTabs.Screen
                    key={idx}
                    name={'anime' + list}
                    options={{
                        title: list,
                        tabBarScrollEnabled: true,
                        tabBarLabelStyle: {
                            textTransform: 'capitalize',
                            color: colors.onSurfaceVariant,
                        },
                    }}
                    initialParams={{ listName: list, mediaType: MediaType.Anime }}
                    component={ListScreen}
                />
            ))}
        </ListStatusTabs.Navigator>
    );
};

const MangaListTabsNav = ({ route }: MaterialTopTabScreenProps<ListStackProps, 'mangaList'>) => {
    const { listMTabOrder } = useAppSelector((state) => state.persistedSettings);
    const { colors } = useTheme();

    return (
        <ListStatusTabs.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: colors.surface },
                tabBarLabelStyle: { color: colors.onSurfaceVariant },
            }}
        >
            {listMTabOrder.map((list, idx) => (
                <ListStatusTabs.Screen
                    key={idx}
                    name={'manga' + list}
                    options={{
                        title: list,
                        tabBarScrollEnabled: true,
                        tabBarLabelStyle: { textTransform: 'capitalize' },
                    }}
                    initialParams={{ listName: list, mediaType: MediaType.Manga }}
                    component={ListScreen}
                />
            ))}
            {/* {customLists?.map((list) => (
                <ListStatusTabs.Screen
                    key={'a' + list}
                    name={'a' + list}
                    component={() => <View />}
                    options={{ title: list }}
                />
            ))} */}
        </ListStatusTabs.Navigator>
    );
};
