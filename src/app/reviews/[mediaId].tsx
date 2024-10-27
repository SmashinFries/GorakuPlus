import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useReviewsList } from '@/hooks/reviews/useReviews';
import { ReviewItem } from '@/components/reviews/reviewItem';
import { GorakuActivityIndicator } from '@/components/loading';
import { ReviewsQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

const ReviewsListScreen = () => {
	const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
	const { reviewData } = useReviewsList(Number(mediaId));
	const { height } = useWindowDimensions();
	const { colors } = useAppTheme();

	const RenderItem = useCallback(
		(props: { item: ReviewsQuery['Page']['reviews'][0]; index: number }) => (
			<ReviewItem
				{...props}
				maxWidth={'100%'}
				marginVertical={10}
				backgroundColor={colors.elevation.level5}
				iconColor={colors.onBackground}
			/>
		),
		[],
	);

	const mergedData = reviewData?.data?.pages?.flatMap((data) => data.Page?.reviews);

	if (reviewData?.isFetching) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ height: '100%', width: '100%' }}>
			<FlashList
				key={1}
				data={mergedData}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={RenderItem}
				contentContainerStyle={{ padding: 10 }}
				estimatedItemSize={241}
				drawDistance={height / 2}
				onEndReached={() => reviewData?.hasNextPage && reviewData.fetchNextPage()}
			/>
		</View>
	);
};

export default ReviewsListScreen;
