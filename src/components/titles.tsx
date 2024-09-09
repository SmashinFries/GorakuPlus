import { useAppTheme } from '@/store/theme/themes';
import { TextStyle } from 'react-native';
import { List, useTheme } from 'react-native-paper';

type ListSubheaderProps = {
	title: string;
	style?: TextStyle;
};
export const ListSubheader = ({ title, style }: ListSubheaderProps) => {
	const { colors } = useAppTheme();
	return <List.Subheader style={[{ color: colors.primary }, style]}>{title}</List.Subheader>;
};
