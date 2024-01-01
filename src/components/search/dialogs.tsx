import {
    Dialog,
    Button,
    Chip,
    Text,
    useTheme,
    TextInput,
    IconButton,
    Searchbar,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Pressable, View } from 'react-native';
import { useState } from 'react';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { BasicDialogProps } from '@/types';
import { NumberPicker } from '../picker';
import { SearchBar } from 'react-native-screens';
import { selectImage } from '@/utils/images';

export const PresetDialog = ({ visible, onDismiss }: BasicDialogProps) => {
    const { tagPresets } = useSelector((state: RootState) => state.persistedPresets);
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Tag Presets</Dialog.Title>
            <Dialog.Content>
                <Dialog.ScrollArea>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {tagPresets.map((preset, idx) => (
                            <Chip key={idx} style={{ margin: 8 }}>
                                {preset.title}
                            </Chip>
                        ))}
                    </View>
                </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

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
    minValue = 0,
    maxValue = 100,
}: ScoreDialogProps) => {
    const { colors } = useTheme();
    const [value, setValue] = useState(0);
    return (
        <NativeViewGestureHandler disallowInterruption={true}>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Notification Frequency (hours)</Dialog.Title>
                <Dialog.Content>
                    <NumberPicker
                        defaultValue={initialScore}
                        mode="scores"
                        onChange={(number) => updateScore(number)}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    {/* <Button onPress={onCancel}>Cancel</Button>
                    <Button onPress={onConfirm}>Confirm</Button> */}
                </Dialog.Actions>
            </Dialog>
        </NativeViewGestureHandler>
    );
};

type ImageSearchDialogProps = BasicDialogProps & {
    searchImage: (imageType: 'camera' | 'upload') => void;
    searchUrl: (url: string) => void;
};
export const ImageSearchDialog = ({
    visible,
    onDismiss,
    searchImage,
    searchUrl,
}: ImageSearchDialogProps) => {
    const [imageUrl, setImageUrl] = useState('');
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Image Search</Dialog.Title>
            <Dialog.Content>
                <View>
                    <Searchbar
                        value={imageUrl}
                        mode="view"
                        onChangeText={(txt) => setImageUrl(txt)}
                        onSubmitEditing={(e) => {
                            searchUrl(e.nativeEvent.text);
                            onDismiss();
                        }}
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
                            onPress={() => {
                                searchImage('camera');
                                onDismiss();
                            }}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <IconButton icon="camera" />
                            <Text style={{ textAlign: 'center' }}>Take a photo</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                searchImage('upload');
                                onDismiss();
                            }}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <IconButton icon="image-outline" />
                            <Text style={{ textAlign: 'center' }}>Upload Image</Text>
                        </Pressable>
                    </View>
                </View>
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
                {/* <Button onPress={onDismiss}>Search</Button> */}
            </Dialog.Actions>
        </Dialog>
    );
};
