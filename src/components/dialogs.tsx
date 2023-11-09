import { Dialog, Button, Text, Searchbar, ActivityIndicator, useTheme } from 'react-native-paper';
import { BarCodeScanner, Constants as BarCodeConstants } from 'expo-barcode-scanner';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BasicDialogProps } from '../types';
import { StyleSheet, View } from 'react-native';
import { useBarcode } from '../features/explore/hooks/useBarcode';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useLazySearchISBNQuery } from '../app/services/google-books/googleApi';
import { useCallback, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useLazyExploreMediaQuery } from '../app/services/anilist/enhanced';
import {
    ExploreMediaQuery,
    MediaFormat,
    MediaType,
} from '../app/services/anilist/generated-anilist';
import { MediaCard } from './cards';
import { copyToClipboard } from '../utils';

type BarcodeScanDialogProps = BasicDialogProps & {
    onNav: (aniId: number, malId: number, type: MediaType) => void;
};
export const BarcodeScanDialog = ({ visible, onNav, onDismiss }: BarcodeScanDialogProps) => {
    const { colors } = useTheme();
    const {
        aniData,
        isLoading,
        isbn,
        scanned,
        hasPermission,
        handleBarCodeScanned,
        triggerScan,
        resetScan,
        getBarCodeScannerPermissions,
    } = useBarcode();

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
                />
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: colors.onSurfaceVariant,
                    }}
                >
                    {/* {item.isLicensed
                    ? item?.format
                    : 'Doujin'}{' '}
                · {item.st?.replaceAll('_', ' ') ?? '??'} */}
                    {item?.format}
                </Text>
            </View>
        );
    };

    // useEffect(() => {
    //     if (isbn && scanned && !isbnData.data) {
    //         findBook(isbn);
    //     }
    // }, [isbn, isbnData, scanned]);

    useEffect(() => {
        if (visible) {
            getBarCodeScannerPermissions();
        }
    }, [visible]);

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Book Scanner</Dialog.Title>
            <Dialog.Content>
                {!scanned && hasPermission ? (
                    <Animated.View entering={FadeIn} exiting={FadeOut} style={{ height: 400 }}>
                        <BarCodeScanner
                            style={[{ height: 400 }]}
                            barCodeTypes={[BarCodeConstants.BarCodeType.ean13]}
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
