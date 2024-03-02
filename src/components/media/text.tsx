import { View } from 'react-native';
import { SegmentedButtons, SegmentedButtonsProps, Text, useTheme } from 'react-native-paper';
import { AniMediaQuery } from '@/store/services/anilist/generated-anilist';
import { copyToClipboard } from '@/utils';
import { TransYUpViewMem } from '@/components/animations';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

type MediaTitleView = {
	data: AniMediaQuery['Media'];
	defaultTitle: 'romaji' | 'english' | 'native';
};
export const MediaTitleView = ({ data, defaultTitle }: MediaTitleView) => {
	const [title, setTitle] = useState<MediaTitleView['defaultTitle']>(
		data?.title[defaultTitle] ? defaultTitle : 'romaji',
	);

	const { colors } = useTheme();

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
		<TransYUpViewMem
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
		</TransYUpViewMem>
	);
};

const styles = StyleSheet.create({
	title: {
		flexWrap: 'wrap',
		marginTop: 10,
		textAlign: 'center',
	},
});
