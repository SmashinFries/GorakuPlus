import { Media, MediaStreamingEpisode } from '@/api/anilist/__genereated__/gql';
import { Accordion } from '@/components/animations';
import { ImageViewer } from '@/components/imageViewer';
import { ListHeading } from '@/components/text';
import { useBlur } from '@/hooks/useNSFWBlur';
import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Portal } from 'react-native-paper';

type ScreenshotItemProps = {
	item: Media['streamingEpisodes'][0];
	index: number;
};
const ScreenshotItem = ({ item, onSelect }: ScreenshotItemProps & { onSelect: () => void }) => {
	const { blurAmount, toggleBlur } = useBlur();

	const { colors } = useAppTheme();
	return (
		<Pressable
			onPress={onSelect}
			onLongPress={toggleBlur}
			style={{ marginHorizontal: 5, height: 180, aspectRatio: 16 / 9 }}
		>
			<Image
				source={{ uri: item.thumbnail }}
				style={{ width: '100%', height: '100%' }}
				contentFit="contain"
				placeholder={colors.blurhash}
				placeholderContentFit="cover"
				transition={800}
				blurRadius={blurAmount}
				recyclingKey={item.thumbnail}
			/>
		</Pressable>
	);
};

type ScreenshotsProps = {
	data: Media['streamingEpisodes'];
};
const ScreenshotImages = ({ data }: ScreenshotsProps) => {
	const { colors } = useAppTheme();
	const currentImageIndex = useRef(0);

	const [isImageViewerVisible, setImageViewerVisible] = useState(false);

	const RenderItem = useCallback((props: { item: MediaStreamingEpisode; index: number }) => {
		return (
			<ScreenshotItem
				{...props}
				onSelect={() => {
					currentImageIndex.current = props.index;
					setImageViewerVisible(true);
				}}
			/>
		);
	}, []);

	if (!data || data?.length === 0) {
		return null;
	}

	return (
		<View style={{ overflow: 'visible' }}>
			<Accordion title="Screenshots" description={'Contains spoilers!'}>
				<View style={{ width: '100%', height: 180 }}>
					<FlatList
						data={data}
						renderItem={RenderItem}
						keyExtractor={(item, index) => index.toString()}
						// estimatedItemSize={250}
						horizontal
						contentContainerStyle={{ padding: 15 }}
						showsHorizontalScrollIndicator={false}
						// drawDistance={225 * data?.data?.length}
					/>
				</View>
			</Accordion>
			{/* <ListHeading
				title="Screenshots"
				subtitle="Contains spoilers!"
				subtitleStyle={{ color: colors.onSurfaceVariant }}
			/> */}

			<Portal>
				<ImageViewer
					urls={data.map((stream) => stream.thumbnail)}
					visible={isImageViewerVisible}
					onDismiss={() => setImageViewerVisible(false)}
					isSpoiler
					initialIndex={currentImageIndex.current}
				/>
			</Portal>
		</View>
	);
};

export default ScreenshotImages;
