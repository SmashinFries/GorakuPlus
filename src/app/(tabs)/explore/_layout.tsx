import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const ExploreLayout = () => {
	return (
		<AnimatedStack>
			<Stack.Screen
				name="(home)"
				options={{
					title: 'Explore',
					headerShown: false,
				}}
			/>
			<Stack.Screen name="search" options={{ title: 'Search' }} />
		</AnimatedStack>
	);
};

export default ExploreLayout;
