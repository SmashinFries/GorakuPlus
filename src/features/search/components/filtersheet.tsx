import React, { useCallback, useMemo, useState } from 'react';
import { BottomSheetScrollView, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import {
    CountryDropdownMem,
    FormatDropdownMem,
    SeasonDropdownMem,
    SortDropdownMem,
    StatusDropdownMem,
    YearDropdownMem,
} from './dropdown';
import { PresetDialog } from './dialogs';
import { FilterActions, FilterState } from '../reducers';
import {
    GenreTagCollectionQuery,
    MediaType,
    useGenreTagCollectionQuery,
} from '../../../app/services/anilist/generated-anilist';
import { GenreSelectionMem, TagSelectionMem } from './tags';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LicensedSelector, NSFWSelector, OnListSelector, TagBanSwitch } from './buttons';
import { setSettings } from '../../more/settings/settingsSlice';

type FilterSheetProps = {
    sheetRef: React.Ref<BottomSheetModalMethods>;
    filterData: FilterState;
    genreTagData: GenreTagCollectionQuery;
    onSearch: (search?: string) => void;
    handleSheetChange: (index: number) => void;
    updateFilter: (props: FilterActions) => void;
    toggleSheet: () => void;
};
export const FilterSheet = ({
    sheetRef,
    filterData,
    genreTagData,
    onSearch,
    handleSheetChange,
    updateFilter,
    toggleSheet,
}: FilterSheetProps) => {
    // const genreTagResult = useGenreTagCollectionQuery();
    // const [presetDialogVisible, setPresetDialogVisible] = useState(false);
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const dispatch = useAppDispatch();
    const { colors } = useTheme();
    const snapPoints = useMemo(() => ['70%', '95%'], []);

    return (
        <BottomSheetModal
            ref={sheetRef}
            backgroundStyle={{ backgroundColor: colors.secondaryContainer }}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
        >
            <BottomSheetScrollView style={{ flex: 1 }} nestedScrollEnabled>
                {/* <PresetButton onPress={() => setPresetDialogVisible(true)} /> */}
                <Button
                    mode="contained"
                    icon={'magnify'}
                    onPress={() => {
                        toggleSheet();
                        onSearch();
                    }}
                    style={{ marginHorizontal: 8, marginTop: 20, marginBottom: 10 }}
                >
                    Search
                </Button>
                <BottomSheetView
                    style={[
                        styles.dropdownRow,
                        { justifyContent: 'space-evenly', alignItems: 'center' },
                    ]}
                >
                    {userID && (
                        <OnListSelector
                            onList={filterData.filter.onList}
                            updateOnList={(onList) =>
                                updateFilter({ type: 'SET_FILTER', key: 'onList', payload: onList })
                            }
                        />
                    )}
                    <LicensedSelector
                        isLicensed={filterData.filter.isLicensed}
                        updateOnList={(isLicensed) =>
                            updateFilter({
                                type: 'SET_FILTER',
                                key: 'isLicensed',
                                payload: isLicensed,
                            })
                        }
                    />
                    {showNSFW && (
                        <NSFWSelector
                            isAdult={filterData.filter.isAdult}
                            updateIsAdult={(allowNSFW) =>
                                updateFilter({
                                    type: 'SET_FILTER',
                                    key: 'isAdult',
                                    payload: allowNSFW,
                                })
                            }
                        />
                    )}
                </BottomSheetView>
                <BottomSheetView style={{ flex: 1 }}>
                    <SortDropdownMem
                        current={filterData.filter.type}
                        updateSort={(sort) =>
                            updateFilter({ type: 'SET_FILTER', key: 'sort', payload: sort })
                        }
                        sort={filterData.filter.sort}
                    />
                    <StatusDropdownMem
                        status={filterData.filter.status}
                        updateStatus={(status) =>
                            updateFilter({ type: 'SET_FILTER', key: 'status', payload: status })
                        }
                        removeStatus={() => updateFilter({ type: 'REMOVE_FILTER', key: 'status' })}
                    />
                    <FormatDropdownMem
                        current={filterData.filter.type}
                        formatValue={filterData.filter.format}
                        updateFormat={(format) =>
                            updateFilter({ type: 'SET_FORMAT', payload: format })
                        }
                        removeFormat={() =>
                            updateFilter({ type: 'REMOVE_FILTER', key: 'format_in' })
                        }
                    />
                    <CountryDropdownMem
                        countryValue={filterData.filter.countryOfOrigin}
                        updateCountry={(c_code) => {
                            updateFilter({
                                type: 'SET_FILTER',
                                key: 'countryOfOrigin',
                                payload: c_code,
                            });
                        }}
                        removeCountry={() =>
                            updateFilter({ type: 'REMOVE_FILTER', key: 'countryOfOrigin' })
                        }
                    />
                </BottomSheetView>
                {/* <Button onPress={() => console.log(filterData.filter)}>Print Filter</Button> */}
                {filterData.filter.type === MediaType.Anime && (
                    <BottomSheetView>
                        <Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
                            Season
                        </Text>
                        <BottomSheetView style={[styles.dropdownRow, { paddingTop: 8 }]}>
                            <SeasonDropdownMem
                                seasonValue={filterData.filter.season}
                                updateSeason={(season) =>
                                    updateFilter({
                                        type: 'SET_FILTER',
                                        key: 'season',
                                        payload: season,
                                    })
                                }
                            />
                            <YearDropdownMem
                                yearValue={filterData.filter.seasonYear}
                                updateSeasonYear={(year) =>
                                    updateFilter({
                                        type: 'SET_FILTER',
                                        key: 'seasonYear',
                                        payload: year,
                                    })
                                }
                            />
                        </BottomSheetView>
                    </BottomSheetView>
                )}
                {/* <Button onPress={() => console.log(filterData.filter.tag_in)}>Print Tag_In</Button>
                <Button onPress={() => console.log(filterData.filter.tag_not_in)}>
                    Print Tag_Not_In
                </Button>
                <Button onPress={() => console.log(filterData.filter.genre_in)}>
                    Print genre_in
                </Button> */}
                <GenreSelectionMem
                    isAdult={filterData.filter.isAdult}
                    data={genreTagData?.GenreCollection}
                    genre_in={filterData.filter.genre_in}
                    genre_not_in={filterData.filter.genre_not_in}
                    toggleGenreTag={updateFilter}
                />
                <TagSelectionMem
                    data={genreTagData?.MediaTagCollection}
                    tags_in={filterData.filter.tag_in}
                    tags_not_in={filterData.filter.tag_not_in}
                    isAdult={filterData.filter.isAdult}
                    tagBanEnabled={filterData.enableTagBan}
                    toggleGenreTag={updateFilter}
                />
            </BottomSheetScrollView>
            {/* <Portal>
                <PresetDialog visible={presetDialogVisible} hideDialog={hidePresetDialog} />
            </Portal> */}
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    dropdownRow: {
        flex: 1,
        flexDirection: 'row',
    },
});
