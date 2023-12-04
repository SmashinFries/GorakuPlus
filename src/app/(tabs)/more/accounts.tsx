import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { List, Portal, Text, useTheme } from 'react-native-paper';
import { useAnilistAuth } from '@/store/services/anilist/hooks/authAni';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/store/services/anilist/enhanced';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { AnilistIcon } from '@/components/svgs';
import { setAniAuth } from '@/store/services/anilist/authSlice';
import AniListLoginDialog from '@/store/services/anilist/components/dialogs';
import { ListSubheader } from '@/components/titles';
import WaifuItTokenDialog from '@/store/services/waifu.it/components/dialogs';

WebBrowser.maybeCompleteAuthSession();

const AccountsPage = () => {
    const { deathDate, username } = useAppSelector((state) => state.persistedAniLogin);
    const { token } = useAppSelector((state) => state.persistedWaifuItToken);
    const { colors, dark } = useTheme();
    const aniAuth = useAnilistAuth();
    const dispatch = useAppDispatch();
    const [showAniAuth, setShowAniAuth] = useState(false);
    const [showWaifuIt, setShowWaifuIt] = useState(false);

    const resetCache = useCallback(
        () =>
            dispatch(
                api.util.invalidateTags([
                    'ExploreAnime',
                    'ExploreManga',
                    'ExploreManhwa',
                    'ExploreNovel',
                    'AniMedia',
                ]),
            ),
        [],
    );

    const ActiveIcon = (props: { color: string; style?: Style }) => (
        <List.Icon {...props} icon={'check'} color={'green'} />
    );

    useEffect(() => {
        setShowAniAuth(false);
    }, []);

    return (
        <View>
            <List.Section>
                <ListSubheader title="Main" />
                <List.Item
                    title="Anilist"
                    description={deathDate && `Expires: ${deathDate}`}
                    onPress={() => (deathDate ? setShowAniAuth(true) : aniAuth.promptAsync())}
                    // onPress={() => console.log(dark)}
                    right={(props) => (deathDate ? <ActiveIcon {...props} /> : null)}
                    left={(props) => <AnilistIcon style={props.style} isDark={dark} />}
                />
                <ListSubheader title="Extras" />
                <List.Item
                    title="Waifu.It"
                    description={'Anime Quotes, Facts, Emotes, Gifs, and More!'}
                    onPress={() => setShowWaifuIt(true)}
                    right={(props) => (token ? <ActiveIcon {...props} /> : null)}
                    left={(props) => (
                        <List.Image
                            source={require('../../../../assets/waifu.it.logo.png')}
                            style={[props.style]}
                        />
                    )}
                />
            </List.Section>
            <Portal>
                <AniListLoginDialog
                    visible={showAniAuth}
                    onDismiss={() => setShowAniAuth(false)}
                    onLogout={() => {
                        dispatch(setAniAuth({ token: '', deathDate: '' }));
                        resetCache();
                    }}
                    onRelogin={() => aniAuth.promptAsync()}
                />
                <WaifuItTokenDialog visible={showWaifuIt} onDismiss={() => setShowWaifuIt(false)} />
            </Portal>
        </View>
    );
};

export default AccountsPage;
