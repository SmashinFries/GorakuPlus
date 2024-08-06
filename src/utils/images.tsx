import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { Button, Dialog, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';

export const saveImage = async (url: string, name = null) => {
	const { status } = await MediaLibrary.requestPermissionsAsync();
	const formattedTitle = name ?? 'mal_' + url.split('/').pop()?.split('.')[0];
	const fileUri = FileSystem.documentDirectory + formattedTitle + `.${url.split('.').at(-1)}`;
	if (status === MediaLibrary.PermissionStatus.GRANTED) {
		try {
			const result = await FileSystem.downloadAsync(url, fileUri);
			await MediaLibrary.saveToLibraryAsync(result.uri);
			await impactAsync(ImpactFeedbackStyle.Light);
			Burnt.toast({ title: 'Image Saved', duration: TOAST.SHORT });
		} catch (e) {
			Burnt.toast({ title: 'Image failed to save', duration: TOAST.LONG });
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
		// @ts-ignore | how to type this???
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

export const getImageB64 = async (camera?: boolean, url?: string): Promise<string | null> => {
	if (url) {
		const imgType = ['jpg', 'jpeg', 'png'].includes(url.split('.').at(-1))
			? url.split('.').at(-1)
			: 'jpg';
		try {
			const { uri } = await FileSystem.downloadAsync(
				url,
				FileSystem.documentDirectory + `temp.${imgType}`,
			);
			const base64 = await FileSystem.readAsStringAsync(uri, {
				encoding: 'base64',
			});
			return `data:image/${imgType};base64,${base64}`;
		} catch (e) {
			return null;
		}
	} else {
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
		const imgType = ['jpg', 'jpeg', 'png'].includes(result.assets[0].uri.split('.').at(-1))
			? result.assets[0].uri.split('.').at(-1)
			: 'jpg';
		if (!result.canceled) {
			return `data:image/${imgType};base64,${result.assets[0].base64}`;
		} else {
			return null;
		}
	}
};
