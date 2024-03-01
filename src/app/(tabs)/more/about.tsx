import { useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';

import * as Updates from 'expo-updates';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { ActivityIndicator, Button, List, Portal, Text } from 'react-native-paper';
import { Accordion } from '@/components/animations';
import { LinkButton } from '@/components/more/settings/about/buttons';
import {
    AnilistIcon,
    AnimeThemesIcon,
    DanbooruIcon,
    GumroadIcon,
    MalIcon,
    MangaUpdatesIcon,
} from '@/components/svgs';
import { useAppSelector } from '@/store/hooks';
import { Image } from 'expo-image';
import { UpdateDialog } from '@/components/updates';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';

const AboutPage = () => {
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
    const [updateLink, setUpdateLink] = useState<string | null>(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    const checkForUpdates = async () => {
        setIsCheckingUpdates(true);
        const results = await fetch('https://api.github.com/repos/KuzuLabz/GorakuSite/releases');
        const jsonResult = await results?.json();
        const newestVersion = jsonResult[0]?.tag_name ?? null;

        if (newestVersion && newestVersion !== Constants?.expoConfig?.version) {
            setUpdateLink(jsonResult[0]?.assets[0]?.browser_download_url);
            setShowUpdateDialog(true);
        } else {
            Burnt.toast({ title: 'No updates available', duration: TOAST.SHORT });
        }
        setIsCheckingUpdates(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <List.Item
                title={'Version'}
                description={`${Constants?.expoConfig?.version}${
                    Constants.executionEnvironment !== ExecutionEnvironment.StoreClient
                        ? ' (uncensored)'
                        : ' (censored)'
                }${Updates.createdAt ? `\n📅 ${Updates.createdAt?.toLocaleString()}` : ''}`}
                descriptionStyle={{ textTransform: 'capitalize' }}
                descriptionNumberOfLines={3}
            />
            {Constants.executionEnvironment !== ExecutionEnvironment.StoreClient && (
                <List.Item
                    title={'Check for Updates'}
                    onPress={checkForUpdates}
                    right={(props) => (isCheckingUpdates ? <ActivityIndicator {...props} /> : null)}
                />
            )}
            <Accordion title="Other Apps" titleFontSize={16}>
                <Text style={{ marginLeft: 20 }}>Visual novel browser coming soon!</Text>
            </Accordion>
            <Accordion title="Data Sources" titleFontSize={16} initialExpand>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <LinkButton
                        url="https://anilist.co/home"
                        label="Anilist"
                        icon={() => <AnilistIcon isDark />}
                    />
                    <LinkButton
                        url="https://jikan.moe/"
                        label="Jikan"
                        icon={(props) => (
                            <Image
                                source={require('../../../../assets/jikan.logo.png')}
                                style={{ height: 46, width: 46 }}
                            />
                        )}
                        transparentBg
                    />
                    <LinkButton
                        url="https://myanimelist.net/"
                        label="MyAnimeList"
                        icon={() => <MalIcon />}
                        transparentBg
                    />
                    <LinkButton
                        url="https://www.mangaupdates.com/"
                        label="MangaUpdates"
                        icon={() => <MangaUpdatesIcon />}
                        transparentBg
                    />
                    <LinkButton
                        url="https://books.google.com/"
                        label="Google Books"
                        icon={'google'}
                    />
                    <LinkButton
                        url={
                            showNSFW
                                ? 'https://danbooru.donmai.us/'
                                : 'https://safebooru.donmai.us/'
                        }
                        label="Danbooru"
                        icon={() => <DanbooruIcon />}
                        transparentBg
                    />
                    <LinkButton
                        url={'https://animethemes.moe/'}
                        label="AnimeThemes"
                        icon={() => <AnimeThemesIcon />}
                        transparentBg
                    />
                    <LinkButton
                        url={'https://trace.moe/'}
                        label="trace.moe"
                        icon={(props) => (
                            <Image
                                source={{ uri: 'https://trace.moe/favicon128.png' }}
                                style={{ height: 46, width: 46 }}
                            />
                        )}
                        transparentBg
                    />
                    {/* <LinkButton
                        url="https://waifu.it/"
                        label="Waifu.It"
                        icon={(props) => (
                            <Image
                                source={require('../../../../assets/waifu.it.logo.png')}
                                style={{ height: 46, width: 46 }}
                            />
                        )}
                        transparentBg
                    /> */}
                </ScrollView>
            </Accordion>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginBottom: 10,
                    }}
                >
                    <Text>Created by KuzuLabz ❤️</Text>
                </View>

                <View
                    style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                >
                    {/* <Text>When you find bugs or issues, send me a DM!</Text>
                <Button
                    icon={'instagram'}
                    onPress={() => Linking.openURL('https://www.instagram.com/smashinfries')}
                >
                    @smashinfries
                </Button> */}
                    <LinkButton url="https://goraku.kuzulabz.com/" icon={'earth'} size={28} />
                    {/* <LinkButton
                    url="https://github.com/KuzuLabz/gorakusite"
                    icon={'github'}
                    size={28}
                /> */}
                    <LinkButton url="https://discord.gg/gdenWHjXBv" icon={'discord'} size={28} />
                    {/* <LinkButton url="https://www.instagram.com/kuzulabz" icon={'instagram'} size={28} /> */}
                    <LinkButton
                        url="https://www.kuzumerch.com"
                        icon={'storefront-outline'}
                        size={28}
                    />
                </View>
            </View>
            <Portal>
                <UpdateDialog
                    visible={showUpdateDialog}
                    onDismiss={() => setShowUpdateDialog(false)}
                    updateLink={updateLink}
                />
            </Portal>
        </View>
    );
};

export default AboutPage;
