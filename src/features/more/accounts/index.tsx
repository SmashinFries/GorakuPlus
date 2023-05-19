import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button, List, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AniListLoginDialog from "../../../app/services/anilist/components/dialogs";
import { setAniAuth } from "../../../app/services/anilist/authSlice";
import { api } from "../../../app/services/anilist/enhanced";
import { Style } from "react-native-paper/lib/typescript/src/components/List/utils";
import { MoreStackProps } from "../../../navigation/types";
import { RootState } from "../../../app/store";
import * as WebBrowser from 'expo-web-browser';
import { useAnilistAuth } from "../../../app/services/anilist/hooks/authAni";
import { AnilistIcon, DanbooruIcon } from "../../../components/svgs";

WebBrowser.maybeCompleteAuthSession();

const AccountsScreen = ({}:NativeStackScreenProps<MoreStackProps, 'accounts'>) => {
    const { deathDate } = useSelector((state: RootState) => state.persistedAniLogin);
    const aniAuth = useAnilistAuth();
    // const { aniTokenTime } = useTokenTime({ death: Number(timeTillDeath) });
    const dispatch = useDispatch();
    const [showAniAuth, setShowAniAuth] = useState(false);

    const resetCache = () =>
        dispatch(api.util.invalidateTags(['ExploreAnime', 'ExploreManga', 'ExploreNovel']));

    const ActiveIcon = (props:{color:string, style?: Style }) => <List.Icon {...props} icon={'check'} color={'green'} />;

    useEffect(() => {
        setShowAniAuth(false);
    },[])

    return(
        <View>
            <List.Section>
                <List.Subheader>Accounts</List.Subheader>
                <List.Item
                    title="Anilist"
                    description={deathDate && `Expires: ${deathDate}`}
                    onPress={() => deathDate ? setShowAniAuth(true) : aniAuth.promptAsync()}
                    right={(props) => ( deathDate ?
                        <ActiveIcon {...props} />
                        : null
                    )}
                    left={(props) => <AnilistIcon style={props.style} />}
                    
                />
                <List.Item
                    title="Danbooru"
                    description="🚧"
                    onPress={() => null}
                    left={(props) => <DanbooruIcon style={props.style} />}
                    // right={(props) => <ActiveIcon {...props} />}
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
            </Portal>
        </View>
    );
};

export default AccountsScreen;