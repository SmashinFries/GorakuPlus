import { useAppSelector } from '@/store/hooks';
import { Stack, withLayoutContext } from 'expo-router';
import { Avatar } from 'react-native-paper';
import {
	MaterialBottomTabNavigationOptions,
	createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';

const { Navigator } = createMaterialBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
	// @ts-ignore
	MaterialBottomTabNavigationOptions,
	typeof Navigator
>(Navigator);

const RootLayout = () => {
	const { avatar, username, userID } = useAppSelector((state) => state.persistedAniLogin);
	const { btmTabLabels, btmTabShifting } = useAppSelector((state) => state.persistedSettings);

	return (
		<MaterialBottomTabs
			initialRouteName="explore"
			labeled={btmTabLabels}
			shifting={btmTabShifting}
		>
			<MaterialBottomTabs.Screen
				name="explore"
				options={{ title: 'Explore', tabBarIcon: 'campfire' }}
			/>
			<MaterialBottomTabs.Screen
				name="calendar"
				options={{ title: 'Calendar', tabBarIcon: 'calendar' }}
			/>
			<MaterialBottomTabs.Screen
				name="list"
				options={{
					title: 'List',
					tabBarIcon: 'bookshelf',
				}}
				redirect={userID ? false : true}
			/>
			<MaterialBottomTabs.Screen
				name="user"
				options={{
					title: username && userID ? username : 'Login',
					tabBarIcon: avatar
						? () => <Avatar.Image size={24} source={{ uri: avatar }} />
						: 'login',
				}}
			/>
			<MaterialBottomTabs.Screen
				name="more"
				options={{ title: 'More', tabBarIcon: 'dots-horizontal' }}
			/>
		</MaterialBottomTabs>
	);
};

export default RootLayout;
