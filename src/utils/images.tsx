import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { ToastAndroid } from 'react-native';
import { Button, Dialog, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { useCallback } from 'react';

export const saveImage = async (url: string, name = null) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    const formattedTitle = name ?? 'mal_' + url.split('/').pop()?.split('.')[0];
    console.log(`.${url.split('.').at(-1)}`);
    const fileUri = FileSystem.documentDirectory + formattedTitle + `.${url.split('.').at(-1)}`;
    if (status === MediaLibrary.PermissionStatus.GRANTED) {
        try {
            const result = await FileSystem.downloadAsync(url, fileUri);
            await MediaLibrary.saveToLibraryAsync(result.uri);
            await impactAsync(ImpactFeedbackStyle.Light);
            ToastAndroid.show('Image Saved', ToastAndroid.SHORT);
        } catch (e) {
            console.log(e);
        }
    }
};

type SaveImageDialogProps = {
    img_url: string;
    prefix?: string;
    filename?: string;
    onDismiss: () => void;
};
export const SaveImageDialog = ({
    img_url,
    prefix = 'mal_',
    filename,
    onDismiss,
}: SaveImageDialogProps) => {
    const onSave = useCallback(async () => {
        await saveImage(img_url, filename ?? prefix + img_url.split('/').pop()?.split('.')[0]).then(
            () => onDismiss(),
        );
    }, [img_url]);
    return (
        <Dialog visible={img_url ? true : false} onDismiss={onDismiss}>
            <Dialog.Title>Save Image</Dialog.Title>
            <Dialog.Content style={{ justifyContent: 'center' }}>
                {img_url ? (
                    <Image
                        source={{ uri: img_url }}
                        style={{ width: '100%', height: 300 }}
                        contentFit="scale-down"
                    />
                ) : null}
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                <Button icon={'download'} onPress={onSave}>
                    Save
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};
