import { useEffect, useState } from 'react';

// https://www.googleapis.com/books/v1/volumes?q=isbn:1974736474

export const useBarcode = () => {
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

	const handleBarCodeScanned = ({ data, bounds, cornerPoints }: BarcodeScanningResult) => {
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
		scanned,
		isbn,
		isLoading,
		resetScan,
		triggerScan,
		handleBarCodeScanned,
	};
};
