import { useState } from 'react';
import { Linking, View } from 'react-native';

import * as Updates from 'expo-updates';
import { ToastAndroid } from 'react-native';
import { ActivityIndicator, Button, List, Text } from 'react-native-paper';

const AboutPage = () => {
    const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

    const checkForUpdates = async () => {
        setIsCheckingUpdates(true);
        const results = await Updates.checkForUpdateAsync();

        if (results.isAvailable) {
            await Updates.fetchUpdateAsync();
            ToastAndroid.show('Update available! Restarting app', ToastAndroid.LONG);
            setIsCheckingUpdates(false);
            await Updates.reloadAsync();
        } else {
            ToastAndroid.show('No updates available', ToastAndroid.SHORT);
            setIsCheckingUpdates(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <List.Item
                title={'Check for Updates'}
                onPress={checkForUpdates}
                right={(props) => (isCheckingUpdates ? <ActivityIndicator {...props} /> : null)}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Alpha version: 0.6 {'\n'}</Text>
                <Text>When you find bugs or issues, send me a DM!</Text>
                <Button
                    icon={'instagram'}
                    onPress={() => Linking.openURL('https://www.instagram.com/smashinfries')}
                >
                    @smashinfries
                </Button>
            </View>
        </View>
    );
};

export default AboutPage;
