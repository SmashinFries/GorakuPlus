import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

export const NetworkError = ({
	status,
	onRefresh,
}: {
	status: QueryStatus;
	onRefresh: () => void;
}) => {
	const { colors } = useTheme();

	return (
		<View style={[styles.container]}>
			<View>
				<IconButton onPress={onRefresh} icon="refresh" size={38} iconColor={colors.error} />
			</View>
			<Text>{'Something went wrong :('}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
