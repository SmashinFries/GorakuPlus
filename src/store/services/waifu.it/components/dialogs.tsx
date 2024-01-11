import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BasicDialogProps } from '@/types';
import { openWebBrowser } from '@/utils/webBrowser';
import React from 'react';
import { Platform } from 'react-native';
import { Button, Dialog, Text, TextInput } from 'react-native-paper';
import { setWaifuItToken } from '../tokenSlice';
import { copyToClipboard } from '@/utils';

const WaifuItTokenDialog = ({ visible, onDismiss }: BasicDialogProps) => {
    const isWeb = Platform.OS === 'web';
    const { token } = useAppSelector((state) => state.persistedWaifuItToken);
    const dispatch = useAppDispatch();
    const [inputToken, setInputToken] = React.useState(token);

    const onConfirm = () => {
        dispatch(setWaifuItToken(inputToken));
        onDismiss();
    };

    return (
        <Dialog
            visible={visible}
            onDismiss={onDismiss}
            style={{ maxWidth: isWeb ? '50%' : undefined, alignSelf: isWeb ? 'center' : undefined }}
        >
            <Dialog.Title>{'Waifu.It Login'}</Dialog.Title>
            <Dialog.Content>
                <Text style={{ paddingBottom: 10, fontWeight: '900' }}>
                    Discord login required!
                </Text>
                <Text>
                    To use Waifu.It, you need to claim a token. Once you have a token, enter it
                    below.
                </Text>
                <Button
                    mode="elevated"
                    onPress={() => openWebBrowser('https://docs.waifu.it/faq')}
                    style={{ marginVertical: 20 }}
                >
                    Get Token
                </Button>
                <TextInput
                    mode="outlined"
                    label={'Token'}
                    placeholder="Enter token here..."
                    value={inputToken}
                    onChangeText={(txt) => setInputToken(txt)}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                <Button onPress={onConfirm}>Save</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default WaifuItTokenDialog;
