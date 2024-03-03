import { useTheme, Text, Button, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { ExpandableDescription } from '../../animations';
import { StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useAppSelector } from '@/store/hooks';
import Uwuifier from 'uwuifier';
import useTTS from '@/hooks/useTTS';

type DescriptionProps = {
	aniDescription: string;
	malDescription: string;
};
export const Description = ({ aniDescription, malDescription }: DescriptionProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	const { enabled, english } = useAppSelector((state) => state.ttsSettings);
	const { speak } = useTTS();

	const { defaultDescription } = useAppSelector((state) => state.persistedSettings);
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

	const AniDesc = () => (
		<RenderHTML
			contentWidth={width}
			baseStyle={{ color: colors.onBackground }}
			source={{ html: aniDescription }}
			defaultTextProps={{ selectable: true, selectionColor: colors.inversePrimary }}
		/>
	);
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
							{
								voice: english?.voice?.identifier,
								pitch: english?.pitch,
								rate: english?.rate,
							},
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
