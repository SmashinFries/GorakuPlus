import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import SettingsScreen from '../../features/more/settings';
import MoreScreen from '../../features/more';
import AccountsScreen from '../../features/more/accounts';
import {
    BannedTagsStackProps,
    MediaSettingsStackProps,
    MoreStackProps,
    SettingsStackProps,
} from '../types';
import AppearanceScreen from '../../features/more/settings/appearance';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import LanguageScreen from '../../features/more/settings/language';
import MediaSettingScreen from '../../features/more/settings/media';
import AboutScreen from '../../features/more/about';
import NotifScreen from '../../features/more/settings/notifications';
import TagFilterScreen from '../../features/more/settings/media/tagFilter';

const MoreStackNav = createNativeStackNavigator<MoreStackProps>();
const SettingsStackNav = createNativeStackNavigator<SettingsStackProps>();
const MediaSettingsStackNav = createNativeStackNavigator<MediaSettingsStackProps>();
const BannedTagsStackNav = createNativeStackNavigator<BannedTagsStackProps>();

export const MoreStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <MoreStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <MoreStackNav.Screen
                name="more"
                component={MoreScreen}
                options={{ title: 'More', header: (props) => <MoreHeader {...props} /> }}
            />
            <MoreStackNav.Screen
                name="accounts"
                component={AccountsScreen}
                options={{ title: 'Accounts' }}
            />
            <MoreStackNav.Screen
                name="settings"
                component={SettingsStack}
                options={{ title: 'Settings', headerShown: false }}
            />
            <MoreStackNav.Screen
                name="about"
                component={AboutScreen}
                options={{ title: 'About', header: (props) => <PaperHeader {...props} /> }}
            />
        </MoreStackNav.Navigator>
    );
};

export const BannedTagsStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);

    return (
        <BannedTagsStackNav.Navigator
            initialRouteName="btags"
            screenOptions={{ animation: navAnimation, headerShown: true }}
        >
            <BannedTagsStackNav.Screen
                name="btags"
                component={TagFilterScreen}
                options={{ title: 'Exclude Tags', header: (props) => <PaperHeader {...props} /> }}
            />
        </BannedTagsStackNav.Navigator>
    );
};

export const MediaSettingsStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);

    return (
        <MediaSettingsStackNav.Navigator
            initialRouteName="msHome"
            screenOptions={{ animation: navAnimation, headerShown: false }}
        >
            <MediaSettingsStackNav.Screen
                name="msHome"
                component={MediaSettingScreen}
                options={{
                    title: 'Media',
                    headerShown: true,
                    header: (props) => <PaperHeader {...props} />,
                }}
            />
            <MediaSettingsStackNav.Screen
                name="bannedTags"
                component={BannedTagsStack}
                options={{ headerShown: false }}
            />
        </MediaSettingsStackNav.Navigator>
    );
};

export const SettingsStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <SettingsStackNav.Navigator
            initialRouteName="settingsHome"
            screenOptions={{ animation: navAnimation }}
        >
            <SettingsStackNav.Screen
                name="settingsHome"
                component={SettingsScreen}
                options={{ title: 'Settings', header: (props) => <PaperHeader {...props} /> }}
            />
            <SettingsStackNav.Screen
                name="appearance"
                component={AppearanceScreen}
                options={{ title: 'Appearance', header: (props) => <PaperHeader {...props} /> }}
            />
            <SettingsStackNav.Screen
                name="language"
                component={LanguageScreen}
                options={{ title: 'Language', header: (props) => <PaperHeader {...props} /> }}
            />
            <SettingsStackNav.Screen
                name="notifications"
                component={NotifScreen}
                options={{ title: 'Notifications', header: (props) => <PaperHeader {...props} /> }}
            />
            <SettingsStackNav.Screen
                name="mediaSettings"
                component={MediaSettingsStack}
                options={{
                    title: 'Media',
                    headerShown: false,
                    header: (props) => <PaperHeader {...props} />,
                }}
            />
        </SettingsStackNav.Navigator>
    );
};
