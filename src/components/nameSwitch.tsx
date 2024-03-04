import { View } from 'react-native';
import { SegmentedButtons, SegmentedButtonsProps, Text, useTheme } from 'react-native-paper';
import {
	CharacterDetailsQuery,
	CharacterName,
	MediaEdge,
	MediaSource,
	StaffDetailsQuery,
	StaffName,
} from '@/store/services/anilist/generated-anilist';
import { copyToClipboard } from '@/utils';
import { TransYUpViewMem } from '@/components/animations';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import useTTS from '@/hooks/useTTS';
import { useAppSelector } from '@/store/hooks';
import {} from 'react-i18next';
import { AnilistLanguages } from '@/types/anilist';

type NameViewerProps = {
	nativeLang?: AnilistLanguages | null;
	names: CharacterName | StaffName;
	defaultTitle: 'full' | 'native';
};
export const NameViewer = ({ nativeLang, names, defaultTitle }: NameViewerProps) => {
	const { colors } = useTheme();
	const { enabled, english, japanese, korean, chinese } = useAppSelector(
		(state) => state.ttsSettings,
	);

	const { speak } = useTTS();

	const [title, setTitle] = useState<NameViewerProps['defaultTitle']>(defaultTitle);

	const onSpeak = (langType: NameViewerProps['defaultTitle'], text: string) => {
		if (!enabled) return;
		switch (langType) {
			case 'full':
				speak(text, english);
				return;
			case 'native':
				if (nativeLang === 'JP') {
					console.log('speak japanese', text);
					speak(text, japanese);
				} else if (nativeLang === 'KR') {
					speak(text, korean);
				} else if (nativeLang === 'CN') {
					speak(text, chinese);
				} else {
					speak(text, english);
				}
				return;
			default:
				return;
		}
	};

	const titleButtons: SegmentedButtonsProps['buttons'] = [
		{
			value: 'full',
			label: 'Full',
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
					onPress={() => onSpeak(title, names[title])}
					onLongPress={() => copyToClipboard(names[title])}
					variant="titleLarge"
					style={[styles.title]}
				>
					{names[title]}
				</Text>
				{/* <Text
					onLongPress={() => copyToClipboard(data?.name[title])}
					variant="titleSmall"
					style={[
						styles.title,
						{ textTransform: 'capitalize', color: colors.onSurfaceVariant },
					]}
				>
					{data?.isLicensed ? data?.format?.replaceAll('_', ' ') ?? '??' : 'Doujin'} ·{' '}
					{data?.status?.replaceAll('_', ' ')}
				</Text> */}
			</View>
			<SegmentedButtons
				density="high"
				onValueChange={(value) => setTitle(value)}
				buttons={titleButtons}
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
