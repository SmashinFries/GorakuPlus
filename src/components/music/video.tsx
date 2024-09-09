import { AppState, StyleSheet, useWindowDimensions } from 'react-native';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import {
	AVPlaybackStatus,
	ResizeMode,
	Video,
	Audio,
	VideoFullscreenUpdate,
	VideoFullscreenUpdateEvent,
} from 'expo-av';
import {
	ActivityIndicator,
	IconButton,
	Menu,
	ProgressBar,
	Text,
	useTheme,
} from 'react-native-paper';
import { SongMeta } from './meta';
import { VideoControls } from './controls';
import { Accordion } from '../animations';
import * as ScreenOrientation from 'expo-screen-orientation';
import { openWebBrowser } from '@/utils/webBrowser';
import { AnimeThemesIcon } from '../svgs';
import { Animetheme } from '@/api/animethemes/types';
import { AnimeVideos } from '@/api/jikan/models';
import { useAppTheme } from '@/store/theme/themes';

type MusicVideoProps = {
	theme: Animetheme;
	anime_slug: string;
	initialOpen?: boolean;
};
export const MusicVideo = ({ theme }: MusicVideoProps) => {
	const vidRef = useRef<Video>(null);
	const [status, setStatus] = useState<AVPlaybackStatus>();
	const [totalDuration, setTotalDuration] = useState<number>();
	const { width } = useWindowDimensions();

	useEffect(() => {
		if (status?.isLoaded && !totalDuration) {
			setTotalDuration(status?.durationMillis);
		}
	}, [status]);

	if (AppState.currentState !== 'active') {
		return null;
	}

	return (
		<View style={[styles.container]}>
			<View style={[styles.player, { justifyContent: 'center', alignItems: 'center' }]}>
				<Video
					ref={vidRef}
					style={styles.player}
					source={{
						uri: theme?.animethemeentries[0].videos[0]?.link,
					}}
					onPlaybackStatusUpdate={(status) => setStatus(() => status)}
					resizeMode={ResizeMode.CONTAIN}
				/>
				{!status?.isLoaded && (
					<ActivityIndicator style={{ position: 'absolute', alignSelf: 'center' }} />
				)}
			</View>
			{/* {video.resolution} */}
			{totalDuration && (
				<ProgressBar
					style={{ width }}
					animatedValue={status?.isLoaded && status?.positionMillis / totalDuration}
				/>
			)}
			<SongMeta data={theme} />
			<VideoControls status={status} vidRef={vidRef} />
		</View>
	);
};

const FullscreenVideo = ({
	vidRef,
	video_url,
	onStatus,
	onDoneLoading,
	onDismiss,
}: {
	vidRef: MutableRefObject<Video>;
	video_url: string;
	onStatus: (status: AVPlaybackStatus) => void;
	onDismiss: () => void;
	onDoneLoading: () => void;
}) => {
	const onExit = () => {
		vidRef?.current?.unloadAsync();
		onDismiss();
	};

	const onFullscreenUpdate = async ({ fullscreenUpdate }: VideoFullscreenUpdateEvent) => {
		if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
			// await ScreenOrientation.unlockAsync();
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
		} else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		} else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
			onExit();
		}
	};

	useEffect(() => {
		vidRef?.current?.presentFullscreenPlayer();
	}, []);

	return (
		<View>
			<Video
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
			/>
		</View>
	);
};

const secToMinString = (seconds: number) =>
	`${Math.floor(Math.round(seconds) / 60)
		.toFixed(0)
		.padStart(2, '0')}:${(Math.round(seconds) % 60).toFixed(0).padStart(2, '0')}`;

export const MusicItem = ({ theme, anime_slug, initialOpen }: MusicVideoProps) => {
	const { colors } = useAppTheme();
	const [sound, setSound] = useState<Audio.Sound>();
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totalDuration, setTotalDuration] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);

	const [playIconHeight, setPlayIconHeight] = useState<number>(0);

	const [showMore, setShowMore] = useState<boolean>(false);

	// Video
	const vidRef = useRef<Video>(null);
	const [vidLoading, setVidLoading] = useState<boolean>(false);
	const [vidStatus, setVidStatus] = useState<AVPlaybackStatus>();
	const [showVideo, setShowVideo] = useState<boolean>(false);

	const _onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
		if (!playbackStatus.isLoaded) {
			setProgress(0);
		} else {
			// Update your UI for the loaded state
			setTotalDuration(playbackStatus.durationMillis);
			setProgress(playbackStatus.positionMillis);
			if (playbackStatus.isPlaying) {
				// Update your UI for the playing state
				setIsPlaying(true);
			} else {
				setIsPlaying(false);
				// Update your UI for the paused state
			}

			if (playbackStatus.isBuffering) {
				// setIsLoading(true);
				// Update your UI for the buffering state
			} else {
				// setIsLoading(false);
			}

			if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
				setIsPlaying(false);
				// The player has just finished playing and will stop. Maybe you want to play something else?
			}
		}
	};

	const playSong = async () => {
		if (sound && sound._loaded) {
			setIsPlaying(true);
			if (progress === totalDuration) {
				await sound.replayAsync();
			} else {
				await sound.playAsync();
			}
		} else {
			setIsLoading(true);
			const song = await Audio.Sound.createAsync({
				uri: theme?.animethemeentries[0].videos[0]?.audio?.link,
			});
			setIsLoading(false);
			song.sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
			if (song.status.isLoaded) {
				setTotalDuration(song.status.durationMillis);
			}
			setSound(song.sound);
			setIsPlaying(true);
			await song.sound.playAsync();
		}
	};

	const pauseSong = async () => {
		await sound?.pauseAsync();
		setIsPlaying(false);
	};

	const seek5Seconds = (direction: 'forward' | 'back') => {
		if (sound) {
			if (direction === 'forward') {
				sound?.setPositionAsync(
					progress + 5000 <= totalDuration ? progress + 5000 : totalDuration,
				);
				setProgress(progress + 5000 <= totalDuration ? progress + 5000 : totalDuration);
			} else {
				sound?.setPositionAsync(progress - 5000 >= 0 ? progress - 5000 : 0);
				setProgress(progress - 5000 >= 0 ? progress - 5000 : 0);
			}
		}
	};

	useEffect(() => {
		return sound
			? () => {
					setProgress(0);
					sound.unloadAsync();
					setIsPlaying(false);
				}
			: undefined;
	}, [sound]);

	return (
		<>
			{showVideo && (
				<FullscreenVideo
					vidRef={vidRef}
					onStatus={(stat) => setVidStatus(stat)}
					video_url={theme.animethemeentries[0]?.videos[0]?.link}
					onDismiss={() => setShowVideo(false)}
					onDoneLoading={() => setVidLoading(false)}
				/>
			)}
			<Accordion
				title={theme.song.title}
				titleStyle={{ color: colors.primary }}
				titleFontSize={18}
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
				{/* <ProgressBar
					animatedValue={sound?._loaded ? progress / totalDuration : 0}
					style={{ marginHorizontal: 20 }}
				/> */}
				{/* <Slider
					value={progress}
					maximumValue={totalDuration}
					onValueChange={(val) => sound.setPositionAsync(val)}
					thumbTintColor={colors.primary}
					maximumTrackTintColor={colors.onSurfaceVariant}
					minimumTrackTintColor={colors.primaryContainer}
				/> */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 20,
					}}
				>
					<Text>{secToMinString(Math.max(progress / 1000))}</Text>
					<Text>{secToMinString(Math.max(totalDuration / 1000))}</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						alignItems: 'center',
					}}
				>
					{vidLoading ? (
						<ActivityIndicator animating />
					) : (
						<IconButton
							onPress={() => {
								setShowVideo(true);
								setVidLoading(true);
							}}
							icon={'video-outline'}
						/>
					)}
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<IconButton
							disabled={!sound?._loaded}
							onPress={() => seek5Seconds('back')}
							onLongPress={() => {
								sound?.setPositionAsync(0);
								setProgress(0);
							}}
							icon={'step-backward'}
						/>
						{isLoading ? (
							<ActivityIndicator
								animating
								style={{ height: playIconHeight, width: playIconHeight }}
							/>
						) : (
							<IconButton
								onPress={() => (isPlaying ? pauseSong() : playSong())}
								icon={isPlaying ? 'pause' : 'play'}
								size={36}
								onLayout={(e) => setPlayIconHeight(e.nativeEvent.layout.height)}
							/>
						)}
						<IconButton
							onPress={() => seek5Seconds('forward')}
							icon={'step-forward'}
							disabled={!sound?._loaded}
						/>
					</View>
					<Menu
						visible={showMore}
						onDismiss={() => setShowMore(false)}
						anchor={
							<IconButton onPress={() => setShowMore(true)} icon={'dots-vertical'} />
						}
					>
						<Menu.Item
							onPress={() =>
								openWebBrowser(
									`https://animethemes.moe/anime/${anime_slug}/${theme.slug}`,
								)
							}
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
							onPress={() =>
								openWebBrowser(
									`https://open.spotify.com/search/${theme.song.title} ${theme.song.artists[0]?.name}`,
									true,
								)
							}
							leadingIcon={'spotify'}
							title="Spotify"
						/>
						{/* <Menu.Item
							onPress={() => openWebBrowser(`anithemes://`, true)}
							leadingIcon={'spotify'}
							title="AniThemes"
						/> */}
					</Menu>
				</View>
			</Accordion>
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
