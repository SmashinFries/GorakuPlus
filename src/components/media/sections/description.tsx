import { Text, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { ExpandableDescription } from '../../animations';
import { useWindowDimensions } from 'react-native';
import Uwuifier from 'uwuifier';
import useTTS from '@/hooks/useTTS';
import { useTTSStore } from '@/store/tts/ttsStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import AniListMarkdownViewer from '@/components/markdown/renderer';

type DescriptionProps = {
	aniDescription: string;
	malDescription: string;
};
export const Description = ({ aniDescription, malDescription }: DescriptionProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useAppTheme();

	const { enabled, english } = useTTSStore();
	const { speak } = useTTS();

	const { defaultDescription } = useSettingsStore();
	const [isUwuified, setIsUwuified] = useState(false);

	const uwuifier = new Uwuifier({
		spaces: {
			faces: 0,
			actions: 0,
			stutters: 0.03,
		},
		words: 1,
		exclamations: 1,
	});

	const AniDesc = () => <AniListMarkdownViewer body={aniDescription} />;
	const MalDesc = () => (
		<>
			<Text selectable selectionColor={colors.inversePrimary}>
				{isUwuified ? uwuifier.uwuifySentence(malDescription) : malDescription}
			</Text>
			{enabled && (
				<IconButton
					icon="text-to-speech"
					onPress={() =>
						speak(
							isUwuified ? uwuifier.uwuifySentence(malDescription) : malDescription,
							english,
						)
					}
					style={{ alignSelf: 'flex-end' }}
				/>
			)}
		</>
	);

	const DescView = () => {
		if (!aniDescription && !malDescription) {
			return null;
		} else if (defaultDescription === 'mal' && malDescription) {
			return <MalDesc />;
		} else if (defaultDescription === 'ani' && aniDescription) {
			return <AniDesc />;
		} else if (defaultDescription === 'ani' && !aniDescription && malDescription) {
			return <MalDesc />;
		} else if (defaultDescription === 'mal' && !malDescription && aniDescription) {
			return <AniDesc />;
		} else {
			return null;
		}
	};

	if (!aniDescription && !malDescription) {
		return null;
	}

	return (
		<ExpandableDescription
			initialHeight={90}
			toggleUwuifier={() => setIsUwuified((prev) => !prev)}
		>
			<DescView />
			{/* {enabled && english && defaultDescription === 'mal' && malDescription && (
				<IconButton icon="text-to-speech" style={{ alignSelf: 'flex-end' }} />
			)} */}
		</ExpandableDescription>
	);
};

export const DescriptionMem = React.memo(Description);
