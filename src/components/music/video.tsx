import { AppState, StyleSheet } from 'react-native';
import { RefObject, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, IconButton, Menu, ProgressBar, Text } from 'react-native-paper';
import { SongMeta } from './meta';
import { VideoControls } from './controls';
import { AccordionMemo } from '../animations';
import { openWebBrowser } from '@/utils/webBrowser';
import { AnimeThemesIcon } from '../svgs';
import { Animetheme } from '@/api/animethemes/types';
import { useAppTheme } from '@/store/theme/themes';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

type MusicVideoProps = {
	theme: Animetheme;
	anime_slug: string;
	initialOpen?: boolean;
};
export const MusicVideo = ({ theme }: MusicVideoProps) => {
	const player = useVideoPlayer(theme?.animethemeentries[0].videos[0]?.link);
	const { status } = useEvent(player, 'statusChange', { status: player.status });

	if (AppState.currentState !== 'active') {
		return null;
	}

	return (
		<View style={[styles.container]}>
			<View style={[styles.player, { justifyContent: 'center', alignItems: 'center' }]}>
				<VideoView player={player} style={styles.player} contentFit="contain" />
				{/* <Video
					ref={vidRef}
					style={styles.player}
					source={{
						uri: theme?.animethemeentries[0].videos[0]?.link,
					}}
					onPlaybackStatusUpdate={(status) => setStatus(() => status)}
					resizeMode={ResizeMode.CONTAIN}
				/> */}
				{status === 'loading' && (
					<ActivityIndicator style={{ position: 'absolute', alignSelf: 'center' }} />
				)}
			</View>
			<SongMeta data={theme} />
			<VideoControls player={player} status={status} />
		</View>
	);
};

const FullscreenVideo = ({
	video_url,
	videoRef,
	onLoading,
	onExit,
}: {
	videoRef: RefObject<VideoView>;
	video_url: string;
	onLoading: (isLoading: boolean) => void;
	onExit: () => void;
}) => {
	const player = useVideoPlayer(video_url);

	const { status } = useEvent(player, 'statusChange', { status: player.status });

	// const onFullscreenUpdate = async ({ fullscreenUpdate }: VideoFullscreenUpdateEvent) => {
	// 	if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
	// 		// await ScreenOrientation.unlockAsync();
	// 		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	// 	} else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
	// 		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	// 	} else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
	// 		onExit();
	// 	}
	// };

	// useEffect(() => {
	// 	vidRef?.current
	// }, []);

	useEffect(() => {
		onLoading(status !== 'readyToPlay');
		if (status === 'readyToPlay') {
			videoRef.current?.enterFullscreen();
		}
	}, [status]);

	return (
		<>
			{/* <IconButton
				onPress={() => {
					videoRef.current?.enterFullscreen();
				}}
				icon={'video-outline'}
				loading={status === 'loading'}
			/> */}
			<VideoView
				ref={videoRef}
				player={player}
				style={{ display: 'none', width: 0, height: 0 }}
				allowsFullscreen
				contentFit="contain"
				onFullscreenExit={onExit}
			/>
			{/* <Video
				ref={vidRef}
				style={{ width: 0, height: 0 }}
				source={{
					uri: video_url,
				}}
				onFullscreenUpdate={onFullscreenUpdate}
				onLoad={() => {
					onDoneLoading();
				}}
				onPlaybackStatusUpdate={(status) => onStatus(status)}
				resizeMode={ResizeMode.CONTAIN}
			/> */}
		</>
	);
};

const secToMinString = (seconds: number) =>
	`${Math.floor(Math.round(seconds) / 60)
		.toFixed(0)
		.padStart(2, '0')}:${(Math.round(seconds) % 60).toFixed(0).padStart(2, '0')}`;

const MusicItemBody = ({
	audio_url,
	links,
	isVidLoading,
	setShowVideo,
}: {
	audio_url: string;
	links: { spotify: string; animethemes: string };
	isVidLoading: boolean;
	setShowVideo: (show: boolean) => void;
}) => {
	const audioPlayer = useAudioPlayer(audio_url);
	const audioStatus = useAudioPlayerStatus(audioPlayer);

	const [showMore, setShowMore] = useState<boolean>(false);

	const toggleAudioPlay = () => {
		if (!audioStatus.isLoaded) return;

		if (audioStatus.playing) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};

	const seek5Seconds = (direction: 'forward' | 'back') => {
		if (audioStatus.isLoaded) {
			if (direction === 'forward') {
				audioPlayer.seekTo(
					audioStatus.currentTime + 5 <= audioStatus.duration
						? audioStatus.currentTime + 5
						: audioStatus.duration,
				);
			} else {
				audioPlayer.seekTo(
					audioStatus.currentTime - 5 >= 0 ? audioStatus.currentTime - 5 : 0,
				);
			}
		}
	};

	return (
		<>
			<ProgressBar
				animatedValue={
					audioStatus.isLoaded ? audioStatus.currentTime / audioStatus.duration : 0
				}
				style={{ marginHorizontal: 20, borderRadius: 12 }}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 20,
					paddingVertical: 6,
				}}
			>
				<Text>{secToMinString(Math.max(audioStatus.currentTime))}</Text>
				<Text>{secToMinString(Math.max(audioStatus.duration))}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				<IconButton
					onPress={() => {
						setShowVideo(true);
					}}
					loading={isVidLoading}
					icon={'video-outline'}
				/>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<IconButton
						disabled={audioPlayer.currentTime === 0}
						onPress={() => seek5Seconds('back')}
						onLongPress={() => {
							audioPlayer.seekTo(-audioStatus.currentTime);
						}}
						icon={'step-backward'}
					/>
					<IconButton
						onPress={toggleAudioPlay}
						icon={audioStatus.playing ? 'pause' : 'play'}
						size={36}
						loading={!audioStatus.isLoaded}
					/>
					<IconButton
						onPress={() => seek5Seconds('forward')}
						icon={'step-forward'}
						disabled={audioStatus.currentTime === audioPlayer.duration}
					/>
				</View>
				<Menu
					visible={showMore}
					onDismiss={() => setShowMore(false)}
					anchor={<IconButton onPress={() => setShowMore(true)} icon={'dots-vertical'} />}
					// anchorPosition="top"
				>
					<Menu.Item
						onPress={() => openWebBrowser(links.animethemes)}
						title="AnimeThemes"
						leadingIcon={(props) => (
							<AnimeThemesIcon
								fill={props.color}
								height={props.size}
								width={props.size}
							/>
						)}
					/>
					<Menu.Item
						onPress={() => openWebBrowser(links.spotify, true)}
						leadingIcon={'spotify'}
						title="Spotify"
					/>
				</Menu>
			</View>
		</>
	);
};

export const MusicItem = ({ theme, anime_slug, initialOpen }: MusicVideoProps) => {
	const { colors } = useAppTheme();
	const audioPlayer = useAudioPlayer(theme?.animethemeentries[0].videos[0]?.audio?.link);
	const audioStatus = useAudioPlayerStatus(audioPlayer);

	const videoRef = useRef<VideoView>(null);

	const [showMore, setShowMore] = useState<boolean>(false);

	const [isVidLoading, setIsVidLoading] = useState<boolean>(false);
	const [showVideo, setShowVideo] = useState<boolean>(false);

	const toggleAudioPlay = () => {
		if (!audioStatus.isLoaded) return;

		if (audioStatus.playing) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};

	const seek5Seconds = (direction: 'forward' | 'back') => {
		if (audioStatus.isLoaded) {
			if (direction === 'forward') {
				audioPlayer.seekTo(
					audioStatus.currentTime + 5 <= audioStatus.duration
						? audioStatus.currentTime + 5
						: audioStatus.duration,
				);
			} else {
				audioPlayer.seekTo(
					audioStatus.currentTime - 5 >= 0 ? audioStatus.currentTime - 5 : 0,
				);
			}
		}
	};

	return (
		<>
			{showVideo && (
				<FullscreenVideo
					videoRef={videoRef}
					video_url={theme.animethemeentries[0]?.videos[0]?.link}
					onLoading={(isLoading) => setIsVidLoading(isLoading)}
					onExit={() => {
						setIsVidLoading(false);
						setShowVideo(false);
					}}
				/>
			)}
			<AccordionMemo
				title={theme.song.title}
				titleStyle={{ color: colors.primary }}
				// titleFontSize={18}
				description={`${theme.song.artists[0]?.name ?? 'unknown'}`}
				left={
					<Text
						style={{
							alignSelf: 'center',
							fontWeight: '900',
							paddingHorizontal: 5,
							paddingLeft: 10,
						}}
					>
						{theme.type}
						{theme.sequence ? ` ${theme?.sequence}` : ''}
					</Text>
				}
				initialExpand={initialOpen}
			>
				<MusicItemBody
					audio_url={theme?.animethemeentries[0].videos[0]?.audio?.link}
					links={{
						spotify: `https://open.spotify.com/search/${theme.song.title} ${theme.song.artists[0]?.name}`,
						animethemes: `https://animethemes.moe/anime/${anime_slug}/${theme.slug}`,
					}}
					isVidLoading={isVidLoading}
					setShowVideo={setShowVideo}
				/>
			</AccordionMemo>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'rgba(0,0,0,.35)',
		marginHorizontal: 15,
		borderRadius: 12,
		alignItems: 'center',
	},
	player: {
		height: 250,
		aspectRatio: 16 / 9,
		borderRadius: 12,
	},
});
