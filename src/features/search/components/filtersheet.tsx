import React, { useCallback, useEffect, useMemo } from 'react';
import { BottomSheetScrollView, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { View, StyleSheet } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import {
    FormatDropdown,
    SeasonDropdown,
    SortDropdown,
    StatusDropdown,
    YearDropdown,
} from './dropdown';
import { UpdateFilter } from '../types/types';
import { MANGA_DANGER } from '../constants/mediaConsts';
import { NSFWSelector, OnListSelector } from './buttons';

type FilterSheetProps = {
    sheetRef: React.Ref<BottomSheetModalMethods>;
    filterOptions: any;
    updateFilter: UpdateFilter;
    handleSheetChange: (index: number) => void;
};
export const FilterSheet = ({
    sheetRef,
    filterOptions,
    updateFilter,
    handleSheetChange,
}: FilterSheetProps) => {
    const { colors } = useTheme();
    const snapPoints = useMemo(() => ['70%', '100%'], []);

    return (
        <BottomSheetModal
            ref={sheetRef}
            backgroundStyle={{ backgroundColor: colors.secondaryContainer }}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
        >
            <BottomSheetScrollView
                contentContainerStyle={{ backgroundColor: colors.secondaryContainer }}
            >
                <BottomSheetView style={[styles.dropdownRow]}>
                    <OnListSelector filterOptions={filterOptions} updateFilter={updateFilter} />
                    <NSFWSelector filterOptions={filterOptions} updateFilter={updateFilter} />
                </BottomSheetView>
                <BottomSheetView style={[styles.dropdownRow]}>
                    <SortDropdown
                        mediaType={filterOptions.type}
                        sortValue={filterOptions.sort}
                        updateFilter={updateFilter}
                    />
                    <StatusDropdown
                        statusValue={filterOptions.status}
                        updateFilter={updateFilter}
                    />
                </BottomSheetView>
                <BottomSheetView style={[styles.dropdownRow]}>
                    <FormatDropdown
                        mediaType={filterOptions.type}
                        formatValue={filterOptions.format}
                        updateFilter={updateFilter}
                    />
                </BottomSheetView>
                {filterOptions.type === 'ANIME' && (
                    <BottomSheetView>
                        <Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
                            Season
                        </Text>
                        <BottomSheetView style={[styles.dropdownRow, { paddingTop: 8 }]}>
                            <SeasonDropdown
                                seasonValue={filterOptions.season}
                                updateFilter={updateFilter}
                            />
                            <YearDropdown
                                yearValue={filterOptions.seasonYear}
                                updateFilter={updateFilter}
                            />
                        </BottomSheetView>
                    </BottomSheetView>
                )}
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    dropdownRow: {
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});
