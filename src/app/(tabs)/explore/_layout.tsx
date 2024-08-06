import { ExploreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const ExploreLayout = () => {
	return (
		<AnimatedStack>
			<Stack.Screen
				name="index"
				options={{ title: 'Explore', header: (props) => <ExploreHeader {...props} /> }}
			/>
			<Stack.Screen name="search" options={{ title: 'Search' }} />
		</AnimatedStack>
	);
};

export default ExploreLayout;
