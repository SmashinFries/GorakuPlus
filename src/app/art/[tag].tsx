import { MasonryFlashList, MasonryFlashListRef, MasonryListRenderItem } from '@shopify/flash-list';
import { useRef } from 'react';
import { View } from 'react-native';
import { DanbooruImageCard } from '../../components/cards';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { ScrollToTopButton } from '@/components/buttons';
import { DanPost } from '@/api/danbooru/types';
import { usePostsSearch } from '@/api/danbooru/danbooru';
import { useScrollHandler } from '@/hooks/animations/useScrollHandler';
import Animated from 'react-native-reanimated';

const AnimatedMasonryFlashlist = Animated.createAnimatedComponent(MasonryFlashList);

const ArtListPage = () => {
	const { tag } = useLocalSearchParams<{ tag: string }>();
	const { data, hasNextPage, fetchNextPage } = usePostsSearch({
		page: 1,
		limit: 30,
		tags: tag + ' solo',
	});
	const { scrollHandler, shouldShowScrollToTop } = useScrollHandler();

	const listRef = useRef<MasonryFlashListRef<DanPost>>(null);

	const RenderItem: MasonryListRenderItem<DanPost> = ({ item }) => {
		return (
			<View style={{ flex: 1, margin: 5 }}>
				<DanbooruImageCard
					item={item}
					onNavigate={(id) => router.push(`/art/post/${id}`)}
				/>
			</View>
		);
	};

	const flattenedData = data?.pages?.flatMap((page) => page);

	return (
		<View style={{ width: '100%', flex: 1 }}>
			{(flattenedData?.length ?? 0) > 0 ? (
				<AnimatedMasonryFlashlist
					ref={listRef}
					data={flattenedData}
					numColumns={2}
					renderItem={RenderItem}
					estimatedItemSize={200}
					onEndReachedThreshold={0.7}
					onEndReached={() => hasNextPage && fetchNextPage()}
					onScroll={scrollHandler}
				/>
			) : (
				<View
					style={{
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			{shouldShowScrollToTop && (
				// masonryflashlist has some function as Flashlist
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
					top={20}
				/>
			)}
			<Stack.Screen options={{ title: tag as string }} />
		</View>
	);
};

export default ArtListPage;
