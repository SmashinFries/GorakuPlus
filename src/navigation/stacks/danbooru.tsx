import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CharacterStackProps, DanbooruStackProps } from '../types';
import CharacterScreen from '../../features/character';
import CharListScreen from '../../features/character/charlist';
import { DanbooruList } from '../../features/art/danbooruList';
import { DanbooruPost } from '../../features/art/danbooruPost';

const DanbooruStackNav = createNativeStackNavigator<DanbooruStackProps>();

const DanbooruStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <DanbooruStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
            initialRouteName="danbooruList"
        >
            <DanbooruStackNav.Screen
                name="danbooruList"
                component={DanbooruList}
                options={{
                    title: 'Fan Art',
                }}
            />
            <DanbooruStackNav.Screen
                name="danbooruDetail"
                component={DanbooruPost}
                options={{
                    title: 'Art Post',
                }}
            />
        </DanbooruStackNav.Navigator>
    );
};

export default DanbooruStack;
