import { MediaLanguageDialog } from '@/components/more/settings/language/dialog';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const LanguagePage = () => {
	const { mediaLanguage } = useSettingsStore();
	const [mediaLangVisible, setMediaLangVisible] = useState(false);

	return (
		<ScrollView>
			<List.Item
				title="Media Language"
				description={mediaLanguage}
				descriptionStyle={{ textTransform: 'capitalize' }}
				onPress={() => setMediaLangVisible(true)}
			/>
			<List.Item title="App Language" description={'Coming soon!'} />
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
