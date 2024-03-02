import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
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
				name="[mediaId]"
				options={{ title: 'Staff' }}
				getId={(params) => params.params?.mediaId}
			/>
			<Stack.Screen name="info" options={{ title: '', headerShown: false }} />
		</AnimatedStack>
	);
};

export default StaffLayout;
