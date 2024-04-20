import React, { useMemo } from 'react';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import {
	CountryDropdown,
	DialogSelectDate,
	FormatDropdown,
	SeasonDropdownMem,
	SortDropdown,
	StatusDropdown,
	YearDropdownMem,
} from './dropdown';
import { MediaFormat, MediaType } from '@/store/services/anilist/generated-anilist';
import { GenreSelection, TagSelection } from './tags';
import { useAppSelector } from '@/store/hooks';
import { LicensedSelector, NSFWSelector, OnListSelector } from './buttons';
import { ScoreSlider } from './slider';
import { GenreTagCollectionQueryAlt } from '@/store/services/anilist/types';
import { useFilter } from '@/hooks/search/useFilter';
import { View } from 'react-native';

type FilterSheetProps = {
	sheetRef: React.Ref<BottomSheetModalMethods>;
	genreTagData: GenreTagCollectionQueryAlt;
	openTagDialog: () => void;
	onSearch: () => void;
	handleSheetChange: (index: number) => void;
	toggleSheet: () => void;
};
export const FilterSheet = ({
	sheetRef,
	genreTagData,
	openTagDialog,
	onSearch,
	handleSheetChange,
	toggleSheet,
}: FilterSheetProps) => {
	const { showNSFW, tagBlacklist } = useAppSelector((state) => state.persistedSettings);
	const {
		filter,
		sort,
		isTagBlacklist,
		onFilterUpdate,
		onSortChange,
		onTagBlacklistChange,
		resetTagsGenre,
		updateGenre,
		updateTag,
		updateFuzzyInt,
	} = useFilter();
	const { userID } = useAppSelector((state) => state.persistedAniLogin);
	const { colors } = useTheme();
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
				<View
					style={[
						styles.dropdownRow,
						{ justifyContent: 'space-evenly', alignItems: 'center' },
					]}
				>
					{userID && (
						<OnListSelector
							onList={filter.onList}
							updateOnList={(onList) => onFilterUpdate('onList', onList)}
						/>
					)}
					{filter.type !== MediaType.Anime && (
						<LicensedSelector
							isLicensed={filter.isLicensed}
							updateOnList={(isLicensed) => onFilterUpdate('isLicensed', isLicensed)}
						/>
					)}
					{showNSFW && (
						<NSFWSelector
							isAdult={filter.isAdult}
							updateIsAdult={(allowNSFW) => onFilterUpdate('isAdult', allowNSFW)}
						/>
					)}
				</View>
				<SortDropdown
					current={filter.type}
					updateSort={(sort, asc) => onSortChange(sort, asc)}
					sort={sort}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<StatusDropdown
						status={filter.status}
						updateStatus={(status) =>
							onFilterUpdate('status', status === 'ANY' ? undefined : status)
						}
					/>
					<FormatDropdown
						current={filter.type}
						formatValue={filter.format_in as MediaFormat}
						updateFormat={(format) => onFilterUpdate('format_in', format)}
						removeFormat={() => onFilterUpdate('format_in', undefined)}
					/>
				</View>
				<CountryDropdown
					countryValue={filter.countryOfOrigin}
					updateCountry={(c_code) => {
						onFilterUpdate('countryOfOrigin', c_code);
					}}
					removeCountry={() => onFilterUpdate('countryOfOrigin', undefined)}
				/>
				<Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
					Dates
				</Text>
				<DialogSelectDate
					label="Start Date ↓"
					value={filter.startDate_greater ?? 'ANY'}
					onSelect={(date) => updateFuzzyInt('startDate_greater', date)}
				/>
				<DialogSelectDate
					label="End Date ↑"
					value={filter.startDate_lesser ?? 'ANY'}
					onSelect={(date) => updateFuzzyInt('endDate_lesser', date)}
				/>
				{filter.type === MediaType.Anime && (
					<BottomSheetView>
						<Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
							Season
						</Text>
						<BottomSheetView style={[styles.dropdownRow, { paddingTop: 8 }]}>
							<SeasonDropdownMem
								seasonValue={filter.season}
								updateSeason={(season) => onFilterUpdate('season', season)}
							/>
							<YearDropdownMem
								yearValue={filter.seasonYear}
								updateSeasonYear={(year) => onFilterUpdate('seasonYear', year)}
							/>
						</BottomSheetView>
					</BottomSheetView>
				)}
				<View>
					<ScoreSlider
						title="Minimum Score"
						initialScore={filter.averageScore_greater}
						maxValue={filter.averageScore_lesser}
						minValue={0}
						updateScore={(score) => onFilterUpdate('averageScore_greater', score)}
					/>
					<ScoreSlider
						title="Maximum Score"
						maxValue={100}
						minValue={filter.averageScore_greater}
						initialScore={filter.averageScore_lesser ?? 100}
						updateScore={(score) => onFilterUpdate('averageScore_lesser', score)}
					/>
				</View>
				<GenreSelection
					isAdult={filter.isAdult}
					data={genreTagData?.GenreCollection}
					genre_in={filter.genre_in}
					genre_not_in={filter.genre_not_in}
					toggleGenre={updateGenre}
					resetTagsGenre={() => resetTagsGenre('genre')}
				/>
				<TagSelection
					tags_in={filter.tag_in as string[]}
					tags_not_in={filter.tag_not_in as string[]}
					isAdult={filter.isAdult}
					tagBanEnabled={isTagBlacklist}
					toggleTag={updateTag}
					resetTagsGenre={() => resetTagsGenre('tag')}
					onTagBlacklistChange={onTagBlacklistChange}
					openTagDialog={openTagDialog}
				/>
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

// <BottomSheetFlatList
// 	key={'test'}
// 	data={genreTagData?.MediaTagCollection?.filter((tag) =>
// 		tagQuery !== '' ? tag.name.includes(tagQuery) : true,
// 	)}
// 	// contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
// 	// columnWrapperStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
// 	renderItem={TagItem}
// 	keyExtractor={(item, idx) => idx.toString()}
// 	ListHeaderComponent={
// 		<BottomSheetView>
// 			{/* <PresetButton onPress={() => setPresetDialogVisible(true)} /> */}
// 			<Button
// 				mode="contained"
// 				icon={'magnify'}
// 				onPress={() => {
// 					toggleSheet();
// 					onSearch();
// 				}}
// 				style={{ marginHorizontal: 8, marginTop: 20, marginBottom: 10 }}
// 			>
// 				Search
// 			</Button>
// 			<BottomSheetView
// 				style={[
// 					styles.dropdownRow,
// 					{ justifyContent: 'space-evenly', alignItems: 'center' },
// 				]}
// 			>
// 				{userID && (
// 					<OnListSelector
// 						onList={filter.onList}
// 						updateOnList={(onList) => updateFilter('onList', onList)}
// 					/>
// 				)}
// 				{filter.type !== MediaType.Anime && (
// 					<LicensedSelector
// 						isLicensed={filter.isLicensed}
// 						updateOnList={(isLicensed) => updateFilter('isLicensed', isLicensed)}
// 					/>
// 				)}
// 				{showNSFW && (
// 					<NSFWSelector
// 						isAdult={filter.isAdult}
// 						updateIsAdult={(allowNSFW) => updateFilter('isAdult', allowNSFW)}
// 					/>
// 				)}
// 			</BottomSheetView>
// 			<BottomSheetView style={{ flex: 1 }}>
// 				<ScoreSlider
// 					title="Minimum Score"
// 					initialScore={filter.averageScore_greater}
// 					maxValue={filter.averageScore_lesser}
// 					minValue={0}
// 					updateScore={(score) => updateFilter('averageScore_greater', score)}
// 				/>
// 				<ScoreSlider
// 					title="Maximum Score"
// 					maxValue={100}
// 					minValue={filter.averageScore_greater}
// 					initialScore={filter.averageScore_lesser ?? 100}
// 					updateScore={(score) => updateFilter('averageScore_lesser', score)}
// 				/>
// 			</BottomSheetView>
// 			<BottomSheetView style={{ flex: 1 }}>
// 				<SortDropdown
// 					current={filter.type}
// 					updateSort={(sort, asc) => onSortChange(sort, asc)}
// 					sort={sort}
// 				/>
// 				<BottomSheetView style={{ flexDirection: 'row' }}>
// 					<StatusDropdown
// 						status={filter.status}
// 						updateStatus={(status) =>
// 							updateFilter('status', status === 'ANY' ? undefined : status)
// 						}
// 					/>
// 					<FormatDropdown
// 						current={filter.type}
// 						formatValue={filter.format_in as MediaFormat}
// 						updateFormat={(format) => updateFilter('format_in', format)}
// 						removeFormat={() => updateFilter('format_in', undefined)}
// 					/>
// 				</BottomSheetView>
// 				<CountryDropdown
// 					countryValue={filter.countryOfOrigin}
// 					updateCountry={(c_code) => {
// 						updateFilter('countryOfOrigin', c_code);
// 					}}
// 					removeCountry={() => updateFilter('countryOfOrigin', undefined)}
// 				/>
// 			</BottomSheetView>
// 			{filter.type === MediaType.Anime && (
// 				<BottomSheetView>
// 					<Text variant="titleLarge" style={{ paddingLeft: 10, paddingTop: 20 }}>
// 						Season
// 					</Text>
// 					<BottomSheetView style={[styles.dropdownRow, { paddingTop: 8 }]}>
// 						<SeasonDropdownMem
// 							seasonValue={filter.season}
// 							updateSeason={(season) => updateFilter('season', season)}
// 						/>
// 						<YearDropdownMem
// 							yearValue={filter.seasonYear}
// 							updateSeasonYear={(year) => updateFilter('seasonYear', year)}
// 						/>
// 					</BottomSheetView>
// 				</BottomSheetView>
// 			)}
// 			<GenreSelection
// 				isAdult={filter.isAdult}
// 				data={genreTagData?.GenreCollection}
// 				genre_in={filter.genre_in}
// 				genre_not_in={filter.genre_not_in}
// 				toggleGenre={updateGenre}
// 				resetTagsGenre={() => resetTagsGenre('genre')}
// 			/>
// 			<TagSelection
// 				tags_in={filter.tag_in as string[]}
// 				tags_not_in={filter.tag_not_in as string[]}
// 				isAdult={filter.isAdult}
// 				tagBanEnabled={isTagBlacklist}
// 				tagQuery={tagQuery}
// 				toggleTag={updateTag}
// 				resetTagsGenre={() => resetTagsGenre('tag')}
// 				onTagBlacklistChange={onTagBlacklistChange}
// 				onTagQueryChange={setTagQuery}
// 			/>
// 		</BottomSheetView>
// 	}
// 	// numColumns={genreTagData?.MediaTagCollection?.length ?? 1}
// 	numColumns={1}
// 	keyboardDismissMode={'on-drag'}
// />;
//
