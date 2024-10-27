import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { QuickSelector } from '@/components/media/quickSelect';
import { memo, useState } from 'react';
import { MediaTitleView } from '@/components/media/text';
import { Portal } from 'react-native-paper';
import { router } from 'expo-router';
import use3dPan from '@/hooks/animations/use3dPan';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ImageViewer } from '@/components/imageViewer';
import { AniMediaQuery, MediaStatus, MediaType } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

type FrontCoverProps = {
	data: AniMediaQuery['Media'];
	defaultTitle: 'romaji' | 'english' | 'native';
	toggleEP?: () => void;
};
export const FrontCover = ({ data, defaultTitle }: FrontCoverProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useAppTheme();
	const { animatedStyle, panGesture } = use3dPan({ xLimit: [-25, 25], yLimit: [-25, 25] });
	const [imageViewerVisible, setImageViewerVisible] = useState(false);

	const allBanners = data?.relations?.edges
		? [data?.bannerImage ?? null].concat(
				data?.relations?.edges?.map((relation) => relation.node?.bannerImage ?? null),
			)
		: [data?.bannerImage ?? null];

	return (
		<View
			// exiting={RollOutLeft}
			style={[styles.container, { width: width }]}
		>
			<View
				style={{
					flex: 1,
					width: '100%',
					justifyContent: 'space-evenly',
					flexDirection: 'row',
				}}
			>
				{/* Left Icons */}
				<View
					style={{
						justifyContent: 'space-evenly',
						width: '100%',
						flex: 1,
					}}
				>
					<QuickSelector
						onPress={() => {
							router.navigate(`/music/${data?.id}`);
						}}
						disabled={
							data?.type !== MediaType.Anime ||
							(data?.status !== MediaStatus.Releasing &&
								data?.status !== MediaStatus.Finished)
						}
						icon="music-box-multiple-outline"
					/>
					<QuickSelector
						icon="newspaper"
						onPress={() => {
							router.navigate(`/news/${data?.type}/${data?.idMal}`);
						}}
						disabled={!data?.idMal}
					/>
				</View>

				{/* Cover Image */}
				<Animated.View>
					<Pressable onPress={() => setImageViewerVisible(true)}>
						<GestureDetector gesture={panGesture}>
							<Animated.Image
								style={[
									animatedStyle,
									styles.coverImg,
									{ backgroundColor: colors.onSurfaceVariant },
								]}
								// contentFit="cover"
								resizeMode={'cover'}
								source={{ uri: data?.coverImage?.extraLarge }}
							/>
						</GestureDetector>
					</Pressable>
					{/* {data?.status && <StatusAnim />} */}
				</Animated.View>

				{/* Right Icons */}
				<Animated.View
					style={{
						flex: 1,
						justifyContent: 'space-evenly',
						width: '100%',
					}}
				>
					<QuickSelector
						icon={'badge-account-outline'}
						disabled={data?.staff?.edges?.length < 1}
						onPress={() =>
							router.push({
								pathname: '/staff/staffList',
								params: { mediaId: data?.id },
							})
						}
					/>
					<QuickSelector
						icon={'account-group-outline'}
						disabled={data?.characters?.edges?.length < 1}
						onPress={() =>
							router.navigate({
								pathname: '/character/characterList',
								params: { mediaId: data?.id },
							})
						}
						// onPress={() =>
						//     nav.navigate('characterStack', {
						//         screen: 'characterList',
						//         params: { mediaId: data?.id },
						//         initial: false,
						//     })
						// }
					/>
				</Animated.View>
			</View>
			<MediaTitleView data={data} defaultTitle={defaultTitle} />
			<Portal>
				<ImageViewer
					visible={imageViewerVisible}
					onDismiss={() => setImageViewerVisible(false)}
					urls={[data?.coverImage?.extraLarge ?? null, ...allBanners].filter(
						(val) => val !== null,
					)}
				/>
			</Portal>
		</View>
	);
};

export const FrontCoverMem = memo(FrontCover);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 20,
		zIndex: 10,
		overflow: 'visible',
	},
	coverImg: {
		borderRadius: 12,
		height: 230,
		width: 155,
		alignSelf: 'center',
	},
	title: {
		flexWrap: 'wrap',
		marginTop: 10,
		textAlign: 'center',
	},
});
