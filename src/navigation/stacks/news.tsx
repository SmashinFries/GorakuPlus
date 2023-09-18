import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperHeader, { MoreHeader } from '../../components/headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CharacterStackProps, NewsStackProps } from '../types';
import CharacterScreen from '../../features/character';
import CharListScreen from '../../features/character/charlist';
import { NewsList } from '../../features/news';

const NewsStackNav = createNativeStackNavigator<NewsStackProps>();

const NewsStack = () => {
    const { navAnimation } = useSelector((state: RootState) => state.persistedSettings);
    return (
        <NewsStackNav.Navigator
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
            initialRouteName="newsList"
        >
            <NewsStackNav.Screen
                name="newsList"
                component={NewsList}
                options={{
                    title: 'MAL News',
                }}
            />
        </NewsStackNav.Navigator>
    );
};

export default NewsStack;
