import { AppState, StyleSheet, useWindowDimensions } from 'react-native';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { AnimeVideos } from '@/store/services/mal/malApi';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { Animetheme } from '@/store/services/animethemes/types';
import {
    AVPlaybackStatus,
    ResizeMode,
    Video,
    Audio,
    VideoFullscreenUpdate,
    VideoFullscreenUpdateEvent,
} from 'expo-av';
import { ActivityIndicator, IconButton, ProgressBar, Text, useTheme } from 'react-native-paper';
import { SongMeta } from './meta';
import { VideoControls } from './controls';
import { Accordion } from '../animations';
import * as ScreenOrientation from 'expo-screen-orientation';
import { openWebBrowser } from '@/utils/webBrowser';

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

export const MusicItem = ({ theme, anime_slug, initialOpen }: MusicVideoProps) => {
    const { colors } = useTheme();
    const [sound, setSound] = useState<Audio.Sound>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    // Video
    const vidRef = useRef<Video>(null);
    const [vidLoading, setVidLoading] = useState<boolean>(false);
    const [vidStatus, setVidStatus] = useState<AVPlaybackStatus>();
    const [showVideo, setShowVideo] = useState<boolean>(false);

    const _onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
        if (!playbackStatus.isLoaded) {
            setProgress(0);
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
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
                setIsLoading(true);
                // Update your UI for the buffering state
            } else {
                setIsLoading(false);
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
            console.log('Loading Sound');
            setIsLoading(true);
            const song = await Audio.Sound.createAsync({
                uri: theme?.animethemeentries[0].videos[0]?.audio?.link,
            });
            song.sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
            if (song.status.isLoaded) {
                setTotalDuration(song.status.durationMillis);
            }
            setIsLoading(false);
            setSound(song.sound);
            console.log('Playing Sound');
            setIsPlaying(true);
            await song.sound.playAsync();
        }
    };

    const pauseSong = async () => {
        console.log('Pausing Sound');
        await sound?.pauseAsync();
        setIsPlaying(false);
    };

    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound');
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
                <ProgressBar
                    animatedValue={progress / totalDuration}
                    style={{ marginHorizontal: 20 }}
                />
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
                            onPress={() => (isPlaying ? pauseSong() : playSong())}
                            icon={'step-backward'}
                        />
                        {isLoading ? (
                            <ActivityIndicator animating style={{ height: 32, width: 32 }} />
                        ) : (
                            <IconButton
                                onPress={() => (isPlaying ? pauseSong() : playSong())}
                                icon={isPlaying ? 'pause' : 'play'}
                                size={32}
                            />
                        )}
                        <IconButton
                            onPress={() => (isPlaying ? pauseSong() : playSong())}
                            icon={'step-forward'}
                        />
                    </View>
                    <IconButton
                        onPress={() => {
                            console.log(
                                `https://animethemes.moe/anime/${anime_slug}/${theme.slug}`,
                            );
                            openWebBrowser(
                                `https://animethemes.moe/anime/${anime_slug}/${theme.slug}`,
                            );
                        }}
                        icon={'web'}
                    />
                </View>
            </Accordion>
        </>
    );
};

type MusicVideoYTProps = {
    music_video: AnimeVideos['data']['music_videos'][0];
};
export const MusicVideoYT = ({ music_video }: MusicVideoYTProps) => {
    const vidRef = useRef<YoutubeIframeRef>(null);
    const [totalDuration, setTotalDuration] = useState<number>();
    const [elapsed, setElapsed] = useState<number>(0);
    const [play, setPlay] = useState<boolean>(false);

    const { width } = useWindowDimensions();

    // const seek = async (seconds: number) => {
    //     if (totalDuration) {
    //         vidRef.current?.seekTo(elapsed + seconds, true);
    //     }
    // };

    // useEffect(() => {
    //     if (music_video) {
    //         const interval = setInterval(async () => {
    //             const elapsed_sec = await vidRef.current?.getCurrentTime(); // this is a promise. dont forget to await

    //             // calculations
    //             // const elapsed_ms = Math.floor(elapsed_sec * 1000);
    //             // const ms = elapsed_ms % 1000;
    //             // const min = Math.floor(elapsed_ms / 60000);
    //             // const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
    //             setElapsed(elapsed_sec ?? 0);
    //             // setElapsed(
    //             //     min.toString().padStart(2, '0') +
    //             //         ':' +
    //             //         seconds.toString().padStart(2, '0') +
    //             //         ':' +
    //             //         ms.toString().padStart(3, '0'),
    //             // );
    //         }, 100); // 100 ms refresh. increase it if you don't require millisecond precision

    //         return () => {
    //             clearInterval(interval);
    //         };
    //     }
    // }, []);

    if (AppState.currentState !== 'active' || !music_video) {
        return null;
    }

    return (
        <View style={[styles.container]}>
            <View style={{ height: styles.player.height, width: width }}>
                <YoutubePlayer
                    ref={vidRef}
                    videoId={music_video?.video?.youtube_id}
                    height={styles.player.height}
                    width={width}
                    webViewStyle={{ opacity: 0.99 }}
                    // play={play}
                    // initialPlayerParams={{ controls: false, modestbranding: true }}
                    // onReady={() => {
                    //     vidRef.current?.getDuration().then((duration) => {
                    //         setTotalDuration(duration);
                    //     });
                    // }}
                    // onChangeState={(event) => {
                    //     if (event === 'ended' || event === 'paused') {
                    //         setPlay(false);
                    //     } else if (event === 'playing') {
                    //         setPlay(true);
                    //     }
                    // }}
                />
            </View>
            {/* {totalDuration && (
                <ProgressBar animatedValue={totalDuration && elapsed / totalDuration} />
            )}
            <VideoControlsYT
                isPlaying={play}
                seek={seek}
                togglePlay={() => setPlay((prev) => !prev)}
            /> */}
        </View>
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
