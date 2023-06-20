import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import { MotiView } from 'moti';
import { AppState, StyleSheet, useWindowDimensions } from 'react-native';
import { Video as AnimeVideo, Animetheme } from '../../../app/services/animethemes/types';
import { useEffect, useRef, useState } from 'react';
import { VideoControls, VideoControlsYT } from './controls';
import { ProgressBar } from 'react-native-paper';
import { SongMeta } from './meta';
import { View } from 'react-native';
import { AnimeVideos } from '../../../app/services/mal/malApi';
import YoutubePlayer, { YoutubeIframeProps, YoutubeIframeRef } from 'react-native-youtube-iframe';

// import { SongMeta } from './cards';

// type MusicVideoProps = {
//     theme: Animetheme;
// };
// export const MusicVideo = ({ theme }: MusicVideoProps) => {
//     const vidRef = useRef<Video>(null);
//     const [status, setStatus] = useState<AVPlaybackStatus>();
//     const [totalDuration, setTotalDuration] = useState<number>();

//     useEffect(() => {
//         if (status?.isLoaded && !totalDuration) {
//             setTotalDuration(status?.durationMillis);
//         }
//     }, [status]);

//     if (AppState.currentState !== 'active') {
//         return null;
//     }

//     return (
//         <MotiView style={[styles.container]}>
//             {/* <Video
//                 ref={vidRef}
//                 style={styles.player}
//                 source={{
//                     uri: theme?.animethemeentries[0].videos[0]?.link,
//                 }}
//                 onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//                 resizeMode={ResizeMode.CONTAIN}
//             /> */}
//             {/* {video.resolution} */}
//             {totalDuration && (
//                 <ProgressBar
//                     animatedValue={status?.isLoaded && status?.positionMillis / totalDuration}
//                 />
//             )}
//             <SongMeta data={theme} />
//             <VideoControls status={status} vidRef={vidRef} />
//         </MotiView>
//     );
// };

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
        <MotiView style={[styles.container]}>
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
        </MotiView>
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
