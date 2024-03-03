import { useAppTheme } from '@/store/theme/theme';
import { Switch, SwitchProps } from 'react-native-paper';

export const GorakuSwitch = (props: SwitchProps) => {
	const { colors, dark } = useAppTheme();

	return (
		<Switch
			{...props}
			thumbColor={props.value ? (dark ? colors.primary : colors.primaryContainer) : undefined}
		/>
	);
};
