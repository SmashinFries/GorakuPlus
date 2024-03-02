import { useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { AniMediaQuery } from '@/store/services/anilist/generated-anilist';
import { ListHeading } from '@/components/text';
import { ReviewItem } from '@/components/reviews/reviewItem';

type ReviewProps = {
    data: AniMediaQuery['Media']['reviews'];
    openMore: () => void;
};
const ReviewsSection = ({ data, openMore }: ReviewProps) => {
	const { colors } = useTheme();

	const keyExtractor = useCallback((item, index) => index.toString(), []);

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View style={{ overflow: 'visible' }}>
			<ListHeading
				title="Reviews (beta)"
				icon={data.pageInfo.hasNextPage ? 'arrow-right' : undefined}
				onIconPress={openMore}
			/>
			<FlashList
				data={data?.edges}
				renderItem={(info) => (
					<ReviewItem
						{...info}
						backgroundColor={colors.elevation.level5}
						iconColor={colors.onBackground}
					/>
				)}
				keyExtractor={keyExtractor}
				estimatedItemSize={250}
				horizontal
				removeClippedSubviews
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export const ReviewsSectionMem = memo(ReviewsSection);
export default ReviewsSection;
