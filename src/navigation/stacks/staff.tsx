import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { CharStaffHeader, MoreHeader } from '../../components/headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CharacterStackProps, StaffStackProps } from '../types';
import CharacterScreen from '../../features/character';
import CharListScreen from '../../features/character/charlist';
import StaffListScreen from '../../features/staff/stafflist';
import StaffScreen from '../../features/staff';

const StaffStackNav = createNativeStackNavigator<StaffStackProps>();

const StaffStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <StaffStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
                headerTransparent: false,
            }}
            initialRouteName="staffList"
        >
            <StaffStackNav.Screen
                name="staffList"
                component={StaffListScreen}
                options={{
                    title: 'Staff',
                }}
            />
            <StaffStackNav.Screen
                name="staff"
                component={StaffScreen}
                options={{
                    title: '',
                    headerTransparent: false,
                }}
            />
        </StaffStackNav.Navigator>
    );
};

export default StaffStack;
