import { List, useTheme } from 'react-native-paper';

type ListSubheaderProps = {
	title: string;
};
export const ListSubheader = ({ title }: ListSubheaderProps) => {
	const { colors } = useTheme();
	return <List.Subheader style={{ color: colors.primary }}>{title}</List.Subheader>;
};
