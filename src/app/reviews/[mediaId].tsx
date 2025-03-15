import { FlatList, ListRenderItemInfo, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useCallback, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useReviewsList } from '@/hooks/reviews/useReviews';
import { ReviewItem } from '@/components/reviews/reviewItem';
import { GorakuActivityIndicator } from '@/components/loading';
import {
	ReviewsQuery,
	ReviewsQuery_Page_Page_reviews_Review,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { ReviewActionsSheet } from '@/components/sheets/bottomsheets';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { AnimViewMem } from '@/components/animations';

const ReviewsListScreen = () => {
	const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
	const { reviewData } = useReviewsList(Number(mediaId));
	const { colors } = useAppTheme();
	const [selectedReview, setSelectedReview] = useState<
		ReviewsQuery_Page_Page_reviews_Review | null | undefined
	>();
	const sheetRef = useRef<TrueSheet>(null);

	const RenderItem = useCallback(
		(props: ListRenderItemInfo<ReviewsQuery_Page_Page_reviews_Review | null | undefined>) => (
			<AnimViewMem>
				<ReviewItem
					item={props.item}
					marginVertical={10}
					backgroundColor={colors.elevation.level5}
					iconColor={colors.onBackground}
					openSheet={() => {
						setSelectedReview(props.item);
						sheetRef.current?.present();
					}}
					width={'100%'}
				/>
			</AnimViewMem>
		),
		[],
	);

	const mergedData = reviewData?.data?.pages?.flatMap((data) => data.Page?.reviews);

	if (reviewData?.isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				numColumns={1}
				data={mergedData}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={RenderItem}
				contentContainerStyle={{ padding: 10 }}
				onEndReached={() => reviewData?.hasNextPage && reviewData.fetchNextPage()}
			/>
			<ReviewActionsSheet data={selectedReview} sheetRef={sheetRef} />
		</View>
	);
};

export default ReviewsListScreen;
