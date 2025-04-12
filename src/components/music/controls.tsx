import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { IconButton, ProgressBar } from 'react-native-paper';
import { useVideoPlayer, VideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { useEvent } from 'expo';

type ControlIconProps = {
	icon: string;
	size?: number;
	disabled?: boolean;
	onPress?: () => void;
};
const ControlIcon = ({ icon, size, disabled, onPress }: ControlIconProps) => {
	return (
		<IconButton
			rippleColor={'transparent'}
			disabled={disabled}
			icon={icon}
			size={size ?? 28}
			onPress={onPress}
		/>
	);
};

type VideoControlsProps = {
	player: VideoPlayer;
	status: VideoPlayerStatus;
};
export const VideoControls = ({ player, status }: VideoControlsProps) => {
	// const [playIcon, setPlayIcon] = useState<string>('play-circle-outline');
	const { width } = useWindowDimensions();

	const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
	const { currentTime } = useEvent(player, 'timeUpdate', { ...player });

	const seek = (amount: number) => {
		if (status === 'readyToPlay') {
			player.seekBy(amount);
		}
	};

	const togglePlay = () => {
		if (status === 'readyToPlay') {
			if (isPlaying) {
				player.pause();
			} else {
				player.play();
			}
		}
	};

	// useEffect(() => {
	// 	if (status === 'readyToPlay') {
	// 		if (isPlaying && playIcon === 'play-circle-outline') {
	// 			setPlayIcon('pause');
	// 		} else if (!isPlaying && playIcon === 'pause') {
	// 			setPlayIcon('play-circle-outline');
	// 		}
	// 	}
	// }, [status]);

	return (
		<View>
			<ProgressBar
				style={{ width }}
				animatedValue={
					status === 'readyToPlay' && currentTime ? currentTime / player.duration : 0
				}
			/>
			<View style={[styles.container]}>
				<ControlIcon
					icon="step-backward"
					disabled={currentTime === 0}
					onPress={() => seek(-5000)}
				/>
				<ControlIcon
					icon={isPlaying ? 'pause' : 'play-circle-outline'}
					size={58}
					onPress={() => togglePlay()}
				/>
				<ControlIcon icon="step-forward" onPress={() => seek(5000)} />
			</View>
		</View>
	);
};

type VideoControlsYTProps = {
	// vidRef: React.MutableRefObject<YoutubeIframeRef>;
	seek: (amount: number) => void;
	isPlaying: boolean;
	togglePlay: () => void;
};
export const VideoControlsYT = ({ isPlaying, seek, togglePlay }: VideoControlsYTProps) => {
	return (
		<View style={[styles.container]}>
			<ControlIcon
				icon="step-backward"
				// disabled={!vidRef.current}
				onPress={() => seek(-5)}
			/>
			<ControlIcon
				icon={isPlaying ? 'pause' : 'play-outline'}
				size={58}
				onPress={() => togglePlay()}
			/>
			<ControlIcon icon="step-forward" onPress={() => seek(5)} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
