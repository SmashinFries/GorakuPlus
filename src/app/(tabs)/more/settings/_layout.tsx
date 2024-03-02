import PaperHeader, { MoreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

export const unstable_settings = {
	// Used for `(foo)`
	initialRouteName: 'index',
};

const SettingsLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Settings' }} />
			<Stack.Screen name="appearance" options={{ title: 'Appearance' }} />
			<Stack.Screen name="language" options={{ title: 'Language' }} />
			<Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
			<Stack.Screen name="storage" options={{ title: 'Storage' }} />
			<Stack.Screen name="media" options={{ title: 'Content', headerShown: false }} />
		</AnimatedStack>
	);
};

export default SettingsLayout;
