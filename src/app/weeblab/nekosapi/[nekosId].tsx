import { useNekosApiImageIdQuery } from '@/api/nekosapi/nekosapi';
import { Accordion, AnimViewMem } from '@/components/animations';
import { ArtistBar } from '@/components/art/artist';
import { InteractionBar } from '@/components/art/interactions';
import { ImageViewer } from '@/components/imageViewer';
import { GorakuActivityIndicator } from '@/components/loading';
import { copyToClipboard, rgbToHex } from '@/utils';
import { Image, useImage } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Chip, Divider, Portal } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ColorPaletteItem = ({ rgb, itemWidth }: { rgb: number[]; itemWidth: number }) => {
	const colorScaleVal = useSharedValue(1);
	const animStyle = useAnimatedStyle(() => ({
		transform: [{ scale: colorScaleVal.value }],
	}));

	return (
		<Animated.View style={[animStyle]}>
			<Pressable
				onPressIn={() => {
					colorScaleVal.value = withTiming(1.2);
				}}
				onPressOut={() => {
					colorScaleVal.value = withTiming(1);
				}}
				onLongPress={() => copyToClipboard(rgbToHex(rgb))}
				style={{
					height: 100,
					width: itemWidth,
					// (width - 20) / color_palette.length,
					backgroundColor: `rgb(${rgb.join(', ')})`,
				}}
			/>
		</Animated.View>
	);
};

const NekoImagePage = () => {
	const { height, width } = useWindowDimensions();
	const { nekosId: idStr } = useLocalSearchParams<{ nekosId: string }>();
	const { data, isFetching, isFetched } = useNekosApiImageIdQuery(idStr);

	const image = useImage(
		data?.data?.url ?? '',
		{
			maxWidth: height * 0.45,
		},
		[data?.data?.url],
	);

	// const [tagDialogVis, setTagDialogVis] = useState(false);
	// const [selectedTag, setSelectedTag] = useState<MediaTag>(null);

	const [imageViewerVis, setImageViewerVis] = useState(false);

	if (!image) {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<>
			{isFetching && (
				<AnimViewMem
					style={{
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</AnimViewMem>
			)}
			<ScrollView>
				{isFetched && data?.data && (
					<AnimViewMem>
						<Pressable style={{ flex: 1 }} onPress={() => setImageViewerVis(true)}>
							<Image
								source={image}
								style={{
									// flex: 1,
									// maxHeight: '100%',
									aspectRatio: image.width / image.height,
									width: '100%',
									alignSelf: 'center',
								}}
								contentFit="contain"
							/>
						</Pressable>
						<View style={{ paddingTop: 6, paddingBottom: 10, paddingHorizontal: 10 }}>
							{/* <Text variant="titleLarge" style={{ paddingVertical: 6 }}>
							{data.data.artist?.name
								? `Created by ${data.data.artist?.name}`
								: 'Unknown Artist'}
						</Text> */}
							<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
								<Chip
									compact
									style={{ margin: 4 }}
									textStyle={{ textTransform: 'capitalize' }}
								>
									{data.data.rating}
								</Chip>
								{data.data.tags.map((tag, idx) => (
									<Chip
										key={idx}
										compact
										mode={'outlined'}
										style={{ margin: 4 }}
										onLongPress={() => copyToClipboard(tag.replaceAll('_', ''))}
										// onPress={() => {
										// 	setSelectedTag({
										// 		...tag,
										// 		category: tag.sub,
										// 		isAdult: tag.is_nsfw,
										// 	});
										// 	setTagDialogVis(true);
										// }}
									>
										{tag.replaceAll('_', '')}
									</Chip>
								))}
							</View>
							<InteractionBar share_url={data.data.url} url={data.data.url} />
							<ArtistBar
								artist_name={data.data.artist_name ?? undefined}
								source={data.data.source_url}
							/>
							<Divider />
							<Accordion
								title="Color Palette"
								description={'Long Press to copy hex code!'}
								initialExpand
							>
								<Pressable
									onLongPress={() =>
										copyToClipboard(rgbToHex(data.data.color_palette[0]))
									}
									style={{
										width: '100%',
										height: 45,
										marginVertical: 4,
										backgroundColor: `rgb(${data.data.color_dominant.join(', ')})`,
									}}
								/>
								<View style={{ flexDirection: 'row', paddingBottom: 20 }}>
									{data.data.color_palette?.map((rgb, idx) => (
										<ColorPaletteItem
											key={idx}
											rgb={rgb}
											itemWidth={
												(width - 20) / data.data.color_palette.length
											}
										/>
									))}
								</View>
							</Accordion>
						</View>
					</AnimViewMem>
				)}
				<Portal>
					{/* <TagDialog
						tag={selectedTag}
						visible={tagDialogVis}
						onDismiss={() => setTagDialogVis(false)}
					/> */}
					<ImageViewer
						urls={data?.data?.url ? [data.data.url] : []}
						visible={imageViewerVis}
						onDismiss={() => setImageViewerVis(false)}
					/>
				</Portal>
			</ScrollView>
		</>
	);
};

export default NekoImagePage;
