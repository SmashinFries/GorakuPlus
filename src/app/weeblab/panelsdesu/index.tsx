import { GetSearchSearchMedia200PanelsItem } from '@/api/panelsdesu/models';
import { useGetSearchSearchMedia } from '@/api/panelsdesu/panelsdesu';
import { useStickyHeader } from '@/hooks/animations/useStickyHeader';
import useDebounce from '@/hooks/useDebounce';
import { useAppTheme } from '@/store/theme/themes';
import { MasonryFlashList, MasonryListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const AnimatedMasonryFlashList = Animated.createAnimatedComponent(MasonryFlashList);

const PanelItem = ({ item }: { item: GetSearchSearchMedia200PanelsItem }) => {
	const { colors } = useAppTheme();
	return (
		<Pressable
			onPress={() => router.navigate(`/weeblab/panelsdesu/${item.id}`)}
			android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
			style={{
				flex: 1,
				aspectRatio: item?.width / item?.height,
				// minHeight: 80,
			}}
		>
			<Image
				transition={800}
				source={{ uri: item.image_url, width: item.width, height: item.height }}
				contentFit="contain"
				recyclingKey={item.image_url}
				style={{
					// width: '100%',
					// height: '100%',
					aspectRatio: item?.width / item?.height,
				}}
			/>
		</Pressable>
	);
};

const PanelsDesuPage = () => {
	const { colors } = useAppTheme();
	const [query, setQuery] = useState('');
	const [searchbarHeight, setSearchbarHeight] = useState(0);
	const queryDebounced = useDebounce(query, 700);
	const { data, isFetching } = useGetSearchSearchMedia(
		{ q: queryDebounced as string, limit: '100' },
		{ query: { enabled: !!queryDebounced } },
	);

	const { scrollHandler, stickyHeaderStyle } = useStickyHeader(searchbarHeight);

	const renderItem = useCallback(
		(props: MasonryListRenderItemInfo<GetSearchSearchMedia200PanelsItem>) => {
			return <PanelItem {...props} />;
		},
		[],
	);

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<AnimatedMasonryFlashList
				data={data?.data?.panels}
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
				contentContainerStyle={{ paddingTop: searchbarHeight }}
				renderItem={renderItem}
				onScroll={scrollHandler}
				estimatedItemSize={268}
				numColumns={2}
				keyboardDismissMode={'on-drag'}
				showsVerticalScrollIndicator
				// ListHeaderComponent={() => (

				// )}
			/>
			<Animated.View style={[{ position: 'absolute', width: '100%' }, stickyHeaderStyle]}>
				<Searchbar
					mode="view"
					value={query}
					elevation={0}
					onChangeText={(txt) => setQuery(txt)}
					style={[{ backgroundColor: colors.elevation.level2 }]}
					onClearIconPress={() => setQuery('')}
					loading={isFetching}
					onLayout={(e) => setSearchbarHeight(e.nativeEvent.layout.height)}
				/>
			</Animated.View>
		</View>
	);
};

export default PanelsDesuPage;
