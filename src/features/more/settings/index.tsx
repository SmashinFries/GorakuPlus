import React, { useState } from 'react';
import { ThemeOptions } from '../../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../theme/themeSlice';
import { List, RadioButton, Switch } from 'react-native-paper';
import { RootState } from '../../../app/store';
import { ScrollView, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../../../app/services/anilist/enhanced';
import { MoreStackProps, RootNavPaths } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

const SettingsScreen = ({ navigation }: NativeStackScreenProps<MoreStackProps, 'settings'>) => {
    const THEME_SELECTION: ThemeOptions[] = ['default', 'kawaii', 'punpun', 'sonozaki_mion'];
    const { mode, isDark } = useSelector((state: RootState) => state.persistedTheme);
    const dispatch = useDispatch();

    const resetCache = () =>
        dispatch(api.util.invalidateTags(['ExploreAnime', 'ExploreManga', 'ExploreNovel']));

    const onDarkChange = () => dispatch(setTheme({ isDark: !isDark, mode:mode }));

    return (
        <ScrollView>
            <List.Section>
                <List.Subheader>Appearance</List.Subheader>
                <List.Item
                    title={'Dark Mode'}
                    onPress={() => {
                        dispatch(setTheme({ isDark: !isDark, mode:mode }));
                    }}
                    // @ts-ignore
                    right={(props) => <Switch value={isDark} {...props} onValueChange={onDarkChange} />}
                />
                {THEME_SELECTION.map((theme, index) => (
                    <RadioButton.Item
                        key={index}
                        label={theme.replace('_', ' ')}
                        status={mode === theme ? 'checked' : 'unchecked'}
                        onPress={() => dispatch(setTheme({ mode: theme, isDark: isDark }))}
                        value={theme}
                        labelStyle={{ textTransform: 'capitalize' }}
                    />
                ))}
            </List.Section>
        </ScrollView>

        // </View>
    );
};

export default SettingsScreen;
