import {
	AniMediaQuery,
	AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge,
	ReviewsQuery,
	ReviewsQuery_Page_Page_reviews_Review,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { DimensionValue, View } from 'react-native';
import { Pressable } from 'react-native';
import { Avatar, Icon, Surface, Text } from 'react-native-paper';

type ReviewItemProps = {
	backgroundColor?: string;
	iconColor?: string;
	maxWidth?: DimensionValue;
	marginVertical?: number;
	item:
		| NonNullable<NonNullable<NonNullable<AniMediaQuery['Media']>['reviews']>['edges']>[0]
		| NonNullable<NonNullable<ReviewsQuery['Page']>['reviews']>[0];
	index: number;
	openSheet: (
		data:
			| NonNullable<
					NonNullable<
						NonNullable<NonNullable<AniMediaQuery['Media']>['reviews']>['edges']
					>[0]
			  >['node']
			| NonNullable<NonNullable<ReviewsQuery['Page']>['reviews']>[0],
	) => void;
};
export const ReviewItem = ({
	item,
	iconColor,
	openSheet,
	maxWidth = 320,
	marginVertical = 0,
}: ReviewItemProps) => {
	const { colors } = useAppTheme();
	const review =
		(item as AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge['node']) ??
		(item as ReviewsQuery_Page_Page_reviews_Review);
	return (
		<Surface
			style={{
				maxHeight: 150,
				maxWidth: maxWidth,
				borderRadius: 8,
				marginRight: 8,
				marginVertical: marginVertical,
				overflow: 'hidden',
			}}
		>
			<Pressable
				onPress={() => router.navigate(`/reviews/full/${review?.id}`)}
				onLongPress={
					() => openSheet(review)
					// SheetManager.show('ReviewOverviewSheet', { payload: { data: review } })
				}
				android_ripple={{ foreground: true, borderless: false, color: colors.primary }}
				style={{
					// backgroundColor: backgroundColor,
					paddingHorizontal: 10,
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ paddingVertical: 15 }}>
						<Avatar.Image
							source={{ uri: review?.user?.avatar?.large ?? undefined }}
							size={68}
						/>
					</View>
					<Text
						style={{
							flexShrink: 1,
							paddingVertical: 10,
							paddingHorizontal: 10,
						}}
					>
						{review.summary}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingBottom: 5,
						paddingRight: 5,
					}}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
						<Icon source="account" color={iconColor} size={undefined} />
						<Text style={{ textAlign: 'right' }}> {review?.user?.name}</Text>
					</View>
					<View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
						<Icon source="thumb-up" color={iconColor} size={undefined} />
						<Text style={{ textAlign: 'right' }}> {review?.rating}</Text>
					</View>
				</View>
			</Pressable>
		</Surface>
	);
};
