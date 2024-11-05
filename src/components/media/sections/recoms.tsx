import { Text } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { View } from 'react-native';
import { MediaCard } from '@/components/cards';
import { router } from 'expo-router';
import { ListHeading } from '@/components/text';
import { AniMediaQuery, MediaFormat } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { SheetManager } from 'react-native-actions-sheet';
import { Accordion } from '@/components/animations';

type RecProps = {
	data: AniMediaQuery['Media']['recommendations'];
};
const RecList = ({ data }: RecProps) => {
	const { colors } = useAppTheme();
	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = ({
		item,
	}: {
		item: AniMediaQuery['Media']['recommendations']['edges'][0];
	}) => {
		if (item.node.mediaRecommendation === null) return null;
		return (
			<View style={{ marginHorizontal: 10, maxHeight: 260 }}>
				<MediaCard
					{...item.node.mediaRecommendation}
					// navigate={() =>
					// 	router.push(
					// 		`/${item.node?.mediaRecommendation?.type?.toLowerCase()}/${
					// 			item.node?.mediaRecommendation?.id
					// 		}`,
					// 	)
					// }
					// onLongPress={() =>
					// 	SheetManager.show('QuickActionSheet', {
					// 		payload: item.node?.mediaRecommendation,
					// 	})
					// }
				/>
				<Text
					variant="labelLarge"
					style={{ textTransform: 'capitalize', textAlign: 'center' }}
				>
					{item.node?.rating > 0
						? '+' + item.node?.rating
						: item.node?.rating < 0
							? item.node?.rating
							: item.node?.rating}
				</Text>
				<Text
					variant="labelMedium"
					style={{
						textTransform: 'capitalize',
						textAlign: 'center',
						color: colors.onSurfaceVariant,
					}}
				>
					{item.node?.mediaRecommendation?.format === MediaFormat.Tv
						? 'Anime'
						: item.node?.mediaRecommendation?.isLicensed
							? item.node?.mediaRecommendation?.format
							: 'Doujin'}{' '}
					· {item.node?.mediaRecommendation?.status?.replaceAll('_', ' ') ?? '??'}
				</Text>
			</View>
		);
	};

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View>
			<Accordion title="Recommendations">
				<FlashList
					data={data?.edges}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					estimatedItemSize={250}
					removeClippedSubviews
					horizontal
					contentContainerStyle={{ padding: 15 }}
					showsHorizontalScrollIndicator={false}
				/>
			</Accordion>
		</View>
	);
};

export default RecList;
