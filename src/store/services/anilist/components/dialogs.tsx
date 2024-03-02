import React from 'react';
import { Platform, View } from 'react-native';
import { Button, Dialog, MD3Colors } from 'react-native-paper';

type AniListLoginDialogProps = {
	visible: boolean;
	onDismiss: () => void;
	onLogout: () => void;
	onRelogin: () => void;
};
const AniListLogoutDialog = ({
	visible,
	onDismiss,
	onLogout,
	onRelogin,
}: AniListLoginDialogProps) => {
	const isWeb = Platform.OS === 'web';

	const LogoutButton = () => (
		<Button
			onPress={() => {
				onLogout();
				onDismiss();
			}}
			textColor={MD3Colors.error50}
		>
			{'Logout'}
		</Button>
	);

	const RefetchButton = () => (
		<Button
			onPress={() => {
				onRelogin();
				onDismiss();
			}}
		>
			Re-login
		</Button>
	);

	return (
		<Dialog
			visible={visible}
			onDismiss={onDismiss}
			style={{ maxWidth: isWeb ? '50%' : undefined, alignSelf: isWeb ? 'center' : undefined }}
		>
			<Dialog.Title>{'Logout of Anilist?'}</Dialog.Title>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<RefetchButton />
				<LogoutButton />
			</Dialog.Actions>
		</Dialog>
	);
};

export default AniListLogoutDialog;
