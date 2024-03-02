import { BasicDialogProps } from '@/types';
import { openWebBrowser } from '@/utils/webBrowser';
import { Button, Dialog, Text } from 'react-native-paper';

type UpdateDialogProps = BasicDialogProps & {
	updateLink: string | null;
};
export const UpdateDialog = ({ visible, updateLink, onDismiss }: UpdateDialogProps) => {
	const onUpdate = () => {
		openWebBrowser(updateLink);
		onDismiss();
	};
	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>New Update</Dialog.Title>
			<Dialog.Content>
				<Text>There is a new update available!</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Dismiss</Button>
				<Button onPress={onUpdate}>Update</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
