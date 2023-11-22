import { MediaLanguageDialog } from '@/components/more/settings/language/dialog';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';

const LanguagePage = () => {
    const { mediaLanguage } = useAppSelector((state) => state.persistedSettings);
    const [mediaLangVisible, setMediaLangVisible] = useState(false);

    return (
        <ScrollView>
            <List.Item
                title="App Language"
                description={'English Only (more are planned)'}
                // descriptionStyle={{ textTransform: 'capitalize' }}
            />
            <List.Item
                title="Media Language"
                description={mediaLanguage}
                descriptionStyle={{ textTransform: 'capitalize' }}
                onPress={() => setMediaLangVisible(true)}
            />
            <MediaLanguageDialog
                defaultLanguage={mediaLanguage}
                visible={mediaLangVisible}
                hideDialog={() => setMediaLangVisible(false)}
            />
        </ScrollView>
    );
};

export default LanguagePage;
