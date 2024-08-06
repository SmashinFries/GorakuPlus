import useZoom from '@/hooks/animations/useZoom';
import { useBlur } from '@/hooks/useNSFWBlur';
import { BasicDialogProps } from '@/types';
import { rgbToRgba } from '@/utils';
import { saveImage } from '@/utils/images';
import { Image, ImageProps } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, Image as ImageRN, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { IconButton, Modal, Surface } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useAppTheme } from '@/store/theme/themes';

const AnimatedImage = Animated.createAnimatedComponent<ImageProps>(Image);

const ImageItem = ({
	url,
	shouldReset,
	isSpoiler,
}: {
	url: string;
	shouldReset: boolean;
	isSpoiler: boolean;
}) => {
	const { colors } = useAppTheme();
	const { animatedStyle, zoomGesture, resetZoom } = useZoom();
	const { blurAmount, isBlur, toggleBlur } = useBlur(200, isSpoiler);
	const [aspectRatio, setAspectRatio] = useState(0);

	useEffect(() => {
		if (shouldReset) {
			resetZoom();
		}
	}, [shouldReset]);

	useEffect(() => {
		ImageRN.getSize(url, (width, height) => {
			setAspectRatio(width / height);
		});
	}, []);

	return (
		<View
			collapsable={false}
			style={{ width: '100%', height: undefined, aspectRatio: aspectRatio }}
		>
			<Pressable onPress={isSpoiler ? () => toggleBlur() : undefined}>
				<GestureDetector gesture={zoomGesture}>
					<AnimatedImage
						sharedTransitionTag={url}
						source={{ uri: url }}
						blurRadius={isSpoiler ? blurAmount : 0}
						transition={800}
						placeholder={colors.blurhash}
						style={[
							!isBlur ? animatedStyle : undefined,
							{
								height: '100%',
								width: '100%',
								backgroundColor: 'green',
							},
						]}
						contentFit="cover"
					/>
				</GestureDetector>
			</Pressable>
		</View>
	);
};

type ImageViewerProps = BasicDialogProps & {
	urls: string[];
	isSpoiler?: boolean;
	initialIndex?: number;
};
export const ImageViewer = ({
	urls,
	visible,
	initialIndex = 0,
	onDismiss,
	isSpoiler = false,
}: ImageViewerProps) => {
	const { colors, roundness } = useAppTheme();
	const [index, setIndex] = useState(initialIndex);

	const { top, right } = useSafeAreaInsets();

	const shareImage = async (url: string) => {
		const [{ localUri }] = await Asset.loadAsync(url);
		await Sharing.shareAsync(localUri, { mimeType: 'image/*', dialogTitle: 'Image share' });
		await FileSystem.deleteAsync(localUri);
	};

	return (
		visible && (
			<Animated.View
				style={{
					flex: 1,
					position: 'absolute',
					height: '100%',
					width: '100%',
					backgroundColor: rgbToRgba(colors.background, 0.7),
				}}
				exiting={FadeOut}
				entering={FadeIn}
			>
				<GestureHandlerRootView
					style={{ position: 'absolute', height: '100%', width: '100%' }}
				>
					<PagerView
						style={{ height: '100%', width: '100%' }}
						initialPage={initialIndex}
						onPageSelected={(e) => setIndex(e.nativeEvent.position)}
					>
						{urls.map((url, idx) => (
							<View
								key={idx}
								style={{
									height: '100%',
									width: '100%',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Pressable
									style={{
										position: 'absolute',
										opacity: 0.4,
										height: '100%',
										width: '100%',
									}}
									onPress={onDismiss}
								/>
								<ImageItem
									url={url}
									shouldReset={visible ? false : true}
									isSpoiler={isSpoiler}
								/>
							</View>
						))}
					</PagerView>
				</GestureHandlerRootView>
				<Surface
					mode="elevated"
					style={{
						position: 'absolute',
						bottom: 0,
						// width: '100%',
						padding: 5,
						paddingHorizontal: 20,
						marginHorizontal: 20,
						marginBottom: 10,
						borderRadius: roundness * 5,
						alignSelf: 'center',
						flexDirection: 'row',
						backgroundColor: colors.surfaceVariant,
					}}
				>
					<IconButton icon={'download'} onPress={() => saveImage(urls[index])} />
					<IconButton
						icon={'share-variant-outline'}
						onPress={async () => await shareImage(urls[index])}
					/>
				</Surface>
				<View style={{ alignSelf: 'flex-end', paddingTop: top }}>
					<IconButton icon={'close'} mode="contained-tonal" onPress={onDismiss} />
				</View>
			</Animated.View>
		)
	);
};
