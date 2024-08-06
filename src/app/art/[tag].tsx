import { FlashList, MasonryFlashList, MasonryFlashListRef } from '@shopify/flash-list';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { DanbooruImageCard } from '../../components/cards';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { ScrollToTopButton } from '@/components/buttons';
import { DanPost } from '@/api/danbooru/types';
import { usePostsSearch } from '@/api/danbooru/danbooru';

const ArtListPage = () => {
	const { tag } = useLocalSearchParams<{ tag: string }>();
	const { width, height } = useWindowDimensions();
	const { data, hasNextPage, fetchNextPage } = usePostsSearch({ page: 1, limit: 30, tags: tag });
	const [page, setPage] = useState<number>(1);
	const [scrollOffset, setScrollOffset] = useState<number>(0);

	const listRef = useRef<MasonryFlashListRef<DanPost>>(null);

	const RenderItem = useCallback(({ item }: { item: DanPost }) => {
		return (
			<View style={{ flex: 1, margin: 5 }}>
				<DanbooruImageCard item={item} onNavigate={(id) => router.push(`art/post/${id}`)} />
			</View>
		);
	}, []);

	const flattenedData = data.pages.flat();

	return (
		<View style={{ width: '100%', flex: 1 }}>
			{flattenedData.length > 0 ? (
				<MasonryFlashList
					ref={listRef}
					data={flattenedData}
					numColumns={2}
					renderItem={RenderItem}
					estimatedItemSize={200}
					onEndReachedThreshold={0.7}
					onEndReached={() => hasNextPage && setPage((prev) => prev + 1)}
					onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
				/>
			) : (
				<GorakuActivityIndicator />
			)}
			{scrollOffset > 500 && (
				// masonryflashlist has some function as Flashlist
				<ScrollToTopButton listRef={listRef as MutableRefObject<FlashList<any>>} />
			)}
			<Stack.Screen options={{ title: tag as string }} />
		</View>
	);
};

export default ArtListPage;
