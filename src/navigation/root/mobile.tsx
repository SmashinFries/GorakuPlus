import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RootNavPaths } from '../types';
import { View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { MoreStack } from '../stacks/more';
import { ExploreStack } from '../stacks/explore';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserStack } from '../stacks/user';
import PickScreen from '../../features/picks';
import { ListStackNav, ListTabsNav } from '../stacks/list';
import CalendarScreen from '../../features/calendar';

const RTBottomTabs = createMaterialBottomTabNavigator<RootNavPaths>();

const Test = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button>Print</Button>
        </View>
    );
};

const MobileNavigation = () => {
    const { avatar, username, userID } = useSelector((state: RootState) => state.persistedAniLogin);
    const { btmTabLabels, btmTabShifting } = useSelector(
        (state: RootState) => state.persistedSettings,
    );
    return (
        <RTBottomTabs.Navigator
            labeled={btmTabLabels}
            sceneAnimationEnabled
            sceneAnimationType="shifting"
            shifting={btmTabShifting}
        >
            <RTBottomTabs.Screen
                name="exploreStack"
                component={ExploreStack}
                options={{
                    title: 'Explore',
                    tabBarIcon: 'campfire',
                }}
            />
            <RTBottomTabs.Screen
                name="calendarStack"
                component={CalendarScreen}
                options={{
                    title: 'Calendar',
                    tabBarIcon: 'calendar',
                }}
            />
            {/* <RTBottomTabs.Screen
                name="recommendStack"
                component={PickScreen}
                options={{
                    title: 'Picks',
                    tabBarIcon: 'cards-outline',
                }}
            /> */}
            {userID && (
                <RTBottomTabs.Screen
                    name="listStack"
                    component={ListStackNav}
                    options={{ title: 'List', tabBarIcon: 'bookshelf' }}
                />
            )}
            <RTBottomTabs.Screen
                name="userStack"
                component={UserStack}
                options={{
                    title: username ?? 'Login',
                    tabBarIcon: avatar
                        ? () => <Avatar.Image size={24} source={{ uri: avatar }} />
                        : 'login',
                }}
            />
            <RTBottomTabs.Screen
                name="moreStack"
                component={MoreStack}
                options={{
                    title: 'More',
                    tabBarIcon: 'dots-horizontal',
                }}
            />
        </RTBottomTabs.Navigator>
    );
};

export default MobileNavigation;
