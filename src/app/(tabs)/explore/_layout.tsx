import { ExploreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

const ExploreLayout = () => {
	return (
		<AnimatedStack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Explore',
				}}
			/>
			<Stack.Screen name="search" options={{ title: 'Search' }} />
		</AnimatedStack>
	);
};

export default ExploreLayout;
