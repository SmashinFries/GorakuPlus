import { TransYUpViewMem } from '@/components/animations';
import { ImageViewer } from '@/components/imageViewer';
import { ListHeading } from '@/components/text';
import { useBlur } from '@/hooks/useNSFWBlur';
import { Media, MediaStreamingEpisode } from '@/store/services/anilist/generated-anilist';
import { useAppTheme } from '@/store/theme/theme';
import { SaveImageDialog } from '@/utils/images';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Portal } from 'react-native-paper';

type ScreenshotItemProps = {
	item: Media['streamingEpisodes'][0];
	index: number;
};
const ScreenshotItem = ({
	item,
	index,
	onSelect,
}: ScreenshotItemProps & { onSelect: () => void }) => {
	const { blurAmount, isBlur, toggleBlur } = useBlur();

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
		<TransYUpViewMem style={{ overflow: 'visible' }}>
			<ListHeading
				title="Screenshots"
				subtitle="Contains spoilers!"
				subtitleStyle={{ color: colors.onSurfaceVariant }}
			/>
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
			<Portal>
				<ImageViewer
					urls={data.map((stream) => stream.thumbnail)}
					visible={isImageViewerVisible}
					onDismiss={() => setImageViewerVisible(false)}
					isSpoiler
					initialIndex={currentImageIndex.current}
				/>
			</Portal>
		</TransYUpViewMem>
	);
};

export default ScreenshotImages;
