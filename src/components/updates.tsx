import { Button, Dialog, Paragraph } from 'react-native-paper';
import * as Updates from 'expo-updates';

type UpdateDialogProps = {
    visible: boolean;
    onDismiss: () => void;
};
export const UpdateDialog = ({ visible, onDismiss }: UpdateDialogProps) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Update Available</Dialog.Title>
            <Dialog.Content>
                <Paragraph>An update is available. Would you like to update now?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                <Button onPress={Updates.reloadAsync}>Update</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
