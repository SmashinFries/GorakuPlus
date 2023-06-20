import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Chip, List, Portal, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { useState } from 'react';
import { DefaultDescDialog } from './component/dialog';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { setSettings } from '../settingsSlice';

const MediaSettingScreen = () => {
    const { defaultDescription, showNSFW } = useSelector(
        (state: RootState) => state.persistedSettings,
    );
    const dispatch = useDispatch();
    const [showDefDescDialog, setShowDefDescDialog] = useState(false);
    return (
        <>
            <ScrollView>
                <List.Item
                    title="Default Description"
                    description={defaultDescription === 'ani' ? 'AniList' : 'MyAnimeList'}
                    onPress={() => setShowDefDescDialog(true)}
                />
                <List.Item
                    title="NSFW"
                    description={
                        Constants.executionEnvironment === ExecutionEnvironment.StoreClient
                            ? 'Only available on gumroad!'
                            : null
                    }
                    right={() => (
                        <Switch
                            value={showNSFW}
                            onValueChange={(value) => dispatch(setSettings({ showNSFW: value }))}
                            disabled={
                                Constants.executionEnvironment === ExecutionEnvironment.StoreClient
                            }
                        />
                    )}
                />
            </ScrollView>
            <Portal>
                <DefaultDescDialog
                    defaultValue={defaultDescription}
                    visible={showDefDescDialog}
                    onDismiss={() => setShowDefDescDialog(false)}
                />
            </Portal>
        </>
    );
};

export default MediaSettingScreen;
