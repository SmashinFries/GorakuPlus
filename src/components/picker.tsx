import { useTheme } from 'react-native-paper';
import WheelPicker from 'react-native-wheely';

const hours = Array.from(Array(25).keys())
    .map((i) => `${i}`)
    .slice(1);

const scores = Array.from(Array(101).keys())
    .map((i) => `${i}`)
    .slice(1);

export type NumberPickerMode = 'hours' | 'scores' | null;

type NumberPickerProps = {
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

    return (
        <WheelPicker
            selectedIndex={defaultValue}
            selectedIndicatorStyle={{ backgroundColor: colors.primary, opacity: 0.2 }}
            itemTextStyle={{ color: colors.onSecondaryContainer, fontSize: 20 }}
            // scaleFunction={(x) => x * 0.3}
            options={options ? options : mode === 'hours' ? hours : scores}
            onChange={(index) => onChange(Number(hours[index]))}
        />
    );
};
