import { Dialog, Button, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BasicDialogProps } from '@/types';
import { View } from 'react-native';
import { useBarcode } from '@/hooks/explore/useBarcode';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { ExploreMediaQuery, MediaType } from '@/store/services/anilist/generated-anilist';
import { MediaCard } from './cards';
import { copyToClipboard } from '@/utils';
import { NumberPicker, NumberPickerProps } from './picker';
import { useCameraPermissions, CameraView, BarCodeType } from 'expo-camera/next';

type BarcodeScanDialogProps = BasicDialogProps & {
    onNav: (aniId: number, malId: number, type: MediaType) => void;
};
export const BarcodeScanDialog = ({ visible, onNav, onDismiss }: BarcodeScanDialogProps) => {
    const { colors } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const { aniData, isLoading, isbn, scanned, handleBarCodeScanned, triggerScan, resetScan } =
        useBarcode();

    const closeDialog = () => {
        resetScan();
        onDismiss();
    };

    const RenderItem = ({ item }: { item: ExploreMediaQuery['Page']['media'][0] }) => {
        return (
            <View
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginVertical: 10,
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
    };

    useEffect(() => {
        if (visible) {
            if (!permission.granted) {
                requestPermission();
            }
        }
    }, [visible, permission]);

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Book Scanner</Dialog.Title>
            <Dialog.Content>
                {!scanned && permission.granted ? (
                    <Animated.View entering={FadeIn} exiting={FadeOut} style={{ height: 400 }}>
                        <CameraView
                            style={[{ height: 400 }]}
                            barcodeScannerSettings={{ barCodeTypes: ['ean13'] }}
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
                                {isbn}{' '}
                                <MaterialCommunityIcon name="content-copy" color={colors.primary} />
                            </Text>{' '}
                        </Text>
                    </Animated.View>
                )}
            </Dialog.Content>
            {scanned && (
                <Dialog.ScrollArea>
                    <View
                        style={{
                            height: 450,
                            width: '100%',
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
                                contentContainerStyle={{ paddingRight: 15, paddingLeft: -5 }}
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
    };
export const NumberPickDialog = ({
    title,
    defaultValue,
    mode,
    onChange,
    options,
    visible,
    onDismiss,
}: NumberPickDialogProps) => {
    const { colors } = useTheme();
    const [tempVal, setTempVal] = useState(defaultValue);

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
                <Button onPress={onDismiss}>Cancel</Button>
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
