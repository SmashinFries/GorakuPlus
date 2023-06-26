import { Dialog, Button, Chip, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { View } from 'react-native';

type PresetDialogProps = {
    visible: boolean;
    hideDialog: () => void;
};
export const PresetDialog = ({ visible, hideDialog }: PresetDialogProps) => {
    const { tagPresets } = useSelector((state: RootState) => state.persistedPresets);
    return (
        <Dialog visible={visible} onDismiss={hideDialog}>
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
                <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
