import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';
import { SheetManager } from 'react-native-actions-sheet';
import { Appbar } from 'react-native-paper';

const CharacterLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
			}}
		>
			<Stack.Screen
				name="characterList"
				options={{
					title: 'Characters',
					header: (props) => (
						<PaperHeader
							{...props}
							actions={[
								{
									icon: 'view-module',
									onPress: () =>
										SheetManager.show('DisplayConfigSheet', {
											payload: { type: 'search' },
										}),
								},
							]}
						/>
					),
				}}
				getId={(params) => params.params?.params}
			/>
			<Stack.Screen name="[charId]" options={{ title: '', headerShown: false }} />
		</AnimatedStack>
	);
};

export default CharacterLayout;
