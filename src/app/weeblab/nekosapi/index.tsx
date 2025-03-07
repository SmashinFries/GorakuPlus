import { useNekosApiImageSearchQuery, useNekosApiRandomImageQuery } from '@/api/nekosapi/nekosapi';
import { NekosApiImageResponse, NekosApiImageSearchParams } from '@/api/nekosapi/types';
import { ScrollToTopButton } from '@/components/buttons';
import { GorakuRefreshControl } from '@/components/explore/lists';
import { NekosAPIHeader } from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { NekosApiSheet } from '@/components/sheets/weeblabSheets';
import { useScrollHandler } from '@/hooks/animations/useScrollHandler';
import { useStickyHeader } from '@/hooks/animations/useStickyHeader';
import useDebounce from '@/hooks/useDebounce';
import { useAppTheme } from '@/store/theme/themes';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import {
	MasonryFlashList,
	MasonryFlashListRef,
	MasonryListRenderItemInfo,
} from '@shopify/flash-list';
import { Image, useImage } from 'expo-image';
import { router, Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Text, TouchableRipple } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const AnimatedMasonryFlashList = Animated.createAnimatedComponent(MasonryFlashList);

const ImageItem = ({ item }: MasonryListRenderItemInfo<NekosApiImageResponse>) => {
	const { colors } = useAppTheme();
	const image = useImage(item.url, { maxHeight: 350 });
	if (!image) return null;
	return (
		<Pressable
			onPress={() => router.navigate(`/weeblab/nekosapi/${item.id}`)}
			android_ripple={{ color: colors.primary, borderless: false, foreground: true }}
			style={{
				aspectRatio: image.width / image.height,
				// aspectRatio: 3 / 4,
				padding: 2,
				maxHeight: 350,
				// height: 300,
				// backgroundColor: 'red',
				// minHeight: 80,
			}}
		>
			<Image
				transition={800}
				source={image}
				contentFit="contain"
				recyclingKey={item.url}
				allowDownscaling
				style={{
					width: '100%',
					height: '100%',
					// aspectRatio: ,
					// aspectRatio: image.width / image.height,
				}}
			/>
		</Pressable>
	);
};

const NekosApiPage = () => {
	const filterRef = useRef<TrueSheet>(null);
	const layout = useWindowDimensions();

	// const { colors } = useAppTheme();
	// const { showNSFW } = useSettingsStore(useShallow((state) => ({ showNSFW: state.showNSFW })));
	const [ratings, setRatings] = useState<string[]>(['safe']);
	const debouncedRatings = useDebounce(ratings, 800) as string[];
	// const [tagIds, setTagIds] = useState<number[]>([]);
	// const debouncedTagIds = useDebounce(tagIds, 800) as number[];
	// const [tagQuery, setTagQuery] = useState<string>('');
	// const { data: tagData } = useNekosapiImagesApiTags(
	// 	{ is_nsfw: showNSFW ? undefined : false },
	// 	{ query: { refetchOnMount: false } },
	// );
	const {
		data: imageData,
		isFetching,
		isRefetching,
		isSuccess,
		refetch,
	} = useNekosApiRandomImageQuery({
		limit: 50,
		// tag: debouncedTagIds.length > 0 ? debouncedTagIds : undefined,
		rating:
			debouncedRatings.length > 0
				? (debouncedRatings as NekosApiImageSearchParams['rating'])
				: undefined,
	});

	// const [searchbarHeight, setSearchbarHeight] = useState(0);
	// const { scrollHandler, stickyHeaderStyle } = useStickyHeader(searchbarHeight);
	const { scrollHandler, shouldShowScrollToTop } = useScrollHandler(undefined, 80);
	const scrollRef = useRef<MasonryFlashListRef<any>>(null);

	return (
		<>
			<Stack.Screen
				options={{
					header: (props) => (
						<NekosAPIHeader
							{...props}
							onOpenFilter={() => {
								filterRef.current?.present();
							}}
						/>
					),
				}}
			/>
			{isFetching && !isRefetching && (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<GorakuActivityIndicator />
				</View>
			)}
			{!isFetching && !isRefetching && (
				<AnimatedMasonryFlashList
					ref={scrollRef}
					data={imageData?.data}
					contentContainerStyle={{ paddingTop: 8 }}
					renderItem={({ item, ...props }) => (
						<ImageItem item={item as NekosApiImageResponse} {...props} />
					)}
					onScroll={scrollHandler}
					numColumns={2}
					keyboardDismissMode={'on-drag'}
					drawDistance={layout.height * 2}
					estimatedItemSize={270}
					refreshControl={
						<GorakuRefreshControl onRefresh={refetch} refreshing={isRefetching} />
					}
					ListEmptyComponent={() => (
						<View
							style={{
								height: '100%',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{!isFetching && isSuccess && (imageData?.data?.length ?? 0) > 0 && (
								<Text>No Results!</Text>
							)}
						</View>
					)}
				/>
			)}
			{/* <Animated.View style={[{ position: 'absolute', width: '100%' }, stickyHeaderStyle]}>
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
			</Animated.View> */}
			{shouldShowScrollToTop && (
				<ScrollToTopButton
					onPress={() => scrollRef.current?.scrollToOffset({ offset: 0, animated: true })}
					top={80}
				/>
			)}
			<NekosApiSheet
				sheetRef={filterRef}
				ratings={ratings}
				onRatingSelect={(newRatings) => {
					setRatings(newRatings);
					scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
				}}
			/>
		</>
	);
};

export default NekosApiPage;
