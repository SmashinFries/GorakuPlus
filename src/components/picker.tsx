import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import WheelPicker from 'react-native-wheely';

const hours = Array.from(Array(25).keys())
    .map((i) => `${i}`)
    .slice(1);

type NumberPickerProps = {
    defaultValue?: number;
    mode?: 'hours';
    onChange?: (value: number) => void;
};
export const NumberPicker = ({
    defaultValue = 11,
    mode = 'hours',
    onChange,
}: NumberPickerProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { colors } = useTheme();

    return (
        <WheelPicker
            selectedIndex={defaultValue}
            selectedIndicatorStyle={{ backgroundColor: colors.primary, opacity: 0.2 }}
            itemTextStyle={{ color: colors.onSecondaryContainer, fontSize: 20 }}
            // scaleFunction={(x) => x * 0.3}
            options={mode === 'hours' ? hours : ['Berlin', 'London', 'Amsterdam']}
            onChange={(index) => onChange(Number(hours[index]))}
        />
    );
};
