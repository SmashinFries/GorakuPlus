import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Chip, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { useState } from 'react';
import { MediaLanguageDialog } from './components/dialog';

const LanguageScreen = () => {
    const { mediaLanguage } = useSelector((state: RootState) => state.persistedSettings);
    const [mediaLangVisible, setMediaLangVisible] = useState(false);
    return (
        <ScrollView>
            <List.Item
                title="App Language"
                description={'English'}
                descriptionStyle={{ textTransform: 'capitalize' }}
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

export default LanguageScreen;
