import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { QuickSelector } from '@/components/media/quickSelect';
import { memo, useState } from 'react';
import { MediaTitleView } from '@/components/media/text';
import { Portal } from 'react-native-paper';
import { router } from 'expo-router';
import use3dPan from '@/hooks/animations/use3dPan';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { ImageViewer } from '@/components/imageViewer';
import { AniMediaQuery, MediaStatus, MediaType } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

type FrontCoverProps = {
	data: AniMediaQuery['Media'];
	defaultTitle: 'romaji' | 'english' | 'native';
	toggleEP?: () => void;
};
const LeftIcons = ({ data }: { data: AniMediaQuery['Media'] }) => (
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
				(data?.status !== MediaStatus.Releasing && data?.status !== MediaStatus.Finished)
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
);

const RightIcons = ({ data }: { data: AniMediaQuery['Media'] }) => (
	<Animated.View
		style={{
			flex: 1,
			justifyContent: 'space-evenly',
			width: '100%',
		}}
	>
		<QuickSelector
			icon={'badge-account-outline'}
			disabled={(data?.staff?.edges?.length ?? 0) < 1}
			onPress={() =>
				router.push({
					pathname: '/staff/staffList',
					params: { mediaId: data?.id },
				})
			}
		/>
		<QuickSelector
			icon={'account-group-outline'}
			disabled={(data?.characters?.edges?.length ?? 0) < 1}
			onPress={() =>
				router.navigate({
					pathname: '/character/characterList',
					params: { mediaId: data?.id },
				})
			}
		/>
	</Animated.View>
);

const CoverImage = ({
	data,
	animatedStyle,
	panGesture,
	setImageViewerVisible,
}: {
	data: AniMediaQuery['Media'];
	animatedStyle: AnimatedStyle<any>;
	panGesture: ReturnType<typeof use3dPan>['panGesture'];
	setImageViewerVisible: (visible: boolean) => void;
}) => {
	const { colors } = useAppTheme();
	return (
		<Animated.View>
			<Pressable onPress={() => setImageViewerVisible(true)}>
				<GestureDetector gesture={panGesture}>
					<Animated.Image
						style={[
							animatedStyle,
							styles.coverImg,
							{ backgroundColor: colors.onSurfaceVariant },
						]}
						resizeMode={'cover'}
						source={{ uri: data?.coverImage?.extraLarge ?? undefined }}
					/>
				</GestureDetector>
			</Pressable>
		</Animated.View>
	);
};

export const FrontCover = ({ data, defaultTitle }: FrontCoverProps) => {
	// const { width } = useWindowDimensions();
	const { animatedStyle, panGesture } = use3dPan({ xLimit: [-25, 25], yLimit: [-25, 25] });
	const [imageViewerVisible, setImageViewerVisible] = useState(false);

	const allBanners = [
		data?.bannerImage ?? null,
		...(data?.relations?.edges?.map((relation) => relation?.node?.bannerImage ?? null) || []),
	];

	return (
		<View style={[styles.container, { width: '100%' }]}>
			<View
				style={{
					flex: 1,
					width: '100%',
					justifyContent: 'space-evenly',
					flexDirection: 'row',
				}}
			>
				<LeftIcons data={data} />
				<CoverImage
					data={data}
					animatedStyle={animatedStyle}
					panGesture={panGesture}
					setImageViewerVisible={setImageViewerVisible}
				/>
				<RightIcons data={data} />
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
