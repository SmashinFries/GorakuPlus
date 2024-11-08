import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

const MorePage = () => {
	const { colors } = useAppTheme();

	return (
		<View style={{ flex: 1 }}>
			<Divider />
			<List.Item
				title="Weeb Lab"
				description="A collection of extra features!"
				onPress={() => router.navigate('/more/weeblab')}
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
				onPress={() => router.navigate('/more/sitestats')}
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
