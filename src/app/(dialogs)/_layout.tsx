import { DialogHeader } from '@/components/headers/dialog';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const DialogsLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: true,
				contentStyle: {
					// backgroundColor: 'transparent',
					height: '100%',
					width: '100%',
				},
				header(props) {
					return <DialogHeader {...props} />;
				},
				presentation: 'modal',
				animation: 'fade_from_bottom',
			}}
		>
			<Stack.Screen name={'(suwayomi)/settings'} options={{ title: 'Suwayomi Server' }} />
			<Stack.Screen
				name={'(suwayomi)/sources'}
				options={{
					title: 'Suwayomi Sources',
				}}
			/>
			<Stack.Screen name={'(sauceNao)/settings'} options={{ title: 'SauceNAO' }} />
			<Stack.Screen
				name={'customThemeDialog'}
				options={{
					title: 'Custom Theme',
				}}
			/>
		</AnimatedStack>
	);
};

export default DialogsLayout;
