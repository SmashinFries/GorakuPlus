import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CharacterStackProps } from '../types';
import CharacterScreen from '../../features/character';
import CharListScreen from '../../features/character/charlist';

const CharStackNav = createNativeStackNavigator<CharacterStackProps>();

const CharacterStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <CharStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
            initialRouteName="characterList"
        >
            <CharStackNav.Screen
                name="characterList"
                component={CharListScreen}
                options={{
                    title: 'Characters',
                }}
            />
            <CharStackNav.Screen
                name="character"
                component={CharacterScreen}
                options={{
                    title: '',
                }}
            />
        </CharStackNav.Navigator>
    );
};

export default CharacterStack;
