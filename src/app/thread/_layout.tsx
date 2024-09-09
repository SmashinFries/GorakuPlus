import PaperHeader, { StudioHeader } from '@/components/headers';
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
			<Stack.Screen name="[threadId]" />
			<Stack.Screen name="comment/[commentId]" />
		</AnimatedStack>
	);
};

export default ThreadLayout;
