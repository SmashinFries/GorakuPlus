import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import SettingsScreen from '../../features/more/settings';
import MoreScreen from '../../features/more';
import AccountsScreen from '../../features/more/accounts';

export type SettingsStackProps = {
    more: undefined;
    settings: undefined;
    accounts: undefined;
};

const SettingsStackNav = createNativeStackNavigator<SettingsStackProps>();

export const SettingsStack = () => {
    return (
        <SettingsStackNav.Navigator
            screenOptions={{ header: (props) => <PaperHeader {...props} /> }}
        >
            <SettingsStackNav.Screen
                name="more"
                component={MoreScreen}
                options={{ title: 'More', header: (props) => <MoreHeader {...props} /> }}
            />
            <SettingsStackNav.Screen 
                name="accounts"
                component={AccountsScreen}
                options={{ title: 'Accounts' }}
            />
            <SettingsStackNav.Screen
                name="settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />
        </SettingsStackNav.Navigator>
    );
};
