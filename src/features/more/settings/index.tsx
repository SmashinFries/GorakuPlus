import React from 'react';
import { ThemeOptions } from '../../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../theme/themeSlice';
import { List, RadioButton, Switch, useTheme } from 'react-native-paper';
import { RootState } from '../../../app/store';
import { ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../../../app/services/anilist/enhanced';
import { MoreStackProps, SettingsStackProps } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

const SettingsScreen = ({
    navigation,
}: NativeStackScreenProps<SettingsStackProps, 'settingsHome'>) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const resetCache = () =>
        dispatch(api.util.invalidateTags(['ExploreAnime', 'ExploreManga', 'ExploreNovel']));

    return (
        <ScrollView>
            <List.Item
                title={'Appearance'}
                description={'Themes, animations'}
                onPress={() => {
                    navigation.navigate('appearance');
                }}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="palette-outline" />
                )}
            />
            <List.Item
                title={'Tabs'}
                description={'Order and visibility of tabs'}
                onPress={() => {
                    navigation.navigate('tabs');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="tab" />}
            />
            <List.Item
                title={'Media'}
                description={'Change media defaults'}
                onPress={() => {
                    navigation.navigate('media');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="television" />}
            />
            <List.Item
                title={'Language'}
                description={'Change app and media title langauge'}
                onPress={() => {
                    navigation.navigate('language');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="translate" />}
            />
            {/* <List.Item
                title={'Animations'}
                description={'Adjust navigation animations'}
                onPress={() => {
                    navigation.navigate('appearance');
                }}
                left={(props) => <List.Icon {...props} icon="animation-outline" />}
            /> */}
        </ScrollView>
    );
};

export default SettingsScreen;
