import { Dialog, Button, Text, IconButton, Searchbar } from 'react-native-paper';
import {
	Pressable,
	View,
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
} from 'react-native';
import { useState } from 'react';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { BasicDialogProps } from '@/types';
import { NumberPicker } from '../picker';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useSearchStore } from '@/store/search/searchStore';
import { selectImage } from '@/utils/images';
import { ImagePickerAsset } from 'expo-image-picker';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { SauceNaoSheetProps, TraceMoeSheetProps } from '../sheets/bottomsheets';

// export const PresetDialog = ({ visible, onDismiss }: BasicDialogProps) => {
// 	return (
// 		<Dialog visible={visible} onDismiss={onDismiss}>
// 			<Dialog.Title>Tag Presets</Dialog.Title>
// 			<Dialog.Content>
// 				<Dialog.ScrollArea>
// 					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
// 						{tagPresets.map((preset, idx) => (
// 							<Chip key={idx} style={{ margin: 8 }}>
// 								{preset.title}
// 							</Chip>
// 						))}
// 					</View>
// 				</Dialog.ScrollArea>
// 			</Dialog.Content>
// 			<Dialog.Actions>
// 				<Button onPress={onDismiss}>Done</Button>
// 			</Dialog.Actions>
// 		</Dialog>
// 	);
// };

type ScoreDialogProps = BasicDialogProps & {
	updateScore: (score: number) => void;
	initialScore?: number;
	minValue?: number;
	maxValue?: number;
};
export const ScoreDialog = ({
	visible,
	onDismiss,
	initialScore,
	updateScore,
}: ScoreDialogProps) => {
	return (
		<NativeViewGestureHandler disallowInterruption={true}>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Notification Frequency (hours)</Dialog.Title>
				<Dialog.Content>
					<NumberPicker
						defaultValue={initialScore}
						mode="hours"
						onChange={(number) => updateScore(number)}
					/>
				</Dialog.Content>
				{/* <Dialog.Actions>
					<Button onPress={onCancel}>Cancel</Button>
                    <Button onPress={onConfirm}>Confirm</Button>
				</Dialog.Actions> */}
			</Dialog>
		</NativeViewGestureHandler>
	);
};

type ImageSearchDialogProps = BasicDialogProps & {
	openTraceMoeSheet: (url?: string, image?: TraceMoeSheetProps['image']) => void;
	openSauceNaoSheet: (file?: SauceNaoSheetProps['file']) => void;
};
export const ImageSearchDialog = ({
	visible,
	onDismiss,
	openTraceMoeSheet,
	openSauceNaoSheet,
}: ImageSearchDialogProps) => {
	const searchType = useSearchStore(useShallow((state) => state.searchType));
	const [imageUrl, setImageUrl] = useState('');
	const isSauceNaoAuth = useAuthStore((state) => !!state.sauceNao.api_key);

	const onUrlSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
		switch (searchType) {
			case MediaType.Anime:
				openTraceMoeSheet(e.nativeEvent?.text);
				// SheetManager.show('TraceMoeSheet', {
				// 	payload: { url: e.nativeEvent?.text },
				// });
				break;
			case MediaType.Manga:
				openSauceNaoSheet(e.nativeEvent.text);
				// SheetManager.show('SauceNaoSheet', {
				// 	payload: {
				// 		file: e.nativeEvent.text,
				// 	},
				// });
				break;
			case 'CHARACTER':
				router.push({
					pathname: '/(sheets)/characterSearchSheet',
					params: {
						imageUrl: e.nativeEvent.text,
					},
				});
				break;
			default:
				break;
		}
		onDismiss();
	};

	const onImageSelect = async (camera?: boolean) => {
		const asset = (await selectImage(camera, true)) as ImagePickerAsset;
		switch (searchType) {
			case MediaType.Anime:
				openTraceMoeSheet(undefined, {
					uri: asset.uri,
					type: asset.mimeType,
					name: asset.fileName ?? 'image',
				});
				// SheetManager.show('TraceMoeSheet', {
				// 	payload: {
				// 		image: {
				// 			uri: asset.uri,
				// 			type: asset.mimeType,
				// 			name: asset.fileName ?? 'image',
				// 		},
				// 	},
				// });
				break;
			case MediaType.Manga:
				openSauceNaoSheet({
					uri: asset.uri,
					type: asset.mimeType,
					name: asset.fileName ?? 'image',
				});
				// SheetManager.show('SauceNaoSheet', {
				// 	payload: {
				// 		file: {
				// 			uri: asset.uri,
				// 			type: asset.mimeType,
				// 			name: asset.fileName ?? 'image',
				// 		},
				// 	},
				// });
				break;
			case 'CHARACTER':
				router.push({
					pathname: '/(sheets)/characterSearchSheet',
					params: {
						imageUrl: asset.uri,
					},
				});
				break;
			default:
				break;
		}
		onDismiss();
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title style={{ textTransform: 'capitalize' }}>
				{searchType} Image Search
			</Dialog.Title>
			<Dialog.Content>
				{searchType === MediaType.Manga && !isSauceNaoAuth ? (
					<View>
						<Text>This feature requires a SauceNao account.</Text>
					</View>
				) : (
					<View>
						<Searchbar
							value={imageUrl}
							mode="bar"
							elevation={1}
							onChangeText={(txt) => setImageUrl(txt)}
							onSubmitEditing={onUrlSubmit}
						/>
						<Text style={{ textAlign: 'center', paddingVertical: 12 }}>- Or -</Text>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'space-evenly',
								flexDirection: 'row',
							}}
						>
							<Pressable
								onPress={() => onImageSelect(true)}
								style={{ alignItems: 'center', justifyContent: 'center' }}
								disabled={searchType === 'CHARACTER'}
							>
								<IconButton icon="camera" disabled={searchType === 'CHARACTER'} />
								<Text style={{ textAlign: 'center' }}>Take a photo</Text>
							</Pressable>
							<Pressable
								onPress={() => onImageSelect()}
								style={{ alignItems: 'center', justifyContent: 'center' }}
								disabled={searchType === 'CHARACTER'}
							>
								<IconButton
									icon="image-outline"
									disabled={searchType === 'CHARACTER'}
								/>
								<Text style={{ textAlign: 'center' }}>Upload Image</Text>
							</Pressable>
						</View>
					</View>
				)}
				{/* <Dialog.ScrollArea>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {tagPresets.map((preset, idx) => (
                            <Chip key={idx} style={{ margin: 8 }}>
                                {preset.title}
                            </Chip>
                        ))}
                    </View>
                </Dialog.ScrollArea> */}
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				{searchType === MediaType.Manga && !isSauceNaoAuth && (
					<Button
						onPress={() => {
							onDismiss();
							router.navigate('/(tabs)/more/accounts');
						}}
					>
						Login
					</Button>
				)}
				{/* <Button onPress={onDismiss}>Search</Button> */}
			</Dialog.Actions>
		</Dialog>
	);
};
