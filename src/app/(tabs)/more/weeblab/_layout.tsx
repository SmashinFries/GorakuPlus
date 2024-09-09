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
			<Stack.Screen
				name="index"
				options={{
					title: 'WeebLab',
				}}
			/>
			<Stack.Screen name="waifuit" options={{ title: 'WaifuIt' }} />
			<Stack.Screen name="nekosApi" options={{ title: 'NekosAPI' }} />
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
