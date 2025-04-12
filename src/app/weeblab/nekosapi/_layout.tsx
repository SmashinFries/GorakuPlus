import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const NekosApiLayout = () => {
	return (
		<AnimatedStack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: 'NekosAPI',
				}}
			/>
			<Stack.Screen name="[nekosId]" options={{ title: 'Image' }} />
		</AnimatedStack>
	);
};

export default NekosApiLayout;
