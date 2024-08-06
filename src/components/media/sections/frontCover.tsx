import { AniMediaQuery, MediaStatus, MediaType } from '@/store/services/anilist/generated-anilist';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { QuickSelector } from '@/components/media/quickSelect';
import { memo, useCallback, useEffect, useState } from 'react';
import { MediaTitleView } from '@/components/media/text';
import { Portal, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import use3dPan from '@/hooks/animations/use3dPan';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useAppSelector } from '@/store/hooks';
import { ImageViewer } from '@/components/imageViewer';

type FrontCoverProps = {
	data: AniMediaQuery['Media'];
	defaultTitle: 'romaji' | 'english' | 'native';
	toggleEP?: () => void;
};
export const FrontCover = ({ data, defaultTitle }: FrontCoverProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const { animatedStyle, panGesture } = use3dPan({ xLimit: [-25, 25], yLimit: [-25, 25] });
	const [imageViewerVisible, setImageViewerVisible] = useState(false);

	const allBanners = data?.relations?.edges
		? [data?.bannerImage ?? null].concat(
				data?.relations?.edges?.map((relation) => relation.node?.bannerImage ?? null),
			)
		: [data?.bannerImage ?? null];

	return (
		<Animated.View style={[styles.container, { width: width }]}>
			<Animated.View
				style={{
					flex: 1,
					width: '100%',
					justifyContent: 'space-evenly',
					flexDirection: 'row',
				}}
			>
				{/* Left Icons */}
				<Animated.View
					style={{
						justifyContent: 'space-evenly',
						width: '100%',
						flex: 1,
					}}
				>
					<QuickSelector
						onPress={() => {
							router.push(`/music/${data?.id}`);
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
							router.push(`/news/${data?.type}/${data?.idMal}`);
						}}
						disabled={!data?.idMal}
					/>
				</Animated.View>

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
						onPress={() => router.push(`/staff/${data?.id}`)}
					/>
					<QuickSelector
						icon={'account-group-outline'}
						disabled={data?.characters?.edges?.length < 1}
						onPress={() => router.push(`/characters/${data?.type}/${data?.id}`)}
						// onPress={() =>
						//     nav.navigate('characterStack', {
						//         screen: 'characterList',
						//         params: { mediaId: data?.id },
						//         initial: false,
						//     })
						// }
					/>
				</Animated.View>
			</Animated.View>
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
		</Animated.View>
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
