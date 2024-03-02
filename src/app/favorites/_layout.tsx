import { FavoritesHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Slot, Stack } from 'expo-router';

const FavoritesLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="[tab]"
				options={{ title: 'Favorites', header: (props) => <FavoritesHeader {...props} /> }}
			/>
		</AnimatedStack>
	);
};

export default FavoritesLayout;
