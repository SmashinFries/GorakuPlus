import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const StatisticsLayout = () => {
	return (
		<AnimatedStack screenOptions={{ title: 'Statistics', headerShown: false }}>
			<Stack.Screen name="user/[...userStat]" />
			<Stack.Screen name="media/[aniIdStat]" />
		</AnimatedStack>
	);
};

export default StatisticsLayout;
