import { useAnimeSongs } from '@/api/animethemes/animethemes';
import { MusicVideoList } from '@/components/music/list';
import { MusicLoading } from '@/components/music/loading';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const MusicPage = () => {
	const { aniId } = useLocalSearchParams<{ aniId: string }>();
	const { data, isLoading, isFetching, error } = useAnimeSongs(parseInt(aniId));

	if (isLoading || isFetching) return <MusicLoading isLoading={isFetching} error={error} />;

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<Stack.Screen
				options={{
					// title: data?.anime[0]
					// 	? `Music (${data?.anime[0]?.animethemes?.length})`
					// 	: 'Music',
					headerShown: true,
				}}
			/>
			{(data?.anime?.length ?? 0) > 0 && data ? (
				<MusicVideoList music={data} />
			) : (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text variant="titleLarge">No music available</Text>
					<Text variant="titleLarge">＞︿＜</Text>
				</View>
			)}
		</View>
	);
};

export default MusicPage;
