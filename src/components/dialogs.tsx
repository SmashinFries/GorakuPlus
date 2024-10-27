import { Dialog, Button, Text, ActivityIndicator, useTheme, TextInput } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BasicDialogProps } from '@/types';
import { Platform, View } from 'react-native';
import { useBarcode } from '@/hooks/explore/useBarcode';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useCallback, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { MediaCard } from './cards';
import { copyToClipboard } from '@/utils';
import { NumberPicker, NumberPickerProps } from './picker';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { scoreToIndex } from '@/utils/scores';
import { MediaSearchQuery, MediaType } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { openWebBrowser } from '@/utils/webBrowser';
import { useShallow } from 'zustand/react/shallow';

export const BarcodeScanDialog = ({ visible, onDismiss }: BasicDialogProps) => {
	const { colors } = useAppTheme();
	const [permission, requestPermission] = useCameraPermissions();
	const { aniData, isLoading, isbn, scanned, handleBarCodeScanned, triggerScan, resetScan } =
		useBarcode();

	const [dialog_width, setDialogWidth] = useState(0);

	const closeDialog = () => {
		resetScan();
		onDismiss();
	};

	const RenderItem = useCallback(
		({ item }: { item: MediaSearchQuery['Page']['media'][0] }) => {
			return (
				<View
					style={{
						flex: 1,
						width: '100%',
						alignItems: 'center',
						marginVertical: 10,
						marginHorizontal: 10,
					}}
				>
					<MediaCard
						{...item}
						navigate={() => {
							closeDialog();
							router.navigate(`/manga/${item.id}`);
						}}
						fitToParent
					/>
					<Text
						variant="labelMedium"
						style={{
							textTransform: 'capitalize',
							textAlign: 'center',
							color: colors.onSurfaceVariant,
						}}
					>
						{item?.format}
					</Text>
				</View>
			);
		},
		[dialog_width],
	);

	useEffect(() => {
		if (visible) {
			if (!permission?.granted) {
				requestPermission();
			}
		}
	}, [visible, permission]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Book Scanner</Dialog.Title>
			<Dialog.Content>
				{!scanned && permission?.granted ? (
					<Animated.View entering={FadeIn} exiting={FadeOut} style={{ height: 400 }}>
						<CameraView
							style={[{ height: 400 }]}
							barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
							onBarcodeScanned={(scanningResult) =>
								handleBarCodeScanned(scanningResult)
							}
						/>
					</Animated.View>
				) : (
					<Animated.View entering={FadeIn} exiting={FadeOut}>
						<Text>
							ISBN:{' '}
							<Text
								onPress={() => copyToClipboard(isbn)}
								style={{ color: colors.primary }}
							>
								{isbn} {/* @ts-ignore | Icon still appears.? */}
								<MaterialCommunityIcon name="content-copy" color={colors.primary} />
							</Text>{' '}
						</Text>
					</Animated.View>
				)}
			</Dialog.Content>
			{scanned && (
				<Dialog.ScrollArea onLayout={(e) => setDialogWidth(e.nativeEvent.layout.width)}>
					<View
						style={{
							height: 450,
						}}
					>
						{!isLoading ? (
							<FlashList
								key={1}
								data={aniData?.Page?.media}
								keyExtractor={(item) => item?.id.toString()}
								renderItem={RenderItem}
								estimatedItemSize={100}
								numColumns={2}
								showsVerticalScrollIndicator={false}
								centerContent
							/>
						) : (
							<View
								style={{
									height: 450,
									width: '100%',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<ActivityIndicator size={'large'} />
							</View>
						)}
					</View>
				</Dialog.ScrollArea>
			)}
			<Dialog.Actions>
				<Button onPress={closeDialog}>Close</Button>
				{scanned && <Button onPress={triggerScan}>Rescan</Button>}
			</Dialog.Actions>
		</Dialog>
	);
};

type NumberPickDialogProps = BasicDialogProps &
	NumberPickerProps & {
		title: string;
		onCancel?: () => void;
	};
export const NumberPickDialog = ({
	title,
	defaultValue,
	mode,
	onChange,
	options,
	visible,
	onDismiss,
	onCancel,
}: NumberPickDialogProps) => {
	const [tempVal, setTempVal] = useState(defaultValue ?? 0);

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Content>
				<NumberPicker
					defaultValue={tempVal}
					mode={mode}
					onChange={(value) => setTempVal(value)}
					options={options}
				/>
			</Dialog.Content>
			<Dialog.Actions>
				<Button
					onPress={() => {
						onCancel && onCancel();
						setTempVal(defaultValue ?? 0);
						onDismiss();
					}}
				>
					Cancel
				</Button>
				<Button
					onPress={() => {
						onChange(tempVal);
						onDismiss();
					}}
				>
					Confirm
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export const SauceNaoAuthDialog = ({ visible, onDismiss }: BasicDialogProps) => {
	const { api_key } = useAuthStore(useShallow((state) => state.sauceNao));
	const setSauceNaoAuth = useAuthStore(useShallow((state) => state.setSauceNaoAuth));
	const [tempApiKey, setTempApiKey] = useState(api_key ?? '');

	const onSubmit = () => {
		setSauceNaoAuth(tempApiKey);
		onDismiss();
	};

	useEffect(() => {
		setTempApiKey(api_key);
	}, [visible]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>SauceNao</Dialog.Title>
			<Dialog.Content>
				<TextInput
					label={'API Key'}
					value={tempApiKey}
					onChangeText={(txt) => setTempApiKey(txt)}
					mode="outlined"
					right={
						tempApiKey?.length > 0 && (
							<TextInput.Icon icon={'close'} onPress={() => setTempApiKey('')} />
						)
					}
				/>
				<Button
					onPress={() => openWebBrowser('https://saucenao.com/user.php')}
					style={{ alignSelf: 'flex-end' }}
				>
					Get API key
				</Button>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={onSubmit}>Save</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export const WaifuItTokenDialog = ({ visible, onDismiss }: BasicDialogProps) => {
	const isWeb = Platform.OS === 'web';
	const { waifuit, setWaifuit } = useAuthStore();
	const [inputToken, setInputToken] = useState(waifuit.token);

	const onConfirm = () => {
		setWaifuit(inputToken);
		onDismiss();
	};

	return (
		<Dialog
			visible={visible}
			onDismiss={onDismiss}
			style={{ maxWidth: isWeb ? '50%' : undefined, alignSelf: isWeb ? 'center' : undefined }}
		>
			<Dialog.Title>{'Waifu.It Login'}</Dialog.Title>
			<Dialog.Content>
				<Text style={{ paddingBottom: 10, fontWeight: '900' }}>
					Discord login required!
				</Text>
				<Text>
					To use Waifu.It, you need to claim a token. Once you have a token, enter it
					below.
				</Text>
				<Button
					mode="elevated"
					onPress={() => openWebBrowser('https://docs.waifu.it/faq')}
					style={{ marginVertical: 20 }}
				>
					Get Token
				</Button>
				<TextInput
					mode="outlined"
					label={'Token'}
					placeholder="Enter token here..."
					value={inputToken}
					onChangeText={(txt) => setInputToken(txt)}
				/>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={onConfirm}>Save</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
