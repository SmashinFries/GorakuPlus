import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const AniCardGenLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen name="index" options={{ title: 'AniCard Generator' }} />
		</AnimatedStack>
	);
};

export default AniCardGenLayout;
