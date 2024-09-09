import { View } from 'react-native';
import { SegmentedButtons, SegmentedButtonsProps, Text } from 'react-native-paper';
import { copyToClipboard } from '@/utils';
import { AnimViewMem } from '@/components/animations';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import useTTS from '@/hooks/useTTS';
import { AniMediaQuery } from '@/api/anilist/__genereated__/gql';
import { useTTSStore } from '@/store/tts/ttsStore';
import { useAppTheme } from '@/store/theme/themes';

type MediaTitleView = {
	data: AniMediaQuery['Media'];
	defaultTitle: 'romaji' | 'english' | 'native';
};
export const MediaTitleView = ({ data, defaultTitle }: MediaTitleView) => {
	const { enabled, english, japanese, korean, chinese } = useTTSStore();
	const { speak } = useTTS();

	const [title, setTitle] = useState<MediaTitleView['defaultTitle']>(
		data?.title[defaultTitle] ? defaultTitle : 'romaji',
	);

	const { colors } = useAppTheme();

	const onSpeak = (langType: MediaTitleView['defaultTitle'], text: string) => {
		if (!enabled) return;
		switch (langType) {
			case 'english':
				speak(text, english);
				return;
			case 'romaji':
			case 'native':
				if (data?.countryOfOrigin === 'JP') {
					speak(data?.title?.romaji, japanese);
				} else if (data?.countryOfOrigin === 'KR') {
					speak(data?.title?.romaji, korean);
				} else if (data?.countryOfOrigin === 'CN') {
					speak(data?.title?.romaji, chinese);
				}
				return;
			default:
				return;
		}
	};

	const titleButtons: SegmentedButtonsProps['buttons'] = [
		{
			value: 'romaji',
			label: 'Romaji',
		},
		{
			value: 'native',
			label: 'Native',
		},
	];

	return (
		<AnimViewMem
			style={{
				width: '100%',
				paddingTop: 15,
				paddingHorizontal: 20,
				justifyContent: 'center',
			}}
			delay={200}
		>
			<View>
				<Text
					onPress={() => onSpeak(title, data?.title[title])}
					onLongPress={() => copyToClipboard(data?.title[title])}
					variant="titleLarge"
					style={[styles.title]}
				>
					{data?.title[title]}
				</Text>
				<Text
					onLongPress={() => copyToClipboard(data?.title[title])}
					variant="titleSmall"
					style={[
						styles.title,
						{ textTransform: 'capitalize', color: colors.onSurfaceVariant },
					]}
				>
					{data?.isLicensed ? data?.format?.replaceAll('_', ' ') ?? '??' : 'Doujin'} ·{' '}
					{data?.status?.replaceAll('_', ' ')}
				</Text>
			</View>
			<SegmentedButtons
				density="high"
				onValueChange={(value) => setTitle(value)}
				buttons={
					data?.title?.english
						? [{ value: 'english', label: 'English' }, ...titleButtons]
						: titleButtons
				}
				value={title}
				style={{ paddingVertical: 10 }}
			/>
		</AnimViewMem>
	);
};

const styles = StyleSheet.create({
	title: {
		flexWrap: 'wrap',
		marginTop: 10,
		textAlign: 'center',
	},
});
