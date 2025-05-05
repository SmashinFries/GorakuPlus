import { memo, useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { ListHeading } from '@/components/text';
import { ReviewItem } from '@/components/reviews/reviewItem';
import {
	AniMediaQuery_Media_Media_reviews_ReviewConnection,
	AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review,
	ReviewsQuery_Page_Page_reviews_Review,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { ReviewActionsSheet } from '@/components/sheets/bottomsheets';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { LegendList } from '@legendapp/list';

type ReviewProps = {
	data: AniMediaQuery_Media_Media_reviews_ReviewConnection;
	openMore: () => void;
};
const ReviewsSection = ({ data, openMore }: ReviewProps) => {
	const { colors } = useAppTheme();
	const [selectedReview, setSelectedReview] = useState<
		| AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review
		| ReviewsQuery_Page_Page_reviews_Review
		| null
		| undefined
	>();
	const sheetRef = useRef<TrueSheet>(null);

	const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);

	if ((data?.edges?.length ?? 0) < 1) {
		return null;
	}

	return (
		<View style={{ overflow: 'visible' }}>
			<ListHeading
				title="Reviews"
				icon={data?.pageInfo?.hasNextPage ? 'arrow-right' : undefined}
				onIconPress={openMore}
			/>
			<LegendList
				style={{ height: 180 }}
				data={data?.edges ?? []}
				renderItem={(info) => (
					<View style={{ marginRight: 8 }}>
						<ReviewItem
							item={info.item?.node}
							backgroundColor={colors.elevation.level5}
							iconColor={colors.onBackground}
							openSheet={(data) => {
								setSelectedReview(data);
								sheetRef.current?.present();
							}}
						/>
					</View>
				)}
				keyExtractor={keyExtractor}
				// estimatedItemSize={250}
				horizontal
				recycleItems
				// removeClippedSubviews
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
			<ReviewActionsSheet data={selectedReview} sheetRef={sheetRef} />
		</View>
	);
};

export const ReviewsSectionMem = memo(ReviewsSection);
export default ReviewsSection;
