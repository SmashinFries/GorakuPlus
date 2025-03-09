import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { Text } from 'react-native-paper';
import { getTimeUntil } from '@/utils';

type AiringBannerProps = {
	containerColor: string;
	textColor: string;
	airingAt: number;
	episode: number;
	customText?: string;
};
export const AiringBanner = ({
	containerColor,
	textColor,
	airingAt,
	episode,
	customText,
}: AiringBannerProps) => {
	return (
		<View style={[Styles.container, { backgroundColor: containerColor }]}>
			<Text variant="labelSmall" numberOfLines={1} style={[Styles.txt, { color: textColor }]}>
				{customText ? customText : `EP ${episode}: ${getTimeUntil(Number(airingAt))}`}
			</Text>
		</View>
	);
};

export const AiringBannerMemo = memo(AiringBanner);

const Styles = StyleSheet.create({
	container: {
		width: '100%',
		overflow: 'hidden',
		// padding: 3,
		// paddingVertical: 1,
		justifyContent: 'center',
	},
	txt: {
		textAlign: 'center',
		fontWeight: '900',
	},
});
