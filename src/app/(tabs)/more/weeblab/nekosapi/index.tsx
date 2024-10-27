import { ImageSchema, NekosapiImagesApiRandomImagesParams } from '@/api/nekosapi/models';
import {
	useNekosapiImagesApiRandomImages,
	useNekosapiImagesApiTags,
} from '@/api/nekosapi/nekosapi';
import { NekosAPIHeader } from '@/components/headers';
import { useStickyHeader } from '@/hooks/animations/useStickyHeader';
import useDebounce from '@/hooks/useDebounce';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { MasonryFlashList, MasonryListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Chip, List, Searchbar, Surface, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useShallow } from 'zustand/react/shallow';

const AnimatedMasonryFlashList = Animated.createAnimatedComponent(MasonryFlashList);

const ImageItem = ({ item }: MasonryListRenderItemInfo<ImageSchema>) => {
	return (
		<Pressable
			onPress={() => router.navigate(`/(tabs)/more/weeblab/nekosapi/${item.id}`)}
			style={{
				flex: 1,
				aspectRatio: item.sample_width / item.sample_height,
				padding: 2,
				// minHeight: 80,
			}}
		>
			<Image
				transition={800}
				source={{
					uri: item.image_url,
					width: item.sample_width,
					height: item.sample_height,
				}}
				contentFit="contain"
				recyclingKey={item.image_url}
				style={{
					// width: '100%',
					// height: '100%',
					aspectRatio: item.sample_width / item.sample_height,
				}}
			/>
		</Pressable>
	);
};

const NekosApiPage = () => {
	const { colors } = useAppTheme();
	const { showNSFW } = useSettingsStore(useShallow((state) => ({ showNSFW: state.showNSFW })));
	const [ratings, setRatings] = useState<string[]>(['safe']);
	const debouncedRatings = useDebounce(ratings, 800) as string[];
	const [tagIds, setTagIds] = useState<number[]>([]);
	const debouncedTagIds = useDebounce(tagIds, 800) as number[];
	const [tagQuery, setTagQuery] = useState<string>('');
	const { data: tagData } = useNekosapiImagesApiTags(
		{ is_nsfw: showNSFW ? undefined : false },
		{ query: { refetchOnMount: false } },
	);
	const {
		data: imageData,
		isFetching,
		isFetched,
	} = useNekosapiImagesApiRandomImages(
		{
			limit: 50,
			tag: debouncedTagIds.length > 0 ? debouncedTagIds : undefined,
			rating: debouncedRatings.length > 0 ? debouncedRatings : undefined,
		},
		{ query: { refetchOnMount: false } },
	);

	const [searchbarHeight, setSearchbarHeight] = useState(0);
	const { scrollHandler, stickyHeaderStyle } = useStickyHeader(searchbarHeight);

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<Stack.Screen
				options={{
					header: (props) => (
						<NekosAPIHeader
							{...props}
							ratings={ratings}
							onRatingSelect={(newRatings) => setRatings(newRatings)}
						/>
					),
				}}
			/>
			<AnimatedMasonryFlashList
				data={imageData?.data?.items}
				contentContainerStyle={{ paddingTop: searchbarHeight + 8 }}
				renderItem={ImageItem}
				onScroll={scrollHandler}
				numColumns={2}
				keyboardDismissMode={'on-drag'}
				estimatedItemSize={270}
				ListEmptyComponent={() =>
					isFetched &&
					imageData?.data?.items?.length < 1 && (
						<View
							style={{
								height: '100%',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text>No Results!</Text>
						</View>
					)
				}
			/>
			<Animated.View style={[{ position: 'absolute', width: '100%' }, stickyHeaderStyle]}>
				<View onLayout={(e) => setSearchbarHeight(e.nativeEvent.layout.height)}>
					<Searchbar
						mode="view"
						value={tagQuery}
						elevation={0}
						onChangeText={(txt) => setTagQuery(txt)}
						style={[{ backgroundColor: colors.elevation.level2 }]}
						onClearIconPress={() => setTagQuery('')}
						loading={isFetching}
					/>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							backgroundColor: colors.elevation.level2,
						}}
					>
						{tagIds?.map((tagId, idx) => (
							<Chip
								key={idx}
								compact
								style={{ margin: 4 }}
								onPress={() =>
									setTagIds((prev) => prev.filter((id) => id !== tagId))
								}
							>
								{tagData?.data?.items?.find((tag) => tag.id === tagId)?.name}
							</Chip>
							// <View key={idx} style={{ padding: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
							// 	<Text>{tagData?.data?.items?.find((tag) => tag.id === tagId)?.name}</Text>
							// </View>
						))}
					</View>
				</View>
				{tagQuery && (
					<Surface
						elevation={2}
						style={{
							width: '100%',
							alignSelf: 'center',
							paddingHorizontal: 10,
							borderRadius: 8,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
						}}
					>
						<ScrollView>
							{tagData?.data?.items
								?.filter((tag) =>
									tag.name.toLowerCase().includes(tagQuery.toLowerCase()),
								)
								.map(
									(tag, idx) =>
										idx < 5 && (
											<List.Item
												key={idx}
												title={tag.name}
												onPress={() => {
													setTagIds((prev) => [...prev, tag.id]);
													setTagQuery('');
												}}
											/>
										),
								)}
						</ScrollView>
					</Surface>
				)}
			</Animated.View>
		</View>
	);
};

export default NekosApiPage;
