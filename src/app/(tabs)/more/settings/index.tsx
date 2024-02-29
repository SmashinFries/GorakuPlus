import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { List, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { restartSetup } from '@/store/slices/setupSlice';

WebBrowser.maybeCompleteAuthSession();

const SettingsHomePage = () => {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    return (
        <ScrollView>
            <List.Item
                title={'Appearance'}
                description={'Themes, media cards, and more'}
                onPress={() => {
                    router.push('/more/settings/appearance');
                }}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="palette-outline" />
                )}
            />
            <List.Item
                title={'Content'}
                description={'Tab Order, NSFW, Tag Blacklist, and more'}
                onPress={() => {
                    router.push('/more/settings/media');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="television" />}
            />
            <List.Item
                title={'Language'}
                description={'App and media title langauge'}
                onPress={() => {
                    router.push('/more/settings/language');
                }}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="translate" />}
            />
            <List.Item
                title={'Notifications'}
                description={'Episode updates and more'}
                onPress={() => {
                    router.push('/more/settings/notifications');
                }}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="bell-outline" />
                )}
            />
            <List.Item
                title={'Setup Guide'}
                description={'Guide for a minimal and easy setup'}
                onPress={() => dispatch(restartSetup())}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="map-marker-path" />
                )}
            />
            {/* <List.Item
                title={'Animations'}
                description={'Adjust navigation animations'}
                onPress={() => {
                    navigation.navigate('appearance');
                }}
                left={(props) => <List.Icon {...props} icon="animation-outline" />}
            /> */}
        </ScrollView>
    );
};

export default SettingsHomePage;
