import { useState } from 'react';
import { Dialog, RadioButton, Portal, Button } from 'react-native-paper';
import { useSettingsStore } from '@/store/settings/settingsStore';

type MediaLanguageDialogProps = {
	visible: boolean;
	hideDialog: () => void;
};
export const MediaLanguageDialog = ({ visible, hideDialog }: MediaLanguageDialogProps) => {
	const { mediaLanguage, setSettings } = useSettingsStore();
	const [lang, setLang] = useState(mediaLanguage);

	const langOptions: (typeof mediaLanguage)[] = ['english', 'romaji', 'native'];

	const onDone = () => {
		setSettings({ mediaLanguage: lang });
		hideDialog();
	};

	const onCancel = () => {
		setLang(mediaLanguage);
		hideDialog();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title>{'Media Language'}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						onValueChange={(newLang: typeof mediaLanguage) => setLang(newLang)}
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

type AppLanguageDialogProps = {
	visible: boolean;
	defaultLanguage: string;
	hideDialog: () => void;
};
export const AppLanguageDialog = ({
	visible,
	defaultLanguage,
	hideDialog,
}: AppLanguageDialogProps) => {
	const [_lang, setLang] = useState(defaultLanguage);

	// const onDone = () => {
	// 	i18n.changeLanguage(lang);
	// 	hideDialog();
	// };

	const onCancel = () => {
		setLang(defaultLanguage);
		hideDialog();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title>{'App Language'}</Dialog.Title>
				{/* <Dialog.Content>
					<RadioButton.Group onValueChange={(newLang) => setLang(newLang)} value={lang}>
						{Object.keys(LANGUAGES).map((langOption, idx) => (
							<RadioButton.Item
								key={idx}
								label={LANGUAGES[langOption]}
								labelStyle={{ textTransform: 'capitalize' }}
								value={langOption}
								// status={langOption === lang ? 'checked' : 'unchecked'}
							/>
						))}
					</RadioButton.Group>
				</Dialog.Content> */}
				<Dialog.Actions>
					<Button onPress={onCancel}>Cancel</Button>
					{/* <Button onPress={onDone}>Done</Button> */}
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
