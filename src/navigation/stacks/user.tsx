import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserStackProps } from '../types';
import UserScreen from '../../features/user';

const UserStackNav = createNativeStackNavigator<UserStackProps>();

export const UserStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    const { username } = useSelector((state: RootState) => state.persistedAniLogin);
    return (
        <UserStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
            initialRouteName="user"
        >
            <UserStackNav.Screen
                name="user"
                component={UserScreen}
                options={{
                    title: username ?? 'User',
                    headerShown: false,
                }}
            />
            <UserStackNav.Screen
                name="stats"
                component={UserScreen}
                options={{
                    title: 'Statistics',
                }}
            />
        </UserStackNav.Navigator>
    );
};
