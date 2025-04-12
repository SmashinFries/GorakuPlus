import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const ArtLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen name="[tag]" options={{ title: 'Fan Art' }} />
			<Stack.Screen name="post" options={{ title: 'Art Post' }} />
		</AnimatedStack>
	);
};

export default ArtLayout;
