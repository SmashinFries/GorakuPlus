import React from 'react';
import { ThemeOptions } from '../../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../theme/themeSlice';
import { List, RadioButton, Switch, Text, useTheme } from 'react-native-paper';
import { RootState } from '../../../app/store';
import { ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../../../app/services/anilist/enhanced';
import { MoreStackProps, SettingsStackProps } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../app/hooks';

WebBrowser.maybeCompleteAuthSession();

const SettingsScreen = ({
    navigation,
}: NativeStackScreenProps<SettingsStackProps, 'settingsHome'>) => {
    const { colors } = useTheme();

    return (
        <ScrollView>
            <List.Item
                title={'Appearance'}
                description={'Themes, animations, scoring'}
                onPress={() => {
                    navigation.navigate('appearance');
                }}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="palette-outline" />
                )}
            />
            <List.Item
                title={'Media'}
                description={'Media defaults'}
                onPress={() => {
                    navigation.navigate('mediaSettings');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="television" />}
            />
            <List.Item
                title={'Language'}
                description={'App and media title langauge'}
                onPress={() => {
                    navigation.navigate('language');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="translate" />}
            />
            <List.Item
                title={'Notifications'}
                description={'Episode updates and more'}
                onPress={() => {
                    navigation.navigate('notifications');
                }}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="bell-outline" />
                )}
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
