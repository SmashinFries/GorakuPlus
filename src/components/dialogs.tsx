import { Dialog, Button, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BasicDialogProps } from '@/types';
import { View } from 'react-native';
import { useBarcode } from '@/hooks/explore/useBarcode';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useCallback, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { MediaCard } from './cards';
import { copyToClipboard } from '@/utils';
import { NumberPicker, NumberPickerProps } from './picker';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { scoreToIndex } from '@/utils/scores';
import { MediaType, SearchMangaQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

type BarcodeScanDialogProps = BasicDialogProps & {
	onNav: (aniId: number, malId: number, type: MediaType) => void;
};
export const BarcodeScanDialog = ({ visible, onNav, onDismiss }: BarcodeScanDialogProps) => {
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
		({ item }: { item: SearchMangaQuery['Page']['media'][0] }) => {
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
						titles={item.title}
						coverImg={item.coverImage.extraLarge}
						navigate={() => {
							closeDialog();
							onNav(item.id, item.idMal, item.type);
						}}
						scoreDistributions={item.stats?.scoreDistribution}
						meanScore={item.meanScore}
						averageScore={item.averageScore}
						// height={dialog_width / 2 - 5}
						fitToParent
						isFavorite={item.isFavourite}
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
