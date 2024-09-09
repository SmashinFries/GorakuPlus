import { SplashScreen, withLayoutContext } from 'expo-router';
import { Avatar } from 'react-native-paper';
import {
	MaterialBottomTabNavigationOptions,
	createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';

const { Navigator } = createMaterialBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
	// @ts-ignore
	MaterialBottomTabNavigationOptions,
	typeof Navigator
>(Navigator);

const RootLayout = () => {
	const { avatar, username, userID } = useAuthStore().anilist;
	const { btmTabLabels, btmTabShifting } = useSettingsStore();
	const { t, i18n } = useTranslation('tabs');

	// useEffect(() => {
	// 	console.log('Languages:', i18n.languages);
	// 	console.log('Supported Languages:', i18n.options.supportedLngs);
	// }, []);

	return (
		<MaterialBottomTabs
			initialRouteName="explore"
			labeled={btmTabLabels}
			shifting={btmTabShifting}
		>
			<MaterialBottomTabs.Screen
				name="explore"
				options={{ title: t('Discover'), tabBarIcon: 'campfire' }}
			/>
			<MaterialBottomTabs.Screen
				name="calendar"
				options={{ title: t('Calendar'), tabBarIcon: 'calendar' }}
			/>
			<MaterialBottomTabs.Screen
				name="list"
				options={{
					title: t('List'),
					tabBarIcon: 'bookshelf',
				}}
				redirect={userID ? false : true}
			/>
			<MaterialBottomTabs.Screen
				name="viewer"
				options={{
					title: username && userID ? username : t('Login'),
					tabBarIcon: avatar
						? () => <Avatar.Image size={24} source={{ uri: avatar }} />
						: 'login',
				}}
			/>
			<MaterialBottomTabs.Screen
				name="more"
				options={{ title: t('More'), tabBarIcon: 'dots-horizontal' }}
			/>
		</MaterialBottomTabs>
	);
};

export default RootLayout;
