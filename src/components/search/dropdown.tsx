import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, View, ViewStyle } from 'react-native';
import { TextInput, Text, Button, Dialog, Portal, List } from 'react-native-paper';
import {
	ANIME_FORMATS,
	AnimeSorts,
	AvailableSorts,
	COUNTRY_OPTIONS,
	MANGA_FORMATS,
	MangaSorts,
} from '@/constants/mediaConsts';
import { arrayRange } from '@/utils/numbers';
import { mediaStatusOptions } from '@/constants/anilist';
import { getDatetoFuzzyInt, getFuzzyInttoDate, getFuzzyInttoString } from '@/utils';
import { useSearchStore } from '@/store/search/searchStore';
import { useAppTheme } from '@/store/theme/themes';
import {
	MediaFormat,
	MediaSeason,
	MediaStatus,
	MediaType,
	SearchAnimeQueryVariables,
} from '@/api/anilist/__genereated__/gql';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

type DropdownItemProps = {
	disabled: boolean;
	onPress: () => void;
	title: string;
};
const DropdownItem = ({ disabled, onPress, title }: DropdownItemProps) => {
	const { colors } = useAppTheme();
	return (
		<List.Item
			left={(props) => (
				<List.Icon
					{...props}
					color={colors.primary}
					icon={disabled ? 'radiobox-marked' : 'radiobox-blank'}
				/>
			)}
			// icon={
			// 	sortType === sort.value ? 'radiobox-marked' : 'radiobox-blank'
			// }
			titleStyle={{ textTransform: 'capitalize' }}
			contentStyle={{ justifyContent: 'flex-start' }}
			onPress={onPress}
			title={title}
		/>
	);
};

const DropdownButton = ({
	openDialog,
	label,
	value,
	left,
}: {
	label: string;
	value: string;
	openDialog: () => void;
	left?: React.ReactNode;
}) => {
	const { colors } = useAppTheme();
	return (
		<Pressable onPress={openDialog} android_ripple={{ foreground: true }}>
			<TextInput
				label={
					<Text
						style={{
							textTransform: 'capitalize',
							// backgroundColor: colors.secondaryContainer,
						}}
					>
						{label.replaceAll('_', ' ')}
					</Text>
				}
				mode="outlined"
				value={value
					.replaceAll('not_yet_released', 'Unreleased')
					.replaceAll('_', ' ')
					.replaceAll('DESC', '')}
				contentStyle={{
					textTransform: 'capitalize',
					textAlign: 'center',
					color: colors.onSurface,
				}}
				// outlineColor={colors.secondary}
				style={{
					marginHorizontal: 6,
					backgroundColor: colors.elevation.level5,
				}}
				outlineStyle={{ borderRadius: 16 }}
				editable={false}
				right={<TextInput.Icon icon="menu-down" onPress={openDialog} />}
				left={left ?? null}
			/>
		</Pressable>
	);
};

type DialogSelectProps = {
	label: string;
	value: string;
	items: (closeDialog: () => void) => React.JSX.Element[];
	left?: React.ReactNode;
	containerStyle?: ViewStyle;
};
export const DialogSelect = ({ label, value, left, containerStyle, items }: DialogSelectProps) => {
	const [vis, setVis] = useState(false);

	const openDialog = useCallback(() => setVis(true), []);
	const closeDialog = useCallback(() => setVis(false), []);

	return (
		<View style={[{ flex: 1, marginVertical: 5 }, containerStyle]}>
			<DropdownButton
				label={label}
				openDialog={openDialog}
				value={value}
				left={left ?? null}
			/>
			<Portal>
				<Dialog style={{ maxHeight: '90%' }} visible={vis} onDismiss={closeDialog}>
					<Dialog.Title>{label}</Dialog.Title>
					<Dialog.ScrollArea>
						<ScrollView>{items(closeDialog)}</ScrollView>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button onPress={closeDialog}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

type DialogSelectDateProps = {
	label: string;
	value: string;
	onSelect: (date: Date | undefined) => void;
	containerStyle?: ViewStyle;
};
export const DialogSelectDate = ({
	label,
	value,
	containerStyle,
	onSelect,
}: DialogSelectDateProps) => {
	const [isVis, setIsVis] = useState(false);
	const [date, setDate] = useState(value !== 'ANY' ? getFuzzyInttoDate(value) : new Date());

	const onChange = (selectedDate: CalendarDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
		onSelect(currentDate);
	};

	return (
		<View style={[{ flex: 1, marginVertical: 5 }, containerStyle]}>
			<DropdownButton
				label={label}
				openDialog={() => setIsVis(true)}
				value={value !== 'ANY' ? getFuzzyInttoString(value) : 'Any'}
				left={
					<TextInput.Icon
						icon={value !== 'ANY' ? 'calendar-remove' : 'calendar'}
						onPress={() => onSelect(undefined)}
					/>
				}
			/>
			<Portal>
				<DatePickerModal
					locale="en"
					mode="single"
					visible={isVis}
					onDismiss={() => setIsVis(false)}
					date={date}
					label={label}
					onConfirm={(params) => onChange(params.date)}
				/>
			</Portal>
		</View>
	);
};

export const SortDropdown = () => {
	// const categories = current === 'anime' ? animeSort : mangaNovelSort;
	const { searchType, sort, updateSort } = useSearchStore();

	return (
		<DialogSelect
			label="Sort"
			value={sort.value}
			left={
				<TextInput.Icon
					icon={sort.asc ? 'sort-ascending' : 'sort-descending'}
					disabled={sort.value === 'SEARCH_MATCH'}
					onPress={() => updateSort(sort.value, sort.asc ? false : true)}
				/>
			}
			items={(closeDialog) =>
				searchType === MediaType.Anime
					? AnimeSorts.map((sortType, idx) => (
							<DropdownItem
								key={idx}
								disabled={sortType === sort.value}
								onPress={() => {
									closeDialog();
									updateSort(sortType, sort.asc);
								}}
								title={sortType.replaceAll('_', ' ')}
							/>
						))
					: MangaSorts.map((sortType, idx) => (
							<DropdownItem
								key={idx}
								disabled={sortType === sort.value}
								onPress={() => {
									closeDialog();
									updateSort(sortType, sort.asc);
								}}
								title={sortType.replaceAll('_', ' ')}
							/>
						))
			}
			containerStyle={{ flex: 0 }}
		/>
		// <DropdownMem
		// 	visible={visible}
		// 	onOpen={openMenu}
		// 	onClose={closeMenu}
		// 	label={'Sort'}
		// 	value={sort.value}
		// 	// onMenuPressAction={(opt: MediaSort) => updateFilter('sort', switchModeValue(opt))}
		// 	left={
		// 		<TextInput.Icon
		// 			icon={sort.asc ? 'sort-ascending' : 'sort-descending'}
		// 			disabled={sort.value === 'SEARCH_MATCH'}
		// 			onPress={() => updateSort(sort.value, sort.asc ? false : true)}
		// 		/>
		// 	}
		// 	containerStyle={{ flex: 0 }}
		// >
		// 	{current === MediaType.Anime
		// 		? AnimeSorts.map((sortType, idx) => (
		// 				<Menu.Item
		// 					key={idx}
		// 					onPress={() => {
		// 						closeMenu();
		// 						updateSort(sortType, sort.asc);
		// 					}}
		// 					titleStyle={{ textTransform: 'capitalize' }}
		// 					title={sortType.replaceAll('_', ' ')}
		// 					disabled={sortType === sort.value}
		// 				/>
		// 			))
		// 		: MangaSorts.map((sortType, idx) => (
		// 				<Menu.Item
		// 					key={idx}
		// 					onPress={() => {
		// 						closeMenu();
		// 						updateSort(sortType, sort.asc);
		// 					}}
		// 					titleStyle={{ textTransform: 'capitalize' }}
		// 					title={sortType.replaceAll('_', ' ')}
		// 					disabled={sortType === sort.value}
		// 				/>
		// 			))}
		// </DropdownMem>
	);
};

export const SortDropdownMem = React.memo(SortDropdown);

export const StatusDropdown = () => {
	const categories = ['ANY', ...mediaStatusOptions];
	const { filter, updateFilter } = useSearchStore();

	return (
		<DialogSelect
			label="Status"
			value={filter.status?.toLowerCase() ?? 'ANY'.toLowerCase()}
			items={(closeDialog) =>
				categories.map((category: MediaStatus | 'ANY', idx) => (
					<DropdownItem
						key={idx}
						disabled={(category === 'ANY' && status === null) || category === status}
						onPress={() => {
							updateFilter({ status: category === 'ANY' ? undefined : category });
							closeDialog();
						}}
						title={
							category === MediaStatus.NotYetReleased
								? 'Unreleased'
								: category.replaceAll('_', ' ')
						}
					/>
				))
			}
			// onMenuPressAction={(opt: MediaStatus | 'ANY') =>
			//     updateStatus(current, opt === 'ANY' ? { status: undefined } : { status: opt })
			// }
		/>
	);
};

export const StatusDropdownMem = React.memo(StatusDropdown);

export const FormatDropdown = () => {
	const { searchType, filter, updateFilter } = useSearchStore();
	return (
		<DialogSelect
			label="Format"
			value={(filter.format_in as MediaFormat) ?? 'ANY'.toLowerCase()}
			items={(closeDialog) =>
				searchType === MediaType.Anime
					? ['ANY', ...ANIME_FORMATS].map((format: MediaFormat | 'ANY', idx) => (
							<DropdownItem
								key={idx}
								disabled={
									(format === 'ANY' && filter.format_in === undefined) ||
									format === filter.format_in
								}
								onPress={() => {
									closeDialog();
									if (format === 'ANY') {
										updateFilter({ format_in: undefined });
									} else {
										updateFilter({ format_in: format });
									}
								}}
								title={format.replaceAll('_', ' ')}
							/>
						))
					: ['ANY', ...MANGA_FORMATS].map((format: MediaFormat | 'ANY', idx) => (
							<DropdownItem
								key={idx}
								disabled={
									(format === 'ANY' && filter.format_in === undefined) ||
									format === filter.format_in
								}
								onPress={() => {
									closeDialog();
									if (format === 'ANY') {
										updateFilter({ format_in: undefined });
									} else {
										updateFilter({ format_in: format });
									}
								}}
								title={format.replaceAll('_', ' ')}
							/>
						))
			}
			// onMenuPressAction={(opt: MediaFormat) => updateFormat(mediaType, { format: opt })}
		/>
	);
};

export const FormatDropdownMem = React.memo(FormatDropdown);

export const SeasonDropdown = () => {
	const { filter, updateFilter } = useSearchStore();
	const seasons = ['ANY', ...Object.values(MediaSeason)];

	return (
		<DialogSelect
			label="Season"
			value={filter.season ?? 'ANY'.toLowerCase()}
			items={(closeDialog) =>
				seasons.map((season: MediaSeason | 'ANY', idx) => (
					<DropdownItem
						key={idx}
						disabled={
							(season === 'ANY' && filter.season === undefined) ||
							season === filter.season
						}
						onPress={() => {
							closeDialog();
							updateFilter({ season: season !== 'ANY' ? season : undefined });
						}}
						title={season.replaceAll('_', ' ')}
					/>
				))
			}
		/>
	);
};

export const YearDropdown = () => {
	const { filter, updateFilter } = useSearchStore();
	const range = arrayRange(1970, new Date().getFullYear() + 1, 1).reverse();
	const years = ['ANY'].concat(range);

	return (
		<DialogSelect
			label="Year"
			value={filter.seasonYear?.toString() ?? 'ANY'}
			items={(closeDialog) =>
				years.map((year: string, idx) => (
					<DropdownItem
						key={idx}
						disabled={
							(year === 'ANY' && filter.seasonYear === undefined) ||
							Number(year) === filter.seasonYear
						}
						onPress={() => {
							closeDialog();
							updateFilter({ seasonYear: year !== 'ANY' ? Number(year) : undefined });
						}}
						title={year}
					/>
				))
			}
		/>
	);
};

export const CountryDropdown = () => {
	const { filter, updateFilter } = useSearchStore();
	const categories = useMemo(() => Object.keys(COUNTRY_OPTIONS), []);
	const [cValue, setCValue] = useState<string | undefined>(filter.countryOfOrigin ?? 'ANY');

	useEffect(() => {
		if (!categories.includes(filter.countryOfOrigin)) {
			updateFilter({ countryOfOrigin: undefined });
		}
	}, [categories]);

	return (
		<DialogSelect
			label="Country"
			value={COUNTRY_OPTIONS[cValue]['name']}
			items={(closeMenu) =>
				categories.map((c_code: string, idx) => (
					<DropdownItem
						key={idx}
						disabled={(c_code === 'ANY' && cValue === undefined) || c_code === cValue}
						onPress={() => {
							closeMenu();
							if (c_code === 'ANY') {
								setCValue('ANY');
								updateFilter({ countryOfOrigin: undefined });
							} else {
								setCValue(c_code);
								updateFilter({ countryOfOrigin: c_code });
							}
						}}
						title={COUNTRY_OPTIONS[c_code]['name']}
					/>
				))
			}
			containerStyle={{ flex: 0 }}
			// onMenuPressAction={(opt: MediaFormat) => updateFormat(mediaType, { format: opt })}
		/>
	);
};

export const CountryDropdownMem = React.memo(CountryDropdown);
