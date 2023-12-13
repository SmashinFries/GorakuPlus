import {
    DefaultScoreDialog,
    MediaTileCustomizer,
    ScoreColorDialog,
} from '@/components/more/settings/appearance/dialogs';
import {
    DefaultDescDialog,
    ExploreTabsDialog,
    NSFWLevelDialog,
} from '@/components/more/settings/media/dialog';
import { FetchIntervalDialog } from '@/components/more/settings/notifications/dialog';
import { ListSubheader } from '@/components/titles';
import { updateSearchLimit } from '@/store/slices/search/historySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import danbooruApi from '@/store/services/danbooru/danbooruApi';
import { DanbooruRating } from '@/store/services/danbooru/types';
import {
    mediaCardAppearanceActions,
    setMediaCardAppearance,
    setSettings,
} from '@/store/slices/settingsSlice';
import { ExploreTabsProps } from '@/types/navigation';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List, Portal, Switch, Text, useTheme } from 'react-native-paper';

const MediaSettingsPage = () => {
    const {
        defaultDescription,
        showNSFW,
        blurNSFW,
        blurNSFWLevel,
        tagBlacklist,
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
    const { searchLimit } = useAppSelector((state) => state.persistedHistory);
    const { mode, isDark } = useAppSelector((state) => state.persistedTheme);

    const dispatch = useAppDispatch();
    const { colors } = useTheme();
    const [showDefDescDialog, setShowDefDescDialog] = useState(false);
    const [showSearchHistoryLimit, setShowSearchHistoryLimit] = useState(false);

    const [showScoreColorDialog, setShowScoreColorDialog] = useState(false);
    const [showDefaultScoreDialog, setShowDefaultScoreDialog] = useState(false);
    const [showMTCustomizer, setShowMTCustomizer] = useState(false);
    const [showNsfwLevelDialog, setShowNsfwLevelDialog] = useState(false);

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
                <ListSubheader title="Search" />
                <List.Item
                    title="Search History Limit"
                    onPress={() => setShowSearchHistoryLimit(true)}
                    right={(props) => (
                        <Text style={[props.style, { color: props.color }]}>{searchLimit}</Text>
                    )}
                />
                <ListSubheader title="NSFW" />
                <List.Item
                    title="NSFW"
                    description={
                        Constants.executionEnvironment === ExecutionEnvironment.StoreClient
                            ? 'Permenantly disabled. \nApp store does not allow NSFW content.'
                            : ''
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
                    title="NSFW Blur"
                    right={() => (
                        <Switch
                            value={blurNSFW}
                            // thumbColor={colors.primary}
                            color={colors.primary}
                            onValueChange={(value) => {
                                dispatch(setSettings({ entryType: 'blurNSFW', value: value }));
                                dispatch(
                                    danbooruApi.util.invalidateTags([
                                        'DanbooruSearch',
                                        'DanbooruPost',
                                    ]),
                                );
                            }}
                            disabled={
                                Constants.executionEnvironment ===
                                    ExecutionEnvironment.StoreClient || !showNSFW
                            }
                        />
                    )}
                />
                <List.Item
                    title="NSFW Blur Level (fanart)"
                    description={'Blur anything more severe than this'}
                    right={(props) => (
                        <Text
                            style={[
                                props.style,
                                { color: !blurNSFW ? colors.onSurfaceDisabled : props.color },
                            ]}
                        >
                            {
                                Object.entries(DanbooruRating).find(
                                    (value) => value[1] === blurNSFWLevel,
                                )[0]
                            }
                        </Text>
                    )}
                    onPress={() => setShowNsfwLevelDialog(true)}
                    disabled={!blurNSFW || !showNSFW}
                />
                <ListSubheader title="Tags" />
                <List.Item
                    title="Blacklisted Tags"
                    description={'Never show content with selected tags'}
                    right={(props) => <Text {...props}>{tagBlacklist?.length}</Text>}
                    // onPress={() => navigation.navigate('bannedTags', { screen: 'btags' })}
                    onPress={() => router.push('/more/settings/media/tagBlacklist')}
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
                <ExploreTabsDialog
                    visible={expTbsVis}
                    onDismiss={() => toggleExploreTabOptions(false)}
                />
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
                <NSFWLevelDialog
                    visible={showNsfwLevelDialog}
                    onDismiss={() => setShowNsfwLevelDialog(false)}
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
                <FetchIntervalDialog
                    initialInterval={searchLimit}
                    onDismiss={() => setShowSearchHistoryLimit(false)}
                    title="Search History Limit"
                    visible={showSearchHistoryLimit}
                    updateInterval={(value) => dispatch(updateSearchLimit(value))}
                    options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                />
            </Portal>
        </>
    );
};

export default MediaSettingsPage;
