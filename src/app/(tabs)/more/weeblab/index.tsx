import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';
import { Icon, List, Text } from 'react-native-paper';

const WeebLabPage = () => {
	const { colors } = useAppTheme();
	return (
		<ScrollView>
			<List.Item
				title="PanelsDesu"
				description={'Search manga panels'}
				onPress={() => router.navigate('/more/weeblab/panelsdesu')}
			/>
			<List.Item
				title="AniTrendz"
				description={'Anime related polls'}
				onPress={() => router.navigate('/more/weeblab/anitrendz')}
				left={(props) => (
					<List.Image
						{...props}
						source={require('../../../../../assets/anitrendz-icon.webp')}
					/>
				)}
			/>
			<List.Item
				title="WaifuIt"
				description={'Anime quotes, facts, GIFs, images, and more'}
				left={(props) => (
					<List.Image
						{...props}
						source={require('../../../../../assets/waifu.it.logo.png')}
					/>
				)}
				right={(props) => <List.Icon {...props} icon={'key-alert'} />}
				onPress={() => router.navigate('/more/weeblab/waifuit')}
			/>
			<List.Item
				title="NekosAPI"
				description={'Anime images'}
				left={(props) => (
					<List.Image {...props} source={require('../../../../../assets/nekosapi.png')} />
				)}
				onPress={() => router.navigate('/more/weeblab/nekosApi')}
			/>
		</ScrollView>
	);
};

export default WeebLabPage;
