import { useAppUpdaterStore } from '@/store/appUpdateStore';
import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Button, Divider, Icon, List, Surface, Text } from 'react-native-paper';

const MorePage = () => {
	const { colors } = useAppTheme();
	const { updateDetails } = useAppUpdaterStore();

	return (
		<View style={{ flex: 1 }}>
			{updateDetails && (
				<>
					<Divider />
					<Pressable
						onPress={() => router.navigate('/(sheets)/appUpdateSheet')}
						android_ripple={{ color: colors.primary, foreground: true }}
						style={{ margin: 8, overflow: 'hidden', borderRadius: 8 }}
					>
						<View
							style={{
								// backgroundColor: colors.elevation.level4,
								backgroundColor: 'transparent',
								borderWidth: 1,
								borderColor: colors.primary,
								padding: 8,

								borderRadius: 8,
								paddingVertical: 24,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									gap: 6,
									alignItems: 'center',
								}}
							>
								<Icon source={'update'} size={24} color={colors.primary} />
								<Text variant="titleMedium">New update available!</Text>
								<View style={{ alignItems: 'flex-end', flex: 1, paddingRight: 6 }}>
									<Icon size={24} source={'download-outline'} />
								</View>
							</View>
							{/* <View style={{ alignItems: 'flex-end' }}>
							<Button onPress={() => null}>Update</Button>
						</View> */}
						</View>
					</Pressable>
				</>
			)}
			<Divider />
			<List.Item
				title="Weeb Lab"
				description="A collection of extra features!"
				onPress={() => router.navigate('/more/weeblabs')}
				left={(props) => <List.Icon {...props} color={colors.primary} icon="flask" />}
			/>
			<Divider />
			<List.Item
				title="Accounts"
				onPress={() => router.navigate('/more/accounts')}
				// description="Manage accounts"
				left={(props) => (
					<List.Icon {...props} color={colors.primary} icon="account-outline" />
				)}
			/>
			<List.Item
				title="Settings"
				// description="Customize your UI"
				onPress={() => router.navigate('/more/settings')}
				left={(props) => <List.Icon {...props} color={colors.primary} icon="cog-outline" />}
			/>
			<List.Item
				title="AniList Site Stats"
				onPress={() => router.navigate('/statistics/sitestats')}
				left={(props) => <List.Icon {...props} color={colors.primary} icon="chart-line" />}
			/>
			<List.Item
				title="About"
				onPress={() => router.navigate('/more/about')}
				left={(props) => (
					<List.Icon {...props} color={colors.primary} icon="information-outline" />
				)}
			/>
			<Divider />
		</View>
	);
};

export default MorePage;
