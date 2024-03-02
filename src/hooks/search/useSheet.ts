import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useEffect, useState } from 'react';

const useFilterSheet = (sheetRef: React.MutableRefObject<BottomSheetModalMethods>) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const handleSheetChange = useCallback((index) => {
		if (index === -1) {
			setIsFilterOpen(false);
			sheetRef.current?.dismiss();
		}
	}, []);

	const closeSheet = useCallback(() => {
		// setIsFilterOpen(false);
		sheetRef.current?.dismiss();
	}, []);

	const openSheet = useCallback(() => {
		sheetRef.current?.present();
	}, []);

	// useEffect(() => {
	//     if (!isFilterOpen) {
	//         sheetRef.current?.present();
	//     } else {
	//         sheetRef.current?.dismiss();
	//     }
	// }, [isFilterOpen]);

	return {
		isFilterOpen,
		setIsFilterOpen,
		openSheet,
		closeSheet,
		handleSheetChange,
	};
};

export default useFilterSheet;
