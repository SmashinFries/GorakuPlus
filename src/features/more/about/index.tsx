import { Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import * as Linking from 'expo-linking';

const AboutScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Alpha version: 0.6</Text>
            <Text>Many features are missing! 😵 {'\n\n'}</Text>
            <Text>When you find bugs or issues, send me a DM!</Text>
            <Button
                icon={'instagram'}
                onPress={() => Linking.openURL('https://www.instagram.com/smashinfries')}
            >
                @smashinfries
            </Button>
        </View>
    );
};

export default AboutScreen;
