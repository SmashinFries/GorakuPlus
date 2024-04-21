import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, View, ViewStyle } from 'react-native';
import { TextInput, Menu, Text, useTheme, Button, Dialog, Portal, List } from 'react-native-paper';
import {
	ExploreMediaQueryVariables,
	MediaFormat,
	MediaSeason,
	MediaStatus,
	MediaType,
} from '@/store/services/anilist/generated-anilist';
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
import { useAppTheme } from '@/store/theme/theme';
import DateTimePicker, {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { getDatetoFuzzyInt, getFuzzyInttoDate, getFuzzyInttoString } from '@/utils';
import { openDatePicker } from '@/utils/datepicker';

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
	const [date, setDate] = useState(value !== 'ANY' ? getFuzzyInttoDate(value) : new Date());

	const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
		if (event.type === 'set') {
			const currentDate = selectedDate;
			setDate(currentDate);
			onSelect(currentDate);
		}
	};

	return (
		<View style={[{ flex: 1, marginVertical: 5 }, containerStyle]}>
			<DropdownButton
				label={label}
				openDialog={() => openDatePicker('date', date, onChange)}
				value={value !== 'ANY' ? getFuzzyInttoString(value) : 'Any'}
				left={
					<TextInput.Icon
						icon={value !== 'ANY' ? 'calendar-remove' : 'calendar'}
						onPress={() => onSelect(undefined)}
					/>
				}
			/>
			{/* <Portal>
				{vis && (
					<DateTimePicker
						value={date}
						onChange={onChange}
						themeVariant={dark ? 'dark' : 'dark'}
					/>
				)}
			</Portal> */}
		</View>
	);
};

type SortDropdownProps = {
	current: MediaType;
	updateSort: (sort: AvailableSorts, asc?: boolean) => void;
	sort: {
		value: AvailableSorts;
		asc: boolean;
	};
};
export const SortDropdown = ({ current, sort, updateSort }: SortDropdownProps) => {
	// const categories = current === 'anime' ? animeSort : mangaNovelSort;

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
				current === MediaType.Anime
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

type StatusDropdownProps = {
	updateStatus: (status: MediaStatus | 'ANY' | undefined) => void;
	status: MediaStatus;
};
export const StatusDropdown = ({ status, updateStatus }: StatusDropdownProps) => {
	const categories = ['ANY', ...mediaStatusOptions];

	return (
		<DialogSelect
			label="Status"
			value={status?.toLowerCase() ?? 'ANY'.toLowerCase()}
			items={(closeDialog) =>
				categories.map((category: MediaStatus | 'ANY', idx) => (
					<DropdownItem
						key={idx}
						disabled={(category === 'ANY' && status === null) || category === status}
						onPress={() => {
							closeDialog();
							updateStatus(category);
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

type FormatDropdownProps = {
	current: MediaType;
	updateFormat: (format: MediaFormat | undefined) => void;
	removeFormat: () => void;
	formatValue: MediaFormat;
};
export const FormatDropdown = ({
	current,
	formatValue,
	removeFormat,
	updateFormat,
}: FormatDropdownProps) => {
	return (
		<DialogSelect
			label="Format"
			value={formatValue ?? 'ANY'.toLowerCase()}
			items={(closeDialog) =>
				current === MediaType.Anime
					? ['ANY', ...ANIME_FORMATS].map((format: MediaFormat | 'ANY', idx) => (
							<DropdownItem
								key={idx}
								disabled={
									(format === 'ANY' && formatValue === undefined) ||
									format === formatValue
								}
								onPress={() => {
									closeDialog();
									if (format === 'ANY') {
										removeFormat();
									} else {
										updateFormat(format);
									}
								}}
								title={format.replaceAll('_', ' ')}
							/>
						))
					: ['ANY', ...MANGA_FORMATS].map((format: MediaFormat | 'ANY', idx) => (
							<DropdownItem
								key={idx}
								disabled={
									(format === 'ANY' && formatValue === undefined) ||
									format === formatValue
								}
								onPress={() => {
									closeDialog();
									if (format === 'ANY') {
										removeFormat();
									} else {
										updateFormat(format);
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

type SeasonDropdownProps = {
	updateSeason: (season: MediaSeason | undefined) => void;
	seasonValue: string;
};
export const SeasonDropdown = ({ seasonValue, updateSeason }: SeasonDropdownProps) => {
	const seasons = ['ANY', ...Object.values(MediaSeason)];

	return (
		<DialogSelect
			label="Season"
			value={seasonValue ?? 'ANY'.toLowerCase()}
			items={(closeDialog) =>
				seasons.map((season: MediaSeason | 'ANY', idx) => (
					<DropdownItem
						key={idx}
						disabled={
							(season === 'ANY' && seasonValue === undefined) ||
							season === seasonValue
						}
						onPress={() => {
							closeDialog();
							updateSeason(season !== 'ANY' ? season : undefined);
						}}
						title={season.replaceAll('_', ' ')}
					/>
				))
			}
			// options={Object.values(MediaSeason)}
			// onMenuPressAction={(opt: MediaSeason) => updateSeason('anime', { season: opt })}
		/>
	);
};

export const SeasonDropdownMem = React.memo(SeasonDropdown);

type YearDropdownProps = {
	updateSeasonYear: (year: number | undefined) => void;
	yearValue: ExploreMediaQueryVariables['seasonYear'];
};
export const YearDropdown = ({ yearValue, updateSeasonYear }: YearDropdownProps) => {
	const range = arrayRange(1970, new Date().getFullYear() + 1, 1).reverse();
	const years = ['ANY'].concat(range);

	return (
		<DialogSelect
			label="Year"
			value={yearValue?.toString() ?? 'ANY'}
			items={(closeDialog) =>
				years.map((year: string, idx) => (
					<DropdownItem
						key={idx}
						disabled={
							(year === 'ANY' && yearValue === undefined) ||
							Number(year) === yearValue
						}
						onPress={() => {
							closeDialog();
							updateSeasonYear(year !== 'ANY' ? Number(year) : undefined);
						}}
						title={year}
					/>
				))
			}
		/>
	);
};

export const YearDropdownMem = React.memo(YearDropdown);

type CountryDropdownProps = {
	updateCountry: (c_code: string) => void;
	removeCountry: () => void;
	countryValue: string;
};
export const CountryDropdown = ({
	countryValue,
	removeCountry,
	updateCountry,
}: CountryDropdownProps) => {
	const categories = useMemo(() => Object.keys(COUNTRY_OPTIONS), []);
	const [cValue, setCValue] = useState<string | undefined>(countryValue ?? 'ANY');

	useEffect(() => {
		if (!categories.includes(countryValue)) {
			removeCountry();
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
								removeCountry();
							} else {
								setCValue(c_code);
								updateCountry(c_code);
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
