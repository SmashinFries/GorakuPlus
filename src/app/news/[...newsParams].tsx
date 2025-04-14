import { MediaType } from '@/api/anilist/__genereated__/gql';
import {
	GetAnimeNewsQueryResult,
	GetMangaNewsQueryResult,
	useGetAnimeNews,
	useGetMangaNews,
} from '@/api/jikan/jikan';
import { AnimeNews, NewsDataItem } from '@/api/jikan/models';
import { GorakuActivityIndicator } from '@/components/loading';
import { NewsVItem } from '@/components/news/newsItem';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';

type RenderItemProps = {
	item: NewsDataItem;
	index: number;
};

const NewsPage = () => {
	const { newsParams } = useLocalSearchParams<{ newsParams: [string, string] }>();
	const type = newsParams[0] as MediaType;
	const malId = parseInt(newsParams[1]);
	const isAnime = type === MediaType.Anime;
	const animeNewsQuery = useGetAnimeNews(
		malId,
		{ page: 1 },
		{ query: { enabled: !!malId && !!type && type === MediaType.Anime } },
	);
	const mangaNewsQuery = useGetMangaNews(
		malId,
		{ page: 1 },
		{ query: { enabled: !!malId && !!type && type === MediaType.Manga } },
	);
	const { width } = useWindowDimensions();

	const RenderItem = useCallback(({ item }: RenderItemProps) => {
		return <NewsVItem news={item} />;
	}, []);

	const keyExtractor = useCallback((item: NewsDataItem, index: number) => index.toString(), []);

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

	if (animeNewsQuery?.isFetching || mangaNewsQuery?.isFetching) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	if (
		(isAnime &&
			animeNewsQuery?.isFetched &&
			(animeNewsQuery?.data?.data?.data?.length ?? 0) < 1) ||
		(!isAnime &&
			mangaNewsQuery?.isFetched &&
			(mangaNewsQuery?.data?.data?.data?.length ?? 0) < 1)
	) {
		return <EmptyList />;
	}

	return (
		<View style={{ width: width, height: '100%' }}>
			<FlashList
				data={isAnime ? animeNewsQuery?.data?.data?.data : mangaNewsQuery?.data?.data?.data}
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
