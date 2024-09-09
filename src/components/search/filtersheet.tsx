import React, { useMemo } from 'react';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import {
	CountryDropdown,
	DialogSelectDate,
	FormatDropdown,
	SeasonDropdown,
	SortDropdown,
	StatusDropdown,
	YearDropdown,
} from './dropdown';
import { GenreSelection, TagSelection } from './tags';
import { LicensedSelector, NSFWSelector, OnListSelector } from './buttons';
import { ScoreSlider } from './slider';
import { View } from 'react-native';
import { GenreTagCollectionQuery, MediaType } from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { useSearchStore } from '@/store/search/searchStore';
import { getDatetoFuzzyInt } from '@/utils';

type FilterSheetProps = {
	sheetRef: React.Ref<BottomSheetModalMethods>;
	genreTagData: GenreTagCollectionQuery;
	openTagDialog: () => void;
	handleSheetChange: (index: number) => void;
	toggleSheet: () => void;
};
export const FilterSheet = ({
	sheetRef,
	genreTagData,
	openTagDialog,
	handleSheetChange,
	toggleSheet,
}: FilterSheetProps) => {
	const { showNSFW, tagBlacklist } = useSettingsStore();
	const { searchType, filter, isTagBlacklistEnabled, sort, updateFilter, updateSort } =
		useSearchStore();
	const { userID } = useAuthStore().anilist;
	const { colors } = useAppTheme();
	const snapPoints = useMemo(() => ['70%', '95%'], []);

	return (
		<BottomSheetModal
			ref={sheetRef}
			backgroundStyle={{ backgroundColor: colors.elevation.level1 }}
			snapPoints={snapPoints}
			onChange={handleSheetChange}
			handleIndicatorStyle={{ backgroundColor: colors.onSurfaceVariant }}
		>
			<BottomSheetScrollView>
				{/* <Button
					mode="contained"
					icon={'magnify'}
					onPress={() => {
						toggleSheet();
						onSearch();
					}}
					style={{ marginHorizontal: 8, marginTop: 20, marginBottom: 10 }}
				>
					Search
				</Button> */}
				<View
					style={[
						styles.dropdownRow,
						{ justifyContent: 'space-evenly', alignItems: 'center' },
					]}
				>
					{userID && (
						<OnListSelector
							onList={filter.onList}
							updateOnList={(onList) => updateFilter({ onList })}
						/>
					)}
					{searchType !== MediaType.Anime && (
						<LicensedSelector
							isLicensed={filter.isLicensed}
							updateOnList={(isLicensed) => updateFilter({ isLicensed })}
						/>
					)}
					{showNSFW && (
						<NSFWSelector
							isAdult={filter.isAdult}
							updateIsAdult={(allowNSFW) => updateFilter({ isAdult: allowNSFW })}
						/>
					)}
				</View>
				<SortDropdown />
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<StatusDropdown />
					<FormatDropdown />
				</View>
				<CountryDropdown />
				<Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
					Dates
				</Text>
				<DialogSelectDate
					label="Start Date ↓"
					value={filter.startDate_greater ?? 'ANY'}
					onSelect={(date) =>
						updateFilter({ startDate_greater: getDatetoFuzzyInt(date) })
					}
				/>
				<DialogSelectDate
					label="End Date ↑"
					value={filter.startDate_lesser ?? 'ANY'}
					onSelect={(date) => updateFilter({ endDate_lesser: getDatetoFuzzyInt(date) })}
				/>
				{searchType === MediaType.Anime && (
					<BottomSheetView>
						<Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
							Season
						</Text>
						<BottomSheetView style={[styles.dropdownRow, { paddingTop: 8 }]}>
							<SeasonDropdown />
							<YearDropdown />
						</BottomSheetView>
					</BottomSheetView>
				)}
				<View>
					<ScoreSlider
						title="Minimum Score"
						initialScore={filter.averageScore_greater}
						maxValue={filter.averageScore_lesser}
						minValue={0}
						updateScore={(score) => updateFilter({ averageScore_greater: score })}
					/>
					<ScoreSlider
						title="Maximum Score"
						maxValue={100}
						minValue={filter.averageScore_greater}
						initialScore={filter.averageScore_lesser ?? 100}
						updateScore={(score) => updateFilter({ averageScore_lesser: score })}
					/>
				</View>
				<GenreSelection data={genreTagData?.GenreCollection} />
				<TagSelection openTagDialog={openTagDialog} />
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
};

const styles = StyleSheet.create({
	dropdownRow: {
		// flex: 1,
		flexDirection: 'row',
	},
});
