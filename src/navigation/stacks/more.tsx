import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import SettingsScreen from '../../features/more/settings';
import MoreScreen from '../../features/more';
import AccountsScreen from '../../features/more/accounts';
import { MoreStackProps } from '../types';

const MoreStackNav = createNativeStackNavigator<MoreStackProps>();

export const MoreStack = () => {
    return (
        <MoreStackNav.Navigator
            screenOptions={{ header: (props) => <PaperHeader {...props} /> }}
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
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />
        </MoreStackNav.Navigator>
    );
};
