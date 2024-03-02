import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const UserLayout = () => {
	const { username } = useAppSelector((state) => state.persistedAniLogin);

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
