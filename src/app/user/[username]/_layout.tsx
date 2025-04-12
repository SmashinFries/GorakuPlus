import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { router, Stack } from 'expo-router';

const UserLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				headerShown: false,
				headerTransparent: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="favorites" options={{ headerShown: true }} />
			<Stack.Screen
				name="stats/[statType]"
				options={{ headerShown: true, title: 'Statistics' }}
			/>
			<Stack.Screen name="userList" />
			<Stack.Screen
				name="followers"
				options={{
					title: 'Followers',
					headerShown: true,
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
											params: { type: 'search' },
										}),
								},
							]}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="following"
				options={{
					title: 'Following',
					headerShown: true,
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
											params: { type: 'search' },
										}),
								},
							]}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="activity/index"
				options={{ title: 'Activity', headerShown: true }}
			/>
		</AnimatedStack>
	);
};

export default UserLayout;
