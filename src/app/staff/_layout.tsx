import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { router, Stack } from 'expo-router';

const StaffLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerTransparent: false,
			}}
		>
			<Stack.Screen
				name="staffList"
				options={{
					title: 'Staff',
					header: (props) => (
						<PaperHeader
							{...props}
							actions={[
								{
									title: 'Configure Display',
									icon: 'view-module',
									onPress: () =>
										router.push({
											pathname: '/(sheets)/displayConfig',
											params: {
												type: 'search',
											},
										}),
								},
							]}
						/>
					),
				}}
				getId={(params) => params.params?.mediaId}
			/>
			<Stack.Screen name="[staffId]" options={{ title: '', headerShown: false }} />
		</AnimatedStack>
	);
};

export default StaffLayout;
