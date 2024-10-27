import { BasicDialogProps } from '@/types';
import { BarcodeScanningResult, Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect } from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { AnimViewMem } from './animations';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { useIsbnSearch } from '@/api/googlebooks/googlebooks';
import { SheetManager } from 'react-native-actions-sheet';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { sendErrorMessage } from '@/utils/toast';
import * as ImagePicker from 'expo-image-picker';
import { Href, router } from 'expo-router';
import * as Linking from 'expo-linking';

const BarcodeScanner = ({
	visible,
	onDismiss,
	openScanner,
}: BasicDialogProps & { openScanner: () => void }) => {
	const [permission, requestPermission] = useCameraPermissions();
	const queryClient = useQueryClient();

	// const { aniData, isLoading, isbn, scanned, handleBarCodeScanned, triggerScan, resetScan } =
	// 	useBarcode();

	const onBarcodeScan = async ({ data, type }: BarcodeScanningResult) => {
		console.log('type:', type);
		console.log('data:', data);
		// type can be a number if using the scanFromURLAsync method \0_0/
		if (type === 'ean13' || (type as unknown as number) === 32) {
			try {
				const isbn_response = await queryClient.fetchQuery({
					...useIsbnSearch.options(data),
				});
				if (isbn_response.data?.items.length > 0) {
					const title = isbn_response.data?.items[0].volumeInfo.title.split(',')[0];
					onDismiss();
					SheetManager.show('MediaSearchSheet', {
						payload: {
							search: title,
							type: MediaType.Manga,
							isbn: data,
							onRescan: openScanner,
						},
					});
				} else {
					onDismiss();
					sendErrorMessage(isbn_response.statusText ?? 'No Results');
				}
			} catch (e) {
				console.log(e);
				onDismiss();
				sendErrorMessage(`${e}`);
			}
		} else if (type === 'qr' || (type as unknown as number) === 256) {
			onDismiss();
			if (data.includes('anilist')) {
				const { path } = Linking.parse(data);
				router.navigate(('/' + path) as Href<string>);
			}
		}
	};

	const onImageSelect = async () => {
		const { assets } = await ImagePicker.launchImageLibraryAsync();
		const result = await Camera.scanFromURLAsync(assets[0]?.uri, ['qr', 'ean13']);
		if (result[0]) {
			await onBarcodeScan(result[0]);
		} else {
			onDismiss();
			sendErrorMessage('No code found');
		}
	};

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
