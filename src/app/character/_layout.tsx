import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { router, Stack } from 'expo-router';

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
										router.push({
											pathname: '/(sheets)/displayConfig',
											params: { type: 'search' },
										}),
									title: 'Configure Display',
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
