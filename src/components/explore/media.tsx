import React, { memo, useCallback } from 'react';
import { MD3DarkTheme, Text } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Media, MediaType } from '@/api/anilist/__genereated__/gql';

const IMAGE_BORDER_RADIUS = 12;

type MediaItemProps = {
	item: Media;
	width?: number;
	height?: number;
	navigate?: (aniID: number, malID: number, type: MediaType) => void;
};
export const MediaItem = ({ item, width, height, navigate }: MediaItemProps) => {
	// const { colors } = useTheme();

	// const showBanner = useMemo(
	//     () => (AIRING_BANNER_BANS.includes(item.status) ? false : true),
	//     [item.status],
	// );
	// const itemScore = useMemo(
	//     () =>
	//         defaultScore === 'average' ? item.averageScore : item.meanScore ?? item.averageScore,
	//     [defaultScore],
	// );
	// const scoreColor = useMemo(
	//     () => getScoreColor(itemScore ?? 0, scoreColors),
	//     [itemScore, scoreColors],
	// );

	// const scorebgColor = useMemo(
	//     () => rgbToRgba(colors.primaryContainer, 0.75),
	//     [colors.primaryContainer],
	// );

	const onPress = useCallback(
		() => navigate(item.id, item.idMal, item.type),
		[item.id, item.idMal, item.type],
	);

	return (
		<Pressable
			onPress={navigate && onPress}
			style={[
				MediaStyles.container,
				{
					borderRadius: IMAGE_BORDER_RADIUS,
					width: width ?? MediaStyles.imgSize.width,
					height: height ?? MediaStyles.imgSize.height,
				},
			]}
		>
			<View style={[MediaStyles.imgSize, MediaStyles.innerContainer]}>
				<Image
					source={{ uri: item.coverImage?.large ?? undefined }}
					style={[
						{
							width: width ?? MediaStyles.imgSize.width,
							height: height ?? MediaStyles.imgSize.height,
							borderRadius: IMAGE_BORDER_RADIUS,
							// backgroundColor: colors.onSurfaceVariant,
							backgroundColor: MD3DarkTheme.colors.onSurfaceVariant,
						},
					]}
					contentFit="cover"
					cachePolicy="memory-disk"
				/>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: '#000',
						borderRadius: IMAGE_BORDER_RADIUS,
					}}
				/>
				<LinearGradient
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						borderRadius: IMAGE_BORDER_RADIUS,
					}}
					colors={['transparent', 'black']}
				/>
				{/* {itemScore && (scoreNumber || scoreHealthBar) ? (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '45%',
                            padding: 3,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            borderBottomLeftRadius: IMAGE_BORDER_RADIUS,
                            borderTopRightRadius: IMAGE_BORDER_RADIUS,
                            backgroundColor: scorebgColor,
                            flexDirection: 'row',
                        }}
                    >
                        {scoreHealthBar ? (
                            <ScoreHealthBar
                                score={itemScore}
                                scoreColors={scoreColors}
                                showScore={scoreNumber}
                                textColor={colors.onPrimaryContainer}
                                heartColor={colors.onPrimaryContainer}
                            />
                        ) : (
                            <ScoreIconText
                                showScore={scoreNumber}
                                score={itemScore}
                                scoreColors={scoreColors}
                                textColor={colors.onPrimaryContainer}
                            />
                        )}
                    </View>
                ) : null} */}
				<Text
					variant="titleSmall"
					style={{
						position: 'absolute',
						alignSelf: 'center',
						textAlign: 'center',
						// bottom:
						//     (item?.nextAiringEpisode || item?.startDate) &&
						//     showBanner &&
						//     item?.type !== MediaType.Manga
						//         ? '15%'
						//         : 5,
						fontWeight: 'bold',
						color: 'white',
						padding: 5,
					}}
					numberOfLines={2}
				>
					{item.title['english'] ?? item.title.userPreferred}
				</Text>
				{/* {item.type === MediaType.Anime && showBanner ? (
                    <AiringBannerMemo
                        nextEpisode={item?.nextAiringEpisode}
                        format={item?.format}
                        startDate={item?.startDate}
                        // containerColor={colors.primary}
                        containerColor={MD3DarkTheme.colors.primary}
                        // textColor={colors.onPrimary}
                        textColor={MD3DarkTheme.colors.onPrimary}
                    />
                ) : null} */}
			</View>
		</Pressable>
	);
};

export const MediaItemMem = memo(MediaItem);

type RenderMediaItemProps = {
	item: Media;
	index: number;
	delay?: boolean;
	navigate?: (aniID: number, malID: number, type: MediaType) => void;
};
export const RenderMediaItem = ({ item, index, navigate, delay = true }: RenderMediaItemProps) => {
	// const { colors } = useTheme();
	// const { showItemListStatus } = useAppSelector((state) => state.persistedSettings);
	// const MediaItemMemo = memo(MediaItem);
	// const progress = useMemo(
	//     () => item.mediaListEntry?.progress ?? item.mediaListEntry?.progressVolumes ?? 0,
	//     [item.mediaListEntry?.progress, item.mediaListEntry?.progressVolumes],
	// );
	// const total = useMemo(
	//     () => item.episodes ?? item.chapters ?? item.volumes ?? 1,
	//     [item.episodes, item.chapters, item.volumes],
	// );
	// const isIndeterminate = useCallback((): boolean => {
	//     if (
	//         item.mediaListEntry?.status === 'CURRENT' &&
	//         item.status !== MediaStatus.NotYetReleased
	//     ) {
	//         if (item.type === 'ANIME' && item.episodes) {
	//             return false;
	//         }
	//         if (item.type === 'MANGA' && item.format !== 'NOVEL' && item.chapters) {
	//             return false;
	//         }
	//         if (item.type === 'MANGA' && item.format === 'NOVEL' && item.volumes) {
	//             return false;
	//         }
	//         return true;
	//     } else {
	//         return false;
	//     }
	// }, [item.mediaListEntry?.status, item.type, item.format]);

	// const getProgress = useCallback(() => {
	//     if (item.mediaListEntry?.status === 'CURRENT') {
	//         return progress / total;
	//     } else {
	//         return 1;
	//     }
	// }, [item.mediaListEntry?.status]);

	return (
		// <AnimatePresence>
		// <Tooltip
		// title={showItemListStatus ? 'true' : 'false'}
		//     title={`Status: ${
		//         item.mediaListEntry?.status ?? 'None'
		//     } | Progress: ${progress}/${total}`}
		// >
		<View
			key={index}
			// from={{ opacity: 0, scale: 0 }}
			// animate={{
			// 	opacity: 1,
			// 	scale: 1,
			// }}
			// transition={{ type: 'spring', damping: 15 }}
			// exit={{ opacity: 0, scale: 0 }}
			// delay={delay && index * 50}
			style={{ flex: 1, maxHeight: 280, marginHorizontal: 10 }}
		>
			<MediaItem
				key={index}
				item={item}
				navigate={navigate}
				// navigation={navigation}
				// baseOptions={getBaseOptions()}
			/>
			{/* {item.mediaListEntry ? (
                <View
                    style={[
                        {
                            width: MediaStyles.imgSize.width,
                            paddingVertical: 10,
                        },
                    ]}
                >
                    <ProgressBar
                        progress={getProgress()}
                        style={{
                            width: '90%',
                            alignSelf: 'center',
                            height: 8,
                            borderRadius: 4,
                            display: item.mediaListEntry ? undefined : 'none',
                        }}
                        // color={getScoreColor(item.averageScore)}
                        indeterminate={isIndeterminate()}
                        color={
                            item.mediaListEntry?.status
                                ? listColor(item.mediaListEntry?.status)
                                : undefined
                        }
                    />
                    {showItemListStatus ? (
                        <Text
                            style={{
                                textAlign: 'center',
                                color: colors.onSurfaceVariant,
                                textTransform: 'capitalize',
                            }}
                            variant="labelLarge"
                        >
                            {item.mediaListEntry?.status}
                            {item.mediaListEntry?.progress && item.status !== MediaStatus.Finished
                                ? ' · ' +
                                  item.mediaListEntry?.progress +
                                  '/' +
                                  (item.episodes ?? '??')
                                : null}
                        </Text>
                    ) : null}
                </View>
            ) : null} */}
		</View>
		// </Tooltip>
		// </AnimatePresence>
	);
};

const MediaStyles = StyleSheet.create({
	container: {
		borderRadius: IMAGE_BORDER_RADIUS,
	},
	innerContainer: {
		borderRadius: IMAGE_BORDER_RADIUS,
		justifyContent: 'center',
	},
	imgSize: {
		height: 230,
		width: 150,
	},
});
