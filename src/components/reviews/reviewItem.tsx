import {
	AniMediaQuery,
	AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review,
	ReviewsQuery,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { router } from 'expo-router';
import { DimensionValue, View } from 'react-native';
import { Pressable } from 'react-native';
import { Avatar, Icon, Surface, Text } from 'react-native-paper';

type ReviewItemProps = {
	backgroundColor?: string;
	iconColor?: string;
	width?: DimensionValue;
	marginVertical?: number;
	item:
		| AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review
		| null
		| undefined;
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
	width = 320,
	marginVertical = 0,
}: ReviewItemProps) => {
	const { colors } = useAppTheme();
	return (
		<Surface
			style={{
				width: width,
				height: 150,
				borderRadius: 8,
				// marginRight: 8,
				marginVertical: marginVertical,
				overflow: 'hidden',
			}}
		>
			<Pressable
				onPress={() => router.navigate(`/reviews/full/${item?.id}`)}
				onLongPress={
					() => openSheet(item)
					// SheetManager.show('ReviewOverviewSheet', { payload: { data: review } })
				}
				android_ripple={{ foreground: true, borderless: false, color: colors.primary }}
				style={{
					flex: 1,
					// backgroundColor: backgroundColor,
					paddingHorizontal: 10,
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ paddingVertical: 15 }}>
						<Avatar.Image
							source={{ uri: item?.user?.avatar?.large ?? undefined }}
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
						{item?.summary}
					</Text>
				</View>
				<View style={{ justifyContent: 'flex-end', paddingTop: 6, flex: 1 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingBottom: 5,
							paddingRight: 5,
						}}
					>
						<View
							style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
						>
							<Icon source="account" color={iconColor} size={12} />
							<Text style={{ textAlign: 'right' }}> {item?.user?.name}</Text>
						</View>
						<View
							style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}
						>
							<Icon source="thumb-up" color={iconColor} size={12} />
							<Text style={{ textAlign: 'right' }}> {item?.rating}</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</Surface>
	);
};
