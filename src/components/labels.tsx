import { DanbooruRating } from '@/api/danbooru/types';
import { View } from 'react-native';
import { Chip, MD3LightTheme } from 'react-native-paper';
type RatingLevels = Record<DanbooruRating, { text: string; color: string } | null>;

const ratingLevels: RatingLevels = {
	[DanbooruRating.General]: null,
	[DanbooruRating.Sensitive]: {
		text: 'Sensitive',
		color: 'rgba(252, 196, 25, 0.6)',
	},
	[DanbooruRating.Questionable]: {
		text: 'Questionable',
		color: 'rgba(247, 103, 7, 0.6)',
	},
	[DanbooruRating.Explicit]: {
		text: 'Explicit',
		color: 'rgba(201, 42, 42, 0.6)',
	},
};

type NSFWLabelProps = {
	level: DanbooruRating;
};
export const NSFWLabel = ({ level }: NSFWLabelProps) => {
	if (!ratingLevels[level]) return null;
	return (
		<View style={{ position: 'absolute', borderRadius: 12, top: 0, left: 0 }}>
			<Chip
				style={{
					backgroundColor: ratingLevels[level]?.color ?? undefined,
					borderTopLeftRadius: 12,
					borderBottomRightRadius: 12,
				}}
				compact
				textStyle={{ fontWeight: '900', color: MD3LightTheme.colors.onBackground }}
			>
				{ratingLevels[level]?.text}
			</Chip>
		</View>
	);
};
