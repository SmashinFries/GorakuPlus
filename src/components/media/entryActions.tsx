import { Button, List, Menu, Portal, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { convertDate, getDatetoFuzzy, getFuzzytoDate } from '@/utils';
import { Pressable, View } from 'react-native';
import { FuzzyDate, MediaListStatus } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

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
	const [isVisible, setIsVisible] = useState(false);
	const [date, setDate] = useState<Date>(() => {
		const fuzzyDate = value?.day && value?.month && value?.year ? getFuzzytoDate(value) : null;
		return fuzzyDate ?? new Date();
	});
	const { colors } = useAppTheme();

	const onChange = (calendarDate: CalendarDate) => {
		const currentDate = calendarDate;
		setDate(currentDate as Date);
		const newFuzzy = getDatetoFuzzy(currentDate as Date);
		onSelect(newFuzzy);
	};

	return (
		<>
			<Pressable
				onPress={() => setIsVisible(true)}
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
			<Portal>
				<DatePickerModal
					locale="en"
					mode="single"
					visible={isVisible}
					onDismiss={() => setIsVisible(false)}
					date={date}
					label={title}
					onConfirm={(params) => onChange(params.date)}
				/>
			</Portal>
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
				onChangeText={(txt) =>
					onSelect(Number(txt) > (total ?? 0) ? (total ?? 0) : Number(txt))
				}
				value={`${value?.toLocaleString()}`}
				style={{
					width: disableSlider ? '100%' : undefined,
				}}
			/>
			<Text>{disableLimit ? '' : ` / ${total ? total?.toLocaleString() : '???'}`}</Text>
			{/* {!disableSlider && (
				<Slider
					onValueChange={(value) => onSelect(value)}
					step={step}
					maximumValue={total ?? 2000}
					upperLimit={maxValue ?? undefined}
					style={{ flex: 1, width: '70%' }}
					value={value}
				/>
			)} */}
		</View>
	);
};
