import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { ToastAndroid } from 'react-native';
import { Button, Dialog, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';

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

export const selectImage = async (camera?: boolean): Promise<FormData | null> => {
    const data = new FormData();
    const result = camera
        ? await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 0.75,
              base64: true,
              allowsMultipleSelection: false,
          })
        : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 1,
              base64: true,
              allowsMultipleSelection: false,
          });

    if (!result.canceled) {
        const imageType = result.assets[0].uri.split('.').at(-1);
        // const imgBlob = imageURItoBlob(result.assets[0].uri);
        // const blobUrl = URL.createObjectURL(imgBlob);
        // const image_base64 =
        //     `data:image/${imageType === 'jpg' ? 'jpeg' : imageType};base64,` +
        //     result.assets[0].base64;
        data.append('image', {
            name: 'image',
            type: `image/${imageType === 'jpg' ? 'jpeg' : imageType}`,
            uri: result.assets[0].uri,
        });
        return data;
    } else {
        return null;
    }
};
