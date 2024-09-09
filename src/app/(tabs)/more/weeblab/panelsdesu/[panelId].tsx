import { useGetPanelGetPanel, useGetPanelGetSimilarPanels } from '@/api/panelsdesu/panelsdesu';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const PanelPage = () => {
	const { panelId } = useLocalSearchParams<{ panelId: string }>();
	const { data: panelData, isFetching: isPanelFetching } = useGetPanelGetPanel(panelId, {
		query: { enabled: !!panelId, refetchOnMount: false, refetchOnReconnect: false },
	});
	// const { data: simPanelsData, isFetching: isSimPanelsFetching } = useGetPanelGetSimilarPanels(
	// 	panelId,
	// 	{ limit: '20' },
	// 	{ query: { enabled: !!panelId } },
	// );
	return (
		<View>
			<Stack.Screen options={{ headerTitle: 'Panel Info' }} />
			<View style={{ height: 480, width: '100%' }}>
				<Image
					source={{
						uri: panelData?.data?.page?.image_url,
					}}
					contentFit="contain"
					style={{
						height: '100%',
						width: '100%',
					}}
				/>
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: 100,
						borderRadius: 5 / 2,
						borderWidth: 1,
						borderColor: 'red',
						top: panelData?.data?.panel?.y,
						left: panelData?.data?.panel?.x,
					}}
				></View>
			</View>
			<Text>{panelData?.data?.manga?.title}</Text>
		</View>
	);
};

export default PanelPage;
