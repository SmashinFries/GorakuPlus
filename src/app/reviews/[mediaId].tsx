import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useColumns } from '@/utils';
import { useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useReviewsList } from '@/hooks/reviews/useReviews';
import { ReviewItem } from '@/components/reviews/reviewItem';
import { ReviewsQuery } from '@/store/services/anilist/generated-anilist';
import { GorakuActivityIndicator } from '@/components/loading';

const ReviewsListScreen = () => {
    const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
    const { loadMore, reviewData } = useReviewsList(Number(mediaId));
    const { columns, listKey } = useColumns(180);
    const { height } = useWindowDimensions();
    const { colors } = useTheme();

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

    if (reviewData.isUninitialized) {
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
                data={reviewData.data?.Page?.reviews}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderItem}
                contentContainerStyle={{ padding: 10 }}
                estimatedItemSize={241}
                drawDistance={height / 2}
                onEndReached={() => loadMore()}
            />
        </View>
    );
};

export default ReviewsListScreen;
