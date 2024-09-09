import { useAppTheme } from '@/store/theme/themes';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
	children: React.ReactNode;
};
const BodyContainer = ({ children }: Props) => {
	const { dark } = useAppTheme();

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
