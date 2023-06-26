import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BottomSheetScrollView, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { View, StyleSheet } from 'react-native';
import { Button, List, Portal, Text, useTheme } from 'react-native-paper';
import {
    FormatDropdown,
    SeasonDropdown,
    SortDropdown,
    StatusDropdown,
    YearDropdown,
} from './dropdown';
import { PresetDialog } from './dialogs';
import { FilterValues } from '../hooks/filter';
import { NSFWSelector, OnListSelector } from './buttons';

type FilterSheetProps = {
    sheetRef: React.Ref<BottomSheetModalMethods>;
    filterData: FilterValues;
    handleSheetChange: (index: number) => void;
};
export const FilterSheet = ({ sheetRef, filterData, handleSheetChange }: FilterSheetProps) => {
    const [presetDialogVisible, setPresetDialogVisible] = useState(false);
    const { colors } = useTheme();
    const snapPoints = useMemo(() => ['70%', '100%'], []);

    const hidePresetDialog = () => setPresetDialogVisible(false);

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
                {/* <PresetButton onPress={() => setPresetDialogVisible(true)} /> */}
                <BottomSheetView style={[styles.dropdownRow]}>
                    <OnListSelector
                        onList={filterData.filter.onList}
                        updateOnList={(onList) => filterData.updateFilter('onList', onList)}
                    />
                    {/* <NSFWSelector filterOptions={filterOptions} updateFilter={updateFilter} /> */}
                </BottomSheetView>
                <BottomSheetView style={[styles.dropdownRow]}>
                    <SortDropdown
                        current={filterData.current}
                        updateSort={(mode, category) => filterData.updateSort(mode, category)}
                        sortData={filterData.sort}
                    />
                    <StatusDropdown
                        current={filterData.current}
                        statusValue={filterData.filter.status}
                        updateStatus={(status) => filterData.updateFilter('status', status)}
                    />
                </BottomSheetView>
                {/* <Button onPress={() => console.log(filterData.filter.sort)}>Print Sort</Button> */}
                <Button onPress={() => console.log(filterData.filter.onList ?? 'undefined')}>
                    Print onList
                </Button>

                <BottomSheetView style={[styles.dropdownRow]}>
                    <FormatDropdown
                        current={filterData.current}
                        formatValue={filterData.filter.format}
                        updateFormat={(format) => filterData.updateFilter('format', format)}
                    />
                </BottomSheetView>
                {filterData.current === 'anime' && (
                    <BottomSheetView>
                        <Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
                            Season
                        </Text>
                        <BottomSheetView style={[styles.dropdownRow, { paddingTop: 8 }]}>
                            <SeasonDropdown
                                seasonValue={filterData.filter.season}
                                updateSeason={(season) => filterData.updateFilter('season', season)}
                            />
                            <YearDropdown
                                yearValue={filterData.filter.seasonYear}
                                updateSeasonYear={(year) =>
                                    filterData.updateFilter('seasonYear', year)
                                }
                            />
                        </BottomSheetView>
                    </BottomSheetView>
                )}
            </BottomSheetScrollView>
            <Portal>
                <PresetDialog visible={presetDialogVisible} hideDialog={hidePresetDialog} />
            </Portal>
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
