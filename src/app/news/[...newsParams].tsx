import { GorakuActivityIndicator } from '@/components/loading';
import { NewsItem } from '@/components/news/newsItem';
import { useNews } from '@/hooks/news/useNews';
import { MediaType } from '@/store/services/anilist/generated-anilist';
import { GetAnimeNewsApiResponse, GetMangaNewsApiResponse } from '@/store/services/mal/malApi';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type RenderItemProps = {
    item: GetAnimeNewsApiResponse['data'][0] | GetMangaNewsApiResponse['data'][0];
    index: number;
};

const NewsPage = () => {
	const { newsParams } = useLocalSearchParams<{ newsParams: [string, string] }>();
	const type = newsParams[0] as MediaType;
	const malId = parseInt(newsParams[1]);
	const { news } = useNews(type, malId);
	const { width, height } = useWindowDimensions();

	const RenderItem = useCallback(({ item }: RenderItemProps) => {
		return <NewsItem news={item} />;
	}, []);

	const keyExtractor = useCallback(
		(item: GetAnimeNewsApiResponse['data'][0] | GetMangaNewsApiResponse['data'][0], index) =>
			item.mal_id.toString(),
		[],
	);

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

	if (news.isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	if (!news.isUninitialized && !news.isLoading && !news.data?.data) {
		return <EmptyList />;
	}

	return (
		<View style={{ width: width, height: '100%' }}>
			<FlashList
				data={news?.data?.data ?? []}
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
