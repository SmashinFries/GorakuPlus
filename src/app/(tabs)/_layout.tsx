import { withLayoutContext } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { useEffect } from 'react';
import * as QuickActions from 'expo-quick-actions';
import { RouterAction } from 'expo-quick-actions/router';
import Icon from '@react-native-vector-icons/material-design-icons';
import {
	createNativeBottomTabNavigator,
	NativeBottomTabNavigationOptions,
	NativeBottomTabNavigationEventMap,
} from '@bottom-tabs/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';

const exploreIcon = Icon.getImageSourceSync('campfire', 24);
const calendarIcon = Icon.getImageSourceSync('calendar', 24);
const listIcon = Icon.getImageSourceSync('bookshelf', 24);
const loginIcon = Icon.getImageSourceSync('login', 24);
const userIcon = Icon.getImageSourceSync('account-outline', 24);
const moreIcon = Icon.getImageSourceSync('dots-horizontal', 24);

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
	NativeBottomTabNavigationOptions,
	typeof BottomTabNavigator,
	TabNavigationState<ParamListBase>,
	NativeBottomTabNavigationEventMap
>(BottomTabNavigator);

// export const Tabs = withLayoutContext(createMaterialBottomTabNavigator().Navigator);

const RootLayout = () => {
	const { avatar, username, userID } = useAuthStore().anilist;
	const { btmTabLabels, btmTabHaptics } = useSettingsStore();
	const { colors } = useAppTheme();

	useEffect(() => {
		QuickActions.setItems<RouterAction>(
			[
				{
					title: 'Search',
					icon: 'magnify',
					id: '0',
					params: { href: '/(tabs)/explore/search' },
				},
				{
					title: 'Explore',
					icon: 'campfire',
					id: '1',
					params: { href: '/(tabs)/explore/(home)' },
				},
				{
					title: 'Calendar',
					icon: 'calendar',
					id: '2',
					params: { href: '/(tabs)/calendar' },
				},
				userID
					? {
							title: 'List',
							icon: 'bookshelf',
							id: '3',
							params: { href: '/(tabs)/list' },
						}
					: null,
			].filter((item) => item !== null),
		);
	}, []);

	return (
		<Tabs
			initialRouteName="explore"
			labeled={btmTabLabels}
			activeIndicatorColor={colors.secondaryContainer}
			rippleColor={colors.secondaryContainer}
			tabBarActiveTintColor={colors.onSurface}
			tabBarInactiveTintColor={colors.onSurfaceVariant}
			tabBarStyle={{ backgroundColor: colors.elevation.level4 }}
			hapticFeedbackEnabled={btmTabHaptics}
			// tabBarActiveTintColor={}
			// rippleColor={colors.}
			// shifting={btmTabShifting}
			// activeColor={colors.onSurface}
			// inactiveColor={colors.onSurfaceVariant}
			// sceneAnimationEnabled
			// sceneAnimationType="opacity"
			// screenOptions={{}}
		>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Discover',
					tabBarIcon: () => exploreIcon as ImageSourcePropType,
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',
					tabBarIcon: () => calendarIcon as ImageSourcePropType,
				}}
			/>
			<Tabs.Screen
				name="list"
				options={{
					title: 'List',
					tabBarIcon: () => listIcon as ImageSourcePropType,
				}}
				redirect={!userID}
			/>
			<Tabs.Screen
				name="viewer"
				options={{
					title: username && userID ? 'Profile' : 'Login',
					tabBarIcon: () =>
						avatar
							? (userIcon as ImageSourcePropType)
							: (loginIcon as ImageSourcePropType),
				}}
			/>
			<Tabs.Screen
				name="more"
				options={{ title: 'More', tabBarIcon: () => moreIcon as ImageSourcePropType }}
			/>
		</Tabs>
	);
};

export default RootLayout;
