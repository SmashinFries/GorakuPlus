import { useRef, useState } from 'react';
import { ActivityIndicator, Button, Card, Icon, Text } from 'react-native-paper';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { Anilist, Result } from '@/api/tracemoe/models';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { saveImage } from '@/utils/images';
import { useShallow } from 'zustand/react/shallow';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { AnimViewMem } from '../animations';

type ImageSearchItemProps = {
	item: Result;
};
export const ImageSearchItem = ({ item }: ImageSearchItemProps) => {
	const player = useVideoPlayer(item.video, (player) => {
		player.loop = true;
		player.muted = true;
	});
	const { roundness } = useAppTheme();
	const { mediaLanguage, showNSFW } = useSettingsStore(
		useShallow((state) => ({
			mediaLanguage: state.mediaLanguage,
			showNSFW: state.showNSFW,
		})),
	);
	const { width } = useWindowDimensions();
	const anilist = item.anilist as Anilist;
	const similarity = item.similarity * 100;

	const { status } = useEvent(player, 'statusChange', { status: player.status });
	const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

	const onView = () => {
		router.back();
		router.navigate(`/anime/${anilist.id}`);
		// SheetManager.hideAll();
	};

	if (!showNSFW && anilist.isAdult) return null;

	return (
		<View
			style={{
				width: '100%',
				alignItems: 'center',
				marginVertical: 15,
				borderRadius: 12,
			}}
		>
			{/* <Image source={{ uri: item.image }} style={[{ height: 200, width: width }]} /> */}
			<Card mode="elevated" style={{ width: width - 20 }}>
				{/* <Card.Cover source={{ uri: item.image }} /> */}
				<View style={{ height: 180, overflow: 'hidden', borderRadius: roundness * 3 }}>
					<VideoView
						player={player}
						style={{
							// flex: 1,
							height: '100%',
							width: undefined,
							padding: 16,
							justifyContent: 'flex-end',
							borderRadius: roundness * 3,
						}}
						nativeControls={false}
						contentFit="cover"
					/>
					<Pressable
						style={{ position: 'absolute', width: '100%', height: '100%' }}
						onPress={() => {
							if (status === 'readyToPlay') {
								if (isPlaying) {
									player.pause();
								} else {
									player.play();
								}
							}
						}}
					/>
					{status === 'loading' && (
						<AnimViewMem
							style={{
								position: 'absolute',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								height: '100%',
							}}
						>
							<ActivityIndicator />
						</AnimViewMem>
					)}
				</View>
				<Card.Title
					title={anilist.title[mediaLanguage ?? 'romaji']}
					right={(props) =>
						similarity >= 90 && (
							<View style={{ paddingRight: 8 }}>
								<Icon {...props} source={'check-circle-outline'} color="green" />
							</View>
						)
					}
				/>
				<Card.Content>
					<View
						style={
							{
								// flexDirection: 'row',
								// alignItems: 'center',
							}
						}
					>
						<Text variant="labelSmall">Similarity: ~{similarity.toFixed(2)} %</Text>
						{item.episode ? <Text variant="labelSmall">EP: {item.episode}</Text> : null}
						{/* <View style={{ alignItems: 'flex-end' }}>
							<Chip
								style={{
									borderColor:
										similarity >= 95
											? 'green'
											: similarity < 95 && similarity >= 90
												? 'yellow'
												: 'red',
									borderWidth: 1,
								}}
							>
								~{similarity.toFixed(2)} %
							</Chip>
						</View> */}
					</View>
				</Card.Content>
				<Card.Actions>
					<Button
						icon={'download-outline'}
						onPress={() => saveImage(item.video + '&size=l', null, 'mp4')}
					>
						Clip
					</Button>
					<Button onPress={onView} disabled={!anilist.id}>
						View
					</Button>
				</Card.Actions>
			</Card>
		</View>
	);
};
