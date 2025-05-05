import { GetSearchSearchMedia200PanelsItem } from '@/api/panelsdesu/models';
import { useGetSearchSearchMedia } from '@/api/panelsdesu/panelsdesu';
import { AnimatedMasonryFlashList } from '@/components/list';
import { useStickyHeader } from '@/hooks/animations/useStickyHeader';
import useDebounce from '@/hooks/useDebounce';
import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const PanelItem = ({ item }: { item: GetSearchSearchMedia200PanelsItem }) => {
	const { colors } = useAppTheme();
	const aspectRatio = useMemo(
		() => (item?.width ?? 1) / (item?.height ?? 1),
		[item?.width, item?.height],
	);
	return (
		<Pressable
			onPress={() => router.navigate(`/weeblab/panelsdesu/${item.id}`)}
			android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
			style={{
				flex: 1,
				aspectRatio: aspectRatio,
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
					aspectRatio: aspectRatio,
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

	const renderItem = useCallback((props: any) => {
		return <PanelItem {...props} />;
	}, []);

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<AnimatedMasonryFlashList
				data={data?.data?.panels ?? []}
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
