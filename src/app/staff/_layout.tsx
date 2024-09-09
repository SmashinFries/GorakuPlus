import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const StaffLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
				headerTransparent: false,
			}}
		>
			<Stack.Screen
				name="staffList"
				options={{ title: 'Staff' }}
				getId={(params) => params.params?.mediaId}
			/>
			<Stack.Screen name="[staffId]" options={{ title: '', headerShown: false }} />
		</AnimatedStack>
	);
};

export default StaffLayout;
