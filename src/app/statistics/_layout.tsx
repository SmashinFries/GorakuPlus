import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const StatisticsLayout = () => {
	return (
		<AnimatedStack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="media/[aniIdStat]" />
			<Stack.Screen name="sitestats" options={{ title: 'Anilist Statistics' }} />
		</AnimatedStack>
	);
};

export default StatisticsLayout;
