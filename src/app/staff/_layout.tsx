import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';
import { SheetManager } from 'react-native-actions-sheet';

const StaffLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <PaperHeader {...props} />,
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
				getId={(params) => params.params?.mediaId}
			/>
			<Stack.Screen name="[staffId]" options={{ title: '', headerShown: false }} />
		</AnimatedStack>
	);
};

export default StaffLayout;
