import { useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';

import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import { ToastAndroid } from 'react-native';
import { ActivityIndicator, Button, List, Text } from 'react-native-paper';
import { Accordion } from '@/components/animations';
import { LinkButton } from '@/components/more/settings/about/buttons';
import {
    AnilistIcon,
    DanbooruIcon,
    GumroadIcon,
    MalIcon,
    MangaUpdatesIcon,
} from '@/components/svgs';
import { useAppSelector } from '@/store/hooks';
import { Image } from 'expo-image';

const AboutPage = () => {
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

    const checkForUpdates = async () => {
        setIsCheckingUpdates(true);
        const results = await Updates.checkForUpdateAsync();

        if (results.isAvailable) {
            await Updates.fetchUpdateAsync();
            ToastAndroid.show('Update available! Restarting app', ToastAndroid.LONG);
            setIsCheckingUpdates(false);
            await Updates.reloadAsync();
        } else {
            ToastAndroid.show('No updates available', ToastAndroid.SHORT);
            setIsCheckingUpdates(false);
        }
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
            <Accordion title="Data Sources" initialExpand>
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
                        url="https://waifu.it/"
                        label="Waifu.It"
                        icon={(props) => (
                            <Image
                                source={require('../../../../assets/waifu.it.logo.png')}
                                style={{ height: 46, width: 46 }}
                            />
                        )}
                        transparentBg
                    />
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
                <LinkButton url="https://kuzulabz.com/" icon={'earth'} size={28} />
                <LinkButton
                    url="https://store.kuzulabz.com/"
                    icon={() => <GumroadIcon fillColor="#ff90e8" />}
                    size={28}
                    bgColor="#000"
                />
                <LinkButton url="https://github.com/SmashinFries" icon={'github'} size={28} />
                <LinkButton url="https://www.instagram.com/kuzulabz" icon={'instagram'} size={28} />
            </View>
        </View>
    );
};

export default AboutPage;
