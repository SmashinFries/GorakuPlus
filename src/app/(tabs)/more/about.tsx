import { useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';

import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import { ToastAndroid } from 'react-native';
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
            ToastAndroid.show('No updates available', ToastAndroid.SHORT);
        }
        setIsCheckingUpdates(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <List.Item
                title={'Version'}
                description={`${Constants?.expoConfig?.version}${
                    Updates.createdAt ? ` (${Updates.createdAt?.toLocaleString()})` : ''
                }`}
                descriptionStyle={{ textTransform: 'capitalize' }}
            />
            <List.Item
                title={'Check for Updates'}
                onPress={checkForUpdates}
                right={(props) => (isCheckingUpdates ? <ActivityIndicator {...props} /> : null)}
            />
            <Accordion title="Data Sources" titleFontSize={16} initialExpand>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <LinkButton
                        url="https://anilist.co/home"
                        label="Anilist"
                        icon={() => <AnilistIcon />}
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
                <LinkButton
                    url="https://github.com/KuzuLabz/gorakusite"
                    icon={'github'}
                    size={28}
                />
                <LinkButton url="https://www.instagram.com/kuzulabz" icon={'instagram'} size={28} />
                <LinkButton url="https://www.kuzumerch.com" icon={'storefront-outline'} size={28} />
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
