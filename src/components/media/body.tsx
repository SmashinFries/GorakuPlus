import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
	children: React.ReactNode;
};
const BodyContainer = ({ children }: Props) => {
	const { dark } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: dark ? 'transparent' : 'rgba(255,255,255,0)' },
			]}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		overflow: 'visible',
		paddingTop: 100,
	},
});

export default BodyContainer;
