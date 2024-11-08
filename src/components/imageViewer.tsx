import useZoom from '@/hooks/animations/useZoom';
import { useBlur } from '@/hooks/useNSFWBlur';
import { BasicDialogProps } from '@/types';
import { rgbToRgba } from '@/utils';
import { saveImage } from '@/utils/images';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, Image as ImageRN, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { IconButton, Surface } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useAppTheme } from '@/store/theme/themes';

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
			<Pressable collapsable={false} onPress={isSpoiler ? () => toggleBlur() : undefined}>
				<GestureDetector gesture={zoomGesture}>
					<Animated.View style={[!isBlur ? animatedStyle : undefined]}>
						<Image
							collapsable={false}
							source={{ uri: url }}
							blurRadius={isSpoiler ? blurAmount : 0}
							transition={800}
							placeholder={colors.blurhash}
							style={[
								{
									height: '100%',
									width: '100%',
								},
							]}
							contentFit="cover"
						/>
					</Animated.View>
				</GestureDetector>
			</Pressable>
		</View>
	);
};

type ImageViewerProps = BasicDialogProps & {
	urls: string[];
	isSpoiler?: boolean;
	initialIndex?: number;
	rtl?: boolean;
};

export const ImageViewer = ({
	urls,
	visible,
	initialIndex = 0,
	onDismiss,
	isSpoiler = false,
	rtl = false,
}: ImageViewerProps) => {
	const { colors, roundness } = useAppTheme();
	const [index, setIndex] = useState(initialIndex);

	const { top } = useSafeAreaInsets();

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
				collapsable={false}
				exiting={FadeOut}
				entering={FadeIn}
			>
				<View
					collapsable={false}
					style={{ position: 'absolute', height: '100%', width: '100%' }}
				>
					<PagerView
						style={[
							{ height: '100%', width: '100%' },
							rtl && { transform: [{ scaleX: -1 }] },
						]}
						initialPage={initialIndex}
						onPageSelected={(e) => setIndex(e.nativeEvent.position)}
						offscreenPageLimit={2}
						layoutDirection={rtl ? 'rtl' : 'ltr'}
					>
						{urls.map((url, idx) =>
							idx - 1 <= index || idx + 1 >= index ? (
								<View
									key={idx}
									collapsable={false}
									style={[
										{
											height: '100%',
											width: '100%',
											alignItems: 'center',
											justifyContent: 'center',
										},
										rtl && { transform: [{ scaleX: -1 }] },
									]}
								>
									<Pressable
										style={{
											position: 'absolute',
											opacity: 0.4,
											height: '100%',
											width: '100%',
										}}
										collapsable={false}
										onPress={onDismiss}
									/>
									<ImageItem
										url={url}
										shouldReset={visible ? false : true}
										isSpoiler={isSpoiler}
									/>
								</View>
							) : null,
						)}
					</PagerView>
				</View>
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						width: '100%',
						alignItems: 'center',
						paddingVertical: 16,
						justifyContent: 'center',
					}}
				>
					<Surface
						mode="elevated"
						style={{
							// width: '100%',
							padding: 5,
							paddingHorizontal: 20,
							borderRadius: roundness * 5,
							alignSelf: 'center',
							flexDirection: 'row',
							backgroundColor: colors.surfaceVariant,
						}}
					>
						<IconButton
							icon={'share-variant-outline'}
							onPress={async () => await shareImage(urls[index])}
						/>
						<IconButton icon={'download'} onPress={() => saveImage(urls[index])} />
					</Surface>
				</View>
				<View style={{ position: 'absolute', right: 10, top: top + 16 }}>
					<IconButton icon={'close'} mode="contained-tonal" onPress={onDismiss} />
				</View>
			</Animated.View>
		)
	);
};
