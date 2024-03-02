import { ScoreFormat } from '@/store/services/anilist/generated-anilist';
import { scoreStringToNumber, scoreToIndex, scoreValues } from '@/utils/scores';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'react-native-paper';
import WheelPicker from 'react-native-wheely';

const hours = Array.from(Array(25).keys())
	.map((i) => `${i}`)
	.slice(1);

// const scores = Array.from(Array(101).keys()).map((i) => `${i}`);

const unknownChapterTotal = Array.from(Array(2001).keys()).map((i) => `${i}`);

export type NumberPickerMode = 'hours' | 'unknown_chapters' | ScoreFormat;

export type NumberPickerProps = {
	defaultValue?: number;
	mode?: NumberPickerMode;
	options?: string[] | null;
	onChange?: (value: number) => void;
};
export const NumberPicker = ({
	defaultValue = 0,
	mode = 'hours',
	options = null,
	onChange,
}: NumberPickerProps) => {
	const currentOptions: string[] = options
		? options
		: mode === 'hours'
			? hours
			: Object.values(ScoreFormat).includes(mode as ScoreFormat)
				? scoreValues[mode]
				: unknownChapterTotal;

	const [index, setIndex] = useState(
		Object.values(ScoreFormat).includes(mode as ScoreFormat)
			? scoreToIndex(defaultValue, mode as ScoreFormat)
			: defaultValue,
	);
	const { colors } = useTheme();

	const onIndexChange = (idx: number) => {
		setIndex(idx);
	};

	useEffect(() => {
		if (Object.values(ScoreFormat).includes(mode as ScoreFormat)) {
			onChange && onChange(scoreStringToNumber(currentOptions[index], mode as ScoreFormat));
		} else {
			onChange && onChange(parseInt(currentOptions[index]));
		}
	}, [index]);

	return (
		<WheelPicker
			selectedIndex={index > currentOptions.length - 1 ? 0 : index}
			selectedIndicatorStyle={{ backgroundColor: colors.primary, opacity: 0.2 }}
			itemTextStyle={{ color: colors.onSecondaryContainer, fontSize: 20 }}
			// scaleFunction={(x) => x * 0.3}
			options={currentOptions}
			onChange={onIndexChange}
		/>
	);
};
