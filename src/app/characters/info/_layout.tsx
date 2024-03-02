import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const CharacterInfoLayout = () => {
	return (
		<AnimatedStack screenOptions={{ headerShown: false }}>
			<Stack.Screen name={'[charId]'} getId={(params) => params?.params?.charId} />
		</AnimatedStack>
	);
};

export default CharacterInfoLayout;
