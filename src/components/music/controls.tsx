import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { AVPlaybackStatus, Video } from 'expo-av';
import { useEffect, useState } from 'react';

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
	status: AVPlaybackStatus;
	vidRef: React.RefObject<Video>;
};
export const VideoControls = ({ status, vidRef }: VideoControlsProps) => {
	const [playIcon, setPlayIcon] = useState<string>('play-circle-outline');

	const seek = (amount: number) => {
		if (status?.isLoaded) {
			vidRef.current.setPositionAsync(status?.positionMillis + amount);
		}
	};

	const togglePlay = () => {
		if (status?.isLoaded) {
			if (status?.isPlaying) {
				vidRef.current.pauseAsync();
			} else {
				vidRef.current.playAsync();
			}
		}
	};

	useEffect(() => {
		if (status?.isLoaded) {
			if (status?.isPlaying && playIcon === 'play-circle-outline') {
				setPlayIcon('pause');
			} else if (!status?.isPlaying && playIcon === 'pause') {
				setPlayIcon('play-circle-outline');
			}
		}
	}, [status]);

	return (
		<View style={[styles.container]}>
			<ControlIcon
				icon="step-backward"
				disabled={status?.isLoaded && status?.positionMillis === 0}
				onPress={() => seek(-5000)}
			/>
			<ControlIcon icon={playIcon} size={58} onPress={() => togglePlay()} />
			<ControlIcon icon="step-forward" onPress={() => seek(5000)} />
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
