import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const StaffInfoLayout = () => {
	return (
		<AnimatedStack screenOptions={{ headerShown: false }}>
			<Stack.Screen name={'[staffId]'} getId={(params) => params?.params?.staffId} />
		</AnimatedStack>
	);
};

export default StaffInfoLayout;
