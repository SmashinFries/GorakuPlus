import React, { useCallback, useState } from 'react';
import { ScrollView, useWindowDimensions, View, ViewStyle, Modal as RNModal } from 'react-native';
import { TextInput, Text, Button, Dialog, Portal, Modal } from 'react-native-paper';
import { arrayRange } from '@/utils/numbers';
import { getDatetoFuzzyInt, getFuzzyInttoDate, getFuzzyInttoString } from '@/utils';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import WheelPicker from 'react-native-wheely';
import { FullWindowOverlay } from 'react-native-screens';

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
	return (
		<TextInput
			label={
				<Text
					style={{
						textTransform: 'capitalize',
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
			}}
			onPress={openDialog}
			showSoftInputOnFocus={false}
			focusable={false}
			style={{
				marginHorizontal: 10,
			}}
			right={<TextInput.Icon icon="menu-down" onPress={openDialog} />}
			left={left ?? null}
		/>
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
	maxDate?: string;
	minDate?: string;
	onSelect: (date: Date | undefined) => void;
	containerStyle?: ViewStyle;
};
export const DialogSelectDate = ({
	label,
	value,
	minDate,
	maxDate,
	containerStyle,
	onSelect,
}: DialogSelectDateProps) => {
	const [isVis, setIsVis] = useState(false);
	const [date, setDate] = useState(value ? getFuzzyInttoDate(value) : new Date());

	const onSave = (selectedDate: CalendarDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
		onSelect(currentDate);
		setIsVis(false);
	};

	const onClear = () => {
		// setDate(new)
		onSelect(undefined);
	};

	return (
		<View style={[{ flex: 1, marginVertical: 8 }, containerStyle]}>
			<DropdownButton
				label={label}
				openDialog={() => setIsVis(true)}
				value={value ? getFuzzyInttoString(value) : 'Any'}
				left={
					<TextInput.Icon
						icon={value ? 'calendar-remove' : 'calendar'}
						onPress={onClear}
					/>
				}
			/>
			<DatePickerModal
				locale="en"
				mode="single"
				visible={isVis}
				onDismiss={() => setIsVis(false)}
				date={date}
				label={label}
				onConfirm={(params) => onSave(params.date)}
				presentationStyle="pageSheet"
				validRange={{
					startDate: minDate ? getFuzzyInttoDate(minDate) : undefined,
					endDate: maxDate ? getFuzzyInttoDate(maxDate) : undefined,
				}}
			/>
		</View>
	);
};

type YearPickerProps = {
	isVis: boolean;
	value: number;
	years: string[];
	onDismiss: () => void;
	onConfirm: () => void;
	onValueChange: (val: number) => void;
};
export const YearPicker = ({
	isVis,
	value,
	years,
	onValueChange,
	onConfirm,
	onDismiss,
}: YearPickerProps) => {
	const { width, height } = useWindowDimensions();
	// actionsheet renders over the paper provider somehow so we need to use native modal... don't ask how long this took me to figure out
	return (
		<RNModal
			visible={isVis}
			onDismiss={onDismiss}
			transparent
			animationType="fade"
			presentationStyle="overFullScreen"
		>
			<Dialog visible={true} onDismiss={onDismiss} style={{ maxHeight: '95%', zIndex: 9999 }}>
				<Dialog.Title>Select Year</Dialog.Title>
				{/* <Dialog.ScrollArea>
					<WheelPicker selectedIndex={value} options={years} onChange={onValueChange} />
				</Dialog.ScrollArea> */}
				<Dialog.Content>
					<WheelPicker selectedIndex={value} options={years} onChange={onValueChange} />
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onDismiss}>Cancel</Button>
					<Button onPress={onConfirm}>Confirm</Button>
				</Dialog.Actions>
			</Dialog>
		</RNModal>
	);
};

type YearDropdownProps = {
	seasonYear: number | undefined;
	containerStyle?: ViewStyle;
	onUpdate: (seasonYear: number | undefined) => void;
};
export const YearDropdown = ({ seasonYear, containerStyle, onUpdate }: YearDropdownProps) => {
	const range = arrayRange(1970, new Date().getFullYear() + 1, 1).reverse();
	const years = ['ANY'].concat(range);
	const [isVis, setIsVis] = useState(false);
	const [index, setIndex] = useState(
		seasonYear ? (years.findIndex((val) => val === `${seasonYear}`) ?? 0) : 0,
	);

	const onDismiss = () => {
		setIsVis(false);
	};

	const onConfirm = () => {
		onUpdate(years[index] === 'ANY' ? undefined : parseInt(years[index]));
		onDismiss();
	};

	return (
		<View style={[{ flex: 1, marginVertical: 8 }, containerStyle]}>
			<DropdownButton
				label={'Year'}
				openDialog={() => setIsVis(true)}
				value={seasonYear ? `${seasonYear}` : 'Any'}
				left={
					<TextInput.Icon
						icon={seasonYear ? 'calendar-remove' : 'calendar'}
						onPress={() => onUpdate(undefined)}
					/>
				}
			/>
			<Portal>
				<YearPicker
					isVis={isVis}
					onDismiss={onDismiss}
					onConfirm={onConfirm}
					onValueChange={(val) => setIndex(val)}
					value={index}
					years={years}
				/>
			</Portal>
		</View>
	);
};
