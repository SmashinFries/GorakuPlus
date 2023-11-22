import { MasonryFlashList } from '@shopify/flash-list';
import { useLazySearchPostsQuery } from '@/store/services/danbooru/danbooruApi';
import { useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { DanPost } from '@/store/services/danbooru/types';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { DanbooruImageCard } from '../../components/cards';
import { Stack, router, useLocalSearchParams } from 'expo-router';

const ArtListPage = () => {
    const { tag } = useLocalSearchParams();
    const { width, height } = useWindowDimensions();
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const [searchPosts] = useLazySearchPostsQuery();
    const [results, setResults] = useState<DanPost[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    const onSearch = async (page_num = 1) => {
        setPage(page_num);
        const response = await searchPosts({
            tags: showNSFW ? tag + ' solo' : tag + ' solo rating:g,s',
            limit: 24,
            page: page_num,
        }).unwrap();
        if (response.length < 23) {
            setHasNextPage(false);
        }
        if (page_num > 1) {
            setResults((prev) => [...prev, ...response]);
        } else {
            setResults(response);
        }
    };

    const RenderItem = useCallback(({ item }: { item: DanPost }) => {
        return (
            <View style={{ width: width / 2, margin: 5, maxHeight: height / 2 }}>
                <DanbooruImageCard item={item} onNavigate={(id) => router.push(`art/post/${id}`)} />
            </View>
        );
    }, []);

    useEffect(() => {
        if (results.length === 0) {
            onSearch();
        }
    }, []);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            {results.length > 0 ? (
                <MasonryFlashList
                    data={results}
                    numColumns={2}
                    renderItem={RenderItem}
                    estimatedItemSize={200}
                    onEndReachedThreshold={0.7}
                    onEndReached={() => hasNextPage && onSearch(page + 1)}
                />
            ) : (
                <ActivityIndicator size="large" />
            )}
            <Stack.Screen options={{ title: tag as string }} />
        </View>
    );
};

export default ArtListPage;
