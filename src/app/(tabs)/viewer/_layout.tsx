import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAuthStore } from '@/store/authStore';
import { Stack } from 'expo-router';

const UserLayout = () => {
	const { username } = useAuthStore().anilist;

	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen
				name="index"
				options={{ title: username ?? 'User', headerShown: false }}
			/>
		</AnimatedStack>
	);
};

export default UserLayout;
