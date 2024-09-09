import PaperHeader from '@/components/headers';
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
			<Stack.Screen name="[...user]" />
			<Stack.Screen name="userList" />
		</AnimatedStack>
	);
};

export default UserLayout;
