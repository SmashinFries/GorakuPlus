import { Button, List, Menu, Portal, Text, TextInput, useTheme } from 'react-native-paper';
import { FuzzyDate, MediaListStatus } from '@/store/services/anilist/generated-anilist';
import { useState } from 'react';
import { arrayRange, convertDate, getDatetoFuzzy, getFuzzytoDate } from '@/utils';
import { Platform, Pressable, View } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker, {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { openDatePicker } from '@/utils/datepicker';

type DropdownMenuProps = {
	value: string;
	isUnreleased?: boolean;
	onSelect: (item: any) => void;
};
export const StatusDropDown = ({ value, isUnreleased, onSelect }: DropdownMenuProps) => {
	const listStatusOptions = Object.values(MediaListStatus);

	const [vis, setVis] = useState(false);

	const onDismiss = () => setVis(false);

	return (
		<Menu
			anchor={
				<Button
					mode="elevated"
					labelStyle={{ textTransform: 'capitalize' }}
					onPress={() => setVis(true)}
				>
					{value}
				</Button>
			}
			anchorPosition="bottom"
			visible={vis}
			onDismiss={onDismiss}
		>
			{listStatusOptions.map((item, idx) => (
				<Menu.Item
					key={idx}
					title={item}
					titleStyle={{ textTransform: 'capitalize' }}
					onPress={() => {
						onSelect(item);
						onDismiss();
					}}
					disabled={isUnreleased && item !== MediaListStatus.Planning}
				/>
			))}
		</Menu>
	);
};

type DatePopupProps = {
	title: string;
	containerHeight?: number;
	value: FuzzyDate;
	onSelect: (item: FuzzyDate) => void;
};
export const DatePopup = ({ onSelect, containerHeight, title, value }: DatePopupProps) => {
	const [date, setDate] = useState<Date>(
		value?.day && value?.month && value?.year ? getFuzzytoDate(value) : new Date(),
	);
	const { colors } = useTheme();

	const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
		if (event.type === 'set') {
			const currentDate = selectedDate;
			setDate(currentDate);
			const newFuzzy = getDatetoFuzzy(currentDate);
			onSelect(newFuzzy);
		}
	};

	return (
		<>
			<Pressable
				onPress={() => openDatePicker('date', date, onChange)}
				android_ripple={{
					color: colors.primary,
					borderless: true,
					foreground: true,
					radius: containerHeight ?? 40,
				}}
			>
				<List.Subheader style={{ textAlign: 'center' }}>{title}</List.Subheader>
				<Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
					{convertDate(value) ?? 'N/A'}
				</Text>
			</Pressable>
		</>
	);
};

type ProgressDropDownProps = {
	total?: number;
	maxValue?: number;
	value: number;
	step?: number;
	disableSlider?: boolean;
	disableLimit?: boolean;
	onSelect: (item: number) => void;
};
export const ProgressDropDown = ({
	total,
	value,
	maxValue,
	step = 1,
	disableSlider = false,
	disableLimit = false,
	onSelect,
}: ProgressDropDownProps) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<TextInput
				inputMode="numeric"
				keyboardType="number-pad"
				mode="outlined"
				dense
				onChangeText={(txt) => onSelect(Number(txt) > total ? total : Number(txt))}
				value={`${value?.toLocaleString()}`}
				style={{
					width: disableSlider ? '100%' : undefined,
				}}
			/>
			<Text>{disableLimit ? '' : ` / ${total ? total?.toLocaleString() : '???'}`}</Text>
			{!disableSlider && (
				<Slider
					onValueChange={(value) => onSelect(value)}
					step={step}
					maximumValue={total ?? 2000}
					upperLimit={maxValue ?? undefined}
					style={{ flex: 1, width: '70%' }}
					value={value}
				/>
			)}
		</View>
	);
};
