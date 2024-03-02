import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const MediaSettingsLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'Content',
				}}
			/>
			<Stack.Screen
				name="tagBlacklist"
				options={{ headerShown: false, title: 'Tag Blacklist' }}
			/>
		</AnimatedStack>
	);
};

export default MediaSettingsLayout;
