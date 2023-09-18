import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Button, Chip, List, Portal, Switch, Text, useTheme } from 'react-native-paper';
import { RootState } from '../../../../app/store';
import { useCallback, useState } from 'react';
import { DefaultDescDialog, ExploreTabsDialog } from './component/dialog';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { mediaCardAppearanceActions, setMediaCardAppearance, setSettings } from '../settingsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ExploreTabsProps, MediaSettingsStackProps } from '../../../../navigation/types';
import { ListHeading } from '../../../../components/text';
import { ListSubheader } from '../../../../components/titles';
import {
    DefaultScoreDialog,
    MediaTileCustomizer,
    ScoreColorDialog,
} from '../appearance/components/dialogs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import danbooruApi from '../../../../app/services/danbooru/danbooruApi';

const MediaSettingScreen = ({
    navigation,
}: NativeStackScreenProps<MediaSettingsStackProps, 'msHome'>) => {
    const {
        defaultDescription,
        showNSFW,
        globalTagExclude,
        exploreTabs,
        exploreTabOrder,
        scoreColors,
        defaultScore,
        scoreHealthBar,
        scoreGlow,
        scoreNumber,
        mediaLanguage,
        showItemListStatus,
    } = useAppSelector((state) => state.persistedSettings);
    const { mode, isDark } = useAppSelector((state: RootState) => state.persistedTheme);
    const dispatch = useAppDispatch();
    const { colors } = useTheme();
    const [showDefDescDialog, setShowDefDescDialog] = useState(false);

    const [showScoreColorDialog, setShowScoreColorDialog] = useState(false);
    const [showDefaultScoreDialog, setShowDefaultScoreDialog] = useState(false);
    const [showMTCustomizer, setShowMTCustomizer] = useState(false);

    const [expTbsVis, setExpTbsVis] = useState<boolean>(false);

    const toggleExploreTabOptions = (isVis: boolean) => setExpTbsVis(isVis);

    const editExploreTabs = useCallback((tabs: (keyof ExploreTabsProps)[]) => {
        dispatch(setSettings({ entryType: 'exploreTabs', value: tabs }));
    }, []);

    const onSettingChange = useCallback((props: mediaCardAppearanceActions) => {
        dispatch(setMediaCardAppearance(props));
    }, []);

    return (
        <>
            <ScrollView>
                <ListSubheader title="Display" />
                <List.Item
                    title={'Explore Tabs'}
                    description={exploreTabOrder
                        .filter((item) => exploreTabs.includes(item))
                        .join(', ')}
                    descriptionStyle={{ textTransform: 'capitalize' }}
                    onPress={() => toggleExploreTabOptions(true)}
                />
                <List.Item
                    title="Default Description"
                    description={defaultDescription === 'ani' ? 'AniList' : 'MyAnimeList'}
                    onPress={() => setShowDefDescDialog(true)}
                />
                <ListSubheader title="Filter" />
                <List.Item
                    title="NSFW"
                    description={
                        Constants.executionEnvironment === ExecutionEnvironment.StoreClient
                            ? 'Permenantly disabled. \nApp store does not allow NSFW content.'
                            : '😈'
                    }
                    right={() => (
                        <Switch
                            value={showNSFW}
                            // thumbColor={colors.primary}
                            color={colors.primary}
                            onValueChange={(value) => {
                                dispatch(setSettings({ entryType: 'showNSFW', value: value }));
                                dispatch(
                                    danbooruApi.util.invalidateTags([
                                        'DanbooruSearch',
                                        'DanbooruPost',
                                    ]),
                                );
                            }}
                            disabled={
                                Constants.executionEnvironment === ExecutionEnvironment.StoreClient
                            }
                        />
                    )}
                />
                <List.Item
                    title="Banned Tags"
                    description={'Never show content with selected tags'}
                    right={(props) => <Text {...props}>{globalTagExclude?.length}</Text>}
                    onPress={() => navigation.navigate('bannedTags', { screen: 'btags' })}
                />
                <List.Section>
                    <ListSubheader title="Media Tile" />
                    <List.Item
                        title={'Layout'}
                        description={'Customize the look of media tiles'}
                        onPress={() => setShowMTCustomizer(true)}
                    />
                    <List.Item
                        title={'Default Score Type'}
                        description={defaultScore}
                        descriptionStyle={{ textTransform: 'capitalize' }}
                        onPress={() => setShowDefaultScoreDialog(true)}
                    />
                    <List.Item
                        title={'Score Weights'}
                        onPress={() => setShowScoreColorDialog(true)}
                        description={`0 <-- ${scoreColors.red} <--> ${scoreColors.yellow} --> 100`}
                    />
                </List.Section>
            </ScrollView>
            <Portal>
                <DefaultDescDialog
                    defaultValue={defaultDescription}
                    visible={showDefDescDialog}
                    onDismiss={() => setShowDefDescDialog(false)}
                />
                <ExploreTabsDialog vis={expTbsVis} toggleVis={toggleExploreTabOptions} />
                <DefaultScoreDialog
                    visible={showDefaultScoreDialog}
                    onDismiss={() => setShowDefaultScoreDialog(false)}
                    defaultScore={defaultScore}
                    updateDefaultScore={(scoreType: 'average' | 'mean') =>
                        dispatch(setSettings({ entryType: 'defaultScore', value: scoreType }))
                    }
                />
                <ScoreColorDialog
                    visible={showScoreColorDialog}
                    onDismiss={() => setShowScoreColorDialog(false)}
                    red={scoreColors.red}
                    yellow={scoreColors.yellow}
                    updateScoreColor={(red: number, yellow: number) =>
                        dispatch(
                            setSettings({
                                entryType: 'scoreColors',
                                value: { red: red, yellow: yellow },
                            }),
                        )
                    }
                />
                <MediaTileCustomizer
                    themeMode={mode}
                    visible={showMTCustomizer}
                    scoreHealthBar={scoreHealthBar}
                    scoreGlow={scoreGlow}
                    scoreNumber={scoreNumber}
                    showItemListStatus={showItemListStatus}
                    onSettingChange={onSettingChange}
                    mediaLanguage={mediaLanguage}
                    scoreColors={scoreColors}
                    onDismiss={() => setShowMTCustomizer(false)}
                />
            </Portal>
        </>
    );
};

export default MediaSettingScreen;
