import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';
import { CustomBackdrop } from '../animations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateCalendarDisplay } from '@/store/slices/displaySlice';
import Slider from '@react-native-community/slider';

export const CalendarFilterSheet = React.forwardRef<BottomSheetModalMethods>((props, ref) => {
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

    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { calendar } = useAppSelector((state) => state.persistedDisplaySettings);
    const dispatch = useAppDispatch();

    const { bottom } = useSafeAreaInsets();

    const updateOnlyShowList = (val: boolean) => {
        dispatch(updateCalendarDisplay({list_only: val}));
    };

    const updateGridSize = (val: number) => {
        dispatch(updateCalendarDisplay({grid_size: val}));
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
            <BottomSheetView
                style={{ paddingBottom: bottom + 30 }}
                onLayout={(e) => setMainEntryHeight(e.nativeEvent.layout.height)}
            >
                {userID && <List.Item
                    title="Show List Only"
                    right={() => (
                        <Switch
                            value={calendar.list_only}
                            onValueChange={updateOnlyShowList}
                            disabled={!userID}
                        />
                    )}
                />}
                <List.Subheader>Grid Size: {calendar.grid_size ?? 2} per row</List.Subheader>
                <Slider value={calendar.grid_size ?? 2} onValueChange={val => updateGridSize(val)} step={1} minimumValue={1} maximumValue={3} thumbTintColor={colors.primary}/>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
