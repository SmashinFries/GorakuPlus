import { Dialog, Button, Chip, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { View } from 'react-native';
import { BasicDialogProps } from '../../../types';
import { useState } from 'react';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { NumberPicker } from '../../../components/picker';

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
