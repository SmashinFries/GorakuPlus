import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMemo } from 'react';
import { useTheme } from 'react-native-paper';
import WheelPicker from 'react-native-wheely';

const hours = Array.from(Array(25).keys())
    .map((i) => `${i}`)
    .slice(1);

const scores = Array.from(Array(101).keys()).map((i) => `${i}`);

const unknownChapterTotal = Array.from(Array(2001).keys()).map((i) => `${i}`);

export type NumberPickerMode = 'hours' | 'scores' | 'unknown_chapters' | null;

export type NumberPickerProps = {
    defaultValue?: number;
    mode?: NumberPickerMode;
    options?: string[] | null;
    onChange?: (value: number) => void;
};
export const NumberPicker = ({
    defaultValue = 11,
    mode = 'hours',
    options = null,
    onChange,
}: NumberPickerProps) => {
    const { colors } = useTheme();
    const currentOptions = options
        ? options
        : mode === 'hours'
        ? hours
        : mode === 'scores'
        ? scores
        : unknownChapterTotal;

    return (
        <WheelPicker
            selectedIndex={defaultValue ?? 0}
            selectedIndicatorStyle={{ backgroundColor: colors.primary, opacity: 0.2 }}
            itemTextStyle={{ color: colors.onSecondaryContainer, fontSize: 20 }}
            // scaleFunction={(x) => x * 0.3}
            options={
                options
                    ? options
                    : mode === 'hours'
                    ? hours
                    : mode === 'unknown_chapters'
                    ? unknownChapterTotal
                    : scores
            }
            onChange={(index) => onChange(parseInt(currentOptions[index]))}
        />
    );
};
