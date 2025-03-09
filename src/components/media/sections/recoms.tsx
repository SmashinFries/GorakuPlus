import { Text } from 'react-native-paper';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { MediaCard } from '@/components/cards';
import {
	AniMediaQuery_Media_Media_recommendations_RecommendationConnection,
	AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge,
	MediaFormat,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { AccordionMemo } from '@/components/animations';

type RecProps = {
	data: AniMediaQuery_Media_Media_recommendations_RecommendationConnection;
};
const RecList = ({ data }: RecProps) => {
	const getRatingText = (rating: number | null | undefined) => {
		if (rating === null || rating === undefined) return '0';
		if (rating > 0) return `+${rating}`;
		return `${rating}`;
	};
	const { colors } = useAppTheme();
	const keyExtractor = useCallback(
		(
			item: AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge,
			index: number,
		) => index.toString(),
		[],
	);
	const renderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge>) => {
		if (!item?.node?.mediaRecommendation) return null;
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
					{getRatingText(item.node?.rating)}
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

	if ((data?.edges?.length ?? 0) < 1) {
		return null;
	}

	return (
		<View>
			<AccordionMemo title="Recommendations">
				<FlatList
					data={data?.edges?.filter(
						(
							edge,
						): edge is AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge =>
							edge !== null,
					)}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					horizontal
					contentContainerStyle={{ padding: 15 }}
					showsHorizontalScrollIndicator={false}
				/>
			</AccordionMemo>
		</View>
	);
};

export default RecList;
