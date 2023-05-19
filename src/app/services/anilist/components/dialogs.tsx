import React from 'react';
import { Platform, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useAnilistAuth } from '../hooks/authAni';
import { RootNavPaths } from '../../../../navigation/types';

type AniListLoginDialogProps = {
    visible: boolean;
    onDismiss: () => void;
    rootPath: keyof RootNavPaths;
    onLogout: () => void;
};
const AniListLoginDialog = ({
    visible,
    onDismiss,
    rootPath,
    onLogout,
}: AniListLoginDialogProps) => {
    const { timeTillDeath, token } = useSelector((state: RootState) => state.persistedAniLogin);
    const { request, promptAsync, result } = useAnilistAuth(rootPath);
    const isWeb = Platform.OS === 'web';

    const LoginInfo = (
        <Dialog.Content>
            <Text variant="titleLarge">Time till next login:</Text>
            <Text variant="bodyLarge">{timeTillDeath}</Text>
        </Dialog.Content>
    );

    const LoginButton = () => (
        <Button
            onPress={() => {
                token ? onLogout() : promptAsync().catch((e) => console.log(e));
            }}
        >
            {token ? 'Logout' : 'Login'}
        </Button>
    );

    return (
        <Dialog
            visible={visible}
            onDismiss={onDismiss}
            style={{ maxWidth: isWeb ? '50%' : null, alignSelf: isWeb ? 'center' : null }}
        >
            <Dialog.Title>{!token ? 'Login to Anilist?' : 'Logout of Anilist?'}</Dialog.Title>
            {token ? LoginInfo : null}
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                {<LoginButton />}
            </Dialog.Actions>
        </Dialog>
    );
};

export default AniListLoginDialog;
