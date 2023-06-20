import { useCallback, useRef, useState } from 'react';
import { AppState, View } from 'react-native';
import { Text } from 'react-native-paper';
import YoutubePlayer, { YoutubeIframeProps } from 'react-native-youtube-iframe';
import { TransYUpView } from '../../../components/animations';

type AnimeTrailerProps = {
    video: string;
};
export const AnimeTrailer = ({ video }: AnimeTrailerProps) => {
    const [playing, setPlaying] = useState(false);

    if (AppState.currentState !== 'active') {
        return null;
    }

    return (
        <TransYUpView style={{ marginVertical: 20, paddingHorizontal: 15 }}>
            <Text variant="titleMedium" style={{ paddingBottom: 10 }}>
                Trailer
            </Text>
            <YoutubePlayer height={400} play={playing} videoId={video} />
        </TransYUpView>
    );
};
