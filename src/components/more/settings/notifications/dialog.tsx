import { Button, Dialog, List } from 'react-native-paper';
import { NumberPicker } from '../../../picker';
import { useCallback, useEffect, useState } from 'react';

type FetchIntervalDialogProps = {
	visible: boolean;
	initialInterval: number;
	options?: string[];
	title?: string;
	onDismiss: () => void;
	updateInterval: (value: number) => void;
};
export const FetchIntervalDialog = ({
	visible,
	initialInterval,
	options,
	title,
	onDismiss,
	updateInterval,
}: FetchIntervalDialogProps) => {
	const [interval, setInterval] = useState(initialInterval);

	const onChange = useCallback((value: number) => {
		setInterval(value);
	}, []);

	const onCancel = useCallback(() => {
		onDismiss();
	}, []);

	const onConfirm = useCallback(() => {
		// -1 as index starts at 0
		updateInterval(interval);
		onDismiss();
	}, [interval]);

	useEffect(() => {
		if (visible) {
			setInterval(initialInterval);
		}
	}, [visible]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>{title ?? 'Notification Frequency (hours)'}</Dialog.Title>
			<Dialog.Content>
				<NumberPicker defaultValue={interval - 1} options={options} onChange={onChange} />
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>Cancel</Button>
				<Button onPress={onConfirm}>Confirm</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
