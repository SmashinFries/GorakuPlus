import { View, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DesktopNavigation from './desktop';
import MobileNavigation from './mobile';
import { RootStackProps } from '../types';
import MediaScreen from '../../features/media';
import PaperHeader, { MediaHeader } from '../../components/headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import MusicScreen from '../../features/music';
import CharacterScreen from '../../features/character';
import CharacterStack from '../stacks/characters';
import StaffStack from '../stacks/staff';
import StatisticsScreen from '../../features/statistics';
import StatisticsTabs from '../stacks/statistics';
import useNotif from '../../provider/hooks/useNotificationSetup';
import NewsStack from '../stacks/news';
import DanbooruStack from '../stacks/danbooru';
import NotificationScreen from '../../features/notifications';

const RootStack = createNativeStackNavigator<RootStackProps>();

const RootStackNavigation = () => {
    const { width, height } = useWindowDimensions();
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <RootStack.Navigator
            initialRouteName="root"
            screenOptions={{ headerShown: false, animation: navAnimation }}
        >
            <RootStack.Screen
                name="root"
                component={width > height ? DesktopNavigation : MobileNavigation}
            />
            <RootStack.Screen name="media" component={MediaScreen} />
            <RootStack.Screen
                name="music"
                component={MusicScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: '',
                    title: '',
                    header: (props) => <PaperHeader {...props} />,
                }}
            />
            <RootStack.Screen name="characterStack" component={CharacterStack} />
            <RootStack.Screen name="staffStack" component={StaffStack} />
            <RootStack.Screen name="newsStack" component={NewsStack} />
            <RootStack.Screen name="danbooruStack" component={DanbooruStack} />
            <RootStack.Screen
                name="statistics"
                component={StatisticsTabs}
                options={{
                    title: 'Statistics',
                    header: (props) => <PaperHeader {...props} />,
                    headerShown: true,
                }}
            />
            <RootStack.Screen
                name="notifications"
                component={NotificationScreen}
                options={{
                    title: 'Notifications',
                    header: (props) => <PaperHeader {...props} />,
                    headerShown: true,
                }}
            />
        </RootStack.Navigator>
    );
};

export default RootStackNavigation;
