import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useEffect, useRef, useState } from 'react';

const useFilterSheet = (sheetRef: React.MutableRefObject<BottomSheetModalMethods>) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSheetChange = useCallback((index) => {
        if (index === -1) {
            setIsFilterOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isFilterOpen) {
            sheetRef.current?.present();
        } else {
            sheetRef.current?.dismiss();
        }
    }, [isFilterOpen]);

    return {
        isFilterOpen,
        setIsFilterOpen,
        handleSheetChange,
    };
};

export default useFilterSheet;
