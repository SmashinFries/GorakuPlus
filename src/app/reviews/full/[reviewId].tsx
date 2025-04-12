import { View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Divider, IconButton, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { openWebBrowser } from '@/utils/webBrowser';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as Burnt from 'burnt';
import { GorakuActivityIndicator } from '@/components/loading';
import {
	ReviewRating,
	useReviewRatingMutation,
	useReviewsByIdQuery,
	useToggleFollowMutation,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

import AniListMarkdownViewer from '@/components/markdown/renderer';
import { LongScrollView } from '@/components/list';
import { useAuthStore } from '@/store/authStore';
import { getScoreColor } from '@/utils';
import { MediaBanner } from '@/components/media/banner';
import { useShallow } from 'zustand/react/shallow';
import { ReviewHeader } from '@/components/headers/review';

type ScoreProps = {
	reviewId: number;
	score: number;
	ratingAmount?: number;
	rating?: number;
	userRating?: ReviewRating;
};
const Score = ({ reviewId, score, ratingAmount, rating, userRating }: ScoreProps) => {
	const { mutateAsync } = useReviewRatingMutation();
	const { colors } = useAppTheme();
	const isAuthed = useAuthStore(useShallow((state) => !!state.anilist.token));
	const [userRatingState, setUserRatingState] = useState<ReviewRating>(
		userRating ?? ReviewRating.NoVote,
	);
	const scoreColor = getScoreColor(score);
	const [posRatings, setPosRatings] = useState(rating); // for clarity
	const [negRatings, setNegRatings] = useState((ratingAmount ?? 0) - (rating ?? 0));
	// const ratingPercentage = {
	// 	positive: ((rating / ratingAmount) * 100).toFixed(0),
	// 	negative: (((ratingAmount - rating) / ratingAmount) * 100).toFixed(0),
	// };

	const onRatePress = async (rate: ReviewRating) => {
		if (!isAuthed) return;
		if (rate === userRatingState) {
			const res = await mutateAsync({ id: reviewId, rating: ReviewRating.NoVote });
			res.RateReview?.userRating && setUserRatingState(res.RateReview.userRating);
			res.RateReview?.rating && setPosRatings(res.RateReview?.rating);
			res.RateReview?.ratingAmount &&
				setNegRatings(res.RateReview?.ratingAmount - (res.RateReview?.rating ?? 0));
		} else {
			const res = await mutateAsync({ id: reviewId, rating: rate });
			res.RateReview?.userRating && setUserRatingState(res.RateReview.userRating);
			res.RateReview?.rating && setPosRatings(res.RateReview?.rating);
			res.RateReview?.ratingAmount &&
				setNegRatings(res.RateReview?.ratingAmount - (res.RateReview?.rating ?? 0));
		}
	};

	return (
		<View style={{ paddingBottom: 20 }}>
			<Divider style={{ marginVertical: 20 }} />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				<View style={{ alignItems: 'center' }}>
					<IconButton
						icon={'thumb-down-outline'}
						onPress={() => onRatePress(ReviewRating.DownVote)}
						selected={userRatingState === ReviewRating.DownVote}
						iconColor={userRatingState === ReviewRating.DownVote ? 'red' : undefined}
						disabled={!isAuthed}
					/>
					<Text>{negRatings}</Text>
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text variant="displayMedium">
						{score}
						<Text variant="titleSmall" style={{ lineHeight: 62 }}>
							/ 100
						</Text>
					</Text>
					<View
						style={{
							height: 4,
							width: '100%',
							backgroundColor: colors.surfaceVariant,
							borderRadius: 12,
							overflow: 'hidden',
						}}
					>
						<View
							style={{
								position: 'absolute',
								width: `${score}%`,
								height: '100%',
								backgroundColor: scoreColor,
							}}
						/>
					</View>
				</View>
				<View style={{ alignItems: 'center' }}>
					<IconButton
						icon={'thumb-up-outline'}
						onPress={() => onRatePress(ReviewRating.UpVote)}
						selected={userRatingState === ReviewRating.UpVote}
						iconColor={userRatingState === ReviewRating.UpVote ? 'green' : undefined}
						disabled={!isAuthed}
					/>
					<Text>{posRatings}</Text>
				</View>
			</View>
		</View>
	);
};

const ReviewPage = () => {
	const { reviewId } = useLocalSearchParams<{ reviewId: string }>();
	const { width } = useWindowDimensions();
	const id = Number(reviewId);
	const isAuthed = useAuthStore(useShallow((state) => !!state.anilist.userID));

	const { data, isLoading } = useReviewsByIdQuery(
		{
			reviewId: id,
		},
		{ enabled: !!reviewId },
	);
	const { mutateAsync } = useToggleFollowMutation();

	const [isFollowing, setIsFollowing] = useState(data?.Review?.user?.isFollowing ?? false);

	const onFollowPress = async () => {
		if (!isAuthed) return;
		if (data?.Review?.user?.id) {
			const res = await mutateAsync({ userId: data?.Review?.user?.id });
			res.ToggleFollow?.isFollowing && setIsFollowing(res.ToggleFollow.isFollowing);
		} else {
			Burnt.toast({ title: 'User ID not found 🥲' });
		}
	};

	useEffect(() => {
		if (data?.Review?.user) {
			data?.Review?.user?.isFollowing && setIsFollowing(data?.Review?.user?.isFollowing);
		}
	}, [data]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					title: 'Review',
					headerShown: true,
					header: (props) => (
						<ReviewHeader {...props} shareLink={data?.Review?.siteUrl ?? undefined} />
					),
				}}
			/>
			<LongScrollView style={{ flex: 1 }} scrollToTopIconTop={5} nestedScrollEnabled>
				<MediaBanner
					urls={[
						data?.Review?.media?.bannerImage ??
							data?.Review?.media?.coverImage?.extraLarge ??
							'',
					]}
				/>
				<View style={{ marginVertical: 80 }}>
					<View style={{ alignItems: 'center' }}>
						<Avatar.Image
							size={100}
							source={{ uri: data?.Review?.user?.avatar?.large ?? undefined }}
						/>
						<Text variant={'titleLarge'} style={{ paddingVertical: 12 }}>
							{data?.Review?.user?.name}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-evenly',
						}}
					>
						<Button
							icon="account"
							mode="elevated"
							onPress={() => openWebBrowser(data?.Review?.user?.siteUrl)}
						>
							View Profile
						</Button>
						<Button
							onPress={onFollowPress}
							icon={isFollowing ? 'minus' : 'plus'}
							mode="elevated"
							disabled={!isAuthed}
						>
							{isFollowing ? 'Unfollow' : 'Follow'}
						</Button>
					</View>
				</View>
				<Divider style={{ marginHorizontal: 20 }} />
				<View style={{ paddingHorizontal: 10 }}>
					<AniListMarkdownViewer
						body={data?.Review?.htmlBody}
						parentWidth={width - 20} // sub padding
					/>
				</View>
				{data?.Review?.score && (
					<Score
						reviewId={id}
						score={data?.Review?.score}
						ratingAmount={data?.Review?.ratingAmount ?? undefined}
						rating={data?.Review?.rating ?? undefined}
					/>
				)}
			</LongScrollView>
		</View>
	);
};

export default ReviewPage;
