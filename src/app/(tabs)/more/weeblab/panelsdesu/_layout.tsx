import PaperHeader, { MoreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const PanelsDesuLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: 'PanelsDesu',
					header: (props) => <PaperHeader {...props} mode="center-aligned" elevated />,
				}}
			/>
			<Stack.Screen name="[panelId]" />
		</AnimatedStack>
	);
};

export default PanelsDesuLayout;
