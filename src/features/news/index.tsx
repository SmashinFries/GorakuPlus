import { Pressable, View, useWindowDimensions } from 'react-native';
import { MediaType } from '../../app/services/anilist/generated-anilist';
import { FlashList } from '@shopify/flash-list';
import { useNews } from './hooks/useNews';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewsStackProps } from '../../navigation/types';
import { useCallback, useEffect } from 'react';
import { NewsItem } from './components.tsx/newsItem';
import { GetAnimeNewsApiResponse, GetMangaNewsApiResponse } from '../../app/services/mal/malApi';
import { ActivityIndicator, Text } from 'react-native-paper';

type RenderItemProps = {
    item: GetAnimeNewsApiResponse['data'][0] | GetMangaNewsApiResponse['data'][0];
    index: number;
};

export const NewsList = ({
    navigation,
    route,
}: NativeStackScreenProps<NewsStackProps, 'newsList'>) => {
    const { malId, type } = route.params;
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

    useEffect(() => {
        console.log(malId, type);
    }, []);

    if (news.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
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
