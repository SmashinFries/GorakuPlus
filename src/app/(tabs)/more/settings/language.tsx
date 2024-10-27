import { MediaLanguageDialog } from '@/components/more/settings/language/dialog';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const LanguagePage = () => {
	const { mediaLanguage } = useSettingsStore();
	const [mediaLangVisible, setMediaLangVisible] = useState(false);
	const [t, i18n] = useTranslation();

	return (
		<ScrollView>
			{/* <List.Item
				title="App Language"
				description={LANGUAGES[i18n.language]}
				// descriptionStyle={{ textTransform: 'capitalize' }}
				// onPress={() => setAppLangVisible(true)}
			/> */}
			<List.Item
				title="Media Language"
				description={mediaLanguage}
				descriptionStyle={{ textTransform: 'capitalize' }}
				onPress={() => setMediaLangVisible(true)}
			/>
			<MediaLanguageDialog
				visible={mediaLangVisible}
				hideDialog={() => setMediaLangVisible(false)}
			/>
			{/* <AppLanguageDialog
				defaultLanguage={i18n.language}
				visible={appLangVisible}
				hideDialog={() => setAppLangVisible(false)}
			/> */}
		</ScrollView>
	);
};

export default LanguagePage;
