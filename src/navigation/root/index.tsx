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
            <RootStack.Screen
                name="media"
                component={MediaScreen}
                options={{
                    headerShown: false,
                    // header: (props) => <MediaHeader {...props} />,
                }}
            />
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
        </RootStack.Navigator>
    );
};

export default RootStackNavigation;
