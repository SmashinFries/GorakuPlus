import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SettingsStackProps } from "../../../navigation/stacks/more";
import { List, Portal } from "react-native-paper";
import { setTheme } from "../../../theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useTokenTime } from "../../../utils/time";
import { useState } from "react";
import AniListLoginDialog from "../../../app/services/anilist/components/dialogs";
import { setAniAuth } from "../../../app/services/anilist/authSlice";
import { api } from "../../../app/services/anilist/enhanced";
import { Style } from "react-native-paper/lib/typescript/src/components/List/utils";

const AccountsScreen = ({}:NativeStackScreenProps<SettingsStackProps, 'settings'>) => {
    const { timeTillDeath } = useSelector((state: RootState) => state.persistedAniLogin);
    const { aniTokenTime } = useTokenTime({ death: Number(timeTillDeath) });
    const dispatch = useDispatch();
    const [showAniAuth, setShowAniAuth] = useState(false);

    const resetCache = () =>
        dispatch(api.util.invalidateTags(['ExploreAnime', 'ExploreManga', 'ExploreNovel']));

    const ActiveIcon = (props:{color:string, style?: Style }) => <List.Icon {...props} icon={'check'} color={'green'} />;

    return(
        <View>
            <List.Section>
                <List.Subheader>Accounts</List.Subheader>
                <List.Item
                    title="Anilist"
                    description={timeTillDeath && `Next Login:\n💀${aniTokenTime}💀`}
                    onPress={() => setShowAniAuth(true)}
                    right={(props) => ( timeTillDeath ?
                        <ActiveIcon {...props} />
                        : null
                    )}
                />
                <List.Item
                    title="Danbooru"
                    description="Not implemented"
                    onPress={() => null}
                    // right={(props) => <ActiveIcon {...props} />}
                />
            </List.Section>
            <Portal>
                <AniListLoginDialog
                    visible={showAniAuth}
                    rootPath={'explore'}
                    onDismiss={() => setShowAniAuth(false)}
                    onLogout={() => {
                        dispatch(setAniAuth({ token: '', timeTillDeath: '' }));
                        resetCache();
                    }}
                />
            </Portal>
        </View>
    );
};

export default AccountsScreen;