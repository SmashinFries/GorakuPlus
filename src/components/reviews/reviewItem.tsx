import { AniMediaQuery, ReviewsQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { DimensionValue, View } from 'react-native';
import { Pressable } from 'react-native';
import { Avatar, Icon, Surface, Text } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ReviewItemProps = {
	backgroundColor?: string;
	iconColor?: string;
	maxWidth?: DimensionValue;
	marginVertical?: number;
	item: AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0];
	onLongPress: (
		data: AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0],
	) => void;
	index: number;
};
export const ReviewItem = ({
	item,
	iconColor,
	backgroundColor,
	onLongPress,
	maxWidth = 320,
	marginVertical = 0,
}: ReviewItemProps) => {
	const { colors } = useAppTheme();
	const review =
		(item as AniMediaQuery['Media']['reviews']['edges'][0])?.node ??
		(item as ReviewsQuery['Page']['reviews'][0]);
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
				onLongPress={() => onLongPress(review)}
				android_ripple={{ foreground: true, borderless: false, color: colors.primary }}
				style={{
					// backgroundColor: backgroundColor,
					paddingHorizontal: 10,
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
					<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
						<Icon source="account" color={iconColor} />
						<Text style={{ textAlign: 'right' }}> {review?.user?.name}</Text>
					</View>
					<View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
						<Icon source="thumb-up" color={iconColor} />
						<Text style={{ textAlign: 'right' }}> {review?.rating}</Text>
					</View>
				</View>
			</Pressable>
		</Surface>
	);
};
