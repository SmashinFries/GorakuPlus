import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { RootNavPaths } from '../types';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawers = createDrawerNavigator<RootNavPaths>();

const Test = () => <View />;

const DesktopNavigation = () => {
    const { colors } = useTheme();
    return (
        <Drawers.Navigator
            screenOptions={{
                headerLeft: () => null,
                drawerType: 'permanent',
                drawerStyle: { width: '3%', backgroundColor: colors.secondaryContainer },
            }}
            // drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawers.Screen
                name="explore"
                component={Test}
                options={{
                    title: 'Explore',
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <Icon name="compass-outline" color={color} size={26} />
                    ),
                }}
            />
            <Drawers.Screen
                name="moreStack"
                component={Test}
                options={{
                    title: 'Settings',
                    drawerIcon: ({ color }) => <Icon name="cog-outline" color={color} size={26} />,
                }}
            />
        </Drawers.Navigator>
    );
};

export default DesktopNavigation;