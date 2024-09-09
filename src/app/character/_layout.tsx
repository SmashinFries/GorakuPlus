import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const CharacterLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen
				name="characterList"
				options={{ title: 'Characters' }}
				getId={(params) => params.params?.params}
			/>
			<Stack.Screen name="[charId]" options={{ title: '', headerShown: false }} />
		</AnimatedStack>
	);
};

export default CharacterLayout;
