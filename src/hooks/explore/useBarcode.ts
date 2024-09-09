import {
	MangaExploreQuery,
	SearchMangaQuery,
	useSearchMangaQuery,
} from '@/api/anilist/__genereated__/gql';
import { useIsbnSearch } from '@/api/googlebooks/googlebooks';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useQueryClient } from '@tanstack/react-query';
import { BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';

// https://www.googleapis.com/books/v1/volumes?q=isbn:1974736474

export const useBarcode = () => {
	const [scanned, setScanned] = useState(false);
	const [isbn, setIsbn] = useState<string>();
	const queryClient = useQueryClient();
	const { showNSFW } = useSettingsStore();
	const [data, setData] = useState<SearchMangaQuery | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const findBook = async (code: string) => {
		setIsLoading(true);
		const isbn_response = await queryClient.fetchQuery({ ...useIsbnSearch.options(code) });
		if (isbn_response.totalItems > 0) {
			const book = isbn_response.items[0];
			const ani_response = await queryClient.fetchQuery({
				queryKey: [...useSearchMangaQuery.getKey()],
				queryFn: useSearchMangaQuery.fetcher({
					search: book.volumeInfo.title.split(',')[0],
					isAdult: showNSFW ? undefined : false,
				}),
			});
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
