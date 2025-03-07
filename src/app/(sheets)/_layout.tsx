import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const SheetsLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: 'transparent',
					height: '100%',
					width: '100%',
				},
				presentation: 'transparentModal',
			}}
		>
			<Stack.Screen name={'displayConfig'} />
			<Stack.Screen name={'mediaActions'} />
			<Stack.Screen name={'charStaffActions'} />
			<Stack.Screen name={'studioActions'} />
			<Stack.Screen name={'userActions'} />
			<Stack.Screen name={'mediaSearchSheet'} />
			<Stack.Screen name={'characterSearchSheet'} />
			<Stack.Screen name={'appUpdateSheet'} />
			<Stack.Screen name={'numberPickerSheet'} />
		</AnimatedStack>
	);
};

export default SheetsLayout;
