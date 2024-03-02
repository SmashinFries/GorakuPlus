import { AniMediaQuery, ReviewsQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';
import { DimensionValue, View } from 'react-native';
import { Pressable } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ReviewItemProps = {
    textColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    maxWidth?: DimensionValue;
    marginVertical?: number;
    item: AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0];
    index: number;
};
export const ReviewItem = ({
	item,
	iconColor,
	backgroundColor,
	maxWidth = 320,
	marginVertical = 0,
}: ReviewItemProps) => {
	const review =
        (item as AniMediaQuery['Media']['reviews']['edges'][0])?.node ??
        (item as ReviewsQuery['Page']['reviews'][0]);
	return (
		<Pressable
			onPress={() => router.push(`/reviews/full/${review?.id}`)}
			style={{
				marginHorizontal: 10,
				marginVertical: marginVertical,
				maxWidth: maxWidth,
				maxHeight: 150,
				borderRadius: 12,
				backgroundColor: backgroundColor,
				paddingHorizontal: 10,
				borderColor: 'green',
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ paddingVertical: 15 }}>
					<Avatar.Image source={{ uri: review?.user?.avatar?.large }} size={68} />
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
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcon
						name="account"
						color={iconColor}
						style={{ marginRight: 10 }}
					/>
					<Text style={{ textAlign: 'right' }}>{review?.user?.name}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcon
						name="thumb-up"
						color={iconColor}
						style={{ marginRight: 10 }}
					/>
					<Text style={{ textAlign: 'right' }}>{review?.rating}</Text>
				</View>
			</View>
		</Pressable>
	);
};
