import { ParticleBackground } from '@/components/animations';
import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

const MorePage = () => {
	const { colors } = useAppTheme();

	return (
		<View style={{ flex: 1 }}>
			<Divider />
			<List.Item
				title="Weeb Lab"
				description="Test new features that may or may not make it in future builds!"
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
			{/* <Button
				onPress={async () => {
					router.navigate({
						pathname: `/user/smashinfries/favorites`,
						params: { type: 'ANIME' },
					});
				}}
			>
				TEST
			</Button> */}
		</View>
	);
};

export default MorePage;
