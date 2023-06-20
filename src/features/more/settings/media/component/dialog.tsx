import { Dialog, Text, RadioButton, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSettings } from '../../settingsSlice';

type Props = {
    visible: boolean;
    onDismiss: () => void;
    defaultValue: string;
};
export const DefaultDescDialog = ({ defaultValue, visible, onDismiss }: Props) => {
    const [value, setValue] = useState(defaultValue);
    const dispatch = useDispatch();

    const onDone = () => {
        dispatch(setSettings({ defaultDescription: value }));
        onDismiss();
    };

    const onCancel = () => {
        onDismiss();
        setValue(defaultValue);
    };

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Default Description</Dialog.Title>
            <Dialog.Content>
                <RadioButton.Group value={value} onValueChange={(val) => setValue(val)}>
                    <RadioButton.Item label="AniList" value="ani" />
                    <RadioButton.Item label="MyAnimeList" value="mal" />
                </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onDone}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
