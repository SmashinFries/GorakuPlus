import * as WebBrowser from 'expo-web-browser';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '@/store/theme/themes';
import { useSettingsStore } from '@/store/settings/settingsStore';

WebBrowser.maybeCompleteAuthSession();

const SettingsHomePage = () => {
	const { colors } = useAppTheme();
	const { setSettings } = useSettingsStore();
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
				title={'Audio'}
				description={'Text-to-speech'}
				onPress={() => {
					router.push('/more/settings/audio');
				}}
				left={(props) => <List.Icon {...props} color={colors.primary} icon="volume-high" />}
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
				title={'Storage'}
				description={'Clear caches'}
				onPress={() => {
					router.push('/more/settings/storage');
				}}
				left={(props) => (
					<List.Icon {...props} color={colors.primary} icon="database-cog-outline" />
				)}
			/>
			<List.Item
				title={'Setup Guide'}
				description={'Guide for a minimal and easy setup'}
				// onPress={() => dispatch(restartSetup())}
				onPress={() => setSettings({ isFirstLaunch: true })}
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
