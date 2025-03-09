import { BasicDialogProps } from '@/types';
import {
	BarcodeBounds,
	BarcodeScanningResult,
	Camera,
	CameraView,
	useCameraPermissions,
} from 'expo-camera';
import { useEffect } from 'react';
import Animated, {
	FadeIn,
	FadeOut,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimViewMem } from './animations';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { useIsbnSearch } from '@/api/googlebooks/googlebooks';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { sendErrorMessage } from '@/utils/toast';
import * as ImagePicker from 'expo-image-picker';
import { RelativePathString, router } from 'expo-router';
import * as Linking from 'expo-linking';

const BarcodeScanner = ({
	visible,
	onDismiss,
	// openScanner,
}: BasicDialogProps & { openScanner: () => void }) => {
	const [permission, requestPermission] = useCameraPermissions();
	const queryClient = useQueryClient();
	// const codeRectBoundSize = useSharedValue<BarcodeBounds['size']>({ height: 0, width: 0 });
	// const codeRectBoundOrigin = useSharedValue<BarcodeBounds['origin']>({ x: 0, y: 0 });

	// const { aniData, isLoading, isbn, scanned, handleBarCodeScanned, triggerScan, resetScan } =
	// 	useBarcode();

	const onBarcodeScan = async ({ data, type, bounds }: BarcodeScanningResult) => {
		// type can be a number if using the scanFromURLAsync method \0_0/
		// codeRectBoundOrigin.value = withTiming(bounds.origin);
		// codeRectBoundSize.value = withTiming(bounds.size);
		if (type === 'ean13' || (type as unknown as number) === 32) {
			try {
				const isbn_response = await queryClient.fetchQuery({
					...useIsbnSearch.options(data),
				});
				if (isbn_response.data?.items.length > 0) {
					const title = isbn_response.data?.items[0].volumeInfo.title.split(',')[0];
					onDismiss();
					router.push({
						pathname: '/(sheets)/mediaSearchSheet',
						params: {
							search: title,
							type: MediaType.Manga,
							isbn: data,
						},
					});
					// openMediaSearchSheet({
					// 	search: title,
					// 	type: MediaType.Manga,
					// 	isbn: data,
					// 	// onRescan: openScanner,
					// });
				} else {
					onDismiss();
					sendErrorMessage(isbn_response.statusText ?? 'No Results');
				}
			} catch (e) {
				onDismiss();
				sendErrorMessage(`${e}`);
			}
		} else if (type === 'qr' || (type as unknown as number) === 256) {
			onDismiss();
			if (data.includes('anilist')) {
				const { path } = Linking.parse(data);
				router.navigate(('/' + path) as RelativePathString);
			}
		}
	};

	const onImageSelect = async () => {
		const { assets } = await ImagePicker.launchImageLibraryAsync();
		if (assets?.[0]?.uri) {
			const result = await Camera.scanFromURLAsync(assets?.[0]?.uri, ['qr', 'ean13']);
			if (result[0]) {
				await onBarcodeScan(result[0]);
			} else {
				onDismiss();
				sendErrorMessage('No code found');
			}
		}
	};

	// const codeRectStyle = useAnimatedStyle(() => ({
	// 	left: codeRectBoundOrigin.value.x,
	// 	top: codeRectBoundOrigin.value.y,
	// 	...codeRectBoundSize.value,
	// }));

	useEffect(() => {
		if (visible) {
			if (!permission?.granted) {
				requestPermission();
			}
		}
	}, [visible, permission]);

	// useEffect(() => {
	// 	const backAction = () => {
	// 		onDismiss();
	// 		// Alert.alert('Hold on!', 'Are you sure you want to go back?', [
	// 		// 	{
	// 		// 		text: 'Cancel',
	// 		// 		onPress: () => null,
	// 		// 		style: 'cancel',
	// 		// 	},
	// 		// 	{ text: 'YES', onPress: () => BackHandler.exitApp() },
	// 		// ]);
	// 		return true;
	// 	};

	// 	const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

	// 	return () => backHandler.remove();
	// }, []);

	return (
		visible && (
			<AnimViewMem
				entering={FadeIn}
				exiting={FadeOut}
				style={{ position: 'absolute', height: '100%', width: '100%' }}
			>
				<CameraView
					style={[{ height: '100%', width: '100%' }]}
					barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13'] }}
					onBarcodeScanned={onBarcodeScan}
				/>
				{/* <Animated.View
					style={[
						codeRectStyle,
						{
							borderWidth: 3,
							borderStyle: 'dashed',
							borderRadius: 12,
							borderColor: '#FFF',
						},
					]}
				/> */}
				<View
					style={{
						position: 'absolute',
						bottom: 12,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						// backgroundColor: 'rgba(0,0,0,0.7)',
					}}
				>
					<Surface
						style={{
							flexDirection: 'row',
							borderRadius: 6,
							paddingVertical: 8,
						}}
					>
						<Button icon={'cancel'} onPress={onDismiss}>
							Close
						</Button>
						<Button icon={'image'} onPress={onImageSelect}>
							Pick Image
						</Button>
					</Surface>
				</View>
			</AnimViewMem>
		)
	);
};

export default BarcodeScanner;
