import PaperHeader, { NekosAPIHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const NekosApiLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: 'NekosAPI',
				}}
			/>
			<Stack.Screen name="[nekosId]" options={{ title: 'Image' }} />
		</AnimatedStack>
	);
};

export default NekosApiLayout;
