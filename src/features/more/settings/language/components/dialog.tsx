import { useState } from 'react';
import { Dialog, RadioButton, Portal, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setSettings } from '../../settingsSlice';
import { useAppDispatch } from '../../../../../app/hooks';

type MediaLanguageDialogProps = {
    visible: boolean;
    defaultLanguage: 'romaji' | 'english' | 'native';
    hideDialog: () => void;
};
export const MediaLanguageDialog = ({
    visible,
    defaultLanguage,
    hideDialog,
}: MediaLanguageDialogProps) => {
    const [lang, setLang] = useState(defaultLanguage);
    const dispatch = useAppDispatch();
    const langOptions: MediaLanguageDialogProps['defaultLanguage'][] = [
        'english',
        'romaji',
        'native',
    ];

    const onDone = () => {
        dispatch(setSettings({ entryType: 'mediaLanguage', value: lang }));
        hideDialog();
    };

    const onCancel = () => {
        setLang(defaultLanguage);
        hideDialog();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Media Language</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group
                        onValueChange={(newLang: MediaLanguageDialogProps['defaultLanguage']) =>
                            setLang(newLang)
                        }
                        value={lang}
                    >
                        {langOptions.map((langOption, idx) => (
                            <RadioButton.Item
                                key={idx}
                                label={langOption}
                                labelStyle={{ textTransform: 'capitalize' }}
                                value={langOption}
                                // status={langOption === lang ? 'checked' : 'unchecked'}
                            />
                        ))}
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel}>Cancel</Button>
                    <Button onPress={onDone}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
