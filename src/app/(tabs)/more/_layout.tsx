import PaperHeader, { MoreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const MoreLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
			initialRouteName="index"
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'More',
					header: (props) => <MoreHeader {...props} />,
				}}
			/>
			<Stack.Screen name="weeblabs" options={{ headerShown: false }} />
			<Stack.Screen name="accounts" options={{ title: 'Accounts', headerShown: false }} />
			<Stack.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
			<Stack.Screen name="about" options={{ title: 'About' }} />
		</AnimatedStack>
	);
};

export default MoreLayout;
