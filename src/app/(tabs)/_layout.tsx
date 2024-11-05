import { withLayoutContext } from 'expo-router';
import { Avatar } from 'react-native-paper';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

export const Tabs = withLayoutContext(createMaterialBottomTabNavigator().Navigator);

const RootLayout = () => {
	const { avatar, username, userID } = useAuthStore().anilist;
	const { btmTabLabels, btmTabShifting } = useSettingsStore();
	const { colors } = useAppTheme();

	return (
		<Tabs
			initialRouteName="explore"
			labeled={btmTabLabels}
			shifting={btmTabShifting}
			activeColor={colors.onSurface}
			inactiveColor={colors.onSurfaceVariant}
			sceneAnimationEnabled
			sceneAnimationType="opacity"
			// screenOptions={{}}
		>
			<Tabs.Screen name="explore" options={{ title: 'Discover', tabBarIcon: 'campfire' }} />
			<Tabs.Screen name="calendar" options={{ title: 'Calendar', tabBarIcon: 'calendar' }} />
			<Tabs.Screen
				name="list"
				options={{
					title: 'List',
					tabBarIcon: 'bookshelf',
				}}
				redirect={!userID}
			/>
			<Tabs.Screen
				name="viewer"
				options={{
					title: username && userID ? 'Profile' : 'Login',
					tabBarIcon: avatar
						? () => <Avatar.Image size={24} source={{ uri: avatar }} />
						: 'login',
				}}
			/>
			<Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: 'dots-horizontal' }} />
		</Tabs>
	);
};

export default RootLayout;
