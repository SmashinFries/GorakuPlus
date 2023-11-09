import { useEffect, useState } from 'react';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { useLazySearchISBNQuery } from '../../../app/services/google-books/googleApi';
import { useLazyExploreMediaQuery } from '../../../app/services/anilist/enhanced';
import { ExploreMediaQuery, MediaType } from '../../../app/services/anilist/generated-anilist';
import { useAppSelector } from '../../../app/hooks';

// https://www.googleapis.com/books/v1/volumes?q=isbn:1974736474

export const useBarcode = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isbn, setIsbn] = useState<string>();

    const { showNSFW } = useAppSelector((state) => state.persistedSettings);

    const [searchISBN] = useLazySearchISBNQuery();
    const [searchAni] = useLazyExploreMediaQuery();
    const [data, setData] = useState<ExploreMediaQuery | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const findBook = async (code: string) => {
        setIsLoading(true);
        const isbn_response = await searchISBN({ isbn: code }).unwrap();
        if (isbn_response.totalItems > 0) {
            const book = isbn_response.items[0];
            const ani_response = await searchAni({
                search: book.volumeInfo.title.split(',')[0],
                type: MediaType.Manga,
                isAdult: showNSFW ? undefined : false,
            }).unwrap();
            setData(ani_response);
        } else {
            setData(null);
        }
        setIsLoading(false);
    };

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    // useEffect(() => {

    //     getBarCodeScannerPermissions();
    // }, []);

    const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
        setScanned(true);
        setIsbn(data);
        findBook(data);
    };

    const triggerScan = () => {
        setScanned(false);
    };

    const resetScan = () => {
        setScanned(false);
        setData(null);
        setIsbn(undefined);
    };

    return {
        aniData: data,
        hasPermission,
        scanned,
        isbn,
        isLoading,
        resetScan,
        triggerScan,
        handleBarCodeScanned,
        getBarCodeScannerPermissions,
    };
};
