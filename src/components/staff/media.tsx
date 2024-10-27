import { View } from 'react-native';
import { MediaCard } from '../cards';
import { IconButton, Text } from 'react-native-paper';
import { MediaFormat, StaffDetailsQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

type StaffMediaCardProps = {
	item: StaffDetailsQuery['Staff']['staffMedia']['edges'][0];
};
export const StaffMediaCard = ({ item }: StaffMediaCardProps) => {
	const { colors } = useAppTheme();
	return (
		<View style={{ marginHorizontal: 10, alignItems: 'center', maxHeight: 300 }}>
			<MediaCard {...item.node} containerStyle={{ marginVertical: 0 }} />
			<View style={{ justifyContent: 'flex-start' }}>
				<Text
					variant="labelLarge"
					numberOfLines={2}
					style={{ textTransform: 'capitalize', maxWidth: 200, textAlign: 'center' }}
				>
					{item.staffRole ?? '???'}
				</Text>
				<Text
					variant="labelMedium"
					style={{
						textTransform: 'capitalize',
						textAlign: 'center',
						color: colors.onSurfaceVariant,
					}}
				>
					{item.node?.format === MediaFormat.Tv
						? 'Anime'
						: item.node?.isLicensed
							? item.node?.format
							: 'Doujin'}{' '}
					· {item.node?.status?.replaceAll('_', ' ') ?? '??'}
				</Text>
			</View>
			{item.node?.isFavourite && (
				<IconButton
					icon="heart"
					iconColor="red"
					mode="contained"
					size={18}
					style={{ position: 'absolute', top: -15, left: -5 }}
				/>
			)}
		</View>
	);
};
