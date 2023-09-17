import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MasonryFlashList } from '@shopify/flash-list';
import { DanbooruStackProps } from '../../navigation/types';
import {
    useLazySearchPostsQuery,
    useSearchPostsQuery,
} from '../../app/services/danbooru/danbooruApi';
import { useAppSelector } from '../../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { DanPost } from '../../app/services/danbooru/types';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper';
import { rgbToRgba } from '../../utils';

export const DanbooruList = ({
    navigation,
    route,
}: NativeStackScreenProps<DanbooruStackProps, 'danbooruList'>) => {
    const { tag } = route.params;
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const [searchPosts, status] = useLazySearchPostsQuery();
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
        const preview = item.media_asset.variants?.find((v) => v.type === '360x360');
        if (!preview) {
            return null;
        }
        return (
            <Pressable onPress={() => navigation.navigate('danbooruDetail', { id: item.id })}>
                <Image
                    source={{ uri: preview.url }}
                    contentFit="cover"
                    style={{ width: width / 2, height: preview.height, margin: 5 }}
                />
                <IconButton
                    icon={item.file_ext === 'gif' ? 'file-gif-box' : 'image-area'}
                    style={{
                        position: 'absolute',
                        backgroundColor: rgbToRgba(colors.surface, 0.5),
                        top: 0,
                        alignSelf: 'flex-end',
                        transform: [{ rotate: `${preview.height > preview.width ? 90 : 0} deg` }],
                    }}
                />
            </Pressable>
        );
    }, []);

    useEffect(() => {
        if (results.length === 0) {
            onSearch();
        }
        navigation.setOptions({ title: tag });
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
        </View>
    );
};
