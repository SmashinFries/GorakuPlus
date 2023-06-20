import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import SettingsScreen from '../../features/more/settings';
import MoreScreen from '../../features/more';
import AccountsScreen from '../../features/more/accounts';
import { MoreStackProps, SettingsStackProps } from '../types';
import AppearanceScreen from '../../features/more/settings/appearance';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import DataSettingsScreen from '../../features/more/settings/tabs';
import LanguageScreen from '../../features/more/settings/language';
import MediaSettingScreen from '../../features/more/settings/media';

const MoreStackNav = createNativeStackNavigator<MoreStackProps>();
const SettingsStackNav = createNativeStackNavigator<SettingsStackProps>();

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
        </MoreStackNav.Navigator>
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
                name="tabs"
                component={DataSettingsScreen}
                options={{ title: 'Tabs', header: (props) => <PaperHeader {...props} /> }}
            />
            <SettingsStackNav.Screen
                name="language"
                component={LanguageScreen}
                options={{ title: 'Language', header: (props) => <PaperHeader {...props} /> }}
            />
            <SettingsStackNav.Screen
                name="media"
                component={MediaSettingScreen}
                options={{ title: 'Media', header: (props) => <PaperHeader {...props} /> }}
            />
        </SettingsStackNav.Navigator>
    );
};
