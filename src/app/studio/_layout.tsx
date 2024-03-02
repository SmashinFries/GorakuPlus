import PaperHeader, { StudioHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const StaffLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: false,
				headerTransparent: false,
			}}
		>
			<Stack.Screen
				name="[studioId]"
				options={{ title: 'Studio' }}
				getId={(params) => params.params?.studioId}
			/>
		</AnimatedStack>
	);
};

export default StaffLayout;
