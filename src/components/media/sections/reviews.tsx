import { useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { memo, useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { ListHeading } from '@/components/text';
import { ReviewItem } from '@/components/reviews/reviewItem';
import { AniMediaQuery, ReviewsQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { ReviewOverviewBottomSheet } from '@/components/bottomsheets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type ReviewProps = {
	data: AniMediaQuery['Media']['reviews'];
	openMore: () => void;
};
const ReviewsSection = ({ data, openMore }: ReviewProps) => {
	const { colors } = useAppTheme();
	const btmSheetRef = useRef<BottomSheetModal>(null);
	const [selected, setSelected] = useState<
		AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0]
	>(null);

	const keyExtractor = useCallback((item, index) => index.toString(), []);

	const onLongSelect = (
		data: AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0],
	) => {
		setSelected(data);
		btmSheetRef.current?.present();
	};

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View style={{ overflow: 'visible' }}>
			<ListHeading
				title="Reviews"
				icon={data?.pageInfo?.hasNextPage ? 'arrow-right' : undefined}
				onIconPress={openMore}
			/>
			<FlashList
				data={data?.edges}
				renderItem={(info) => (
					<ReviewItem
						{...info}
						backgroundColor={colors.elevation.level5}
						iconColor={colors.onBackground}
						onLongPress={(data) => onLongSelect(data)}
					/>
				)}
				keyExtractor={keyExtractor}
				estimatedItemSize={250}
				horizontal
				removeClippedSubviews
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
			<ReviewOverviewBottomSheet ref={btmSheetRef} data={selected} />
		</View>
	);
};

export const ReviewsSectionMem = memo(ReviewsSection);
export default ReviewsSection;
