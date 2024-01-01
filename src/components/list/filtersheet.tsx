import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';
import { Accordion, CustomBackdrop } from '../animations';
import { updateCalendarFilter } from '@/store/slices/calendarSlice';
import { updateListFilter } from '@/store/slices/listSLice';

export const ListFilterSheet = React.forwardRef<BottomSheetModalMethods>((props, ref) => {
    const { height } = useWindowDimensions();
    const { colors } = useTheme();
    const [mainEntryHeight, setMainEntryHeight] = useState(0);
    const snapPoints = useMemo(
        () => [
            `${(
                (mainEntryHeight / height > 0 ? (mainEntryHeight + 20) / height : 0.3) * 100
            ).toFixed(4)}%`,
            '50%',
        ],
        [mainEntryHeight, height],
    );

    const { genre } = useAppSelector((state) => state.listFilter);
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const dispatch = useAppDispatch();

    const addGenre = (genres: string) => {
        dispatch(updateListFilter({ entryType: 'genre', value: [...genre, genres] }));
    };
    const removeGenre = (genres: string) => {
        dispatch(
            updateListFilter({ entryType: 'genre', value: genre.filter((g) => g !== genres) }),
        );
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: colors.elevation.level5 }}
            // onDismiss={() => submitNewEntry()}
            // onChange={handleSheetChange}
            // backdropComponent={CustomBackdrop}
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} pressBehavior={'close'} disappearsOnIndex={-1} />
            )}
        >
            <BottomSheetView onLayout={(e) => setMainEntryHeight(e.nativeEvent.layout.height)}>
                <List.Subheader>Genres</List.Subheader>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
