import React, { useState } from 'react';
import { ThemeOptions } from '../../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../theme/themeSlice';
import { List, Portal, RadioButton, Switch, TouchableRipple } from 'react-native-paper';
import { RootState } from '../../../app/store';
import { ScrollView, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AniListLoginDialog from '../../../app/services/anilist/components/dialogs';
import { setAniAuth } from '../../../app/services/anilist/authSlice';
import { api } from '../../../app/services/anilist/enhanced';
import { useTokenTime } from '../../../utils/time';
import { RootNavPaths } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackProps } from '../../../navigation/stacks/more';
WebBrowser.maybeCompleteAuthSession();

const SettingsScreen = ({ navigation }: NativeStackScreenProps<SettingsStackProps, 'settings'>) => {
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
            {/* <List.Section>
                <List.Subheader>Accounts</List.Subheader>
                <List.Item
                    title="Anilist"
                    description={`Next Login:\n💀${aniTokenTime}💀` ?? 'Not logged in'}
                    descriptionStyle={{ color: 'red' }}
                    onPress={() => setShowAniAuth(true)}
                    right={(props) => (
                        <List.Icon
                            {...props}
                            icon={timeTillDeath ? 'check' : 'close'}
                            color={timeTillDeath ? 'green' : 'red'}
                        />
                    )}
                />
                <List.Item
                    title="Danbooru"
                    description="Not implemented"
                    onPress={() => null}
                    right={(props) => <List.Icon {...props} icon={'close'} color={'red'} />}
                />
            </List.Section> */}
            {/* <Portal>
                <AniListLoginDialog
                    visible={showAniAuth}
                    rootPath={'settings'}
                    onDismiss={() => setShowAniAuth(false)}
                    onLogout={() => {
                        dispatch(setAniAuth({ token: '', timeTillDeath: '' }));
                        resetCache();
                    }}
                />
            </Portal> */}
        </ScrollView>

        // </View>
    );
};

export default SettingsScreen;
