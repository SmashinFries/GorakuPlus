import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const ThreadLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: true,
				headerTransparent: false,
			}}
		>
			<Stack.Screen name="overview/[threadParam]" options={{ title: 'Threads' }} />
			<Stack.Screen name="[threadId]/index" />
			<Stack.Screen name="[threadId]/comment/[commentId]" />
		</AnimatedStack>
	);
};

export default ThreadLayout;
