import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { QueryStatus } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

export const NetworkError = ({
	status,
	onRefresh,
}: {
	status: QueryStatus;
	onRefresh: () => void;
}) => {
	const { colors } = useAppTheme();

	return (
		<View style={[styles.container]}>
			<View>
				<IconButton onPress={onRefresh} icon="refresh" size={38} iconColor={colors.error} />
			</View>
			{/* https://discord.gg/eNentGQDMS */}
			<Text>{'Something went wrong :(\n'}</Text>
			<Button onPress={() => openWebBrowser('https://discord.gg/gdenWHjXBv', true)}>
				Check our Discord
			</Button>
			{/* <Text style={{ fontStyle: 'italic' }}>AniList API is likely down</Text> */}
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
