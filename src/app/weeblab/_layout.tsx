import PaperHeader, { MoreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const WeebLabLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen name="waifuit" options={{ title: 'WaifuIt' }} />
			<Stack.Screen
				name="nekosapi"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="panelsdesu"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="anitrendz"
				options={{
					headerShown: false,
				}}
			/>
		</AnimatedStack>
	);
};

export default WeebLabLayout;
