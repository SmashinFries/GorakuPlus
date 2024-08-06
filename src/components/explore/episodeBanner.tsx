import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { Text } from 'react-native-paper';
import { getTimeUntil } from '@/utils';

type AiringBannerProps = {
	containerColor: string;
	textColor: string;
	text: string | number;
};
export const AiringBanner = ({ containerColor, textColor, text }: AiringBannerProps) => {
	return (
		<View style={[Styles.container, { backgroundColor: containerColor }]}>
			<Text variant="labelSmall" numberOfLines={1} style={[Styles.txt, { color: textColor }]}>
				{getTimeUntil(Number(text), 'until')}
			</Text>
		</View>
	);
};

export const AiringBannerMemo = memo(AiringBanner);

const Styles = StyleSheet.create({
	container: {
		// position: 'absolute',
		alignSelf: 'center',
		bottom: 0,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		width: '100%',
		overflow: 'visible',
		padding: 3,
		paddingVertical: 1,
		justifyContent: 'center',
	},
	txt: {
		textAlign: 'center',
		fontWeight: '900',
	},
});
