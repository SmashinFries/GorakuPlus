import { MediaType } from '@/api/anilist/__genereated__/gql';
import { GetAnimeNewsQueryResult, GetMangaNewsQueryResult } from '@/api/jikan/jikan';
import { GorakuActivityIndicator } from '@/components/loading';
import { NewsHItem, NewsVItem } from '@/components/news/newsItem';
import { useNews } from '@/hooks/news/useNews';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type RenderItemProps = {
	item: GetAnimeNewsQueryResult['data']['data'][0] | GetMangaNewsQueryResult['data']['data'][0];
	index: number;
};

const NewsPage = () => {
	const { newsParams } = useLocalSearchParams<{ newsParams: [string, string] }>();
	const type = newsParams[0] as MediaType;
	const malId = parseInt(newsParams[1]);
	const { data, isFetching, isFetched } = useNews(type, malId);
	const { width, height } = useWindowDimensions();

	const RenderItem = useCallback(({ item }: RenderItemProps) => {
		return <NewsVItem news={item} />;
	}, []);

	const keyExtractor = useCallback((item: RenderItemProps['item']) => item.mal_id.toString(), []);

	const EmptyList = useCallback(() => {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text variant="bodyLarge">No news yet!</Text>
			</View>
		);
	}, []);

	if (isFetching) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	if (isFetched && !data.data?.data) {
		return <EmptyList />;
	}

	return (
		<View style={{ width: width, height: '100%' }}>
			<FlashList
				data={data?.data?.data ?? []}
				keyExtractor={keyExtractor}
				renderItem={RenderItem}
				centerContent
				estimatedItemSize={100}
				contentContainerStyle={{ paddingVertical: 10 }}
			/>
		</View>
	);
};

export default NewsPage;
