import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button, Divider, List, Text } from 'react-native-paper';

const WeebLabPage = () => {
	return (
		<ScrollView>
			<List.Item
				title="PanelsDesu"
				description={'Search manga panels'}
				onPress={() => router.navigate('/weeblab/panelsdesu')}
			/>
			<List.Item
				title="AniTrendz"
				description={'Anime related polls'}
				onPress={() => router.navigate('/weeblab/anitrendz')}
				left={(props) => (
					<List.Image
						{...props}
						source={require('../../../../../assets/anitrendz-icon.webp')}
					/>
				)}
			/>
			<List.Item
				title="NekosAPI"
				description={'Anime images'}
				left={(props) => (
					<List.Image {...props} source={require('../../../../../assets/nekosapi.png')} />
				)}
				onPress={() => router.navigate('/weeblab/nekosapi')}
			/>
			<Divider />
			<View style={{ alignItems: 'center' }}>
				<Text style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
					Have an API suggestion?
				</Text>
				<Button icon={'discord'}>Join our Discord!</Button>
			</View>
		</ScrollView>
	);
};

export default WeebLabPage;
