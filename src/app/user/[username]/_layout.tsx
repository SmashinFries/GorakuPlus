import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const UserLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: false,
				headerTransparent: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="favorites" options={{ headerShown: true }} />
			<Stack.Screen
				name="stats/[statType]"
				options={{ headerShown: true, title: 'Statistics' }}
			/>
			<Stack.Screen name="userList" />
			<Stack.Screen
				name="activity/index"
				options={{ title: 'Activity', headerShown: true }}
			/>
		</AnimatedStack>
	);
};

export default UserLayout;
